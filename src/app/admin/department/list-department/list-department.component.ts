import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {EditStudent} from "../../../student/edit-profile/edit-student_detail";
import {AdminServiceService} from "../../admin-service.service";
import {Router} from "@angular/router";
declare var $;
@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {

  constructor(private adminservice:AdminServiceService, private router:Router) {
      this.table();
  }
  editfaculty:EditStudent;
  editdepartments:EditStudent;
  editId;
    id;
    department;
    faculty;
  responseMessage;
  ngOnInit() {
      this.getFacultyDetail();
      this.getDepartmentDetail();
    //this.adminservice.getFacultyDetail(this.editfaculty);
  }

    table(){
        setTimeout(function () {
            $(document).ready(function(){
                $('#myTable').DataTable();
            });
        }, 1000);
    }

  getDepartmentDetail(){
    return this.adminservice.getDepartment()
        .subscribe((response:EditStudent)=>{
          this.editdepartments=response;
        });
  }
    getFacultyDetail(){
        return this.adminservice.getFaculty()
            .subscribe((response:EditStudent)=>{
                this.editfaculty=response
            });
    }

    onEdit(id, department, faculty){
        this.editId=id;
        this.department=department;
        this.faculty=faculty;
    }
    onDelete(id, department, faculty){
        const confirm_delete=confirm("ARE SURE YOU WANT TO DELETE "+ department+ " from "+ faculty);
        if(confirm_delete){
            return this.adminservice.deleteDepartment(id)
                .subscribe((response)=>{
                   this.responseMessage=response;
                    this.getDepartmentDetail();
                })
        }
    }
    onSubmitEdit(form:NgForm){
        const department=form.value.department;
        const faculty=form.value.faculty;
        return this.adminservice.editDepartment(this.editId, department, faculty)
            .subscribe((response)=>{
                this.responseMessage=response;
                this.getDepartmentDetail();
                this.router.navigate(['admin/listDept']);
                this.editId=null;
                form.reset();
                this.table();
                setTimeout(()=>{
                    this.responseMessage="";
                }, 2000);
            })
    }


    onEditButton(){
        console.log("ffgkg");
        this.editId=false;
        this.table();
    }
}
