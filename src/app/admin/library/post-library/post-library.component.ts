import {Component, OnInit, ElementRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdminServiceService} from "../../admin-service.service";
import * as firebase from "firebase";
import {resolvePtr} from "dns";

@Component({
  selector: 'app-post-library',
  templateUrl: './post-library.component.html',
  styleUrls: ['./post-library.component.css']
})
export class PostLibraryComponent implements OnInit {
  newCategory;
  newSubCategory;
  title;author;category;sub_category;
  category_id;subCategory_id;
  getAllCategories=[];
  getCategory=[];
  getSubCategory=[];
  errorMessage1;
  errorMessage2;
  addCategory;
  addSubCategory;
    byteResultFile;
    totalbyteFile;
    byteFile;
    submitDisableFile;
    selectFileOptionFile;
    submitDisable;
    file_name;
    successMessage;
  constructor(private adminservice:AdminServiceService, private elem:ElementRef) { }

  ngOnInit() {
    this.getAllCategory();
  }

  addCatetory(){
    this.newCategory="new";
    this.category_id=this.category;
      const num=this.getCategory.length;
      for(var i=0; i<num; i++){
        if(this.getCategory[i]['category'].toUpperCase()==this.category_id.toUpperCase()){
          this.errorMessage1=this.category_id+" ALREADY EXIST";
          setTimeout(()=>{this.errorMessage1=null}, 2000);
          this.category='';
          this.addCategory=false;
        }
      }
  }

  addSub(){//adding new sub category
    this.newSubCategory="new";
    this.subCategory_id=this.sub_category;
    const num=this.getSubCategory.length;
    for(var i=0; i<num; i++){
      if(this.getSubCategory[i]['category'].toUpperCase()==this.subCategory_id.toUpperCase()){
        this.errorMessage2=this.subCategory_id+" ALREADY EXIST";
        setTimeout(()=>{this.errorMessage2=null}, 2000);
        this.sub_category='';
        this.addSubCategory=false;
      }
    }
  }

  addCategoryField(){//reseting category input field
    this.category="";
  }

  addSubField(){//reseting category input field
    this.sub_category="";
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
       if(this.newCategory!="new"){//getting category id
            for(var i=0; i<this.getCategory.length; i++){
                 if(this.getCategory[i]['category']==this.category){
                       this.category_id=this.getCategory[i]['id'];
                 }
            }
       }
       if(this.newSubCategory!="new"){//getting sub category id
            for(var i=0; i<this.getSubCategory.length; i++){
                 if(this.getSubCategory[i]['category']==this.sub_category){
                       this.subCategory_id=this.getSubCategory[i]['id'];
                 }
            }
       }
       // const upload=this.elem.nativeElement.querySelector('#myUpload').files[0];
       // const fileName=new Date()+upload.name;
       // const fileStorage=firebase.storage().ref('/images').child(fileName);
       // fileStorage.put(upload);
       return this.adminservice.addBook(this.title, this.author, this.category_id, this.subCategory_id, this.file_name)
           .subscribe((response)=>{
               this.successMessage=response;
               setTimeout(()=>{this.successMessage=null}, 4000);
             form.reset();
             this.selectFileOptionFile=false;
           })
  }

  getAllCategory(){
      return this.adminservice.getCategory()
          .subscribe((response)=>{
               this.getAllCategories=response;
               const num=this.getAllCategories.length;
               for(var i=0; i<num; i++){
                   if(response[i]['status']=="category"){
                       this.getCategory.push(response[i])
                   }
                   if(response[i]['status']=="sub"){
                     this.getSubCategory.push(response[i])
                   }
               }
               console.log('my cats', this.getCategory);
              this.category='';
              this.sub_category='';
          });
  }
}
