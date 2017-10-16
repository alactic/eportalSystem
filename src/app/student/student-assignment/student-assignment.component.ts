import {Component, OnInit, ElementRef} from '@angular/core';
import {EditStudent} from "../edit-profile/edit-student_detail";
import {StudentSectionServiceService} from "../student-section/student-section-service.service";
import {AdminServiceService} from "../../admin/admin-service.service";
import * as firebase from 'firebase';
import {Router} from "@angular/router";
declare  var $;
@Component({
  selector: 'app-student-assignment',
  templateUrl: './student-assignment.component.html',
  styleUrls: ['./student-assignment.component.css']
})
export class StudentAssignmentComponent implements OnInit {
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
  userProfileImg;
  showlist;
  errorMessage;
  successMessage;
  staffImg;
  showDetail;
  getStaffDetails;
  emptyAssignment

  constructor(private studentservice: StudentSectionServiceService, private adminservice:AdminServiceService, private router:Router ) {
    setTimeout(function () {
      $(document).ready(function(){
        $('#myTable').DataTable();
      });
    }, 2000);
  }

  ngOnInit() {
      if(sessionStorage.getItem('new')=="yes"){
          this.router.navigate(['student']);
      }else {
          this.email = localStorage.getItem('email');
          this.view_all();
      }
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
    return this.studentservice.getAssignment(this.email)
        .subscribe((response)=>{
          this.view_all_assignment=response;
          if(response==""){
            this.emptyAssignment="THERE IS NO ASSIGNMENT";
          }else{
            this.showlist=true;
          }
          //console.log(this.view_all_assignment);

        })
  }

  onView(id){
              const status="student";
              return this.studentservice.getAssignmentDetail(id, status)
              .subscribe(( response)=>{
                  console.log(response['passport']);
                  console.log(response);
                  this.showDetail=true;
                  this.getStaffDetails=response;
                  const getdp=firebase.storage().ref().child('images/'+response['passport']);
                  getdp.getDownloadURL().then(url => {
                      this.staffImg = url;
                  });

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
  /**onDelete(id){
    if(confirm('DO YOU WANT TO CONTINUE WITH THE DELETION')){
      this.studentservice.onDeleteAssignment(id)
          .subscribe((response)=>{
            this.successMessage=response;
            this.view_all();
          })
    }
  }**/
}
