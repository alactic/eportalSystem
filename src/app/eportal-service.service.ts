import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {AuthServiceService} from './auth-service.service';
import {getResponseURL} from "@angular/http/src/http_utils";
import * as firebase from "firebase";
@Injectable()
export class EportalServiceService {
    myProfilePix; image_name; byteResult; totalbyte; submitDisable;
    constructor(private http: Http, private authservice: AuthServiceService) {
    }
    category_id;
    getStudent(email: any) {
        const token = this.authservice.getToken();
        const body = JSON.stringify({id: email});
        const headers = new Headers({'Content-Type': "application/json"});
        return this.http.get('http://localhost/ePortng ' +
            'alDb/eportaldb/public/api/get_student_detail/' + email + '?token=' + token)
            .map((response: Response) => response.json().get_detail);
    }



    getEvent() {
        return this.http.get('http://localhost/myProject/eportaldb/public/api/getEvent')
            .map((response) => response.json().message);
    }

    getAdmission() {
        return this.http.get('http://localhost/myProject/eportaldb/public/api/getAdmission')
            .map((response) => response.json().message);
    }

    getFacilities() {
        console.log('event2');
        return this.http.get('http://localhost/myProject/eportaldb/public/api/getFacilities')
            .map((response) => response.json().message);
    }

    getTimetable() {
        return this.http.get('http://localhost/myProject/eportaldb/public/api/getTimetable')
            .map((response) => response.json().message);
    }

    getSport() {
        return this.http.get('http://localhost/myProject/eportaldb/public/api/getSport')
            .map((response) => response.json().message);
    }

    getDetails(id) {
        return this.http.get('http://localhost/myProject/eportaldb/public/api/getDetails/'+id)
            .map((response) => response.json().message);
    }
    general_info(){
        const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        return this.http.post('http://localhost/myProject/eportaldb/public/api/general_info', {headers:headers})
            .map((response) => response.json().message);
    };
    getStaff(){
        const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    return this.http.post('http://localhost/myProject/eportaldb/public/api/getStaff', {headers:headers})
        .map((response) => response.json().message);
};
    getStudents(){
        const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        return this.http.post('http://localhost/myProject/eportaldb/public/api/getStudents' , {headers:headers})
            .map((response) => response.json().message);
    };
    getAcademic(){
        return this.http.get('http://localhost/myProject/eportaldb/public/api/getAcademic')
            .map((response) => response.json().message);
    };

    getAdministration(){
    return this.http.get('http://localhost/myProject/eportaldb/public/api/getAdministration')
        .map((response) => response.json().message);
    };

    getNew(){
        return this.http.get('http://localhost/myProject/eportaldb/public/api/getNew')
            .map((response) => response.json().message);
    };

    getlatest(){
        return this.http.get('http://localhost/myProject/eportaldb/public/api/getlatest')
            .map((response) => response.json().message);
    };

    getHomePost(){
        return this.http.get('http://localhost/myProject/eportaldb/public/api/getHomePost')
            .map((response) => response.json().message);
    };

    getPost(post){
        const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        return this.http.post('http://localhost/myProject/eportaldb/public/api/getPost',{post:post}, {headers:headers})
            .map((response)=>response.json().message);
    }

    getLibraryBook(id, category_status){
        const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        return this.http.post('http://localhost/myProject/eportaldb/public/api/getLibraryBook',{category_id:id, category_status:category_status}, {headers:headers})
            .map((response)=>response.json().message);
    }
}
