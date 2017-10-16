import { NgModule } from '@angular/core';
import {StudentSectionComponent} from "./student-section.component";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {Routes, RouterModule} from "@angular/router";
import {StudentAssignmentComponent} from "../student-assignment/student-assignment.component";
import {StudentQuestionComponent} from "../student-question/student-question.component";
import {StudentScoreComponent} from "../student-score/student-score.component";
import {StudentResultComponent} from "../student-result/student-result.component";
import {LectureNoteComponent} from "../lecture-note/lecture-note.component";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {AuthGuardService} from "../../auth-guard.service";
import {PayFeesComponent} from "../schoolfees/pay-fees/pay-fees.component";
import {PrintFeesComponent} from "../schoolfees/print-fees/print-fees.component";
import {InvoiceComponent} from "../schoolfees/invoice/invoice.component";
import {RegistrationComponent} from "../courses/registration/registration.component";
import {PrintCoursesComponent} from "../courses/print-courses/print-courses.component";
import {StudentAssignmentUploadComponent} from "../student-assignment-upload/student-assignment-upload.component";
import {ViewUploadsComponent} from "../view-uploads/view-uploads.component";

const studentModule:Routes=[
    {
        path: 'student',
        component: StudentSectionComponent,
        canActivate:[AuthGuardService],
        children: [
            {
               path:'',
               canActivateChild:[AuthGuardService],
            children:[
                {path: '', component: EditProfileComponent},
                {path: 'std_assignment', component:StudentAssignmentComponent},
                {path: 'std_assignment_upload', component:StudentAssignmentUploadComponent},
                {path: 'std_question', component: StudentQuestionComponent},
                {path: 'std_score', component: StudentScoreComponent},
                {path: 'std_result', component: StudentResultComponent},
                {path: 'lectureNote', component: LectureNoteComponent},
                {path: 'invoice', component: InvoiceComponent},
                {path: 'payFees', component: PayFeesComponent},
                {path: 'printFees', component: PrintFeesComponent},
                {path: 'registerCourse', component: RegistrationComponent},
                {path: 'printCourse', component: PrintCoursesComponent},
                {path: 'view_all_uploads', component: ViewUploadsComponent},
            {path: 'changePassword', component: ChangePasswordComponent}

        ]
    }
    ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(studentModule)
    ],
    providers: [
    ],
    exports:[
        RouterModule
    ]
})
export class StudentRoutingApp { }
