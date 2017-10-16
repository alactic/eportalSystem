import {Component, OnInit, ElementRef} from '@angular/core';
import {StaffService} from "../staff.service";
import {StudentSectionServiceService} from "../../student/student-section/student-section-service.service";
import {AdminServiceService} from "../../admin/admin-service.service";
import {EditStudent} from "../../student/edit-profile/edit-student_detail";
import * as firebase from "firebase";
declare var $;
@Component({
  selector: 'app-assignment-submitted',
  templateUrl: './assignment-submitted.component.html',
  styleUrls: ['./assignment-submitted.component.css']
})
export class AssignmentSubmittedComponent implements OnInit {
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
  showDetail;
  getStaffDetails;
  staffImg;
  score;
  student_email;
  submission_id;


    constructor(private staffservice:StaffService, private studentservice: StudentSectionServiceService, private adminservice:AdminServiceService, private elem:ElementRef ) {
  }

  ngOnInit() {
    this.email=localStorage.getItem('email');
    this.view_all();
  }

  table(){
      setTimeout(function () {
          $(document).ready(function(){
              $('#myTable').DataTable();
          });
      }, 2000);
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
    return this.staffservice.view_student_solution(this.email)
        .subscribe((response)=>{
          console.log(response);
          this.view_all_assignment=response;
          if(response==""){
            this.errorMessage="YOU DO NOT GIVE ASSIGNMENT";
          }else{
            this.showlist=true;
              this.table();
          }
          //console.log(this.view_all_assignment);

        })
  }

    onView(id){
        this.submission_id=id;
        const status="staff";
        return this.studentservice.getAssignmentDetail(id, status)
            .subscribe(( response)=>{
                console.log(response['passport']);
                this.student_email=response['student_email'];
                console.log(response);
                this.showDetail=true;
                this.getStaffDetails=response;
                const getdp=firebase.storage().ref().child('images/'+response['passport']);
                getdp.getDownloadURL().then(url => {
                    this.staffImg = url;
                });

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

    onSubmit(){
      return this.staffservice.enterScore(this.submission_id, this.score)
          .subscribe((response)=>{
              this.view_all();
              this.table();
          })
    }

    onHide(id){
        return this.staffservice.hideScore(id)
            .subscribe((response)=>{
                this.view_all();
                this.table();
            })
    }

    onShow(){
        return this.staffservice.onShow()
            .subscribe((response)=>{
                this.view_all();
                this.table();
            })
    }
}
