import { Component, OnInit } from '@angular/core';
import {EportalServiceService} from "../../eportal-service.service";

@Component({
  selector: 'app-adminstration',
  templateUrl: 'adminstration.component.html',
  styleUrls: ['adminstration.component.css']
})
export class AdminstrationComponent implements OnInit {
  getAdmin=[];
  constructor(private eportalservice:EportalServiceService) { }

  ngOnInit() {
    this.getAdministration();
  }

  getAdministration(){
    return this.eportalservice.getAdministration()
        .subscribe((response)=>{
          console.log(response);
          this.getAdmin=response;
        })
  }
}
