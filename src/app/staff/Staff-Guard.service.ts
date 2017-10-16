import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./../auth.service";

@Injectable()
export class StaffGuardService implements CanActivate, CanActivateChild {

    constructor(private authService:AuthService, private router:Router) { }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
        let url:string=state.url;
        //if((localStorage.getItem('status')=='staff')){
            return this.checkLogin_staff(url);

    }
    canActivateChild(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
        return this.canActivate(route, state);
    }

    checkLogin_staff(url:string):boolean{
        if(this.authService.login()){
            if(localStorage.getItem('status')=='staff'||localStorage.getItem('status')=='student'){
                return true;
            }
        }
        this.router.navigate(['/portal3']);
        return false;
    }

}
