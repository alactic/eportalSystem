import {Component, OnInit, ViewChild, AfterViewChecked, Output, EventEmitter, ElementRef, Inject} from '@angular/core';
import {LoginserviceService} from '../../loginservice.service';
import {Response} from "@angular/http";
import {NgForm} from "@angular/forms";
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { AngularFire } from 'angularfire2';
import {SharedHttpServiceService} from "../../shared/service/shared-http-service.service";
declare var $;

@Component({
  selector: 'app-student-portal',
  templateUrl: './student-portal.component.html',
  styleUrls: ['./student-portal.component.css', '../../../assets/frontpage/css/style.css'],
})
export class StudentPortalComponent implements  OnInit, AfterViewChecked {

  mob=["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  dob=[];
  yob=[];
  n:number;
  showlogin=true;
  error=false;
  errorMessage='';
  status_error=false;
  studentEmail;
    firebase:any;
    forgotPassword;
    forgotEmail;
  constructor(private loginservice:LoginserviceService, private router:Router, private elem:ElementRef, private sharedservice:SharedHttpServiceService) {
    this.firebase = firebase;
      $(document).ready(function(){
          $('#myTable').DataTable();
      });
  }
  @Output() ongetLogin=new EventEmitter<boolean>();

  ngOnInit() {
      this.setDay();
    this.setYear();

  }
  //set day
  setDay() {
    this.n = 0;
    for (let i = 0; i <= 30; i++) {
      this.n = this.n + 1;
      this.dob[i] = this.n;
    }
  }

    //set month
    setYear(){
      this.n = 1960;
      for (let i = 0; i <= 80; i++) {
        this.n = this.n + 1;
        this.yob[i] = this.n;
      }
    }

    //To show sign options
  showsignup(){
      this.showlogin=false;
  }
    fileChange(e:any, input:any):void{
       // const myfile=this.elem.nativeElement.querySelector('#mypassport').files;
        //let formdata:FormData=new FormData();
       // const myPassport=myfile[0];
        console.log(input.files[0]);
        let myfile=input.files[0];
        const storageRef = firebase.storage().ref('/images').child('elvispix');
         storageRef.put(myfile);
    }

  onSubmit(form:NgForm){
     const mypassport=this.elem.nativeElement.querySelector('#passport').files;
     //let formdata:FormData=new FormData();
     //const myPassport=myfile[0];
      //const myfile=this.elem.nativeElement.querySelector('#mypassport').files;
      //let formdata:FormData=new FormData();
      //const myPassport=myfile[0];
      //console.log(myPassport);
      //const storageRef = firebase.storage().ref().child(myPassport.name);
      //storageRef.put(myPassport);

      //formdata.append('mypix', myPassport, myPassport.name);
      const formdata="image";
      let myfile=mypassport[0];
      let mydate=new Date();
      const image_name=mydate+myfile.name;
      const storageRef = firebase.storage().ref('/images').child(image_name);
      storageRef.put(myfile);

     return this.loginservice.Signup(form.value.firstname, form.value.middlename, form.value.surname, form.value.email, form.value.password, form.value.dob
         ,form.value.mob,form.value.yob, image_name, form.value.address, form.value.state, form.value.country, form.value.gender )
         .subscribe((response:Response)=>console.log(response));
  }


  onLogin(form:NgForm){
      return this.loginservice.login(form.value.email, form.value.password)
          .subscribe((response)=>{
                if(response.token){
                    this.studentEmail=form.value.email;
                    this.loginservice.onlogin=true;
                    console.log("login status", this.sharedservice.loginStatus);
                    if(this.sharedservice.loginStatus=="STUDENT"||this.sharedservice.loginStatus=="TRANSFERRED STUDENT"){
                        localStorage.setItem('status', 'student');
                        this.router.navigate(['student']);
                    }
                    if(this.sharedservice.loginStatus=="STAFF"||this.sharedservice.loginStatus=="CONTRACT STAFF"){
                        localStorage.setItem('status', 'staff');
                        this.router.navigate(['/staff']);
                    }
                }
              },
              (err) => {
                this.status_error=true;
                this.errorMessage="THE EMAIL OR PASSWORD IS INCORRECT";
                //console.log('Something went wrong!');
                  }
                )
  }


  detailForm:NgForm;
  @ViewChild('detailForm') currentForm:NgForm;

   ngAfterViewChecked(){
      this.checkForm();
   }

    checkForm(){
       if(this.detailForm===this.currentForm){return;}
       this.detailForm=this.currentForm;
       if(this.detailForm){
         this.detailForm.valueChanges.subscribe(data=>this.getValidation(data));
       }
    }

    getValidation(data?:any){
       if(!this.detailForm){return;}
       const form=this.detailForm.form;
       if(this.detailForm){
         for(const field in this.formError) {
           this.formError[field]='';
           const getValue = form.get(field);
           if(getValue && getValue.dirty && !getValue.valid){

                const messageVal=this.MessageValidation[field];
                for(const error in messageVal){
                  //console.log(messageVal[error]);
                  this.formError[field]+=messageVal[error];
                }
           }
         }
       }
    }

    formError={
      'firstname':'',
      'middlename':'',
      'surname':'',
      'password':'',
      'email':'',
      'address':'',
      'state':'',
      'country':'',
      'gender':'',
      'dob':'',
      'mob':'',
      'yob':'',
    }

    MessageValidation={
      'firstname':{
        'required':'YOUR FIRSTNAME IS REQUIRED'
      },
      'middlename':{
        'required':'YOUR MIDDLENAME IS REQUIRED'
      },
      'surname':{
        'required':'YOUR SURNAME IS REQUIRED'
      },
      'email':{
        'required':'YOUR EMAIL IS REQUIRED'
      },
      'password':{
        'required':'YOUR PASSWORD IS REQUIRED'
      },
      'address':{
        'required':'YOUR ADDRESS IS REQUIRED'
      },
      'state':{
        'required':'YOUR STATE IS REQUIRED'
      },
      'country':{
        'required':'YOUR COUNTRY IS REQUIRED'
      },
      'gender':{
        'required':'YOUR GENDER IS REQUIRED'
      },
      'dob':{
        'required':'YOUR BIRTH DAY IS REQUIRED'
      },
      'mob':{
        'required':'YOUR BIRTH MONTH IS REQUIRED'
      },
      'yob':{
        'required':'YOUR BIRTH YEAR IS REQUIRED'
      }
    }

    onSubmitEmail(){
        console.log(this.forgotEmail);
        return this.loginservice.forgotPassword(this.forgotEmail)
            .subscribe((response)=>{
                   console.log(response)
            })
    }

   }