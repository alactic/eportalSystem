import { Component, OnInit } from '@angular/core';
import {EportalServiceService} from "../eportal-service.service";
import {Router} from "@angular/router";
import * as firebase from "firebase";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css', '../../assets/frontpage/css/style.css']
})
export class HomepageComponent implements OnInit {
  getEvents=[];getAdmissions=[];getSports=[];get=[];getFacilties=[];gettimetable=[];
  getlatests=[];
    getGeneral=[];getStaffs=[]; getStudent=[];
    getPost=[];
    id:number;
    postType;
    heading;
    getAcademic=[];
    getImageSlide=[];
    getSlide=[];
    general;staff;student;
    showResponse;
    imageSSlide=['assets/img/B2.jpg','assets/img/B2.jpg','assets/img/B2.jpg'];

  constructor(private eportalservice:EportalServiceService, private router:Router) { }

  ngOnInit() {
      this.getHomePost();

  }
   getEvent(){
      return this.eportalservice.getEvent()
          .subscribe((response)=>{
             this.getEvents=response;
          })
   }


   navigation(id){
       this.id=id;
       this.router.navigate(['/nav', this.id])
   }
    getStaff(){
        return this.eportalservice.getStaff()
            .subscribe((response)=>{
                //console.log(response);
                this.getStaffs=response;
            })
    }
    getHomePost(){
        return this.eportalservice.getHomePost()
            .subscribe((response)=>{
                this.getPost=response;
                for(var i=0; i<response.length; i++){
                    this.postType= response[i]['post_type'];
                    this.heading= response[i]['heading'];
                    if(this.postType=="EVENTS" && this.heading=="HOME PAGE"){
                        this.getEvents=response[i];
                    }
                    if(this.postType=="TIMETABLE" && this.heading=="HOME PAGE"){
                        this.gettimetable=response[i];
                    }
                    if(this.postType=="ACADEMIC" && this.heading=="HOME PAGE"){
                        this.getAcademic=response[i];
                    }
                    if(this.postType=="ADMISSION" && this.heading=="HOME PAGE"){
                        this.getAdmissions=response[i];
                    }
                    if(this.postType=="STAFF"){
                        this.staff="STAFF";
                        this.getStaffs.push(response[i]);
                    }
                    if(this.postType=="STUDENTS"){
                        this.student="STUDENT";
                        this.getStudent.push(response[i]);
                    }
                    if(this.postType=="GENERAL INFORMATION"){
                        this.general="GENERAL INFORMATION";
                        this.getGeneral.push(response[i]);
                    }
                    // if(this.postType=="IMAGE SLIDE"){
                    //     this.getAllSlideImage(this.getImageSlide[i]['img_name'], i);
                    //     if(this.getAllSlideImage.length<4){
                    //         this.getImageSlide.push(response[i]);
                    //     }
                    // }

                    if(this.getPost[i]['img_name']!=''){
                        this.getImage(this.getPost[i]['img_name'], i);
                        if(this.getSlide.length<4){
                            this.getSlide.push(this.getPost[i]);
                        }
                    }
                }
                console.log(this.getImageSlide);
                this.showResponse=true;//sign for lazy loading
                sessionStorage.setItem('getEvent', JSON.stringify(this.getStudent));
                sessionStorage.setItem('getEvent', JSON.stringify(this.getStaffs));
                sessionStorage.setItem('getEvent', JSON.stringify(this.getGeneral));
                this.getStudent;
            });
    }

    ongetPost(getPost){
        if(getPost=="GENERAL INFORMATION"){
            sessionStorage.setItem(getPost, JSON.stringify(this.getGeneral));
            sessionStorage.setItem('post_type', getPost);
        }
        if(getPost=="STAFF"){
            sessionStorage.setItem(getPost, JSON.stringify(this.getStaffs));
            sessionStorage.setItem('post_type', getPost);
        }
        if(getPost=="STUDENTS"){
            sessionStorage.setItem(getPost, JSON.stringify(this.getStudent));
            sessionStorage.setItem('post_type', getPost);
        }

    }
    getImage(imgName, position){
        const getSlide=firebase.storage().ref().child('images/'+imgName);
        getSlide.getDownloadURL().then((url)=>{
            this.getPost[position]['image_url']=url;
        })
    }

}
