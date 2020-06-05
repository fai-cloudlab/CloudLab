import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderSearchComponent } from './order-search/order-search.component';
import { OrderDeleteComponent } from './order-delete/order-delete.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  OrderCreateComponent, OrderSearchComponent, OrderDeleteComponent
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
export class OrderModule { }
