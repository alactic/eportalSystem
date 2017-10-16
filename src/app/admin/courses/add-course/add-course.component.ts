import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {EditStudent} from "../../../student/edit-profile/edit-student_detail";
import {AdminServiceService} from "../../admin-service.service";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  editfaculty:EditStudent;
  getDepartments:EditStudent;
  responseMessage;
  faculty;
  showDept;
  constructor(private adminservice:AdminServiceService) { }

  ngOnInit() {
    this.getFacultyDetail();
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

  onSubmit(form:NgForm){
    const course=form.value.name;
    const coursecode=form.value.code;
    const unitload=form.value.unit;
    const semester=form.value.semester;
    const status=form.value.status;
    const level=form.value.level;
    const dept=form.value.department;
    const faculty=form.value.faculty;
    //if(dept=="" || faculty==""){
        return this.adminservice.addCourse(course,coursecode,unitload,semester, status, level, dept, faculty)
            .subscribe((response)=>{
                this.responseMessage=response;
                setTimeout(()=>{this.responseMessage=null}, 3000)
                form.reset();
            })
   // }

  }

}
