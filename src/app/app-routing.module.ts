import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferModule } from './offer/offer.module';
import { OrderModule } from './order/order.module';

import { OfferCreateComponent } from './offer/offer-create/offer-create.component';
import { OfferSearchComponent } from './offer/offer-search/offer-search.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { OrderSearchComponent } from './order/order-search/order-search.component';
import { OrderDeleteComponent } from './order/order-delete/order-delete.component';


const routes: Routes = [
  {path : '', redirectTo: '/offerCreate', pathMatch : 'full'},
  {path : 'offerCreate', component : OfferCreateComponent}, 
  {path : 'offerSearch', component : OfferSearchComponent}, 
  {path : 'orderCreate/:offerIds', component : OrderCreateComponent}, 
  {path : 'orderSearch/:orderId', component : OrderSearchComponent}, 
  {path : 'orderSearch', component : OrderSearchComponent}, 
  {path : 'orderDelete', component : OrderDeleteComponent}, 
  //{path : '**', component : PageNotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
