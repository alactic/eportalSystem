import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {EditStudent} from "../../student/edit-profile/edit-student_detail";
import {StudentSectionServiceService} from "../../student/student-section/student-section-service.service";
import {Router} from "@angular/router";
import {LoginserviceService} from "../../loginservice.service";
import {StaffService} from "../staff.service";
import * as firebase from 'firebase';
import {EportalServiceService} from "../../eportal-service.service";

@Component({
  selector: 'app-edit-staff-profile',
  templateUrl: './edit-staff-profile.component.html',
  styleUrls: ['./edit-staff-profile.component.css']
})
export class EditStaffProfileComponent implements OnInit {
  editform=false;
  dob=[];
  name="elvis";
  yob=[];
  n;
  success;
  mypassport;
  userProfileImg;
  newStudentform;
  editfname; editmidname;editsname;editGender;
  editEmail; editDob; editMob; editYob; editAddress;
  editState; editCountry;editQualification;editSchool;
  editAll;
  myProfilePix;
  mob=["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  editstudent:EditStudent[];
  loadStaff;
  image_name;
  byteResult;
  totalbyte;
  byte;
  email;
  submitDisable
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

  constructor(private router:Router, private staffservice:StaffService, private EportalServiceService:EportalServiceService) { }

  ngOnInit() {
    this.setDay();
    this.setYear();
    this.getStaff();
    this.email=localStorage.getItem('email');
  }

  //get the details of the student using their email
  getStaff(){
    const email=localStorage.getItem('email');
    return this.staffservice.getStaff(email)
        .subscribe((response:EditStudent[])=>{
          this.editstudent=response;
          this.newStudentform=true;
          if(response!=null){
            this.mypassport = response['passport'];
            this.getImage();
          }
          this.loadStaff=true;
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
                this.onSetImage(this.email, this.image_name,"staff");
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
  //for signing up new student
  onSubmit(form:NgForm){
    const email=localStorage.getItem('email');
    return this.staffservice.Signup_newStaff(form.value.firstname, form.value.middlename, form.value.surname, email, form.value.dob
        ,form.value.mob,form.value.yob,form.value.qualification,form.value.school_attended, this.image_name, form.value.address, form.value.state, form.value.country, form.value.gender )
        .subscribe((response:Response)=>{
          this.getStaff();
          this.success="YOUR PROFILE HAVE BEEN SUCCESSFULLY UPDATED";
          setTimeout(()=>{this.success=null; this.byteResult=null},3000);
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

  //for updating any possible edit
  onUpdate(form:NgForm){
    const email=localStorage.getItem('email');
    return this.staffservice.Update(form.value.firstname, form.value.middlename, form.value.surname, email, form.value.password,
        form.value.qualification,form.value.school_attended, form.value.dob
        ,form.value.mob,form.value.yob, form.value.address, form.value.state, form.value.country, form.value.gender )
        .subscribe((response:Response)=>{
              this.success=response
              this.getStaff();
              setTimeout(()=>{
                this.success=null;
              }, 3000)
            this.doneEdit();
          });
  }
  getImage(){
    const getdp=firebase.storage().ref().child('images/'+this.mypassport);
    getdp.getDownloadURL().then(url => {
      this.userProfileImg = url;
    })
  }
// end of editing and update the profile details
}

