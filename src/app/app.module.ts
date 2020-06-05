import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OfferModule } from './offer/offer.module';
import { OrderModule } from './order/order.module';
import { ViewModule } from './view/view.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    OfferModule,
    OrderModule,
    ViewModule,
    RouterModule
      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }