import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import  {AuthServiceService} from '../auth-service.service';
import {subscribeOn} from "rxjs/operator/subscribeOn";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authservice:AuthServiceService) { }

  ngOnInit() {
  }

    onSubmit(form:NgForm){
         console.log('posting');
        this.authservice.postDetail(form.value.name, form.value.email, form.value.password)
      .subscribe(()=>alert('LOGIN WAS SUCCESSFUL'));

    }
}
