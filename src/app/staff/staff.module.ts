import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { EditStaffProfileComponent } from './edit-staff-profile/edit-staff-profile.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { TestComponent } from './test/test.component';
import { ExamComponent } from './exam/exam.component';
import {Staff_routing_Module} from "./staff-routing.module";
import {StaffSectionComponent} from "./staff-section/staff-section.component";
import { StaffPortalComponent } from './staff-portal/staff-portal.component';
import {StaffService} from "./staff.service";
import {StaffGuardService} from "./Staff-Guard.service";
import { LogoutComponent } from './logout/logout.component';
import {LectureNoteComponent} from "./lecture-note/lecture-note.component";
import { AssignmentViewComponent } from './assignment-view/assignment-view.component';
import { LectureNoteViewComponent } from './lecture-note-view/lecture-note-view.component';
import { AssignmentSubmittedComponent } from './assignment-submitted/assignment-submitted.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {SharedModuleModule} from "../shared/shared-module/shared-module.module";


@NgModule({
  imports: [
    CommonModule,
      FormsModule,
    Staff_routing_Module,
    SharedModuleModule,

  ],
  declarations: [
    EditStaffProfileComponent,
    AssignmentComponent,
    LectureNoteComponent,
    TestComponent,
    ExamComponent,
    StaffSectionComponent,
    StaffPortalComponent,
    LogoutComponent,
    AssignmentViewComponent,
    LectureNoteViewComponent,
    AssignmentSubmittedComponent,
    ChangePasswordComponent,
  ],
  providers:[StaffService, StaffGuardService]
})
export class StaffModule { }
