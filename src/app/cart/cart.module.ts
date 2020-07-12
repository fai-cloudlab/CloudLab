import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartViewComponent } from './cart-view/cart-view.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  CartViewComponent
]


@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: COMPONENTS
})
export class CartModule { }
