import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../../admin-service.service";
import {EditStudent} from "../../../student/edit-profile/edit-student_detail";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
declare var $;
@Component({
  selector: 'app-list-faculty',
  templateUrl: './list-faculty.component.html',
  styleUrls: ['./list-faculty.component.css']
})
export class ListFacultyComponent implements OnInit {
    showload;
  constructor(private adminservice:AdminServiceService, private router:Router) {
       this.table();
  }
   editfaculty:EditStudent;
  editId;
  faculty;
    responseMessage;
  ngOnInit() {
          this.getFacultyDetail();
     // this.adminservice.getDept(this.editfaculty);
  }

    table(){
        setTimeout(function () {
            $(document).ready(function(){
                $('#myTable').DataTable();
            });
        }, 1000);
    }

  getFacultyDetail(){
      return this.adminservice.getFaculty()
          .subscribe((response)=>{
              this.editfaculty=response
          });
  }

    onEdit(id, faculty){
        this.faculty=faculty;
        this.editId=id;
    }
    onDelete(id,faculty){
        const confirm_delete=confirm("ARE SURE YOU WANT TO DELETE "+ faculty);
        if(confirm_delete){
            return this.adminservice.deleteFaculty(id)
                .subscribe((response)=>{
                    this.responseMessage=response;
                    this.getFacultyDetail();
                })
        }
    }
    onSubmitEdit(form:NgForm){
        const editedValue=form.value.faculty;
        form.reset();
        return this.adminservice.editFaculty(this.editId, editedValue)
            .subscribe((response)=>{
                 this.responseMessage=response;
                 this.getFacultyDetail();
                 this.router.navigate(['admin/listFaculty']);
                this.editId=null;
                this.table();
        })
    }

    onEditButton(){
        this.editId=false;
        this.table();
    }
}
