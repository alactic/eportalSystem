import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Router} from "@angular/router";
import {SharedHttpServiceService} from "../../shared/service/shared-http-service.service";
@Injectable()
export class StudentSectionServiceService {
  userProfileImg;
  constructor(private http:Http, private router:Router, private sharedservice:SharedHttpServiceService){
  }

  firstTimeLogin(){
    if(sessionStorage.getItem('new')=="yes"){
      this.router.navigate(['student']);
    }
  }
  //fetching the student detail by email
  getStudent(email){
    return this.sharedservice.getService('getStudent', email)
    // return this.http.get('http://localhost/myProject/eportaldb/public/api/getStudent/'+email)
    //     .map((response:Response)=>response.json().message);
  }

  //updating student details
  Update(firstname, middlename,surname,email, dob,mob,yob,address,state,country,gender ){
    const data={firstname:firstname, middlename:middlename, surname:surname, email:email, dob:dob, mob:mob, yob:yob,
                address:address, state:state, country:country,gender:gender}
    return this.sharedservice.postService('studentupdate', data)
    //const body=JSON.stringify();
    // console.log('studentlogin');
    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/studentupdate', {firstname:firstname, middlename:middlename, surname:surname,
    //   email:email, dob:dob, mob:mob, yob:yob,
    //   address:address, state:state, country:country,gender:gender}, {headers:headers})
    //     .map((response:Response)=>response.json());
  }

  //get school fees amount to populate the invoice
  getSchoolfees(email,level,session){
    return this.sharedservice.postService('getfees', {email:email,level:level, session:session})
    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/getfees',
    //     {email:email,level:level, session:session}, {headers:headers})
    //     .map((response)=>response.json().message);
}

  payfees(email,level, session){
    return this.sharedservice.postService('payfees', {level:level,session:session, email:email})

    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/payfees',
    //     {level:level,session:session, email:email}, {headers:headers})
    //     .map(response=>response.json().message)
  }

  getprint(email, session, level){
    return this.sharedservice.postService('getprint', {level:level,session:session, email:email})
    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/getprint',
    //     {level:level,session:session, email:email}, {headers:headers})
    //     .map(response=>response.json().message)
  }

  checkinvoice(email, level, session, pin){
    return this.sharedservice.postService('checkinvoice', {level:level,session:session, email:email})
  // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
  // return this.http.post('http://localhost/myProject/eportaldb/public/api/checkinvoice',
  //  {level:level,session:session, email:email}, {headers:headers})
  //  .map(response=>response.json().message)
  }

    getStudentCourse(email, semester){
      return this.sharedservice.postService('getStudentCourse', {email:email, semester:semester})
    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/getStudentCourse',
    //     {email:email, semester:semester}, {headers:headers})
    //     .map(response=>response.json().message)
  }

  submitCourse(email, courses, semester, session){
    return this.sharedservice.postService('submitCourse', {email:email, courses:courses, semester:semester, session:session})
    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/submitCourse',
    //     {email:email, courses:courses, semester:semester, session:session}, {headers:headers})
    //     .map(response=>response.json().message)
  }

  getBorrowCourse(semester,department, faculty){
    return this.sharedservice.postService('getBorrowCourse', {semester:semester, department:department, faculty:faculty})

    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/getBorrowCourse',
    //     {semester:semester, department:department, faculty:faculty}, {headers:headers})
    //     .map(response=>response.json().message)
  }

  selectBorrowCourse(course,semester,department, faculty){
    return this.sharedservice.postService('selectBorrowCourse', {course:course,semester:semester, department:department, faculty:faculty})

    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/selectBorrowCourse',
    //     {course:course,semester:semester, department:department, faculty:faculty}, {headers:headers})
    //     .map(response=>response.json().message)
  }

  getPrint(email, semester, session){
    return this.sharedservice.postService('getPrint', {email:email,semester:semester, session:session})
    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/getPrint',
    //     {email:email,semester:semester, session:session}, {headers:headers})
    //     .map(response=>response.json().message)
  }

  getMaterialStatus(email){
    return this.sharedservice.getService('getMaterialStatus', email)

    // return this.http.get('http://localhost/myProject/eportaldb/public/api/getMaterialStatus/'+email)
    //      .map(response=>response.json().message)
  }
  getMaterial(email){
    return this.sharedservice.getService('getMaterial', email)
    // return this.http.get('http://localhost/myProject/eportaldb/public/api/getMaterial/'+email)
    //     .map(response=>response.json().message)
  }
  getAssignment(email){
    return this.sharedservice.getService('getAssignment', email)
    // return this.http.get('http://localhost/myProject/eportaldb/public/api/getAssignment/'+email)
    //     .map(response=>response.json().message)
  }
  getAssignmentStatus(email){
    return this.sharedservice.getService('getAssignmentStatus', email)

    // return this.http.get('http://localhost/myProject/eportaldb/public/api/getAssignmentStatus/'+email)
    //     .map(response=>response.json().message)
  }


  view_submitted_assignment(email){
    return this.sharedservice.getService('view_submit_assignment', email)

    // return this.http.get('http://localhost/myProject/eportaldb/public/api/view_submit_assignment/'+email)
    //     .map(response=>response.json().message)
  }


  getLectureDetail(id){
    return this.sharedservice.getService('getLectureDetail', id)

    // return this.http.get('http://localhost/myProject/eportaldb/public/api/getLectureDetail/'+id)
    //      .map(response=>response.json().message)
  }

  getAssignmentDetail(id, status){
    return this.sharedservice.postService('getAssignmentDetail', {id:id,status:status})
    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/getAssignmentDetail',
    //     {id:id,status:status}, {headers:headers})
    //     .map(response=>response.json().message);
  }


  selectCourse(email, semester){
    return this.sharedservice.postService('selectCourse', {email:email,semester:semester})

    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/selectCourse',
    //     {email:email,semester:semester}, {headers:headers})
    //     .map(response=>response.json().message)
  }

  getQuestion(course, department, semester){
    return this.sharedservice.postService('getQuestion', {course:course, department:department, semester})

    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/getQuestion',
    //     {course:course, department:department, semester}, {headers:headers})
    //     .map(response=>response.json().message)
  }

  submitAssignment(email, lecturer_email, file_name, assignment_id,note, course, department){
    const data={email:email, lecturer_email:lecturer_email, file_name:file_name, assignment_id:assignment_id,
                note:note, course:course, department:department,}
    return this.sharedservice.postService('submitAssignment', data)

    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    // return this.http.post('http://localhost/myProject/eportaldb/public/api/submitAssignment',
    //     {email:email, lecturer_email:lecturer_email, file_name:file_name, assignment_id:assignment_id,
    //       note:note, course:course, department:department,}, {headers:headers})
    //     .map(response=>response.json().message)
  }

  view_student_score(email) {
    return this.sharedservice.postService('view_student_score', {email:email})

    // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    //   return this.http.post('http://localhost/myProject/eportaldb/public/api/view_student_score',
    //       {email:email}, {headers:headers})
    //       .map(response=>response.json().message)
    }

}