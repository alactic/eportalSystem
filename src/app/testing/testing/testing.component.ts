import { Component, OnInit } from '@angular/core';
import {EportalServiceService} from "../../eportal-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  getEvents=[];getAdmissions=[];getSports=[];get=[];getFacilties=[];gettimetable=[];
  getlatests=[];
    getGeneral=[];getStaffs=[]; getStudent=[];
    id:number;

  constructor(private eportalservice:EportalServiceService, private router:Router) { }

  ngOnInit() {
      this.general_information();
      this.getStaff();
      this.getStudents();
    this.getEvent();
    this.getAdmission();
    this.getTimetable();
    this.getFacility();
    this.getSport();
    this.getLatest();

  }
  getEvent(){
    return this.eportalservice.getEvent()
        .subscribe((response)=>{
          this.getEvents=response;
        })
  }

  getAdmission(){
    return this.eportalservice.getAdmission()
        .subscribe((response)=>{
          console.log(response);
          if(response!="null"){
            this.getAdmissions=response;
          }
        });
  }

  getFacility(){
    return this.eportalservice.getFacilities()
        .subscribe((response)=>{
          this.getFacilties=response;
        })
  }

  getLatest(){
    return this.eportalservice.getlatest()
        .subscribe((response)=>{
          this.getlatests=response;
        })
  }

  getTimetable(){
    return this.eportalservice.getTimetable()
        .subscribe((response)=>{
          this.gettimetable=response;
        })
  }

  getSport(){
    return this.eportalservice.getSport()
        .subscribe((response)=>{
          this.getSports=response;
        })
  }

  /** getAcademic(){
    return this.eportalservice.getAcademic()
        .subscribe((response)=>{
            this.getAcademics=response;
        })
    }

   getAdministration(){
    return this.eportalservice.getAdministration()
        .subscribe((response)=>{
            this.getAdmin=response;
        })
    }

   getNew(){
    return this.eportalservice.getNew()
        .subscribe((response)=>{
            this.getNews=response;
        })
    }

   **/
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
