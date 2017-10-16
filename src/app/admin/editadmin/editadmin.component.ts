import {Component, OnInit, ElementRef} from '@angular/core';
import {AdminServiceService} from "../admin-service.service";
import {EditStudent} from "../../student/edit-profile/edit-student_detail";
import {LoginserviceService} from "../../loginservice.service";
import {NgForm} from "@angular/forms";
import {StaffService} from "../../staff/staff.service";
import {Router} from "@angular/router";
import * as firebase from "firebase";
import {toBase64String} from "@angular/compiler/src/output/source_map";
@Component({
  selector: 'app-editportal',
  templateUrl: 'editadmin.component.html',
  styleUrls: ['editadmin.component.css']
})
export class EditportalComponent implements OnInit {
   editadmin:EditStudent;
    editform;editfname; editmidname;editsname;editGender;
    editEmail; editDob; editMob; editYob; editAddress;
    editState; editCountry;editQualification;editSchool;
    editAll;n;
    dob=new Array();
    yob=new Array;
    mypassport;
    userProfileImg;
    loadStaff;
    image_name;
    byteResult;
    totalbyte;
    byte;
    email;
    submitDisable;
    myProfilePix;
    mob=["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
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

    constructor(private adminservice:AdminServiceService, private staffservice:StaffService, private router:Router, private elem:ElementRef) { }
  ngOnInit() {
    this.getStaffDetail();
      this.setDay();
      this.setYear();
      this.email=localStorage.getItem('email');
  }
    edit(){
        this.editForm(true);
    }
    revert(){
        this.editForm(false);
    }

    editForm(myCheck:boolean){//check whether the editall butto is clicked
        this.editfname=myCheck;
        this.editmidname=myCheck;
        this.editsname=myCheck;
        this.editGender=myCheck;
        this.editEmail=myCheck;
        this.editDob=myCheck;
        this.editMob=myCheck;
        this.editYob=myCheck;
        this.editAddress=myCheck;
        this.editState=myCheck;
        this.editCountry=myCheck;
        this.editQualification=myCheck;
        this.editSchool=myCheck;
        this.editAll=myCheck;
    }
    getStaffDetail(){
        const $email=localStorage.getItem('email');
        return this.adminservice.getStaffDetails($email)
            .subscribe((response:EditStudent)=> {
                this.editadmin = response;
                this.mypassport = response['passport'];
                this.getImage();
            })
    }

    onUpdateImage(event){
        var myReader:FileReader = new FileReader();
        myReader.onloadend = (e) => {
            this.myProfilePix=myReader.result;
            let myfile=event[0];
            this.image_name=new Date()+myfile.name;
            const storageRef = firebase.storage().ref('/images').child(this.image_name);
            const loadToFirebase=storageRef.put(myfile);
            loadToFirebase.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot)=>{
                    this.totalbyte=snapshot.totalBytes;
                    this.byte=snapshot.bytesTransferred;
                    if(this.byteResult==100){
                        this.submitDisable=true;
                        this.onSetImage(this.email, this.image_name,"staff");
                        console.log(this.image_name)
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

    onSetImage(email, image_name,status){
        console.log(email, image_name, status)
        return this.staffservice.updateImage(email, image_name, status)
            .subscribe((response:Response)=>{
                console.log("response", response);
                setTimeout(()=>{this.byteResult=null},5000);
            });
    }

    /**onFirstname(){
        this.editfname=true;
    }**/

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
        if(JSON.stringify(form.value).length!=2){
            return this.staffservice.Update(form.value.firstname, form.value.middlename, form.value.surname, email, form.value.password,
                form.value.qualification,form.value.school_attended, form.value.dob
                ,form.value.mob,form.value.yob, form.value.address, form.value.state, form.value.country, form.value.gender )
                .subscribe((response:Response)=>{console.log(response);
                    this.getStaffDetail();
                    this.revert();
                    this.router.navigate(['admin/edit'])
            });

        }

    }

    reset(){
    }

    getImage(){
        const getdp=firebase.storage().ref().child('images/'+this.mypassport);
        getdp.getDownloadURL().then(url => {
            this.userProfileImg = url;

        })
    }
}
