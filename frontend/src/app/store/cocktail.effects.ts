import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, mergeMap, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';

import {
  createCocktailFailure,
  createCocktailRequest,
  createCocktailSuccess,
  deleteCocktailFailure,
  deleteCocktailRequest,
  deleteCocktailSuccess,
  fetchCocktailFailure,
  fetchCocktailInfoFailure,
  fetchCocktailInfoRequest,
  fetchCocktailInfoSuccess,
  fetchCocktailRequest,
  fetchCocktailSuccess, fetchUserCocktailFailure,
  fetchUserCocktailRequest,
  fetchUserCocktailSuccess,
  publishCocktailFailure,
  publishCocktailRequest,
  publishCocktailSuccess
} from './cocktail.actions';
import { CocktailsService } from '../services/cocktails.service';
import { AppState } from './types';

@Injectable()

export class CocktailEffects {
  fetchCocktails = createEffect(() => this.actions.pipe(
    ofType(fetchCocktailRequest),
    mergeMap(() => this.cocktailService.getCocktails().pipe(
      map(cocktails => fetchCocktailSuccess({cocktails})),
      catchError(() => of(fetchCocktailFailure({error: 'Something went wrong'})))
    ))
  ));

  fetchUserCocktails = createEffect(() => this.actions.pipe(
    ofType(fetchUserCocktailRequest),
    mergeMap(() => this.cocktailService.getUserCocktails().pipe(
      map(cocktails => fetchUserCocktailSuccess({cocktails})),
      catchError(() => of(fetchUserCocktailFailure({error: 'Something went wrong'})))
    ))
  ));

  fetchCocktailInfo = createEffect(() => this.actions.pipe(
    ofType(fetchCocktailInfoRequest),
    mergeMap(({id}) => this.cocktailService.getInfo(id).pipe(
      map(cocktail => fetchCocktailInfoSuccess({cocktail})),
      catchError(() => of(fetchCocktailInfoFailure({error: 'Something went wrong'})))
    ))
  ));

  createCocktail = createEffect(() => this.actions.pipe(
    ofType(createCocktailRequest),
    mergeMap(({cocktailData}) => this.cocktailService.createCocktail(cocktailData).pipe(
      map(() => createCocktailSuccess()),
      tap(() => {
        void this.router.navigate(['/']);
        this.helpers.openSnackbar('your cocktail is being reviewed by a moderator');
      }),
      catchError(() => of(createCocktailFailure({error: 'Wrong Data'})))
    ))
  ));

  deleteCocktail = createEffect(() => this.actions.pipe(
    ofType(deleteCocktailRequest),
    mergeMap(({id}) => this.cocktailService.deleteCocktail(id).pipe(
      map(() => deleteCocktailSuccess()),
      tap(() => {
        this.store.dispatch(fetchCocktailRequest());
        this.helpers.openSnackbar('Cocktail deleted!');
      }),
      catchError(() => of(deleteCocktailFailure({error: 'Wrong Data'})))
    ))
  ));

  publishAlbum = createEffect(() => this.actions.pipe(
    ofType(publishCocktailRequest),
    mergeMap(({id}) => this.cocktailService.publishCocktail(id).pipe(
      map(() => publishCocktailSuccess()),
      tap(() => {
        this.store.dispatch(fetchCocktailRequest());
        this.helpers.openSnackbar('Cocktail published!');
      }),
      catchError(() => of(publishCocktailFailure({error: 'Wrong Data'})))
    ))
  ));

  constructor(
    private router: Router,
    private actions: Actions,
    private cocktailService: CocktailsService,
    private helpers: HelpersService,
    private store: Store<AppState>
  ) {}
}
