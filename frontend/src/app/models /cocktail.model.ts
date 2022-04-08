import { User } from './user.model';

export class Cocktail {
  constructor(
    public id: string,
    public user: User,
    public title: string,
    public image: string,
    public recipe: string,
    public is_published: boolean,
    public ingredients: [{[key: string]: string}]
  ) {}
}

export interface CocktailData {
  [key: string]: any;
  title: string;
  image: File | null;
  recipe: string;
  ingredients: [{[key: string]: string}];
}

export interface ApiCocktailData {
  _id: string,
  user: User,
  title: string,
  image: string,
  recipe: string,
  is_published: boolean,
  ingredients: [{[key: string]: string}]
}
