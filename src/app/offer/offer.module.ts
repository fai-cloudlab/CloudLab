import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferCreateComponent } from './offer-create/offer-create.component';
import { OfferSearchComponent } from './offer-search/offer-search.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms'

const COMPONENTS = [
  OfferCreateComponent,
  OfferSearchComponent
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    COMPONENTS
  ]
})
export class OfferModule { }
