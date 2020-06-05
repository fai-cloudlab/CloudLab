import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CloudLabApiService } from '../../services/cloud-lab-api.service';

@Component({
  selector: 'app-offer-search',
  templateUrl: './offer-search.component.html',
  styleUrls: ['./offer-search.component.css']
})
export class OfferSearchComponent implements OnInit {

  offerSearch : boolean = false;
  offer : any;

  constructor(private apiService: CloudLabApiService, private fb: FormBuilder) { }

  offerSearchForm = this.fb.group({
    offerId: ['']
  });

  ngOnInit(): void {
  }

  searchOffer(){
    let offerId: string = this.offerSearchForm.value['offerId'];
    this.apiService.serachOffer(offerId).subscribe((response) => {
      this.offerSearch = true;
      this.offer = response;
    }) 
  }
}