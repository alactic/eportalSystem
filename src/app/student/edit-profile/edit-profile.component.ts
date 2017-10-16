import {Component, OnInit, ElementRef, ViewChild, Output, EventEmitter} from '@angular/core';
import * as firebase from 'firebase';

//import {StudentService} from "../student-section/studentService.service";
import {Response} from "@angular/http";
import {LoginserviceService} from '../../loginservice.service';
import {EditStudent} from "./edit-student_detail";
import {Router, NavigationEnd} from "@angular/router";
import {StudentSectionServiceService} from "../student-section/student-section-service.service";
import {NgForm} from "@angular/forms";
import {StaffService} from "../../staff/staff.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],

})
export class EditProfileComponent implements OnInit {
  editform=false;
  dob=[];
  name="elvis";
  yob=[];
  n;
  success;
  newStudentform;
  mypassport;
  userProfileImg;
  editfname; editmidname;editsname;editGender;
  editEmail; editDob; editMob; editYob; editAddress;
  editState; editCountry;editQualification;editSchool;
  editAll;
  newStudent;
  mob=["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  editstudent:EditStudent;
  myProfilePix;
  loadStudent;
  myPicture;
  totalbyte;
  byte;
  byteResult;
  submitDisable;
  image_name;
  email;
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

  constructor(private studentservice:StudentSectionServiceService, private router:Router,
              private loginservice:LoginserviceService, private staffservice:StaffService,) { }

  ngOnInit() {
    this.setDay();
    this.setYear();
    this.getStudent();
     this.email=localStorage.getItem('email');
  }

  //get the details of the student using their email
  getStudent(){
    const email=localStorage.getItem('email');
    return this.studentservice.getStudent(email)
        .subscribe((response:EditStudent)=>{
                              this.editstudent=response;
                              this.newStudentform=true;
                            if(response!=null){
                              sessionStorage.setItem('new','no');
                              this.mypassport= response['passport'];
                              this.getImage();
                            }else{
                              sessionStorage.setItem('new','yes');
                            }
                            this.loadStudent=true;
                           //console.log(this.editstudent);
                      });
  }

  onUpdateImage(event, action){
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.myProfilePix=myReader.result;
      let myfile=event[0];
      this.image_name=new Date()+myfile.name;
      const storageRef = firebase.storage().ref('/images').child(this.image_name);
      const loadToFirebase=storageRef.put(myfile);
      loadToFirebase.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot)=>{
            this.byteResult=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            this.totalbyte=snapshot.totalBytes;
            this.byte=snapshot.bytesTransferred;
            if(this.byteResult==100){
              this.submitDisable=true;
              if(action=="update"){
                this.onSetImage(this.email, this.image_name,"student");
              }
            }
            console.log('totalbtye',this.totalbyte);
            console.log('result', this.byteResult);
          },
          (error)=>{
            console.log(error)
          }
      )
    }
    //this.myPicture=event[0];
    myReader.readAsDataURL(event[0]);
  }

  onUploadImage(event, create){
    this.onUpdateImage(event, create)
    }
  onSetImage(email, image_name,status){
    console.log(email, image_name, status)
    return this.staffservice.updateImage(email, image_name, status)
        .subscribe((response:Response)=>{
          console.log("response", response);
          setTimeout(()=>{this.byteResult=null},5000);
        });
  }

  // onSetImage(event){
  //   var myReader:FileReader = new FileReader();
  //   myReader.onloadend = (e) => {
  //     this.myProfilePix=myReader.result;
  //     let myfile=event[0];
  //     this.image_name=new Date()+myfile.name;
  //     console.log("ima1", this.image_name)
  //     const storageRef = firebase.storage().ref('/images').child(this.image_name);
  //     const loadToFirebase=storageRef.put(myfile);
  //     console.log(myfile);
  //     loadToFirebase.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //         (snapshot)=>{
  //           this.byteResult=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
  //           this.totalbyte=snapshot.totalBytes;
  //           this.byte=snapshot.bytesTransferred;
  //           if(this.byteResult==100){
  //             this.submitDisable=true;
  //               this.onUpdateImage(event);
  //           }
  //           console.log('totalbtye',this.totalbyte);
  //           console.log('result', this.byteResult);
  //         },
  //         (error)=>{
  //           console.log(error)
  //         }
  //     )
  //   }
  //   //this.myPicture=event[0];
  //   myReader.readAsDataURL(event[0]);
  // }
  // onUploadImage(event, create){
  //   this.onSetImage(event);
  // }
  //
  // onUpdateImage(event){
  //   let myfile=event[0];
  //   this.image_name=new Date()+myfile.name;
  //   return this.staffservice.updateImage(this.email, this.image_name, "student")
  //       .subscribe((response:Response)=>{
  //         console.log("response", response);
  //         setTimeout(()=>{this.byteResult=null},5000);
  //       });
  // }

  //for signing up new student
  onSubmit(form:NgForm){
    //  const mypassport=this.elem.nativeElement.querySelector('#passport');
    //  let myfile=mypassport.files[0];
    // const image_name=new Date()+myfile.name;
    // const storageRef = firebase.storage().ref('/images').child(image_name);
    // const loadToFirebase=storageRef.put(myfile);
    // loadToFirebase.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //     (snapshot)=>{
    //       //console.log('btye',snapshot.bytesTransferred);
    //       this.byteResult=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    //       this.totalbtye=snapshot.totalBytes;
    //       this.btye=snapshot.bytesTransferred;
    //       console.log('totalbtye',this.totalbtye);
    //       console.log('result', this.byteResult);
    //      },
    //     (error)=>{
    //           console.log(error)
    //     }
    // )
    const email=localStorage.getItem('email');
    return this.loginservice.Signup_newStudent(form.value.firstname, form.value.middlename, form.value.surname, email, form.value.dob
        ,form.value.mob,form.value.yob, this.image_name, form.value.address, form.value.state, form.value.country, form.value.gender )
        .subscribe((response:Response)=>{
                              this.success="YOUR PROFILE HAVE BEEN SUCCESSFULLY UPDATED";
                              //setTimeout(this.router.navigate(['student']), 2000);
                              //this.router.navigate(['student'])  ;
                              setTimeout(()=>{this.success=null; this.byteResult=null}, 2000);
                              form.reset();
                              sessionStorage.setItem('new','no');
                              this.getStudent();

        });
  }

  edit(){
      this.editform=true;
  }

  update(){
    this.editform=false;
  }

  logout(){
    localStorage.setItem('email', '');
    localStorage.setItem('token', '');
    this.router.navigate(['/portal']);
  }

