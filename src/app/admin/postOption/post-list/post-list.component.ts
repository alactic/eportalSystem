import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../../admin-service.service";
import {EditStudent} from "../../../student/edit-profile/edit-student_detail";
import {NgForm} from "@angular/forms";
declare var $;
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  allPosts=[];
  successMessage;
  editSection:EditStudent;
  posts;
  id;
  showPost;
  post;
  heading;article;
  constructor(private adminservice:AdminServiceService) {
      this.getTable();
      this.close();
  }

  ngOnInit() {
     this.getAllPosts();
  }

    getTable(){
        setTimeout(function () {
                $('#myTable').DataTable();
        }, 2000);
    }
    getAllPosts(){
        return this.adminservice.getAllPost()
            .subscribe((response)=>{
                this.allPosts=response;
                this.posts=true;
            });
    }

  onDelete(event){
      if(confirm('DO YOU WANT TO PROCEED WITH THE DELETION')){
        return this.adminservice.deletePost(event)
            .subscribe((response)=>{
              this.successMessage=response;
                this.getAllPosts();
                setTimeout(()=>{
                    this.successMessage=null;
                },3000)
            })
      }
  }
    onEdit(id){
       this.id=id;
        return this.adminservice.editPost(id)
                .subscribe((response)=>{
                    this.editSection=response;
                })
        }

    onSubmit(form:NgForm){
        return this.adminservice.submitEdit(this.id, this.post, this.heading, this.article)
            .subscribe((response)=>{
                   this.successMessage=response;
                   this.editSection=null;
                   form.reset();
                   this.close();
                   this.getAllPosts();
                   this.getTable();
                    setTimeout(()=>{
                        this.successMessage=null;
                    },3000)
            })
    }
    close(){
        setTimeout(()=>{
                this.successMessage=null;
                this.editSection=null;
        }, 3000);
    }
    onclose(){
        this.editSection=null;
        this.getTable();
    }
}
