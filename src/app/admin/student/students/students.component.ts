import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {StaffService} from "../../../staff/staff.service";
import {Router} from "@angular/router";
import {AdminServiceService} from "../../admin-service.service";
import {EditStudent} from "../../../student/edit-profile/edit-student_detail";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-students',
  templateUrl: 'students.component.html',
  styleUrls: ['students.component.css']
})
export class StudentsComponent implements OnInit {
  student_status;
  new_student;
  surname;
  regno:number;
  student_email;
  entry_year;
  level=100;
  level_status;
  sch_reg;
  preview;
  remove_student;
  status;
  successMessage;
  delete_details;
  getStudent;
  showDept;
  lastRegno;
  faculty;
  department;

  constructor(private staffservice:StaffService, private adminservice:AdminServiceService, private router:Router) { }
    getStudents:EditStudent;
    editfaculty:EditStudent;
    editdepartments:EditStudent;
    getDepartments:EditStudent;
  ngOnInit() {
      this.getAllStudent();
      this.getDepartmentDetail();
      this.getFacultyDetail();
  }
    reset(){
      this.student_status=false;
      this.new_student=false;
      this.preview=false;
      this.remove_student=false;
      this.successMessage="";
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

  onProceed(form:NgForm){
     this.student_status=form.value.status;
      this.status='Transferred Student';
     if(this.student_status=="new"){
        this.new_student=true;
         this.status='Student';
         this.getLastRegno();
     }
      if(this.student_status=="transfer"){
          this.new_student=true;
          this.level_status=true;
          this.getLastRegno();
      }
      if(this.student_status=="remove"){
          this.remove_student=true;
      }
  }

    onNew(form:NgForm){
        this.entry_year=form.value.entry;
        this.surname=form.value.surname;
        this.department=form.value.department;
        this.faculty=form.value.faculty;
        sessionStorage.setItem('department', this.department);
        sessionStorage.setItem('faculty', this.faculty);
        sessionStorage.setItem('surname', this.surname);
         const getSurname=this.surname.split(' ');
        this.student_email=getSurname[0]+"."+this.lastRegno+"@schoolname.com";
        this.sch_reg=this.entry_year+"/"+this.lastRegno;
        if(form.value.level){
             this.level=form.value.level;
        }
        this.preview=true;
        this.new_student=false;
        this.lastRegno="";
        form.reset();

    }
    //submission of new or transferred student to database
    onSubmit(form:NgForm){
         const password='0000'+sessionStorage.getItem('surname');
         console.log("password", password);
         console.log("department", this.department);
         console.log("faculty", this.faculty);
        return this.staffservice.newStudent(this.student_email,password, this.sch_reg, this.status, sessionStorage.getItem('department'),
            sessionStorage.getItem('faculty'))
            .subscribe((response)=>{
                this.router.navigate(['admin/addStudent']);
                this.successMessage=response;
                setTimeout(()=>{
                    this.successMessage=null;
                }, 2000)
                this.student_status=false;
                this.preview=false;
                sessionStorage.setItem('department', "");
                sessionStorage.setItem('faculty', "");
                sessionStorage.setItem('surname', "");
        });
    }


    //for all students from the database
    getAllStudent(){
        return this.adminservice.getAllStudent()
            .subscribe((response:EditStudent)=>{
                 this.getStudents=response
                });
    }

         onRemove(form:NgForm) {
           const regno=form.value.regno
             return this.adminservice.removeStudent(regno)
               .subscribe(response=>{
                   this.router.navigate(['admin/students']);
                   this.successMessage=response;
                   this.remove_student=false;
                   this.delete_details=false;
               });
    }
    onChange(){
        return this.adminservice.getStudentbyEmail(this.regno)
            .subscribe((response)=> {
                this.getStudent=response;
                this.delete_details=true;
            });
    }

    //get dept based on the selected faculty
    onGetFaculty(){
        return this.adminservice.fetchDepartment(this.faculty)
            .subscribe((response)=>{
                this.getDepartments=response;
                this.showDept=true;
            })
    }

    getLastRegno(){
        return this.adminservice.getLastRegno()
            .subscribe((response)=>{
                 const Regno=response;
                 this.lastRegno=Regno+1;
            })
    }

}