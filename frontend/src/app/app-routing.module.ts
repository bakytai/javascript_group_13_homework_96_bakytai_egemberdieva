import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersCocktailsComponent } from './users-cocktails/users-cocktails.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { CocktailInfoComponent } from './cocktail-info/cocktail-info.component';
import { CocktailsComponent } from './cocktails/cocktails.component';

const routes: Routes = [
  {path: '', component: CocktailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'myCocktails', component: UsersCocktailsComponent},
  {path: 'new/recipe', component: NewRecipeComponent},
  {path: 'cocktail/:id', component: CocktailInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
