import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {EditStudent} from "../../../student/edit-profile/edit-student_detail";
import {AdminServiceService} from "../../admin-service.service";
declare var $;
@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {
    editId;id;course;coursecode;unitload;department;
    faculty;responseMessage;showDept;editEdit;
  constructor(private adminservice:AdminServiceService) {
      this.table();
  }
  editcourses:EditStudent;
  editfaculty:EditStudent;
  editdepartments:EditStudent;
  getDepartments:EditStudent;
  ngOnInit() {
    this.getCourseDetail();
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

  getCourseDetail(){
    return this.adminservice.getCourse()
        .subscribe((response:EditStudent)=>{
          this.editcourses=response;
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
          this.editfaculty=response
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
  onDelete(id,course, department, faculty){
    const confirm_delete=confirm("ARE SURE YOU WANT TO DELETE "+ course+ " from "+ department);
    if(confirm_delete){
      return this.adminservice.deleteCourse(id)
          .subscribe((response)=>{
            this.responseMessage=response;
            this.getCourseDetail();
          })
    }
  }


  //for editting the course
  onSubmitEdit(form:NgForm){
      const course=form.value.course;
      const coursecode=form.value.coursecode;
      const unitload=form.value.unit;
      const semester=form.value.semester;
      const status=form.value.status;
      const level=form.value.level;
      const department=form.value.department;
      const faculty=form.value.faculty;
      console.log(course+", "+coursecode+", "+unitload+", "+level+", "+department+", "+faculty);
    return this.adminservice.editCourse(this.editId,course, coursecode, unitload,semester, status, level, department, faculty)
        .subscribe((response)=>{
          this.responseMessage=response;
          this.getCourseDetail();
          //this.router.navigate(['admin/listDept']);
          this.editEdit=false;
          form.reset();
            this.table();
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

    onEditButton(){
        this.table();
        this.editEdit=false;
    }
}
