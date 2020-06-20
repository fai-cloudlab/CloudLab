import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class CloudLabApiService {

  getproductsUrl  = 'http://localhost:30001/offerManagement/offers/products';
  offerComposerUrl = 'http://localhost:30001/offerManagement/offers';
  offerSearchUrl = 'http://localhost:30001/offerManagement/offers/'
  orderCreateUrl = 'http://localhost:40001/orderManagement/orders'
  orderSearchUrl = 'http://localhost:40001/orderManagement/orders/'
  addToCartUrl = 'http://localhost:50001/cart';
  
  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});


  constructor(private http: HttpClient) { }
  
  //getMatcchedProducts(searchproducts: string){
    //return this.http.get(this.getproductsUrl+searchproducts, {headers: {'TransactionId':'TransactionId', 'Content-Type':'application/json; charset=utf-8', 'Accept':'application/json; charset=utf-8'}});
  //}

  getAllProducts(){
    return this.http.get(this.getproductsUrl, {headers: {'TransactionId':'TransactionId', 'Content-Type':'application/json; charset=utf-8', 'Accept':'application/json; charset=utf-8'}});
  }

  getOffers(searchCriteria: string){
    return this.http.post(this.offerComposerUrl, searchCriteria, {headers: {'TransactionId':'TransactionId', 'Content-Type':'application/json; charset=utf-8', 'Accept':'application/json; charset=utf-8'}});
  }

  serachOffer(offerId: string){
    return this.http.get(this.offerSearchUrl+offerId, {headers: {'TransactionId':'TransactionId', 'Content-Type':'application/json; charset=utf-8', 'Accept':'application/json; charset=utf-8'}});
  }

  addProductToCart(cartInput: string){
    return this.http.post(this.addToCartUrl, cartInput, {headers: {'TransactionId':'TransactionId', 'Content-Type':'application/json; charset=utf-8', 'Accept':'application/json; charset=utf-8'}});
  }

  createOrder(orderinput: string){
    return this.http.post(this.orderCreateUrl, orderinput, {headers: {'TransactionId':'TransactionId', 'Content-Type':'application/json; charset=utf-8', 'Accept':'application/json; charset=utf-8'}});
  }

  serachOrder(orderId: string){
    return this.http.get(this.orderSearchUrl+orderId, {headers: {'TransactionId':'TransactionId', 'Content-Type':'application/json; charset=utf-8', 'Accept':'application/json; charset=utf-8'}});
  }

  deleteOrder(orderId: string){
    return this.http.delete(this.orderSearchUrl+orderId, {headers: {'TransactionId':'TransactionId', 'Content-Type':'application/json; charset=utf-8', 'Accept':'application/json; charset=utf-8'}});
  }
}
