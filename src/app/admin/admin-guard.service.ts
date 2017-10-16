import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild, Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Injectable()
export class AdminGuardService implements CanActivate, CanActivateChild {

  constructor(private authService:AuthService, private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
    let url:string=state.url;
      return this.checkLogin_staff(url);
  }
  canActivateChild(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
    return this.canActivate(route, state);
  }

  checkLogin_staff(url:string):boolean{
    if(this.authService.login()){
      if(localStorage.getItem('status')=='admin'){
        return true;
      }
      this.router.navigate(['/home']);
      return false;
    }

    this.router.navigate(['/portal']);
    return false;
  }

}
