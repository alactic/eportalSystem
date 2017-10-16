import {Component, OnInit, ElementRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {EditStudent} from "../../student/edit-profile/edit-student_detail";
import {StaffService} from "../staff.service";
import {StudentSectionServiceService} from "../../student/student-section/student-section-service.service";
import {AdminServiceService} from "../../admin/admin-service.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-lecture-note',
  templateUrl: 'lecture-note.component.html',
  styleUrls: ['lecture-note.component.css']
})
export class LectureNoteComponent implements OnInit {
  editstudent: EditStudent;
  editfaculty: EditStudent;
  getDepartments: EditStudent;
  editCourse:EditStudent;
  showCourse;
  department
  showDept;
  faculty;
  semester;
  showUpload=false;
  showFaculty=false;
  email;
  view_all_LectureNote:EditStudent;
  viewLectureNote:EditStudent;
  showlist;
  errorMessage;
  successMessage;
    byteResultFile;
    totalbyteFile;
    byteFile;
    submitDisableFile;
    selectFileOptionFile;
    submitDisable;
    file_name;

  constructor(private staffservice:StaffService, private studentservice: StudentSectionServiceService, private adminservice:AdminServiceService, private elem:ElementRef ) { }

  ngOnInit() {
    this.email=localStorage.getItem('email');
  }

  //fetching all faculty
  getFacultyDetail(){
    return this.adminservice.getFaculty()
        .subscribe((response)=>{
          this.editfaculty=response
        });
  }

  onGetFaculty(){
    return this.adminservice.fetchDepartment(this.faculty)//fetching dept based on its faculty
        .subscribe((response)=>{
          this.getDepartments=response;
          this.showDept=true;
        })
  }

  onSelectDept(){
    return this.studentservice.getBorrowCourse(this.semester,this.department, this.faculty)
        .subscribe((response:EditStudent)=>{
          this.editCourse=response;
          this.showCourse=true;
        })
  }

  onselectedCourse(){
    this.showUpload=true;
  }

  onselectedSemester(){
    this.showFaculty=true;
    this.getFacultyDetail();
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
    const semester=form.value.semester;
    const submission=form.value.submission;
    const department=form.value.department;
    const course=form.value.course;
    const note=form.value.note;
    const mypassport=this.elem.nativeElement.querySelector('#upload').files;
    let myfile=mypassport[0];
    // let mydate=new Date();
    // const file_name=mydate+myfile.name;
    // const storageRef = firebase.storage().ref('/images').child(file_name);
    // storageRef.put(myfile);
    this.errorMessage=false;
    return this.staffservice.LectureNote(this.email, level,semester,submission, department, course, note, this.file_name, myfile.name)
        .subscribe((response)=>{
          this.successMessage="UPLOAD WAS SUCCESSFUL";
          setTimeout(()=>{this.successMessage=null}, 3000);
            this.selectFileOptionFile=false;
          this.close();
          form.reset();
        })
  }

  close(){
      setTimeout(()=>{
          this.successMessage=null;
      }, 3000)
  }
  view_all(){
    this.successMessage=false;
    this.errorMessage=false;
    return this.staffservice.view_all_LectureNote(this.email)
        .subscribe((response)=>{
          this.view_all_LectureNote=response;
          if(response==""){
            this.errorMessage="YOU DO NOT HAVE LECTURE NOTE";
          }else{
            this.showlist=true;
          }
          //console.log(this.view_all_assignment);
        })
  }

  onView(id){
    this.staffservice.onViewLectureNote(id)
        .subscribe((response)=>{
          this.viewLectureNote=response;

        })
  }

  onDelete(id){
    if(confirm('DO YOU WANT TO CONTINUE WITH THE DELETION')){
      this.staffservice.onDeleteLectureNote(id)
          .subscribe((response)=>{
            this.successMessage=response;
            this.view_all();
          })
    }
  }
}
