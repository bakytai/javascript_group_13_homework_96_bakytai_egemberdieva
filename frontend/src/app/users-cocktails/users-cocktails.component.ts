import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cocktail } from '../models /cocktail.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { deleteCocktailRequest, fetchUserCocktailRequest, publishCocktailRequest } from '../store/cocktail.actions';

@Component({
  selector: 'app-users-cocktails',
  templateUrl: './users-cocktails.component.html',
  styleUrls: ['./users-cocktails.component.sass']
})
export class UsersCocktailsComponent implements OnInit {
  cocktails: Observable<Cocktail[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.cocktails = store.select(state => state.cocktails.cocktails);
    this.loading = store.select(state => state.cocktails.fetchLoading);
    this.error = store.select(state => state.cocktails.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchUserCocktailRequest());
  }

  publish(id: string) {
    this.store.dispatch(publishCocktailRequest({id}));
  }

  delete(id: string) {
    this.store.dispatch(deleteCocktailRequest({id}));
  }
}
