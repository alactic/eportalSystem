import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../../admin-service.service";
import * as firebase from "firebase";
declare var $;
@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css']
})
export class ViewStaffComponent implements OnInit {
  getStaff=[];
  editadmin=[];
  showEdit;
  loader;
  mypassport;
  userProfileImg;
  constructor(private adminservice:AdminServiceService) {
    this.table();
  }

  ngOnInit() {
    this.getAllStaff();
  }
  table(){
    setTimeout(function () {
      $(document).ready(function(){
        $('#myTable').DataTable();
      });
    }, 2000);
  }

  getAllStaff(){
    return this.adminservice.fetchStaff()
        .subscribe((response)=>{
          console.log(response);
          this.getStaff=response;
          this.loader=true;
        })
  }

  getStaffbyEmail(email){
    return this.adminservice.getStaffbyEmail(email)
        .subscribe((response)=>{
          this.editadmin=response;
            this.mypassport = response['passport'];
          this.showEdit=true;
          this.getImage();
        })
  }

  onDelete(email) {
    if(confirm("DO YOU WANT PROCEED WHEN THE DELETION")){
      return this.adminservice.removeStaff(email)
          .subscribe(response=>{
            this.getAllStaff();
          });
    }

  }
    getImage(){
        const getdp=firebase.storage().ref().child('images/'+this.mypassport);
        getdp.getDownloadURL().then(url => {
            this.userProfileImg = url;

        })
    }
  onClose(){
    this.showEdit=false;
    this.table();
  }
}
