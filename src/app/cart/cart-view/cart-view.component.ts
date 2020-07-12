import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CloudLabApiService } from '../../services/cloud-lab-api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  viewCart: boolean = true;
  cart: any;
  orderId: string;
  cartDetails: boolean = false;
  isErrorOccured: boolean = false;


  constructor(
    private apiService: CloudLabApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.cartViewForm.value['cartId'] = params['cartId'];
    });
    if (this.cartViewForm.value['cartId'] != undefined)
      this.fetchCartDetails(false);
  }

  cartViewForm = this.fb.group({
    cartId: [''],
  });

  closeAlert() {
    this.isErrorOccured = false;
  }

  fetchCartDetails(show: boolean) {
    this.viewCart = show;
    let cartId: string = this.cartViewForm.value['cartId'];
    
    this.apiService.viewCart(cartId).subscribe(
      (response) => {
        this.cartDetails = true;
        this.cart = response;
      },
      (error) => {
        this.isErrorOccured = true;
      }
    );
  }




}
