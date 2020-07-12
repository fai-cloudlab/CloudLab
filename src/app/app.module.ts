import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { HttpErrorInterceptor } from './error-handling/Interceptors/HttpErrorInterceptor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OfferModule } from './offer/offer.module';
import { CartModule } from './cart/cart.module';
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
    CartModule,
    OrderModule,
    ViewModule,
    RouterModule
      ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
     useClass: HttpErrorInterceptor,
     multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }