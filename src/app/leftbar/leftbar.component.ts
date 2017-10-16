import { Component, OnInit } from '@angular/core';
import {EportalServiceService} from "../eportal-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {
  getGeneral=[];getStaffs=[]; getStudent=[];
  id:number;
  constructor(private eportalservice:EportalServiceService, private router:Router) { }

  ngOnInit() {
    this.general_information();
    this.getStaff();
    this.getStudents();

  }
   navigation(id){
      this.id=id;
       this.router.navigate(['/nav', this.id])
   }
  general_information(){
    return this.eportalservice.general_info()
        .subscribe((response)=>{
          console.log(response);
          this.getGeneral=response;
        })
  }
  getStaff(){
    return this.eportalservice.getStaff()
        .subscribe((response)=>{
          console.log(response);
          this.getStaffs=response;
        })
  }
  getStudents(){
    return this.eportalservice.getStudents()
        .subscribe((response)=>{
          console.log(response);
          this.getStudent=response;
        })
  }
}
