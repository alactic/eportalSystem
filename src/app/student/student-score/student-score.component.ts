import { Component, OnInit } from '@angular/core';
import {StudentSectionServiceService} from "../student-section/student-section-service.service";
import {EditStudent} from "../edit-profile/edit-student_detail";
import {Router} from "@angular/router";
declare var $;
@Component({
  selector: 'app-student-score',
  templateUrl: './student-score.component.html',
  styleUrls: ['./student-score.component.css']
})
export class StudentScoreComponent implements OnInit {
  view_all_assignment:EditStudent;
  errorMessage;
  email;
  showlist;
  emptyScore;
  constructor(private studentservice: StudentSectionServiceService, private router:Router) { }

  ngOnInit() {
    this.email=localStorage.getItem('email');
    if(sessionStorage.getItem('new')=="yes"){
      this.router.navigate(['student']);
    }else {
      this.view_all();
    }
  }

  table(){
    setTimeout(function () {
      $(document).ready(function(){
        $('#myTable').DataTable();
      });
    }, 2000);
  }
  view_all(){
    this.errorMessage=false;
    return this.studentservice.view_student_score(this.email)
        .subscribe((response)=>{
          this.view_all_assignment=response;
          if(response==""){
            this.emptyScore="NO SCORE HAVE BEEN RECORD YET";
          }else{
            this.showlist=true;
            this.table();
          }
          //console.log(this.view_all_assignment);

        })
  }

}
