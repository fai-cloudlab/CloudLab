import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CloudLabApiService } from '../../services/cloud-lab-api.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

export interface Product {
  productDescription: string;
  productCode: string;
  productPrice: Price;
}

export interface Price {
  value: Number;
  currency: String;
}

export interface Cart {
  cartId: String;
  offerId: String;
  offerExpirationDate: String;
}

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.css'],
})
export class OfferCreateComponent implements OnInit {
  showProductDetails: boolean = false;
  productsNotFound: boolean = false;
  loadProducts: boolean = true;
  selectedProducts: any = new Array();
  serachCriteria: string;
  productsList: Product[];
  filteredProducts: Observable<Product[]>;
  serachStr: string;
  isErrorOccured: boolean = false;
  showAutocomplete: boolean = false;
  cart: Cart = {
    cartId: null,
    offerExpirationDate: "142525000",
    offerId: null
  };
  cartItemsCount: Number = 0;
  

  constructor(
    private apiService: CloudLabApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  offerCreateForm = this.fb.group({
    customer: this.fb.group({
      firstName: ['Paul'],
      lastName: ['Ezekiel'],
      emailAddress: ['clodlabuser@lab.com'],
      customerId: [''],
      phone: ['123 123 1234'],
    }),
    products: [],
    searchProduct: [''],
  });

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private _filter(name: string): Product[] {
    return this.productsList.filter((producut) =>
      producut.productDescription.toLowerCase().includes(name.toLowerCase())
    );
  }

  private async getProducts(): Promise<void> {
    let temp = this.offerCreateForm.get('searchProduct').value;

    if (this.loadProducts && temp.length > 1) {
      this.apiService.getAllProducts().subscribe(
        (response) => {
          this.isErrorOccured = false;
          this.productsList = <Product[]>response;
        },
        (error) => {
          this.isErrorOccured = true;
        }
      );

      await this.delay(1000);
      this.loadProducts = false;
    }
  }

  async ngOnInit(): Promise<void> {
    this.apiService.getAllProducts().subscribe(
      (response) => {
        this.isErrorOccured = false;
        this.productsList = <Product[]>response;
      },
      (error) => {
        this.isErrorOccured = true;
      }
    );
    await this.delay(1000);
    this.loadProducts = false;
    this.filteredProducts = this.offerCreateForm
      .get('searchProduct')
      .valueChanges.pipe(
        startWith(''),
        map((product) =>
          typeof product === 'string' ? product : product.productDescription
        ),
        map((name) => (name ? this._filter(name) : this.productsList.slice()))
      );
  }

  getProductDescription(product) {
    return product.productDescription;
  }

  createOrder(product: Product) {
    let products: any = new Array();
    products.push(product);
    let offerIds: string;
    this.offerCreateForm.get('products').setValue(products);
    let searchCriteria: string = JSON.stringify(this.offerCreateForm.value);
    this.apiService.getOffers(searchCriteria).subscribe(
      (response) => {
        this.isErrorOccured = false;
        response['offers'].forEach((element) => {
          offerIds = element.offerId;
        });
        this.router.navigateByUrl('/orderCreate/' + offerIds);
      },
      (error) => {
        this.isErrorOccured = true;
      }
    );
  }

  viewCart() {
  this.router.navigateByUrl('/viewCart/' + this.cart.cartId);
  }

  closeAlert() {
    this.isErrorOccured = false;
  }

  closeSearchAlert(){
    this.productsNotFound = false;
    this.showProductDetails = false;
  }


  displayProductDetails(flag: boolean) {
    if (this.isErrorOccured) return null;

    let searchStr: string;
    this.selectedProducts = [];
    if (flag) {
      let product: Product = <Product>(
        this.offerCreateForm.get('searchProduct').value
      );
      searchStr = product.productDescription;
    } else {
      searchStr = this.offerCreateForm.get('searchProduct').value;
    }
    this.selectedProducts = this._filter(searchStr);

    if (this.selectedProducts.length === 0) this.productsNotFound = true;
    else this.productsNotFound = false;

    this.showProductDetails = true;
  }

  searchProducts(e) {
    if(e && e.length >= 3) {
      this.showAutocomplete = true;
   } else {
      this.showAutocomplete = false;
   }

    if (this.isErrorOccured) return null;

    this.selectedProducts = this._filter(
      this.offerCreateForm.get('searchProduct').value
    );
  }


  addItemToCart(product){
    //create
    let products: Product[] = this.selectedProducts;
    this.offerCreateForm.get('products').setValue(products);
    let searchCriteria: any = this.offerCreateForm.value;
    this.apiService.getOffers(searchCriteria).subscribe(
      (response) => {
        this.isErrorOccured = false;
        response['offers'].forEach((element) => {
          //cart
          let cartInput:Cart = {
            offerId: element.offerId,
            offerExpirationDate: this.cart.offerExpirationDate,
            cartId: this.cart.cartId
          }
          this.apiService.addProductToCart(JSON.stringify(cartInput)).subscribe(
            (response) =>{
              this.cart.cartId = response['cartId'];
              this.cartItemsCount = response['offers'].length;
              this.isErrorOccured = false;
            },
            (error) => {
              this.isErrorOccured = true;
            }
          );
        });
      },
      (error) => {
        this.isErrorOccured = true;
      }
    );

  }

}
