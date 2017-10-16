import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../admin-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private adminservice:AdminServiceService) { }

  ngOnInit() {
  }

  getLatest(){
    const email=localStorage.getItem('email');
    //return this.adminservice.getLatest()
  }
}
