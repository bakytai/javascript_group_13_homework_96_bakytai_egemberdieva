import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.sass']
})
export class NewRecipeComponent implements OnInit {
  cocktailForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.cocktailForm = new FormGroup({
      title: new FormControl('', Validators.required),
      recipe: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      ingredients: new FormArray([])
    });
  }

  formHasError(fieldName: string, required: string) {
    const field = this.cocktailForm.get(fieldName);
    return Boolean(field && field.touched && field.errors?.[required]);
  }

  getIngredientsControls() {
    const ingredients =  <FormArray>this.cocktailForm.get('ingredients');
    return ingredients.controls;
  }

  resetForm() {
    this.cocktailForm.reset();
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    ingredients.clear();
  }

  addIngredient() {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    const ingredientsGroup = new FormGroup({
      title: new FormControl('',Validators.required),
      amount: new FormControl('',Validators.required)
    })
    ingredients.push(ingredientsGroup);
  }
}
