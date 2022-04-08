import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { ApiCocktailData, Cocktail, CocktailData } from '../models /cocktail.model';
@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
  constructor(private http: HttpClient) { }

  getCocktails() {
    return this.http.get<ApiCocktailData[]>(environment.apiUrl + '/cocktails').pipe(
      map(response => {
        return response.map(data => {
          return new Cocktail(data._id, data.user, data.title, data.image,
            data.recipe, data.is_published, data.ingredients
          );
        });
      })
    );
  };

  getUserCocktails() {
    return this.http.get<ApiCocktailData[]>(environment.apiUrl + '/cocktails/myCocktails').pipe(
      map(response => {
        return response.map(data => {
          return new Cocktail(data._id, data.user, data.title, data.image,
            data.recipe, data.is_published, data.ingredients
          );
        });
      })
    );
  }

  getInfo(id: string) {
    return this.http.get<ApiCocktailData>(environment.apiUrl + `/cocktails/${id}`).pipe(
      map(data => {
          return new Cocktail(data._id, data.user, data.title, data.image,
            data.recipe, data.is_published, data.ingredients)
        })
    )
  };


  createCocktail(cocktailData: CocktailData) {
    const formData = new FormData();
    Object.keys(cocktailData).forEach(key => {
      if (cocktailData[key] !== null) {
        formData.append(key, cocktailData[key]);
      }
    });
    return this.http.post(environment.apiUrl + '/cocktails', formData);
  }

  deleteCocktail(id: string) {
    return this.http.delete(environment.apiUrl + `/cocktails/${id}`)
  }

  publishCocktail(id: string) {
    return this.http.post(environment.apiUrl + `/cocktails/${id}/publish`,
      {is_published: true})
  }
}
