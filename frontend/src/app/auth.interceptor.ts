import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/types';
import { HelpersService } from './services/helpers.service';
import { Router } from '@angular/router';
import { logoutUser } from './store/user.actions';
import { User } from './models /user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user: Observable<null | User>;
  token: null | string = null;
  role!: string;

  constructor(private store: Store<AppState>, private helpers: HelpersService, private router: Router) {
    this.user = this.store.select(state => state.users.user);
    this.user.subscribe(user => {
      this.token = user ? user.token : null;
      this.role = user ? user.role : 'anonymous';
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.token) {
      request = request.clone({
        setHeaders: {'Authorization': this.token}
      });
    }

    if (this.role) {
      request = request.clone({
        headers: request.headers.set('Role', this.role)
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.helpers.openSnackbar('No internet connection');
        }

        if (error.status === 401) {
          this.store.dispatch(logoutUser());
          void this.router.navigate(['/login']);
        }

        return throwError(() => error)
      })
    );
  }
}
