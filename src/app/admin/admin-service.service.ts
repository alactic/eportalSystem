import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {EditStudent} from "../student/edit-profile/edit-student_detail";
import {SharedHttpServiceService} from "../shared/service/shared-http-service.service";

@Injectable()
export class AdminServiceService {
    editfaculty:EditStudent;
  constructor(private http:Http, private sharedservice:SharedHttpServiceService) { }

  reset(){
     return "okay";
  }

    sendImage(file){
        //const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});

        // return this.http.post('http://localhost/myProject/eportaldb/public/api/sendImage', {file:file}, {headers:headers})
        //     .map((response)=>response.json().message);
        return this.sharedservice.postService('sendImage', {file:file})
    }
  getStaffDetails(email){
      return this.sharedservice.getService('getStaff', email)
      // return this.http.get('http://localhost/myProject/eportaldb/public/api/getStaff/'+email)
      //     .map((response:Response)=>response.json().message);
  }
  getAllStudent(){
      return this.sharedservice.getService('allStudent', null);
      // return this.http.get('http://localhost/myProject/eportaldb/public/api/allStudent')
      //     .map((response:Response)=>response.json().message);
  }

  getAllStaff(){
      return this.sharedservice.getService('allStaff', null);
      // return this.http.get('http://localhost/myProject/eportaldb/public/api/allStaff')
      //     .map((response:Response)=>response.json().message);
  }
    removeStudent(id){
        return this.sharedservice.getService('removeStudent', id);
      // return this.http.get('http://localhost/myProject/eportaldb/public/api/removeStudent/'+id)
      //     .map((response:Response)=>response.json().message);
  }
    removeStaff(email){
        return this.sharedservice.getService('removeStaff', email);
      // return this.http.get('http://localhost/myProject/eportaldb/public/api/removeStaff/'+email)
      //     .map((response:Response)=>response.json().message);
  }
    getStudentbyEmail(email){
        return this.sharedservice.getService('getStudentbyEmail', email);
      // return this.http.get('http://localhost/myProject/eportaldb/public/api/getStudentbyEmail/'+email)
      //     .map((response:Response)=>response.json().message);
  }
  getStaffbyEmail(email){
      return this.sharedservice.getService('getStaffbyEmail', email);
      // return this.http.get('http://localhost/myProject/eportaldb/public/api/getStaffbyEmail/'+email)
      //     .map((response:Response)=>response.json().message);
  }

  //add new faculty to the database
    addFaculty(facultyname){
        return this.sharedservice.getService('addFaculty', facultyname);
      // return this.http.get('http://localhost/myProject/eportaldb/public/api/addFaculty/'+facultyname)
      //     .map((response)=>response.json().message);
    }

    //getting all the faculty
  getFaculty(){
      return this.sharedservice.getService('getFaculty', null);
      // return this.http.get('http://localhost/myProject/eportaldb/public/api/getFaculty')
      //     .map((response)=>response.json().message);
  }

    editFaculty(id, editedValue){
        return this.sharedservice.postService('editFaculty', {id:id, editedValue:editedValue})
       // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
       //  return this.http.post('http://localhost/myProject/eportaldb/public/api/editFaculty', {id:id, editedValue:editedValue}, {headers:headers})
       //      .map((response)=>response.json().message);
    }
    editDepartment(id,department, faculty){
        return this.sharedservice.postService('editDepartment', {id:id, department:department, faculty:faculty})
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/editDepartment', {id:id, department:department, faculty:faculty}, {headers:headers})
        //     .map((response)=>response.json().message);
    }
    addDept(deptname, selectFaculty){
        return this.sharedservice.postService('addDept', {dept:deptname, faculty:selectFaculty})
           // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
           //  return this.http.post('http://localhost/myProject/eportaldb/public/api/addDept', {dept:deptname, faculty:selectFaculty}, {headers:headers})
           //      .map((response)=>response.json().message);
        }

        //getting all the department from the database
    getDepartment(){
        return this.sharedservice.getService('getDepartment', null)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/getDepartment')
        //     .map((response)=>response.json().message);
    }

    //deleting department from database
    deleteDepartment(id){
        return this.sharedservice.postService('deleteDepartment', {id:id})
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/deleteDepartment', {id:id}, {headers:headers})
        //     .map((response)=>response.json().message);
    }
    //deleting faculty from database
    deleteFaculty(id){
        return this.sharedservice.postService('deleteFaculty', {id:id})
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/deleteFaculty', {id:id}, {headers:headers})
        //     .map((response)=>response.json().message);
    }

    //get the department based on the faculty
    fetchDepartment(faculty){
        return this.sharedservice.postService('fetchDepartment', {faculty:faculty})
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/fetchDepartment', {faculty:faculty}, {headers:headers})
        //     .map((response)=>response.json().message);
     }

