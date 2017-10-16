import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-approve-book',
  templateUrl: './approve-book.component.html',
  styleUrls: ['./approve-book.component.css']
})
export class ApproveBookComponent implements OnInit {
  homepage;
  statusflag;
  status;
  post_field;
  label;

  constructor() { }

  ngOnInit() {
  }

  onProceed(form:NgForm){
    this.status=form.value.status;
    this.statusflag=true;
    if(this.status=="home"){
      this.homepage=true;
    }else{
      this.homepage=false;
      this.post_field=true;
      if(this.status=="about"){
        this.label="ABOUT PAGE";
      }
      if(this.status=="academics"){
        this.label="ACADEMICS PAGE";
      }
      if(this.status=="administration"){
        this.label="ADMINISTRATION PAGE";
      }
      if(this.status=="news"){
        this.label="NEWS PAGE";
      }
    }
  }

  onHomepage(form:NgForm){
    this.status=form.value.status;
    this.homepage=false;
    this.post_field=true;
    if(this.status=="general"){
      this.label="GENERAL INFORMATION PAGE";
    }
    if(this.status=="staff"){
      this.label="STAFF PAGE";
    }
    if(this.status=="students"){
      this.label="STUDENTS PAGE";
    }
    if(this.status=="latest"){
      this.label="LATEST PAGE";
    }
    if(this.status=="head_message"){
      this.label="MESSAGE FROM HEAD";
    }
    if(this.status=="events"){
      this.label="EVENTS PAGE";
    }
    if(this.status=="admission"){
      this.label="ADMISSION PAGE";
    }
    if(this.status=="facilities"){
      this.label="FACILITIES PAGE";
    }
    if(this.status=="timetable"){
      this.label="TIMETABLE PAGE";
    }
    if(this.status=="sports"){
      this.label="SPORTS PAGE";
    }
  }

}
