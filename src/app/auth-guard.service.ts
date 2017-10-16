import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authService:AuthService, private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
    let url:string=state.url;
      return this.checkLogin_student(url);


  }
  canActivateChild(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
    return this.canActivate(route, state);
  }

  checkLogin_student(url:string):boolean{
    if(this.authService.login()){
      if(localStorage.getItem('status')=='student'){
        return true;
      }
    }

    this.router.navigate(['/portal3']);
    return false;
  }

}