     //adding new course to the database
     addCourse(course,coursecode,unitload,semester, status,level, dept, faculty){
        const data={course:course,coursecode:coursecode, unitload:unitload, level:level,
                     semester:semester, status:status, department:dept, faculty:faculty}
         return this.sharedservice.postService('fetchDepartment', data)
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/addCourse', {course:course,coursecode:coursecode,
        //     unitload:unitload,level:level,semester:semester, status:status, department:dept, faculty:faculty}, {headers:headers})
        //     .map((response)=>response.json().message);
     }
     //getting all the courses
    getCourse(){
        return this.sharedservice.getService('getCourse', null)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/getCourse')
        //     .map((response)=>response.json().message);
    }

    editCourse(id,course, coursecode, unitload, semester, status, level, department, faculty){
        const data={id:id,course:course, coursecode:coursecode,unitload:unitload,level:level,
                     semester:semester, status:status, department:department, faculty:faculty}
        return this.sharedservice.getService('editCourse', data)
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/editCourse', {id:id,course:course,
        //     coursecode:coursecode,unitload:unitload,level:level, semester:semester, status:status, department:department, faculty:faculty}, {headers:headers})
        // .map((response)=>response.json().message);
    }
    //deleting department from database
    deleteCourse(id){
        return this.sharedservice.postService('deleteCourse', {id:id})
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/deleteCourse', {id:id}, {headers:headers})
        //     .map((response)=>response.json().message);
    }

    //setting payments
    payment(id,payment, level, session, department, faculty){
        const data={id:id,payment:payment, level:level,session:session, department:department, faculty:faculty}
        return this.sharedservice.postService('payment', data)
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/payment', {id:id,payment:payment,
        //     level:level,session:session, department:department, faculty:faculty}, {headers:headers})
        //     .map((response)=>response.json().message);
    }

    //getting all the set payment
    getPayment(){
        return this.sharedservice.getService('getPayment', null)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/getPayment')
        //     .map((response)=>response.json().message);
    }
    //deleting department from database
    deletePayment(id){
        return this.sharedservice.postService('deletePayment', {id:id})
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/deletePayment', {id:id}, {headers:headers})
        //     .map((response)=>response.json().message);
    }


    getAllPayment(){
        return this.sharedservice.getService('getAllPayment', null)

        // return this.http.get('http://localhost/myProject/eportaldb/public/api/getAllPayment')
        //     .map((response)=>response.json().message);
    }

    getAllRegistered(){
        return this.sharedservice.getService('getAllRegistered', null)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/getAllRegistered')
        //     .map((response)=>response.json().message);
    }

    sendPost(post, heading, img_name,file_name, article){
        const data={post:post, heading:heading,img_name:img_name, file_name:file_name, article}
        return this.sharedservice.postService('sendPost', data)
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/sendPost', {post:post,
        //     heading:heading,img_name:img_name, file_name:file_name, article}, {headers:headers})
        //     .map((response)=>response.json().message);
    }

    getAllPost(){
        return this.sharedservice.getService('getAllPost', null)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/getAllPost')
        //     .map((response)=>response.json().message);
    }
    deletePost(id:number){
        return this.sharedservice.getService('deletePost', id)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/deletePost/'+id)
        //     .map((response:Response)=>response.json().message);
    }
    editPost(id:number){
        return this.sharedservice.getService('editPost', id)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/editPost/'+id)
        //     .map((response:Response)=>response.json().message);
    }

    getLastRegno(){
        return this.sharedservice.getService('getLastRegno', null)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/getLastRegno')
        //     .map((response:Response)=>response.json().message);
    }

    getLastStaffno(){
        return this.sharedservice.getService('getLastStaffno', null)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/getLastStaffno')
        //     .map((response:Response)=>response.json().message);
    }

    fetchStudents(){
        return this.sharedservice.getService('fetchStudents', null)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/fetchStudents')
        //     .map((response:Response)=>response.json().message);
    }
    fetchStaff(){
        return this.sharedservice.getService('fetchStaff', null)
        // return this.http.get('http://localhost/myProject/eportaldb/public/api/fetchStaff')
        //     .map((response:Response)=>response.json().message);
    }

    submitEdit(id,post, heading, article){
        return this.sharedservice.postService('submitEdit', {id:id, post:post, heading:heading, article:article})
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/submitEdit', {id:id, post:post,
        //     heading:heading, article:article}, {headers:headers})
        //     .map((response)=>response.json().message);
    }

    changepassword(name, email, password){
        return this.sharedservice.postService('changePassword', {name:name,email:email, password:password})
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/changePassword', {name:name,email:email, password:password}, {headers:headers})
        //     .map((response)=>response.json().message);
    }

    getCategory(){
        return this.sharedservice.getService('getCategory', null)
         // return this.http.get('http://localhost/myProject/eportaldb/public/api/getCategory')
         //     .map((response)=>
         //         response.json().message)
    }

    addBook(title, author, category_id, subCategory_id, upload){
        const data={title:title,author:author, category_id:category_id,  subCategory_id:subCategory_id,upload:upload}
        return this.sharedservice.postService('addBook', data)
        // const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
        // return this.http.post('http://localhost/myProject/eportaldb/public/api/addBook',
        //     {title:title,author:author, category_id:category_id,  subCategory_id:subCategory_id,upload:upload}, {headers:headers})
        //     .map((response)=> response.json().message)
    }
}
