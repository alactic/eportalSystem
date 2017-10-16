import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {SharedHttpServiceService} from "./shared/service/shared-http-service.service";

@Injectable()
export class LoginserviceService {
   myemail;
   onlogin=false;
  constructor(private http:Http, private SharedHttpService:SharedHttpServiceService) { }

  //login option for student
   login(email, password){
         this.myemail=email;
         this.getStudentEmail();
         const data={email:email, password:password};
         return this.SharedHttpService.loginService('login', data)
   }


   //login section for the admin
    adminlogin(email, password){
            this.myemail=email;
            const data={email:email, password:password};
            this.getAdminEmail();
            return this.SharedHttpService.loginService('admin_login', data)
        }

//dummy signup option
   Signup(firstname, middlename,surname,email,password,dob,mob,yob,formdata,address,state,country,gender ){
        const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        const data={firstname:firstname, middlename:middlename, surname:surname, email:email,
                    password:password, dob:dob, mob:mob, yob:yob, passport:formdata,
                    address:address, state:state, country:country,gender:gender};
        return this.SharedHttpService.postService('signup', data);
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/signup', data, {headers:headers})
        //     .map((response:Response)=>response.json());
   }


   //signing up for new student
   Signup_newStudent(firstname, middlename,surname,email,dob,mob,yob,formdata,address,state,country,gender ){
       const data={firstname:firstname, middlename:middlename, surname:surname,
                    email:email,  dob:dob, mob:mob, yob:yob, passport:formdata,
                    address:address, state:state, country:country,gender:gender}
       return this.SharedHttpService.postService('Signup_newStudent', data);
       // return this.http.post('http://localhost/myProject/eportaldb/public/api/', data, {headers:headers})
       //     .map((response:Response)=>response.json());
   }

   //store the student credential in the localstorage
    getStudentEmail(){
        localStorage.setItem('email', this.myemail);
        localStorage.setItem('status', "student");
        console.log(localStorage.getItem('email'));
    }

    getAdminEmail(){
        localStorage.setItem('email', this.myemail);
        localStorage.setItem('status', "admin");
        console.log(localStorage.getItem('email'));
    }

    forgotPassword(email){
        return this.SharedHttpService.postService('forgotpassword', {email:email});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/forgotpassword', , {headers:headers})
        //      .map((response:Response)=>response.json().message);
     }
}
