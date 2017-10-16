import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {SharedHttpServiceService} from "../shared/service/shared-http-service.service";

@Injectable()
export class StaffService {
  myemail;
  constructor(private sharedservice:SharedHttpServiceService) { }

    login(email, password){
        this.myemail=email;
        this.getStudentEmail();
        return this.sharedservice.loginService('login', {email:email, password:password, staff:"staff"})
        //const headers=new Headers({'X-Requested-With': 'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/stafflogin', {email:email, password:password, staff:"staff"},{headers:headers} )
        //     .map((response:Response)=>{
        //             const token=response.json().token;
        //             const base64Url=token.split('.')[1];
        //             const base64=base64Url.replace('-', '+').replace('_', '/');
        //             return {token:token, decoded: JSON.parse(window.atob(base64))};
        //         }
        //     )
        //     .do(
        //         tokenData=>{
        //             localStorage.setItem('token', tokenData.token)
        //         }
        //     );
    }

    Signup(firstname, middlename,surname,email,password,qualification,school_attended,dob,mob,yob,imagename,address,state,country,gender ){
        const data={firstname:firstname, middlename:middlename, surname:surname, email:email, password:password,qualification:qualification,
                    school_attended:school_attended, dob:dob, mob:mob, yob:yob, imagename:imagename, address:address, state:state,
                    country:country,gender:gender}
        return this.sharedservice.postService('staffsignup', data)
    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/staffsignup', {firstname:firstname, middlename:middlename, surname:surname,
    //   email:email, password:password,qualification:qualification, school_attended:school_attended, dob:dob, mob:mob, yob:yob, imagename:imagename, address:address, state:state, country:country,gender:gender}, {headers:headers})
    //     .map((response:Response)=>response.json());
  }
    Update(firstname, middlename,surname,email,password,qualification,school_attended,dob,mob,yob,address,state,country,gender ){
      const data= {firstname:firstname, middlename:middlename, surname:surname,
            email:email, password:password,qualification:qualification,
            school_attended:school_attended, dob:dob, mob:mob, yob:yob,
            address:address, state:state, country:country,gender:gender}
        return this.sharedservice.postService('staffupdate',data)
        //const body=JSON.stringify();
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/staffupdate', {firstname:firstname, middlename:middlename, surname:surname,
        //     email:email, password:password,qualification:qualification, school_attended:school_attended, dob:dob, mob:mob, yob:yob, address:address, state:state, country:country,gender:gender}, {headers:headers})
        //     .map((response:Response)=>response.json().message);
    }

    //adding new student by the admin
    newStudent(email,password,regno, status, department, faculty){
        const data={email:email, password:password,regno:regno, status:status, department, faculty}
        return this.sharedservice.postService('newStudent',data)
        //const body=JSON.stringify();
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/newStudent',
        //     {email:email, password:password,regno:regno, status:status, department, faculty}, {headers:headers})
        //     .map((response:Response)=>response.json().message);
       }

       //adding new staff by the admin
    newStaff(email,password,regno, status){
        console.log('staff password', password);
        return this.sharedservice.postService('newStaff',{email:email, password:password,regno:regno, status:status})
        // console.log('stafflogin');
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/newStaff',
        //     {email:email, password:password,regno:regno, status:status}, {headers:headers})
        //     .map((response:Response)=>response.json().message);
       }

    //signing up for new staff by the staff
    Signup_newStaff(firstname, middlename,surname,email,dob,mob,yob,qualification, school_attended, formdata,address,state,country,gender ){
        const data={firstname:firstname, middlename:middlename, surname:surname, email:email,  dob:dob,
                    mob:mob, yob:yob,qualification:qualification,school_attended:school_attended,
                    passport:formdata, address:address, state:state, country:country,gender:gender}
        return this.sharedservice.postService('Signup_newStaff',data)
        //const body=JSON.stringify();
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/Signup_newStaff', {firstname:firstname, middlename:middlename, surname:surname,
        //     email:email,  dob:dob, mob:mob, yob:yob,qualification:qualification,school_attended:school_attended,
        //     passport:formdata, address:address, state:state, country:country,gender:gender}, {headers:headers})
        //     .map((response:Response)=>response.json());
    }

