import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.css']
})
export class StudentResultComponent implements OnInit {
   result=false;
  constructor() { }

  ngOnInit() {
  }

  proceed(){
    this.result=true;
  }
}
