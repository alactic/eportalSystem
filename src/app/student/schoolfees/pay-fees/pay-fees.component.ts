import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {EditStudent} from "../../edit-profile/edit-student_detail";
import {StudentSectionServiceService} from "../../student-section/student-section-service.service";
import {AdminServiceService} from "../../../admin/admin-service.service";

@Component({
  selector: 'app-pay-fees',
  templateUrl: './pay-fees.component.html',
  styleUrls: ['./pay-fees.component.css']
})
export class PayFeesComponent implements OnInit {
  editstudent:EditStudent;
  getFees:EditStudent;
  editfaculty:EditStudent;
  getDepartments:EditStudent;
  department;
  session; level;
  showInvoice;
  showDept;
  faculty;
  receipt;
  pin;
  responseMessage;
  constructor(private studentservice:StudentSectionServiceService) { }

  ngOnInit() {
      this.studentservice.firstTimeLogin();
    //this.getFacultyDetail();
    //this.onGetFaculty()
  }

  //get the details of the student using their email
  getStudent(){
    const email=localStorage.getItem('email');
    return this.studentservice.getStudent(email)
        .subscribe((response:EditStudent)=>{
          this.editstudent=response;
        });
  }

  getSchoolfees(){
    const email=localStorage.getItem('email');
    return this.studentservice.getSchoolfees(email,this.level, this.session)
        .subscribe((response)=>{
              this.getFees=response;
              console.log(response);
              if(this.getFees){
                this.pay();
              }

            },
            (err)=>{
              if(err.error instanceof Error){
                console.log('errorfrom the site')
              }else{
                console.log('the error code is'+ err.status+' , the message is '+ err)
              }
            })
  }

  pay(){
    const email=localStorage.getItem('email');
    return this.studentservice.payfees(email, this.level, this.session)
        .subscribe(response=>{
            this.getFees=response;
            this.responseMessage=null;
            this.getStudent();
            this.receipt=true;
        })
  }

  checkinvoice(){
      const email=localStorage.getItem('email');
      return this.studentservice.checkinvoice(email, this.level, this.session, this.pin)
          .subscribe((response)=>{
              if(response!=""){
                  this.responseMessage=response;
              }else{
                  this.pay();
              }
          })
  }

  onPayfees(form:NgForm){
    this.session=form.value.session;
    this.level=form.value.level;
    this.pin=form.value.pin;
    this.checkinvoice();
    //this.receipt=true;

  }

}