    //fetching staff by email
    getStaff(email){
        return this.sharedservice.getService('getStaff',email)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/getStaff/'+email)
        //     .map((response:Response)=>response.json().message);
    }

    getStudentEmail(){
        localStorage.setItem('email', this.myemail);
        localStorage.setItem('status', "staff");
    }

    assignment(email, level,semester,submission, department, course, note, file_name, myfile){
        console.log('filename', file_name);
        console.log('file', myfile);
        const data={email:email, level:level,semester:semester,submission:submission, department:department,
                    course:course, note:note, upload_name:file_name, upload:myfile}
        return this.sharedservice.postService('postAssignment', data)

        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/postAssignment',
        //     {email:email, level:level,semester:semester,submission:submission, department:department, course:course, note:note, file_name:file_name, myfile:myfile}, {headers:headers})
        //     .map((response:Response)=>response.json().message);
    }
    view_all_assignment(email){
        return this.sharedservice.getService('view_all_assignment', email)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/view_all_assignment/'+email)
        //     .map((response)=>response.json().message)
    }

    onViewAssignment(id){
        return this.sharedservice.getService('onViewAssignment', id)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/onViewAssignment/'+id)
        //     .map((response)=>response.json().message)
    }
    onDeleteAssignment(id){
        return this.sharedservice.getService('onDeleteAssignment', id)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/onDeleteAssignment/'+id)
        //     .map((response)=>response.json().message)
    }
    LectureNote(email, level,semester,submission, department, course, note, file_name, myfile){
        const data={email:email, level:level,semester:semester,submission:submission, department:department,
                     course:course, note:note, upload_name:file_name, upload:myfile}
        return this.sharedservice.postService('postLectureNote', data)
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/postLectureNote',
        //     {email:email, level:level,semester:semester,submission:submission, department:department, course:course, note:note, file_name:file_name, myfile:myfile}, {headers:headers})
        //     .map((response:Response)=>response.json().message);
    }
    view_all_LectureNote(email){
        return this.sharedservice.getService('view_all_LectureNote', email)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/view_all_LectureNote/'+email)
        //     .map((response)=>response.json().message)
    }

    onViewLectureNote(id){
        return this.sharedservice.getService('onViewLectureNote', id)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/onViewLectureNote/'+id)
        //     .map((response)=>response.json().message)
    }
    onDeleteLectureNote(id){
        return this.sharedservice.getService('onDeleteLectureNote', id)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/onDeleteLectureNote/'+id)
        //     .map((response)=>response.json().message)
    }

    view_student_solution(email){
        return this.sharedservice.getService('view_student_solution', email)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/view_student_solution/'+email)
        //     .map(response=>response.json().message)
    }

    onShow(){
        return this.sharedservice.getService('onShow', null)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/onShow')
        //     .map(response=>response.json().message)
    }

    enterScore(submission_id, score){
        return this.sharedservice.postService('enterScore', {submission_id:submission_id,score:score})
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/enterScore',
        //     {submission_id:submission_id,score:score},
        //     {headers:headers})
        //     .map((response:Response)=>response.json().message);
    }

    hideScore(submission_id){
        return this.sharedservice.postService('hideScore', {submission_id:submission_id})
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/hideScore',
        //     {submission_id:submission_id},
        //     {headers:headers})
        //     .map((response:Response)=>response.json().message);
    }
    updateImage(email, image_name, status){
        return this.sharedservice.postService('updateImage', {email:email, image_name:image_name, status:status})
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/updateImage',
        //     {email:email, image_name:image_name, status:status},
        //     {headers:headers})
        //     .map((response:Response)=>response.json().message);
     }
}

