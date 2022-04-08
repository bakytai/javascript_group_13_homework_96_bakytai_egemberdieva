export interface User {
  _id: string,
  facebookId: string,
  displayName: string,
  avatar: string,
  token: string,
  role: string
}

export interface FieldError {
  message: string
}

export interface LoginError {
  error: string
}

export interface LoginUserData {
  email: string,
  password: string,
}
