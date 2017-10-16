import { Component, OnInit } from '@angular/core';
import  {AuthServiceService} from '../auth-service.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authservice:AuthServiceService) { }

  ngOnInit() {
  }
     onSubmit(form:NgForm){
          console.log(form.value.email);
          console.log(form.value.password);
         this.authservice.loginUser(form.value.email, form.value.password)
       .subscribe((Response)=> {
              console.log(Response);
               alert('LOGIN WAS SUCCESSFUL');
       });
     }
}
