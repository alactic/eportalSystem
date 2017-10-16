import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {EditStudent} from "../../edit-profile/edit-student_detail";
import {StudentSectionServiceService} from "../../student-section/student-section-service.service";
import {AdminServiceService} from "../../../admin/admin-service.service";

@Component({
  selector: 'app-print-fees',
  templateUrl: './print-fees.component.html',
  styleUrls: ['./print-fees.component.css']
})
export class PrintFeesComponent implements OnInit {
  editstudent:EditStudent;
  getprint:EditStudent;
  editfaculty:EditStudent;
  getDepartments:EditStudent;
  getFees:EditStudent;
  department;
  session; level;
  showDept;
  faculty;
  responseMessage;
  receipt;
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
  pay(){
    const email=localStorage.getItem('email');
    return this.studentservice.payfees(email, this.level, this.session)
        .subscribe(response=>{
          this.getprint=response;
          this.responseMessage=null;
          this.getStudent();
          this.receipt=true;

        })
  }


  onGenerate(form:NgForm){
    const email=localStorage.getItem('email');
    this.session=form.value.session;
    this.level=form.value.level;
    return this.studentservice.getprint(email, this.session, this.level)
        .subscribe((response)=>{
          if(response=="NO RECORD OF PAYMENT"){
            this.responseMessage=response;
          }else{
            this.pay();
            this.responseMessage=null;
            this.getprint=response;
            this.getStudent();
            this.receipt=true;
          }
         // this.getSchoolfees();
        })

  }
}
