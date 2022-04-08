import { createReducer, on } from '@ngrx/store';
import { CocktailState } from './types';
import {
  createCocktailFailure, createCocktailRequest, createCocktailSuccess,
  deleteCocktailFailure, deleteCocktailRequest,
  deleteCocktailSuccess,
  fetchCocktailFailure, fetchCocktailInfoFailure, fetchCocktailInfoRequest, fetchCocktailInfoSuccess,
  fetchCocktailRequest,
  fetchCocktailSuccess, publishCocktailFailure,
  publishCocktailRequest, publishCocktailSuccess
} from './cocktail.actions';

export const initialState: CocktailState = {
  cocktails: [],
  cocktail: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
  changeLoading: false,
  changError: null
};

export const albumsReducer = createReducer(
  initialState,
  on(fetchCocktailRequest, state => ({...state, fetchLoading: true})),
  on(fetchCocktailSuccess, (state, {cocktails}) => ({...state, fetchLoading: false, cocktails})),
  on(fetchCocktailFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(fetchCocktailInfoRequest, state => ({...state, fetchLoading: true})),
  on(fetchCocktailInfoSuccess, (state, {cocktail}) => ({...state, fetchLoading: false, cocktail})),
  on(fetchCocktailInfoFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(publishCocktailRequest, state => ({...state, changeLoading: true})),
  on(publishCocktailSuccess, state => ({...state, changeLoading: false})),
  on(publishCocktailFailure, (state, {error}) => ({
    ...state,
    changeLoading: false,
    changError: error
  })),

  on(createCocktailRequest, state => ({...state, createLoading: true})),
  on(createCocktailSuccess, state => ({...state, createLoading: false})),
  on(createCocktailFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),

  on(deleteCocktailRequest, state => ({...state, deleteLoading: true})),
  on(deleteCocktailSuccess, state => ({...state, deleteLoading: false})),
  on(deleteCocktailFailure, (state, {error}) => ({
    ...state,
    deleteLoading: false,
    deleteError: error})),
)
