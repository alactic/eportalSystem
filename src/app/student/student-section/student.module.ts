import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {StudentSectionComponent} from "./student-section.component";
import {StudentRoutingApp} from "./StudentRoutingModule.module";
import {AuthGuardService} from "../../auth-guard.service";
import {StudentAssignmentComponent} from "../student-assignment/student-assignment.component";
import {StudentQuestionComponent} from "../student-question/student-question.component";
import {StudentScoreComponent} from "../student-score/student-score.component";
import {StudentResultComponent} from "../student-result/student-result.component";
import {LectureNoteComponent} from "../lecture-note/lecture-note.component";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {StudentSectionServiceService} from "./student-section-service.service";
import {AuthService} from "../../auth.service";
import {BackendComponent} from "../../backend/backend.component";
import {PayFeesComponent} from "../schoolfees/pay-fees/pay-fees.component";
import {PrintFeesComponent} from "../schoolfees/print-fees/print-fees.component";
import {InvoiceComponent} from "../schoolfees/invoice/invoice.component";
import {RegistrationComponent} from "../courses/registration/registration.component";
import {PrintCoursesComponent} from "../courses/print-courses/print-courses.component";
import {StudentAssignmentUploadComponent} from "../student-assignment-upload/student-assignment-upload.component";
import {ViewUploadsComponent} from "../view-uploads/view-uploads.component";


@NgModule({
    declarations: [
        EditProfileComponent,
        StudentSectionComponent,
        StudentAssignmentComponent,
        StudentAssignmentUploadComponent,
        StudentQuestionComponent,
        StudentScoreComponent,
        StudentResultComponent,
        LectureNoteComponent,
        ChangePasswordComponent,
        EditProfileComponent,
        BackendComponent,
        PayFeesComponent,
        PrintFeesComponent,
        InvoiceComponent,
        RegistrationComponent,
        PrintCoursesComponent,
        ViewUploadsComponent,
        //StudentSectionComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        StudentRoutingApp


    ],
    providers:[StudentSectionServiceService,
                AuthGuardService,
                AuthService,
               ]

})
export class StudentModuleRoute { }
