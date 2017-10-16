import { Component, OnInit } from '@angular/core';
import {EditStudent} from "../../../student/edit-profile/edit-student_detail";
import {AdminServiceService} from "../../admin-service.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  editfaculty:EditStudent;
    responseMessage;
  constructor(private adminservice:AdminServiceService) { }

  ngOnInit() {
    this.getFacultyDetail();
  }
  getFacultyDetail(){
    return this.adminservice.getFaculty()
        .subscribe((response)=>{
          this.editfaculty=response
        });
  }

    onSubmit(form:NgForm){
        const dept=form.value.name;
        const faculty=form.value.selectFaculty;
        return this.adminservice.addDept(dept, faculty)
            .subscribe((response)=>{
                this.responseMessage=response;
                form.reset();
                setTimeout(()=>{
                    this.responseMessage=null;
                }, 3000)
            })
    }

}
