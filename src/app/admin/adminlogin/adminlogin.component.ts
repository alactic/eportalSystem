import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../admin-service.service";
import {LoginserviceService} from "../../loginservice.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css', '../../../assets/frontpage/css/style.css']
})
export class AdminloginComponent implements OnInit {
  form:NgForm;
  errorMessage;
  status_error;
  constructor(private router:Router, private loginservice:LoginserviceService) { }

  ngOnInit() {
  }

  //admin login form validation
  onLogin(form:NgForm){
    const email=form.value.email;
    const password=form.value.password;
    return this.loginservice.adminlogin(email, password)
        .subscribe((response)=>{
          this.router.navigate(['/admin']);
        },
        (err) => {
      this.status_error=true;
      this.errorMessage="THE EMAIL OR PASSWORD IS INCORRECT";
      console.log('Something went wrong!');});
  }


}
