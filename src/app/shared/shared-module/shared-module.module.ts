import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "../component/footer/footer.component";
import {SubHeaderComponent} from "../component/sub-header/sub-header.component";
import {Routes, RouterModule} from "@angular/router";

const sharedModule:Routes=[]
@NgModule({
  imports: [
    CommonModule,
      RouterModule.forChild(sharedModule)

  ],
  declarations: [
    FooterComponent,
    SubHeaderComponent,
  ],
  exports:[FooterComponent,
           SubHeaderComponent,
           ],
  providers:[]
})
export class SharedModuleModule { }
