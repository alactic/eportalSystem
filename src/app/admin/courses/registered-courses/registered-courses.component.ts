import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../../admin-service.service";
import {NgForm} from "@angular/forms";
import {StudentSectionServiceService} from "../../../student/student-section/student-section-service.service";
import {EditStudent} from "../../../student/edit-profile/edit-student_detail";
declare var $;
@Component({
  selector: 'app-registered-courses',
  templateUrl: './registered-courses.component.html',
  styleUrls: ['./registered-courses.component.css']
})
export class RegisteredCoursesComponent implements OnInit {
  allRegisteredCourses=[];
  editstudent=[];
  editcourses=[];
  showPrint;
  email;
  semester;
  session;
  showView;
  showRegister;
  showRegister1;
  showRegister2;
  selectedCourses=[];
  creditload:number=0;
  event1;
  editfaculty:EditStudent;
  department;
  faculty;
  getDepartments;
  showDept;
  editborrowCourse;
  showCourse;
  _selected;
  borrowcourse;
  selectborrowCourse;
  storeBorrow=[];
  showBorrow;
  allRegistered;
  errorMessage;
  constructor(private adminservice:AdminServiceService, private studentservice: StudentSectionServiceService) {
      this.table();
  }

  ngOnInit() {
    this.allRegisterCourses();
    this.getFacultyDetail();
  }
  table(){
      setTimeout(function () {
          $(document).ready(function(){
              $('#myTable').DataTable();
          });
      }, 2000);
  }
  allRegisterCourses(){
    return this.adminservice.getAllRegistered()
        .subscribe((response)=>{
            this.allRegisteredCourses=response;
            this.allRegistered=true;
        })
  }

  onView(email, semester, session){
    this.email=email;
    return this.studentservice.getPrint(email, semester, session)
        .subscribe((response)=>{
          this.editcourses=response;
          this.getStudent();
           this.showView=true;
           this.showRegister=true;
            this.showRegister2=false;
            this.showPrint=true;
        })
  }
  //get the details of the student using their email
  /*getStudent() {
    return this.studentservice.getStudent(this.email)
        .subscribe((response) => {
          this.editstudent = response;
        });
  }
*/

  //get the details of the student using their email
  getStudent() {
    return this.studentservice.getStudent(this.email)
        .subscribe((response) => {
            this.department=response['department'];
          this.faculty=response['faculty'];
          this.editstudent = response;
        });
  }

  getCourse(){
    return this.studentservice.getStudentCourse(this.email, this.semester)
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

  /*onSubmit(form:NgForm){
    this.getCourse();
  }
*/

  onEdit(email, semester, session){
    this.email=email;
    this.semester=semester;
    this.session=session;
    this.getCourse();
    this.getStudent();

}
  selected(event, unit:number){
    this.event1=this.selectedCourses.indexOf(event, 0);
    this.creditload=this.creditload-(-unit);
    if(this.creditload<=24){
      if(this.event1<=-1){
        this.selectedCourses.push(event);
      }
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
            for(let n=0; n<this.editcourses.length;n++){
            if(this.editcourses[n].id==response['id']){
              this._selected=1;
            }
          }
          if(this._selected==0){
            let selected=0;
            for(let n=0; n<this.storeBorrow.length;n++){
              if(this.storeBorrow[n].id==response['id']){
                selected=1;
              }
            }
            if(selected==0) {
              const index = this.storeBorrow.indexOf(response, 0);
              this.storeBorrow.push(response);
              this.selectborrowCourse = response;
              this.showCourse = true;
              this.showBorrow = false;
            }
          }
            this.showRegister=true;
        })
  }

  onRegister(form:NgForm){
    if(this.selectedCourses.length!=0){
      return this.studentservice.submitCourse(this.email,this.selectedCourses, this.semester,this.session)
          .subscribe((response)=>{
            if(response=="added"){
              this.print();
                this.showRegister2=false;
              //this.showRegister=false;
            }
          })
    }else{
        this.errorMessage="PLEASE, SELECT COURSE";
        setTimeout(()=>{
            this.errorMessage=null
        }, 2000)
    }
  }

  print(){
    return this.studentservice.getPrint(this.email, this.semester, this.session)
        .subscribe((response)=>{
          this.editcourses=response;
          this.getStudent();
          this.showView=true;
        })
  }
  close(){
    this.showView=false;
    this.showRegister=false;
    this.showPrint=false;
      this.table();
  }



}
