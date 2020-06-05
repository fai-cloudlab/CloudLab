import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CloudLabApiService } from '../../services/cloud-lab-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  orderSearch: boolean = true;
  order: any;
  orderId: string;
  orderDetails: boolean = false;

  constructor(private apiService: CloudLabApiService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  orderSearchForm = this.fb.group({
    orderId: ['']
  });

  ngOnInit(): void {
    //console.log("params:::" + this.route.params);
    this.route.params.subscribe(params => {
      this.orderSearchForm.value['orderId'] = params["orderId"];
    });
    if (this.orderSearchForm.value['orderId'] != undefined)
      this.searchOrder(false);
  }

  searchOrder(show: boolean) {
    this.orderSearch = show;
    let orderId: string = this.orderSearchForm.value['orderId'];
    this.apiService.serachOrder(orderId).subscribe((response) => {
      this.orderDetails = true;
      this.order = response;
      //console.log(JSON.stringify(this.order))
      console.log("Order response: "+JSON.stringify(response))
    })
  }
}
