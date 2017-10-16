import { Component, OnInit } from '@angular/core';
import {EditStudent} from "../edit-profile/edit-student_detail";
import {LoginserviceService} from "../../loginservice.service";
import {StudentSectionServiceService} from "../student-section/student-section-service.service";
import * as firebase from "firebase";
import {Router} from "@angular/router";
declare var $;
@Component({
  selector: 'app-lecture-note',
  templateUrl: './lecture-note.component.html',
  styleUrls: ['./lecture-note.component.css']
})
export class LectureNoteComponent implements OnInit {
  userProfileImg;
  mypassport;
  firebase:any;
  editstudent:EditStudent;
  email;
  assignmentStatus;
  materialStatus;
  getAssignments:EditStudent;
  getMaterials:EditStudent;
  getStaffDetails=[];
  staffImg;
  showDetail;
  constructor(private studentservice:StudentSectionServiceService, private router:Router) {
  }

  ngOnInit() {
      if(sessionStorage.getItem('new')=="yes"){
          this.router.navigate(['student']);
      }else
          {
            this.email=localStorage.getItem('email');
            this.getStudent();
            this.getAssignment();
            this.getMaterial();
      }
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


  getAssignment(){
    const email=localStorage.getItem('email');
    return this.studentservice.getAssignment(email)
        .subscribe((response)=>{
          this.assignmentStatus=response.length;
          this.getAssignments=response;
        })
  }

  getMaterial(){
    const email=localStorage.getItem('email');
    return this.studentservice.getMaterial(email)
        .subscribe((response)=>{
          this.materialStatus=response.length;
          this.getMaterials=response;
          console.log(response);
        })
  }

    onDownload(event){
        const  storageRef = firebase.storage().ref().child('images/'+event);
        storageRef.getDownloadURL().then(url =>{
            this.userProfileImg=url;
            console.log(url);
            let downloadUrl = url;

            var save = document.createElement('a');
            save.href = downloadUrl;
            save.target = '_blank';
            save.download = downloadUrl;
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
                false, false, false, false, 0, null);
            save.dispatchEvent(evt);
            (window.URL).revokeObjectURL(save.href);
    });
   }

    onView(event, id){
        console.log(event);
        return this.studentservice.getLectureDetail(id)
            .subscribe(( response)=>{
               console.log(response['passport']);
                console.log(response);
                const getdp=firebase.storage().ref().child('images/'+response['passport']);
                getdp.getDownloadURL().then(url => {
                    this.staffImg = url;
                    this.showDetail=true;
                });
                this.getStaffDetails=response;
            })
}
}
