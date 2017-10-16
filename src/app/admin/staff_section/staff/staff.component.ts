import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {StaffService} from "../../../staff/staff.service";
import {AdminServiceService} from "../../admin-service.service";
import {Router} from "@angular/router";
import {EditStudent} from "../../../student/edit-profile/edit-student_detail";

@Component({
  selector: 'app-staff',
  templateUrl: 'staff.component.html',
  styleUrls: ['staff.component.css']
})
export class StaffComponent implements OnInit {
  staff_status;
  new_staff;
  surname;
  regno;
  staff_email;
  entry_year;
  level='B.sc';
  level_status;
  sch_reg;
  preview;
  remove_staff;
  status;
  successMessage;
  delete_details;
  getStaff;
  lastRegno;

  constructor(private staffservice:StaffService, private adminservice:AdminServiceService, private router:Router) { }
  getStaffs:EditStudent;
  ngOnInit() {
    this.getAllStaff();
  }

  onProceed(form:NgForm){
    this.staff_status=form.value.status;
    this.surname=form.value.surname;
    sessionStorage.setItem('surname', this.surname);
    this.getLastStaffno();
    console.log(this.staff_status);
    if(this.staff_status=="new"){
      this.new_staff=true;
      this.status='Staff';
    }
    if(this.staff_status=="transfer"){
      this.new_staff=true;
      this.level_status=true;
      this.status='Contract Staff';

    }
    if(this.staff_status=="remove"){
      this.remove_staff=true;

    }
  }
  

  onNew(form:NgForm){
    this.entry_year=form.value.entry;
      this.surname=form.value.surname;
      sessionStorage.setItem('surname', this.surname);
      const getSurname=this.surname.split(' ');
    this.staff_email=this.surname+"."+this.lastRegno+"@schoolname.com";
    this.sch_reg=this.entry_year+"/"+this.lastRegno;
    if(form.value.level){
      this.level=form.value.level;
    }
    this.preview=true;
    this.new_staff=false;
    form.reset();

  }
//submission of new or transferred student to database
  onSubmit(form:NgForm){
    const password='0000'+sessionStorage.getItem('surname');
    console.log(password)
    return this.staffservice.newStaff(this.staff_email,password, this.sch_reg, this.status)
        .subscribe((response)=>{
          this.router.navigate(['admin/staff']);
          this.successMessage=response;
          setTimeout(()=>{
              this.successMessage=null;
          }, 2000)
          this.preview=false;
          this.staff_status=false;
        });


  }

    reset(){
        this.staff_status=false;
        this.new_staff=false;
        this.preview=false;
        this.remove_staff=false;
        this.successMessage="";
    }

  //for all staff from the database
  getAllStaff(){
    return this.adminservice.getAllStaff()
        .subscribe((response:EditStudent)=>{this.getStaffs=response
        });
  }

  onRemove(form:NgForm) {
    const regno=form.value.regno
    return this.adminservice.removeStaff(regno)
        .subscribe(response=>{
          this.router.navigate(['admin/staff']);
          this.successMessage=response;
          this.remove_staff=false;
            //this.regno='';
          this.delete_details=false;
          this.onChange();
        });
  }
  onChange(){
    return this.adminservice.getStaffbyEmail(this.regno)
        .subscribe((response)=> {
          this.getStaff=response;
          this.delete_details=true;
        });
  }

    getLastStaffno(){
        return this.adminservice.getLastStaffno()
            .subscribe((response)=>{
                const Regno=response;
                this.lastRegno=Regno+1;
            })
    }
}
