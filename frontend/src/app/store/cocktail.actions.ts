import { createAction, props } from '@ngrx/store';
import { Cocktail, CocktailData } from '../models /cocktail.model';

export const fetchCocktailRequest = createAction('[Cocktails] Fetch Request');
export const fetchCocktailSuccess = createAction(
  '[Cocktails] Fetch Success',
  props<{cocktails: Cocktail[]}>()
);
export const fetchCocktailFailure = createAction(
  '[Cocktails] Fetch Failure',
  props<{error: string}>()
);

export const fetchCocktailInfoRequest = createAction(
  '[Cocktail] Fetch Request',
  props<{id: string}>()
);
export const fetchCocktailInfoSuccess = createAction(
  '[Cocktail] Fetch Success',
  props<{cocktail: Cocktail}>()
);
export const fetchCocktailInfoFailure = createAction(
  '[Cocktail] Fetch Failure',
  props<{error: string}>()
)

export const createCocktailRequest = createAction(
  '[Cocktail] Create Request',
  props<{cocktailData: CocktailData}>()
);
export const createCocktailSuccess = createAction(
  '[Cocktail] Create Success'
);
export const createCocktailFailure = createAction(
  '[Cocktail] Create Failure',
  props<{error: string}>()
);

export const deleteCocktailRequest = createAction(
  '[Cocktail] Delete Request',
  props<{id: string}>()
);
export const deleteCocktailSuccess = createAction(
  '[Cocktail] Delete Success'
);
export const deleteCocktailFailure = createAction(
  '[Cocktail] Delete Failure',
  props<{error: string}>()
);

export const publishCocktailRequest = createAction(
  '[Cocktail] Publish Request',
  props<{id: string}>()
);
export const publishCocktailSuccess = createAction(
  '[Cocktail] Publish Success'
);
export const publishCocktailFailure = createAction(
  '[Cocktail] Publish Failure',
  props<{error: string}>()
);
