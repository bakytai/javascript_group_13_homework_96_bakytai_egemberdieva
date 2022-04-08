import { LoginError, User } from '../models /user.model';
import { Cocktail } from '../models /cocktail.model';

export type UserState = {
  user: null | User,
  loginLoading: boolean,
  loginError: null | LoginError,
  loginFacebookLoading: boolean,
  loginFacebookError: null | LoginError
}

export type CocktailState = {
  cocktails: Cocktail[],
  cocktail: Cocktail | null,
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  deleteLoading: boolean,
  deleteError: null | string,
  changeLoading: boolean,
  changError: null | string
}

export type AppState = {
  cocktails: CocktailState,
  users: UserState
}

