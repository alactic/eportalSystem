import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AdminServiceService} from "../../admin-service.service";
declare var $;
@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit {
  allPayments=[];showPayments;
  constructor(private adminservice:AdminServiceService, private router:Router) {
      setTimeout(function () {
          $(document).ready(function(){
              $('#myTable').DataTable();
          });
      }, 2000);
  }

  ngOnInit() {
    this.getAllPayment();
  }

  getAllPayment(){
     return this.adminservice.getAllPayment()
         .subscribe((response)=>{
               this.allPayments=response;
               this.showPayments=true;
         })
  }

}
