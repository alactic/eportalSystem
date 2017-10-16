import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../../admin/admin-service.service";
import {EportalServiceService} from "../../eportal-service.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-library',
  templateUrl: 'library.component.html',
  styleUrls: ['library.component.css', '../../../assets/frontpage/css/style.css']
})
export class LibraryComponent implements OnInit {
  getLibraryBook=[];getFile;category;
  getLibrary=[]; sample;category_id;category_status;
  getBook;
  constructor( private adminservice:AdminServiceService, private eportalservice:EportalServiceService) { }
  ngOnInit() {
    this.getLibraryCategory();
  }

  getLibraryCategory(){
    return this.adminservice.getCategory()
        .subscribe((response)=>{
          this.getLibrary=response;
          console.log("category", response);
        })
  }
  onGetBook(category){
    this.category=category;
    for(var i=0; i<this.getLibrary.length; i++){
      if(this.getLibrary[i]['category']==category){
        this.category_id=this.getLibrary[i]['id'];
        this.category_status=this.getLibrary[i]['status'];
        // this.category_id=category;
        //this.eportalservice.category_id=this.category_id;
        sessionStorage.setItem('category_id', this.category_id);
        sessionStorage.setItem('category_status', this.category_status);
      }
    }
    this.getLibraryBooks();
  }

  getLibraryBooks(){
    const category_id=sessionStorage.getItem('category_id');
    const category_status=sessionStorage.getItem('category_status');
    return this.eportalservice.getLibraryBook(category_id, category_status)
        .subscribe((response)=>{
          this.getLibraryBook=response;
          this.getBook=true;
        })
  }


  onDownload(fileName){
    console.log(fileName);
    const  storageRef = firebase.storage().ref().child('images/'+fileName);
    storageRef.getDownloadURL().then(url =>{
      this.getFile=url;
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

}
