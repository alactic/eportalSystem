import {Component, ViewChild, OnInit, OnChanges, Inject} from '@angular/core';
import {StudentPortalComponent} from './student/student-portal/student-portal.component';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';
import { AngularFire } from 'angularfire2';
import {Router, NavigationEnd} from "@angular/router";
import {utils} from "protractor";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
  userProfileImg;

  firebase:any;
  constructor(private _af: AngularFire, @Inject(FirebaseApp) firebase: any, private router:Router) {
    this.firebase = firebase;
   this.router.routeReuseStrategy.retrieve=function(){return false};
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.router.navigated=false;
        window.scroll(0,0);

      }
    })
  }



  ngOnInit(){
    /*const  storageRef = firebase.storage().ref().child('images/Kevs-php-mysql.pdf');
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
    }
    );*/
     }
  ngOnChanges(){
    console.log(this.getlogin);
    console.log('ononon');
  }
@ViewChild(StudentPortalComponent)
  studentportal:StudentPortalComponent;

  getlogin:boolean;
  getLogin(status:any){
    this.getlogin= status;
  }

  getProfileImageUrl() {
   // var userRef = new Firebase('gs://myfirebase-7eb89.appspot.com/images');
    //var storage =firebaseApp.storage();
    //var pathReference = storage.ref('images/Tulips.jpg');
   // console.log(pathReference);
  }


}
