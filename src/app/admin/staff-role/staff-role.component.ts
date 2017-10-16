import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-staff-role',
  templateUrl: './staff-role.component.html',
  styleUrls: ['./staff-role.component.css']
})
export class StaffRoleComponent implements OnInit {
  role;
  flag;
  status;
  remove_staffrole;


  constructor() { }

  ngOnInit() {
  }

  view_role(){
    this.status=true;
    this.role=true;
  }

  assign_role(){
    this.status=true;
    this.role=true;
  }

  remove_role(){
    this.status=true;
    this.remove_staffrole=true;
  }
  onflag(){
    this.flag=true;
  }

}
