import { UserState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  loginFacebookFailure,
  loginFacebookRequest,
  loginFacebookSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser
} from './user.actions';

const initialState: UserState = {
  user: null,
  loginLoading: false,
  loginError: null,
  loginFacebookLoading: false,
  loginFacebookError: null
};

export const usersReducer = createReducer(
  initialState,
  on(loginUserRequest, state => ({...state, loginLoading: true, loginError: null,})),
  on(loginUserSuccess, (state, {user}) => ({...state, loginLoading: false, user})),
  on(loginUserFailure, (state, {error}) => ({...state, loginLoading: false, loginError: error})),
  on(logoutUser, state => ({...state, user: null,})),
  on(loginFacebookRequest, state => ({...state, loginFacebookLoading: true, loginFacebookError: null,})),
  on(loginFacebookSuccess, (state, {user}) => ({...state, loginFacebookLoading: false, user})),
  on(loginFacebookFailure, (state, {error}) => ({...state, loginFacebookLoading: false, loginFacebookError: error}))
);
