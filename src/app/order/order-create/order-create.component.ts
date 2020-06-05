import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CloudLabApiService } from '../../services/cloud-lab-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Offer } from '../../offer/model/Offer';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  offerSearch: boolean = false;
  orderCreated: boolean = false;
  paymentMethod: string;
  orderId: string;
  offer: any;
  orderCreateForm: any;
  offerIds: string[] = new Array();
  product: any;
  paymentMethods: string[] = ['Cash', 'Credit card', 'Debit card'];

  constructor(private apiService: CloudLabApiService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.offerIds.push(params["offerIds"]);
    });

    this.apiService.serachOffer(this.offerIds[0]).subscribe((response) => {
      this.offerSearch = true;

      this.offer = response['offers'][0];
      this.product = this.offer['product'];

      this.orderCreateForm = this.fb.group({
        customer: this.fb.group({
          firstName: [this.offer.customer.firstName],
          lastName: [this.offer.customer.lastName],
          emailAddress: [this.offer.customer.emailAddress],
          customerId: [this.offer.customer.customerId],
          phone: [this.offer.customer.phone]
        }),
        formOfPayment: this.fb.group({
          paymentMethod: this.fb.group({
            paymentMethodType: ['Cash'],
            paymentCard: this.fb.group({
              cardNum: ['', [Validators.required, Validators.minLength(16)]],
              cardHolderName: ['', Validators.required],
              cvv: ['', [Validators.required, Validators.minLength(3)]],
              expirationMonth: ['', [Validators.required, Validators.minLength(4)]]
            }),
            cash: this.fb.group({
              cashAmt: [''],
              terminalId: [''],
              cashReceiptId: ['']
            })
          }),
          price: this.fb.group({
            value: [this.offer.offerPrice.value],
            currency: [this.offer.offerPrice.currency]
          }),
          paymentReferenceId: ['']
        }),
        pointOfSale: this.fb.group({
          browserType: ["BROWSER"],
          countryCode: ["US"],
          ipAddress: ["50.50.50.50"],
          pointOfSaleCityCode: ["ATL"],
          pointOfSaleId: ["CLAB001"]
        }),
        selectedOffers: [this.offer]
      });
      //this.formControlValueChanged();
    })

    
  }

  setPaymentMethod() {
    this.paymentMethod = this.orderCreateForm.get('formOfPayment').get('paymentMethod').get('paymentMethodType').value;
  }

  public formControlValueChanged() {
    const paymentCardControl = this.orderCreateForm.get('formOfPayment').get('paymentMethod').get('paymentCard').get('cardNum');
    this.orderCreateForm.get('formOfPayment').get('paymentMethod').get('paymentMethodType').valueChanges.subscribe(
        (mode: string) => {
            console.log(mode);
            if (mode === 'Cash') {
              paymentCardControl.clearValidators();
            }
            else {
              paymentCardControl.setValidators([Validators.required]);
            }
            paymentCardControl.updateValueAndValidity();
        });
}
  public hasError = (controlName: string, errorName: string) =>{
    return this.orderCreateForm.get('formOfPayment').get('paymentMethod').get('paymentCard').controls[controlName].hasError(errorName);
  }

  createOrder() {
    let orderRequest: any = this.orderCreateForm.value;
    let offers: Offer[] = new Array();
    let selectedOffer: Offer = new Offer();
    selectedOffer.offerId = this.offer.offerId;
    offers.push(selectedOffer);
    orderRequest['selectedOffers'] = offers;
    this.apiService.createOrder(orderRequest
    ).subscribe((response) => {
      this.orderCreateForm.reset();
      this.orderCreated = true;
      this.orderId = response['orderId'];
      this.router.navigateByUrl('/orderSearch/' + this.orderId);
    });
  }
}
