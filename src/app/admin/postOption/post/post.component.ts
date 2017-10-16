import {Component, OnInit, ElementRef} from '@angular/core';
import {AdminServiceService} from "../../admin-service.service";
import * as firebase from "firebase";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.css']
})
export class PostComponent implements OnInit {
  post;
  post_type;
  article;
  heading;
  myfile;
  successMessage;
  file_name;
  choosePost;
  chooseHome;
  slideImage;
  onPostType;
  img_name;
    myimage;
    loadStaff;
    image_name;
    byteResult;
    totalbyte;
    byte;
    email;
    submitDisable;
    selectFileOption
    byteResultFile;
    totalbyteFile;
    byteFile;
    submitDisableFile;
    selectFileOptionFile;
    sampleImage
  constructor(private adminservice:AdminServiceService, private elem:ElementRef) { }

  ngOnInit() {
        this.myimage=sessionStorage.getItem('image');
  }

  onPost(){
    if(this.post_type=="HOME PAGE"){
      this.chooseHome=true;
      this.choosePost=false;
    }
    if(this.post_type=="NAVIGATION PAGE"){
      this.choosePost=true;
      this.chooseHome=false;
    }
  }

  onSelectPostType(){
     if(this.post=="IMAGE SLIDE"){
        this.slideImage=true;
     }else{
       this.slideImage=false;
     }
  }

  setUpload(file){
      let myfile=file[0];
      let mydate=new Date();
      this.img_name=mydate+myfile.name;
      const email=localStorage.getItem('email');
      const storageRef = firebase.storage().ref('/images').child(this.img_name);
      return storageRef.put(myfile);
  }

      // onAddImage(file){
      // let filereader:FileReader=new FileReader();
      //     filereader.onload=(e)=>{
      //         console.log("old image", filereader.result);
      //         //this.sampleImage=filereader.result;
      //         this.adminservice.sendImage(filereader.result)
      //             .subscribe((response)=>{
      //                    console.log("new image", response['message']);
      //                 this.sampleImage=response['message'];
      //         })
      //     }
      //  filereader.readAsDataURL(file[0]);
      // }

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
  onSubmitPost(form:NgForm){
    console.log('ffff');
    const  myImage=form.value.myImage;
    console.log(myImage);

    if(myImage!=null){
      const file=this.elem.nativeElement.querySelector('#myImage').files;

    }
    return this.adminservice.sendPost(this.post, this.post_type, this.img_name, this.file_name, this.article)
        .subscribe((response)=>{
          this.successMessage=response;
            this.selectFileOption=false;
            this.selectFileOptionFile=false;
          setTimeout(()=>{
            this.successMessage=null;
          }, 3000);
          form.reset();
        })
  }

  onSubmit(form:NgForm){
      const file=this.elem.nativeElement.querySelector('#myImg').files;
      let myfile2=file[0];
      let mydate=new Date();
      this.img_name=mydate+myfile2.name;
      const email=localStorage.getItem('email');
      const storageRef = firebase.storage().ref('/images').child(this.img_name);
      var myReader:FileReader = new FileReader();
      myReader.onloadend = (e) => {
          this.myimage = myReader.result;
          console.log(this.myimage)
          sessionStorage.setItem('image', this.myimage);
      }
      myReader.readAsDataURL(myfile2);
      storageRef.put(myfile2);

    //end of image
    const getfile=this.elem.nativeElement.querySelector('#myfile').files;
    let myfile=getfile[0];
    if(myfile){
      const file=this.elem.nativeElement.querySelector('#myfile').files;
      let myfile=file[0];
      let mydate=new Date();
      this.file_name=mydate+myfile.name;
      const email=localStorage.getItem('email');
      const storageRef = firebase.storage().ref('/images').child(this.file_name);
      storageRef.put(myfile);
    }
    console.log(this.img_name);
    return this.adminservice.sendPost(this.post, this.heading, this.img_name, this.file_name, this.article)
        .subscribe((response)=>{
            this.successMessage=response;
          setTimeout(()=>{
            this.successMessage=null;
          }, 3000);
            form.reset();
            myfile="";
        })
  }

  onProceed(f){
        this.onPostType=true;
  }
}
