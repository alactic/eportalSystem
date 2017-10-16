import {Component, OnInit, Inject, Output, OnChanges} from '@angular/core';
import {LoginserviceService} from "../../loginservice.service";

import {StudentSectionServiceService} from "./student-section-service.service";
import * as firebase from 'firebase';
import {EditStudent} from "../edit-profile/edit-student_detail";

@Component({
  selector: 'app-student-section',
  templateUrl: './student-section.component.html',
  styleUrls: ['./student-section.component.css']
})
export class StudentSectionComponent implements OnInit {
  userProfileImg;
  mypassport;
  firebase:any;
  editstudent:EditStudent;
  email;
  assignmentStatus;
    materialStatus;
    new;
  constructor(private loginservice:LoginserviceService,
              private studentservice:StudentSectionServiceService) {
        }

  ngOnInit() {
      this.email=localStorage.getItem('email');
     this.getStudent();
     if(sessionStorage.getItem('new')=='yes'){
         this.new=true;
     }
      //this.getAssignmentStatus();
      //this.getMaterialStatus();
  }

  getStudent(){
    const email=localStorage.getItem('email');
    return this.studentservice.getStudent(email)
        .subscribe((response:EditStudent)=>{
          this.editstudent=response;
          if(response){
              this.mypassport=response['passport'];
              this.getImage();
          }
        });
  }

  getImage(){
  const getdp=firebase.storage().ref().child('images/'+this.mypassport);
      getdp.getDownloadURL().then(url => {
          this.userProfileImg = url;
      })
  }


   getAssignmentStatus(){
      const email=localStorage.getItem('email');
       return this.studentservice.getAssignmentStatus(email)
           .subscribe((response)=>{
                this.assignmentStatus=response.length;
           })
   }

    getMaterialStatus(){
        const email=localStorage.getItem('email');
        return this.studentservice.getMaterialStatus(email)
            .subscribe((response)=>{
                this.materialStatus=response.length;
            })
    }


}
