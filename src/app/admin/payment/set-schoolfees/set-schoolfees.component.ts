import { Component, OnInit, OnChanges } from '@angular/core';
import {NgForm} from "@angular/forms";
import {EditStudent} from "../../../student/edit-profile/edit-student_detail";
import {AdminServiceService} from "../../admin-service.service";

declare var $;
@Component({
  selector: 'app-set-schoolfees',
  templateUrl: './set-schoolfees.component.html',
  styleUrls: ['./set-schoolfees.component.css']
})
export class SetSchoolfeesComponent implements OnInit, OnChanges {
  editId;id;course;coursecode;unitload;department;
  faculty;responseMessage;showDept;editEdit;showEditTable;
  constructor(private adminservice:AdminServiceService) {
      this.table();
  }
  editpayments:EditStudent;
  editfaculty:EditStudent;
  editdepartments:EditStudent;
  getDepartments:EditStudent;
  ngOnChanges(){
    this.responseMessage="";
}
  ngOnInit() {
    this.getPaymentDetail();
    this.getFacultyDetail();
    this.getDepartmentDetail();
    //this.adminservice.getFacultyDetail(this.editfaculty);
  }

  table(){
      setTimeout(function () {
          $(document).ready(function(){
              $('#myTable').DataTable();
          });
      }, 2000);
  }
  setFaculty(setfaculty){
    console.log(setfaculty);
    this.setFaculty=setfaculty;
}
  getPaymentDetail(){
    return this.adminservice.getPayment()
        .subscribe((response:EditStudent)=>{
          this.editpayments=response;
          this.showEditTable=true;
        });
  }

  //geting all the departments
  getDepartmentDetail(){
    return this.adminservice.getDepartment()
        .subscribe((response:EditStudent)=>{
          this.editdepartments=response;
        });
  }

  //getting all the faculty
  getFacultyDetail(){
    return this.adminservice.getFaculty()
        .subscribe((response:EditStudent)=>{
          this.editfaculty=response;
            this.showDept=true;
        });
  }

  //onclicking the edit
  onEdit(id,course, coursecode, unitload, department, faculty){
    this.editId=id;
    this.course=course;
    this.coursecode=coursecode;
    this.unitload=unitload;
    this.department=department;
    this.faculty=faculty;
  }
  onDelete(id,level,session,department){
    const confirm_delete=confirm("ARE SURE YOU WANT TO DELETE PAYMENT FOR "+level+" "+department+", "+ session);
    if(confirm_delete){
      return this.adminservice.deletePayment(id)
          .subscribe((response)=>{
            this.responseMessage=response;
            this.getPaymentDetail();
          })
    }
  }

  //for editting the course
  onSubmitPayment(form:NgForm){
    const payment=form.value.amount;
    const level=form.value.level;
    const session=form.value.session;
    const department=form.value.department;
    const faculty=form.value.faculty;
    if(!this.editId){
        this.editId=0;
    }
   // console.log(this.editId+", "+payment+", "+level+", "+session+", "+department+", "+faculty);
    return this.adminservice.payment(this.editId,payment, level, session, department, faculty)
        .subscribe((response)=>{
          this.responseMessage=response;
          this.getPaymentDetail();
          //this.router.navigate(['admin/listDept']);
          this.editEdit=false;
          this.editId=null;
          form.reset();
          setTimeout(()=>{
              this.responseMessage="";
          }, 3000)
        })
  }

  //get dept based on the selected faculty
  onGetFaculty(){
    return this.adminservice.fetchDepartment(this.faculty)
        .subscribe((response)=>{
          this.getDepartments=response;
          this.showDept=true;
        })
  }
}
