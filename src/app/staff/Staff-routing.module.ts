import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { EditStaffProfileComponent } from './edit-staff-profile/edit-staff-profile.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { TestComponent } from './test/test.component';
import { ExamComponent } from './exam/exam.component';
import {StaffSectionComponent} from "./staff-section/staff-section.component";
import { StaffPortalComponent } from './staff-portal/staff-portal.component';
import {AuthGuardService} from "../auth-guard.service";
import {StaffGuardService} from "./Staff-Guard.service";
import {LectureNoteComponent} from "./lecture-note/lecture-note.component";
import {AssignmentViewComponent} from "./assignment-view/assignment-view.component";
import {LectureNoteViewComponent} from "./lecture-note-view/lecture-note-view.component";
import {AssignmentSubmittedComponent} from "./assignment-submitted/assignment-submitted.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const StaffRoutes:Routes=[
    {path:'staff',
        component:StaffSectionComponent,
        canActivate:[StaffGuardService],
    children:[
        {path:'', component:EditStaffProfileComponent},
        {path:'assignment', component:AssignmentComponent},
        {path:'lectureNote', component:LectureNoteComponent},
        {path:'test', component:TestComponent},
        {path:'exam', component:ExamComponent},
        {path:'view_assignment', component:AssignmentViewComponent},
        {path:'view_note', component:LectureNoteViewComponent},
        {path:'view_all_submit', component:AssignmentSubmittedComponent},
        {path:'changePassword', component:ChangePasswordComponent},
    ]}
]
@NgModule({
    imports: [
       RouterModule.forChild(StaffRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class Staff_routing_Module { }
