import { Component, OnInit } from '@angular/core';
import {ParamMap, ActivatedRoute} from "@angular/router";
import {EportalServiceService} from "../../eportal-service.service";
import * as firebase from "firebase";
@Component({
    selector: 'app-events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.css', '../../../assets/frontpage/css/style.css']
})

export class EventsComponent implements OnInit {
    id;
    post;
    getAllPost: Array<GetPosts>;
    img;
    userProfileImg;
    constructor(private route: ActivatedRoute, private eportalservice:EportalServiceService) { }

    ngOnInit() {
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.id=params.get('id'))
            .subscribe((response) =>{
                this.getPost();
            });
    }
    getPost(){
        if(this.id==1){
            this.post="EVENTS";
        }
        if(this.id==3){
            this.post="ACADEMIC";
        }
        if(this.id==2){
            this.post="TIMETABLE";
        }
        if(this.id==4){
            this.post="ADMISSION";
        }
        if(this.id==5){
            this.post="GENERAL INFORMATION";
        }
        if(this.id==6){
            this.post="STAFF";
        }
        if(this.id==7){
            this.post="STUDENTS";
        }
        this.eportalservice.getPost(this.post)
            .subscribe((response)=>{
                this.getAllPost=response;
                sessionStorage.setItem(this.post, JSON.stringify(response));
                this.img=response.img_name;
                this.getImage(this.getAllPost[0]['img_name'], 0);
            })
    }
    getImage(imgUrl, imgPos){
        const getdp=firebase.storage().ref().child('images/'+imgUrl);
        getdp.getDownloadURL().then(url => {
            this.getAllPost[imgPos]['image'] = url;
            if (this.getAllPost[imgPos+1]) {
                this.getImage(this.getAllPost[imgPos+1]['img_name'], imgPos+1);
            }
        }, err => {
            if (this.getAllPost[imgPos+1]) {
                this.getImage(this.getAllPost[imgPos+1]['img_name'], imgPos+1);
            }
        } )
    }

    onClickButton(post_type){
        sessionStorage.setItem("post_type", post_type);
    }
}
interface GetPosts {
    name: null,
    image_name: null,
    image: null,

}