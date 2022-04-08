import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../models /user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { logoutUserRequest } from '../store/user.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user: Observable<null | User>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>
  ) {
    this.user = store.select(state => state.users.user);
  }

  logout() {
    this.store.dispatch(logoutUserRequest());
  }
}
