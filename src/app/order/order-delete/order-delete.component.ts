import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CloudLabApiService } from '../../services/cloud-lab-api.service';

@Component({
  selector: 'app-order-delete',
  templateUrl: './order-delete.component.html',
  styleUrls: ['./order-delete.component.css']
})
export class OrderDeleteComponent implements OnInit {

  isErrorOccured: boolean = false;
  orderDeleteted: boolean = false;
  orderDeleteForm = this.fb.group({
    orderId: ['']
  });


  constructor(private apiService: CloudLabApiService, private fb: FormBuilder) { }

  ngOnInit(): void { }

  deleteOrder() {
    let orderid: string = this.orderDeleteForm.value['orderId'];
    this.apiService.deleteOrder(orderid).subscribe((response) => {
      this.orderDeleteted = true;
    },
      (error) => {
        this.isErrorOccured = true;
      });
  }

}
