import { Component, OnInit } from '@angular/core';
import {EditStudent} from "../../edit-profile/edit-student_detail";
import {StudentSectionServiceService} from "../../student-section/student-section-service.service";
import {NgForm} from "@angular/forms";
import {AdminServiceService} from "../../../admin/admin-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  editstudent: EditStudent;
  editfaculty: EditStudent;
  getDepartments: EditStudent;
  //editcourses:EditStudent;
  editcourses=[];
  editborrowCourse:EditStudent;
  selectborrowCourse:EditStudent;
  storeBorrow=[];
  selectedCourses=[];//for holding selected courses
  department;
  session;
  level;
  showDept;
  faculty;
  pin;
  responseMessage;
  showPrint;
  showRegister;
  showCourse;
  semester;
  borrowcourse;
  showBorrow;
  event1;
  _selected;//to indicate selected course
    showRegister1;
    showRegister2;
    creditload=0;
  constructor(private studentservice: StudentSectionServiceService, private adminservice:AdminServiceService, private router:Router) {
  }
  ngOnInit() {
      if(sessionStorage.getItem('new')=="yes"){
          this.router.navigate(['student']);
      }
      else
          {
            this.getStudent();
            this.getFacultyDetail();
            this._selected=0;
            this.creditload=0;
          }
  }

  //get the details of the student using their email
  getStudent() {
    const email = localStorage.getItem('email');
    return this.studentservice.getStudent(email)
        .subscribe((response: EditStudent) => {
          this.editstudent = response;
        });
  }

  getCourse(){
    const email = localStorage.getItem('email');
    return this.studentservice.getStudentCourse(email, this.semester)
        .subscribe((response)=>{
            this.editcourses=response;
            this.showRegister=true;
            this.showRegister1=true;
            if(response!=""){
                this.showRegister1=false;
                this.showRegister2=true;
            }
        })
  }

  onSubmit(form:NgForm){
     this.semester=form.value.semester;
    this.getCourse();
  }

  selected(event, unit:number){
    //this.event1=event;

          this.event1=this.selectedCourses.indexOf(event, 0);
      this.creditload=this.creditload-(-unit);
      console.log(this.creditload);
      if(this.creditload<=24){
          if(this.event1<=-1){
              this.selectedCourses.push(event);
          }
          console.log(this.selectedCourses);
      }

  }
  unselect(event, unit:number){
      this.creditload=this.creditload-unit;
      console.log(this.creditload);
    this.event1=this.selectedCourses.indexOf(event, 0);
    if(this.event1>-1){
        this.selectedCourses.splice(this.event1,1);
    }
    console.log(this.selectedCourses);
  }

  //fetching all faculty
  getFacultyDetail(){
    return this.adminservice.getFaculty()
        .subscribe((response)=>{
          this.editfaculty=response
        });
  }

  onGetFaculty(){
    return this.adminservice.fetchDepartment(this.faculty)//fetching dept based on its faculty
        .subscribe((response)=>{
          this.getDepartments=response;
          this.showDept=true;
        })
  }

    onSelectDept(){
      return this.studentservice.getBorrowCourse(this.semester,this.department, this.faculty)
            .subscribe((response:EditStudent)=>{
                this.editborrowCourse=response;
                this.showCourse=true;
            })
    }

    onSelectCourse(){
        return this.studentservice.selectBorrowCourse(this.borrowcourse,this.semester,this.department, this.faculty)
            .subscribe((response)=>{
                this._selected=0;
               console.log(this.editcourses);
               for(let n=0; n<this.editcourses.length;n++){
                   console.log(this.editcourses[n]);
                   console.log(response['id']);
                     if(this.editcourses[n].id==response['id']){
                         console.log('exist');
                         this._selected=1;
                     }
                }
                 if(this._selected==0){
                   let selected=0;
                     for(let n=0; n<this.storeBorrow.length;n++){
                         if(this.storeBorrow[n].id==response['id']){
                             console.log('exist');
                             selected=1;
                         }
                     }
                     if(selected==0) {
                         const index = this.storeBorrow.indexOf(response, 0);
                         console.log(index);
                         this.storeBorrow.push(response);
                         this.selectborrowCourse = response;
                         console.log(this.storeBorrow);
                         this.showCourse = true;
                         this.showBorrow = false;
                     }
                 }
            })
    }

    onRegister(form:NgForm){
        const email=localStorage.getItem('email');
        console.log(this.selectedCourses.length);
        if(this.selectedCourses.length!=0){
            return this.studentservice.submitCourse(email,this.selectedCourses, this.semester,this.session)
                .subscribe((response)=>{
                    if(response=="added"){
                        this.print();
                    }
                })
        }
    }

    print(){
        const email=localStorage.getItem('email');
        return this.studentservice.getPrint(email, this.semester, this.session)
            .subscribe((response)=>{
                this.editcourses=response;
                this.getStudent();
                this.showPrint=true;
            })
    }
}