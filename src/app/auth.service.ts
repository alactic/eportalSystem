import { Injectable } from '@angular/core';
import  {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {LoginserviceService} from "./loginservice.service";
@Injectable()
export class AuthService {
   isLoggedIn=false;
  constructor(private authservice:LoginserviceService) { }
  redirectUrl:string;

  login(){
    if(localStorage.getItem('email') && localStorage.getItem('token')){
         return this.isLoggedIn=true;
    }
    //return Observable.of(true).delay(1000).do(val=>this.isLoggedIn=true);
}
  logout():void{
    this.isLoggedIn=false;
  }
}
