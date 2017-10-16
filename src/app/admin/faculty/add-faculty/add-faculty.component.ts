import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdminServiceService} from "../../admin-service.service";

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.css']
})
export class AddFacultyComponent implements OnInit {
    responseMessage;
  constructor(private adminservice:AdminServiceService) { }

    ngOnInit() {
    }
    onSubmit(form:NgForm){
      const faculty=form.value.addfaculty;
      return this.adminservice.addFaculty(faculty)
          .subscribe((response)=>{
               this.responseMessage=response;
              form.reset();
              setTimeout(()=>{
                  this.responseMessage=null;
              }, 6000)
          })
   }
}
