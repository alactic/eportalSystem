import { Component, OnInit } from '@angular/core';
import {EditStudent} from "../../edit-profile/edit-student_detail";
import {StudentSectionServiceService} from "../../student-section/student-section-service.service";
import {NgForm} from "@angular/forms";
import {getFile} from "ts-node/dist";
import {AdminServiceService} from "../../../admin/admin-service.service";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  editstudent:EditStudent;
  getFees:EditStudent;
  editfaculty:EditStudent;
  getDepartments:EditStudent;
  department;
  session; level;
  showInvoice;
  showDept;
  faculty;
  notSuccessfulMessage;
  constructor(private studentservice:StudentSectionServiceService, private adminservice:AdminServiceService) { }

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
            if(response=="level"){
                console.log(response);
                this.notSuccessfulMessage="WRONG LEVEL WAS SELECTED";
            }else{
                if(response==null){
                    this.notSuccessfulMessage="THE PAYMENT FOR THE SESSION IS NOT OUT";
                }else{
                    this.notSuccessfulMessage="";
                }
                if(this.getFees){
                    this.getStudent();
                    this.showInvoice=true;
                }
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

    onGenerate(form:NgForm){
    this.session=form.value.session;
    this.level=form.value.level;
    const email=localStorage.getItem('email');
    //return this.studentservice.getinvoice(email,this.session, this.level)
     //   .subscribe((response)=>response);
    this.getSchoolfees();

  }

}
