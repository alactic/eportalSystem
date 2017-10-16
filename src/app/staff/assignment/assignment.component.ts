import {Component, OnInit, ElementRef} from '@angular/core';
import {AdminServiceService} from "../../admin/admin-service.service";
import {EditStudent} from "../../student/edit-profile/edit-student_detail";
import {StudentSectionServiceService} from "../../student/student-section/student-section-service.service";
import {NgForm} from "@angular/forms";
import * as firebase from "firebase";
import {StaffService} from "../staff.service";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
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
  view_all_assignment:EditStudent;
  viewAssignment:EditStudent;
  showlist;
  errorMessage;
  successMessage;
  emptyField;
  showError;
  submission;
    byteResultFile;
    totalbyteFile;
    byteFile;
    submitDisableFile;
    selectFileOptionFile;
    submitDisable;
    file_name;
    facultyStatus

  constructor(private staffservice:StaffService, private studentservice: StudentSectionServiceService, private adminservice:AdminServiceService, private elem:ElementRef ) { }

  ngOnInit() {
       this.email=localStorage.getItem('email');
  }

  //fetching all faculty
  getFacultyDetail(){
    return this.adminservice.getFaculty()
        .subscribe((response)=>{
          this.editfaculty=response;
            console.log(this.editfaculty);
          this.facultyStatus=true;
        });
  }

  onGetFaculty(){
    return this.adminservice.fetchDepartment(this.faculty)//fetching dept based on its faculty
        .subscribe((response)=>{
          this.getDepartments=response;
            console.log(this.getDepartments);
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
    if(myfile==null){
        this.emptyField="UPLOAD FIELD IS EMPTY";
        this.showError=true;
    }else{
        // let mydate=new Date();
        // const file_name=mydate+myfile.name;
        // const storageRef = firebase.storage().ref('/images').child(file_name);
        // storageRef.put(myfile);
        this.errorMessage=false;
        return this.staffservice.assignment(this.email, level,semester,submission, department, course, note, this.file_name, myfile.name)
            .subscribe((response)=>{
                this.selectFileOptionFile=false;
                this.successMessage="UPLOAD WAS SUCCESSFUL";
                setTimeout(()=>{this.successMessage=null}, 4000)
                form.reset();
                this.emptyField="";

            })
    }

  }

    closeResponse(){
        setTimeout(()=>{
            this.successMessage="";
        })
    }
    view_all(){
      this.successMessage=false;
      this.errorMessage=false;
      return this.staffservice.view_all_assignment(this.email)
          .subscribe((response)=>{
             this.view_all_assignment=response;
             if(response==""){
                 this.errorMessage="YOU DO NOT GIVE ASSIGNMENT";
             }else{
                 this.showlist=true;
             }
             //console.log(this.view_all_assignment);

          })
    }

    onView(id){
        this.staffservice.onViewAssignment(id)
            .subscribe((response)=>{
                this.viewAssignment=response;
                console.log(response);
            })
    }

    onDelete(id){
        if(confirm('DO YOU WANT TO CONTINUE WITH THE DELETION')){
            this.staffservice.onDeleteAssignment(id)
                .subscribe((response)=>{
                    this.successMessage=response;
                    this.view_all();
                })
        }
    }
}
