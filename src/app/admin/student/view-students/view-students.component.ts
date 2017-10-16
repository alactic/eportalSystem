import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../../admin-service.service";
import * as firebase from "firebase";
declare var $;
@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
  getAllStudents=[];
  editadmin=[];
  showEdit;
  loader;
  userProfileImg;
  mypassport
  constructor(private adminservice:AdminServiceService) {
    this.table();
  }

  ngOnInit() {
    this.getAllStudent();
  }
 table(){
   setTimeout(function () {
     $(document).ready(function(){
       $('#myTable').DataTable();
     });
   }, 2000);
 }
  getAllStudent(){
    return this.adminservice.fetchStudents()
        .subscribe((response)=>{
           this.getAllStudents=response;
           this.loader=true;
        })
  }

  editStudent(email){
    return this.adminservice.getStudentbyEmail(email)
        .subscribe((response)=>{
           this.editadmin=response;
            this.mypassport = response['passport'];
           this.showEdit=true;
            this.getImage();
        })
  }

  onDelete(email) {
    if(confirm("DO YOU WANT PROCEED WHEN THE DELETION")){
      return this.adminservice.removeStudent(email)
          .subscribe(response=>{
            this.getAllStudent();
          });
    }

  }
  onClose(){
    this.showEdit=false;
    this.table();
  }

    getImage(){
        const getdp=firebase.storage().ref().child('images/'+this.mypassport);
        getdp.getDownloadURL().then(url => {
            this.userProfileImg = url;

        })
    }
}
