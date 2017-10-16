import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../../admin/admin-service.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  password;
  confirm_password;
  successMessage;
  errorMessage;
  email;
  constructor(private adminservice:AdminServiceService) { }

  ngOnInit() {
    this.email=localStorage.getItem('email');
  }
  onSubmit(form:NgForm){
    if(this.password==this.confirm_password){
      return this.adminservice.changepassword('staff', this.email,this.password)
          .subscribe((response)=>{
            this.successMessage=response;
            setTimeout(()=>{
              this.successMessage=""
            }, 3000);
            form.reset();
            // this.successMessage="CHANGE OF PASSWORD WAS SUCCESSFUL";
          })
    }else{
      this.errorMessage="PASSWORD DO NOT MATCH WITH THE CONFIRM CONFIRM PASSWORD";
      setTimeout(()=>{
        this.errorMessage=""
      }, 3000);
    }

  }

}
