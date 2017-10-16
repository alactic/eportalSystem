import { Component, OnInit } from '@angular/core';
import {EditStudent} from "../../student/edit-profile/edit-student_detail";
import {StudentSectionServiceService} from "../../student/student-section/student-section-service.service";
import {LoginserviceService} from "../../loginservice.service";
import * as firebase from 'firebase';
import {AdminServiceService} from "../admin-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent implements OnInit {
  userProfileImg;
  mypassport
  firebase:any;
  editstudent:EditStudent;
  constructor(private loginservice:LoginserviceService,
              private adminservice:AdminServiceService,
              private route:Router) {
  }

  ngOnInit() {
   this.getStudent();

  }
  getStudent(){
    const email=localStorage.getItem('email');
    return this.adminservice.getStaffDetails(email)
        .subscribe((response:EditStudent)=>{
          this.editstudent=response;
          this.mypassport=response['passport'];
          this.getImage();

        });
  }

  getImage(){
    const getdp=firebase.storage().ref().child('images/'+this.mypassport);
    getdp.getDownloadURL().then(url => {
      this.userProfileImg = url;
    })
  }

}
