import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Cocktail } from '../models /cocktail.model';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../store/types';
import { fetchCocktailInfoRequest } from '../store/cocktail.actions';

@Component({
  selector: 'app-cocktail-info',
  templateUrl: './cocktail-info.component.html',
  styleUrls: ['./cocktail-info.component.sass']
})
export class CocktailInfoComponent implements OnInit {
  cocktailInfo: Observable<Cocktail | null>;
  cocktailSub!: Subscription;
  cocktail!: Cocktail;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  cocktailId!: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.cocktailInfo = store.select(state => state.cocktails.cocktail);
    this.loading = store.select(state => state.cocktails.fetchLoading);
    this.error = store.select(state => state.cocktails.fetchError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cocktailId = params['id']
    })
    this.store.dispatch(fetchCocktailInfoRequest({id: this.cocktailId}));
    this.cocktailSub = this.cocktailInfo.subscribe(cocktailInfo => {
      if (cocktailInfo) {
        this.cocktail = cocktailInfo;
      }
    })
  }

}
