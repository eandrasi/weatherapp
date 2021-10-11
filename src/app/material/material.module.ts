import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon'


const MaterialComponents = [
  MatAutocompleteModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatInputModule,
  MatCardModule,
  MatIconModule
]

@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})

export class MaterialModule { }
