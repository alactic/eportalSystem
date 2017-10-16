import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef, Output, EventEmitter} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {StaffService} from "../staff.service";
import * as firebase from 'firebase';
import {SharedHttpServiceService} from "../../shared/service/shared-http-service.service";

@Component({
  selector: 'app-staff-portal',
  templateUrl: './staff-portal.component.html',
  styleUrls: ['./staff-portal.component.css', '../../../assets/frontpage/css/style.css']
})
export class StaffPortalComponent implements OnInit, AfterViewChecked {
  staffEmail;
  showRegister=false;
  showRegisterOption(){
    this.showRegister=true;
  }
  mob=["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  dob=[];
  yob=[];
  n:number;
  error=false;
  errorMessage='';
  status_error=false;
  studentEmail;

  constructor(private staffservice:StaffService, private router:Router, private elem:ElementRef, private sharedservice:SharedHttpServiceService) { }
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

  //set YEAR
  setYear(){
    this.n = 1960;
    for (let i = 0; i <= 80; i++) {
      this.n = this.n + 1;
      this.yob[i] = this.n;
    }
  }


  onSubmit(form:NgForm){
    //const myfile=this.elem.nativeElement.querySelector('#passport').files;
    //let formdata:FormData=new FormData();
    //const myPassport=myfile[0];
    //formdata.append('mypix', myPassport, myPassport.name);
    const mypassport=this.elem.nativeElement.querySelector('#passport').files;
    const formdata="image";
    let myfile=mypassport[0];
    let mydate=new Date();
    const image_name=mydate+myfile.name;
    const storageRef = firebase.storage().ref('/images').child(image_name);
    storageRef.put(myfile);
    return this.staffservice.Signup(form.value.firstname, form.value.middlename, form.value.surname, form.value.email, form.value.password,
        form.value.qualification,form.value.school_attended, form.value.dob
        ,form.value.mob,form.value.yob, image_name, form.value.address, form.value.state, form.value.country, form.value.gender )
        .subscribe((response:Response)=>{console.log(response);
                                        this.showRegister=false;
                                         this.router.navigate(['staff_portal'])});
  }


  onLogin(form:NgForm){
    const email=form.value.email;
    const password=form.value.password;
    return this.staffservice.login(email, password)
        .subscribe((response)=>{
              console.log("login status", this.sharedservice.loginStatus);
              if(this.sharedservice.loginStatus=="STUDENT"||this.sharedservice.loginStatus=="TRANSFERRED STUDENT"){
                this.router.navigate(['student']);
              }
              if(this.sharedservice.loginStatus=="STAFF"||this.sharedservice.loginStatus=="CONTRACT STAFF"){
                console.log("login status", "staff");
                this.router.navigate(['/staff']);
              }
            },
            (err) => {
              this.status_error=true;
              this.errorMessage="THE EMAIL OR PASSWORD IS INCORRECT";
              console.log('Something went wrong!');});
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


}

