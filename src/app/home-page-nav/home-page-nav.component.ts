import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {EportalServiceService} from "../eportal-service.service";
import * as firebase from "firebase";
@Component({
  selector: 'app-home-page-nav',
  templateUrl: './home-page-nav.component.html',
  styleUrls: ['./home-page-nav.component.css', '../../assets/frontpage/css/style.css']
})
export class HomePageNavComponent implements OnInit {
     id;
    getAllDetail=[];
    getlatests=[];
    getAllPost;
    imgUrl;
  constructor(private route: ActivatedRoute, private eportalservice:EportalServiceService) {

  }
  ngOnInit() {
      this.route.paramMap
          .switchMap((params: ParamMap) =>
              this.id=params.get('id'))
          .subscribe((response) =>{
              this.getDetails();
          });
  }

  getDetails(){
      const post_type= sessionStorage.getItem("post_type");//get the postType from the cache
      this.getAllPost=JSON.parse(sessionStorage.getItem(post_type));//use the postType to get all the post
      if(this.getAllPost){
          //console.log(JSON.parse(this.getAllPost).length);
          for(var i=0; i<this.getAllPost.length; i++){
              if(this.getAllPost[i]['id']==this.id){
                  console.log(this.getAllPost[i]);
                  this.getAllDetail=this.getAllPost[i];
                  const  storageImg = firebase.storage().ref().child('images/'+this.getAllPost[i].img_name);
                  storageImg.getDownloadURL().then(url =>{
                      this.imgUrl= url;
                  });
              }
          }
      }else{
          return this.eportalservice.getDetails(this.id)
              .subscribe((response)=>{
                  this.getAllDetail=response;
                  const  storageImg = firebase.storage().ref().child('images/'+response.img_name);
                  storageImg.getDownloadURL().then(url =>{
                      this.imgUrl= url;
                  });
              })
      }
  }

    getLatest(){
        return this.eportalservice.getlatest()
            .subscribe((response)=>{
                this.getlatests=response;
            })
    }
    onDownload(file){
        const  storageRef = firebase.storage().ref().child('images/'+file);
            storageRef.getDownloadURL().then(url =>{
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
