import {Component, OnInit, ElementRef} from '@angular/core';
import {StaffService} from "../../staff/staff.service";
import {StudentSectionServiceService} from "../student-section/student-section-service.service";
import {AdminServiceService} from "../../admin/admin-service.service";
import {EditStudent} from "../edit-profile/edit-student_detail";
import * as firebase from 'firebase';
declare var $;

@Component({
  selector: 'app-view-uploads',
  templateUrl: './view-uploads.component.html',
  styleUrls: ['./view-uploads.component.css']
})
export class ViewUploadsComponent implements OnInit {
  editstudent: EditStudent;
  editfaculty: EditStudent;
  getDepartments: EditStudent;
  showCourse;
  department
  showDept;
  faculty;
  semester;
  showFaculty=false;
  email;
  view_all_assignment:EditStudent;
  viewAssignment:EditStudent;
  showlist;
  errorMessage;
  successMessage;
  userProfileImg;
  viewUpload;

  constructor(private staffservice:StaffService, private studentservice: StudentSectionServiceService, private adminservice:AdminServiceService, private elem:ElementRef ) {
    setTimeout(function () {
      $(document).ready(function(){
        $('#myTable').DataTable();
      });
    }, 2000);
  }

  ngOnInit() {
    this.studentservice.firstTimeLogin();
    this.email=localStorage.getItem('email');
    this.view_all();

  }

  //fetching all faculty
  getFacultyDetail(){
    return this.adminservice.getFaculty()
        .subscribe((response)=>{
          this.editfaculty=response
        });
  }

  onGetFaculty(){
    return this.adminservice.fetchDepartment(this.faculty)//fetching dept based on its faculty
        .subscribe((response)=>{
          this.getDepartments=response;
          this.showDept=true;
        })
  }



  view_all(){
    this.successMessage=false;
    this.errorMessage=false;
    return this.studentservice.view_submitted_assignment(this.email)
        .subscribe((response)=>{
          this.view_all_assignment=response;
          if(response==""){
            this.viewUpload="YOU DONT HAVE ANY UPLOAD";
          }else{
            this.showlist=true;
          }
          //console.log(this.view_all_assignment);

        })
  }

  onView(id){
    this.staffservice.onViewAssignment(id)
        .subscribe((response)=>{
          this.viewAssignment=response;
          console.log(response);
        })
  }

  onDelete(id){
    if(confirm('DO YOU WANT TO CONTINUE WITH THE DELETION')){
      this.staffservice.onDeleteAssignment(id)
          .subscribe((response)=>{
            this.successMessage=response;
            this.view_all();
          })
    }
  }

  onDownload(event){
    console.log(event);
    const  storageRef = firebase.storage().ref().child('images/'+event);
    storageRef.getDownloadURL().then(url =>{
      //this.userProfileImg=url;
      //console.log(url);
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
}