//for form validation
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
//for editing and update the profile details
  edit_all(){//triggered to show for editing
    this.editCheck(true);
  }

  doneEdit(){//triggered to show end of editing
    this.editCheck(false);
  }


  editCheck(check:boolean){
      this.editfname=check;
      this.editmidname=check;
      this.editsname=check;
      this.editGender=check;
      this.editEmail=check;
      this.editDob=check;
      this.editMob=check;
      this.editYob=check;
      this.editAddress=check;
      this.editState=check;
      this.editCountry=check;
      this.editQualification=check;
      this.editSchool=check;
      this.editAll=check;
  }
  onFirstname(){
    this.editfname=true;
  }

  onMiddlename(){
    this.editmidname=true;
  }
  onSurname(){
    this.editsname=true;
  }
  onGender(){
    this.editGender=true;
  }

  onDob(){
    this.editDob=true;
  }
  onMob(){
    this.editMob=true;
  }
  onYob(){
    this.editYob=true;
  }
  onQualification(){
    this.editQualification=true;
  }
  onSchool(){
    this.editSchool=true;
  }
  onAddress(){
    this.editAddress=true;
  }
  onState(){
    this.editState=true;
  }
  onCountry(){
    this.editCountry=true;
  }
  onUpdate(form:NgForm){
    const email=localStorage.getItem('email');
    if(JSON.stringify(form.value).length!=2) {
      return this.studentservice.Update(form.value.firstname, form.value.middlename, form.value.surname, email,
          form.value.dob, form.value.mob, form.value.yob, form.value.address, form.value.state, form.value.country, form.value.gender)
          .subscribe((response: Response) => {
            this.success = "ACCOUNT CREATION IS SUCCESSFUL";
            this.getStudent();
            this.doneEdit();
            setTimeout(() => {
              this.success = null
            }, 2000);
            this.router.navigate(['student']);
          });
    }
  }

  getImage(){
    const getdp=firebase.storage().ref().child('images/'+this.mypassport);
    getdp.getDownloadURL().then(url => {
      this.userProfileImg = url;
    })
  }
// end of editing and update the profile details
}
