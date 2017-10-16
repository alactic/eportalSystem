import {Component, OnInit, ElementRef} from '@angular/core';
import {StudentSectionServiceService} from "../student-section/student-section-service.service";
import {EditStudent} from "../edit-profile/edit-student_detail";
import {NgForm} from "@angular/forms";
import * as firebase from "firebase";

@Component({
  selector: 'app-student-assignment-upload',
  templateUrl: './student-assignment-upload.component.html',
  styleUrls: ['./student-assignment-upload.component.css']
})
export class StudentAssignmentUploadComponent implements OnInit {
  semester;
  course;
  email;
  department;
  question;
  selectCourses:EditStudent;
  showCourse;
  successMessage;
  emptyField;
  showError;
  lecturer_email;
  note;
  created;
  submission;
  showDetail;
  getQuestion;
  showQuestion;
  assignment_id;
  errorMessage;
    byteResultFile;
    totalbyteFile;
    byteFile;
    submitDisableFile;
    selectFileOptionFile;
    submitDisable;
    file_name;
  constructor(private studentservice: StudentSectionServiceService,private elem:ElementRef) { }

  ngOnInit() {
      this.studentservice.firstTimeLogin();
    this.email=localStorage.getItem('email');
  }

  onselectedSemester(){
     this.studentservice.selectCourse(this.email,this.semester)
         .subscribe((response)=>{
                this.selectCourses=response;
                if(response==""){
                  this.showCourse=null;
                }else {
                  this.showCourse=response;
                }
         })
  }

  onSelectCourse(){
       const myContent= this.showCourse[this.showCourse.findIndex(x => x.course == this.course)];
        this.department=myContent['department'];
        this.semester=myContent['semester'];
          return this.studentservice.getQuestion(this.course, this.department, this.semester)
              .subscribe((response)=>{
                  this.getQuestion=response;
                  this.showQuestion=true;
              })
  }

    onSelectAssignment(){
       const myContent= this.getQuestion[this.getQuestion.findIndex(x => x.note == this.question)];
        this.created=myContent['created_at'];
        this.submission=myContent['submission'];
        this.lecturer_email=myContent['email'];
        this.assignment_id=myContent['id'];
        this.course=myContent['course'];
        this.department=myContent['department'];
        this.showDetail=true;
         // return this.studentservice.getQuestion(this.course, this.department, this.semester)
          //    .subscribe((response)=>{
                  //this.getQuestion=response;
          //    })
  }


    setUpload(file){
        let myfile=file[0];
        this.file_name=new Date()+myfile.name;
        const email=localStorage.getItem('email');
        const storageRef = firebase.storage().ref('/images').child(this.file_name);
        return storageRef.put(myfile);
    }
    onAddFile(file){
        var myReader:FileReader = new FileReader();
        const image=this.setUpload(file);
        this.selectFileOptionFile=true;
        this.submitDisable=false;
        image.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot)=>{
                this.byteResultFile=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                this.totalbyteFile=snapshot.totalBytes;
                this.byteFile=snapshot.bytesTransferred;
                if(this.byteResultFile==100){
                    this.submitDisable=true;
                }
                console.log('totalbtyeFile',this.totalbyteFile);
                console.log('resultFile', this.byteResultFile);
            },
            (error)=>{
                console.log(error)
            })
        myReader.readAsDataURL(file[0]);
    }

  onSubmit(form:NgForm){
    const level=form.value.level;
    const mypassport=this.elem.nativeElement.querySelector('#upload').files;
    let myfile=mypassport[0];
    if(myfile==null){
      this.emptyField="UPLOAD FIELD IS EMPTY";
      this.showError=true;
    }else{
      // let mydate=new Date();
      // const file_name=mydate+myfile.name;
      // const storageRef = firebase.storage().ref('/images').child(file_name);
      // storageRef.put(myfile);
      return this.studentservice.submitAssignment(this.email, this.lecturer_email, this.file_name, this.assignment_id,this.question, this.course, this.department)
          .subscribe((response)=>{
                 if(response=="successful"){
                     this.successMessage="UPLOAD WAS SUCCESSFUL";
                     setTimeout(()=>{this.successMessage=null}, 4000)
                     this.selectFileOptionFile=false;
                     this.showQuestion=false;
                     this.showDetail=false;
                     this.showCourse=false;
                     form.reset();
                 }else{
                     this.errorMessage=response;
                 }
                 this.close();
          });
          }
  }

  close(){
        setTimeout(()=>{
            this.successMessage="";
            this.errorMessage="";
        }, 4000)
  }
}