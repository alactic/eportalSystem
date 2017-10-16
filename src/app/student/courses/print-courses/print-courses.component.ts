import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {EditStudent} from "../../edit-profile/edit-student_detail";
import {StudentSectionServiceService} from "../../student-section/student-section-service.service";
import {AdminServiceService} from "../../../admin/admin-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-print-courses',
  templateUrl: './print-courses.component.html',
  styleUrls: ['./print-courses.component.css']
})
export class PrintCoursesComponent implements OnInit {
  editstudent: EditStudent;
  editfaculty: EditStudent;
  getDepartments: EditStudent;
  editcourses:EditStudent;
  editborrowCourse:EditStudent;
  selectborrowCourse:EditStudent;
  selectedCourses=[];//for holding selected courses
  department;
  session;
  level;
  showPrint;
  semester;
  email;
  constructor(private studentservice: StudentSectionServiceService, private route:Router) {
  }
  ngOnInit() {
    this.studentservice.firstTimeLogin();
  }

  onSubmit(form:NgForm){
    this.email=localStorage.getItem('email');
    this.semester=form.value.semester;
    console.log(this.session);
    return this.studentservice.getPrint(this.email, this.semester, this.session)
        .subscribe((response)=>{
           this.editcourses=response;
           this.getStudent();
           this.showPrint=true;
        })
  }

  //get the details of the student using their email
  getStudent() {
    const email = localStorage.getItem('email');
    return this.studentservice.getStudent(email)
        .subscribe((response: EditStudent) => {
          this.editstudent = response;
        });
  }

}

