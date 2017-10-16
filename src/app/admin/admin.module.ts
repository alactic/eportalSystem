import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Admin_Routing_Module} from './admin-routing.module';
import {FormsModule} from '@angular/forms';


import { ApproveStudentComponent } from './approve-student/approve-student.component';
import { StudentsComponent } from './student/students/students.component';
import { StaffComponent } from './staff_section/staff/staff.component';
import { ApproveBookComponent } from './approve-book/approve-book.component';
import { PostComponent } from './postOption/post/post.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { StaffRoleComponent } from './staff-role/staff-role.component';
import { LogoutComponent } from './logout/logout.component';
import {AdminGuardService} from "./admin-guard.service";
import { EditportalComponent } from './editadmin/editadmin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import {AdminServiceService} from "./admin-service.service";
import { AddFacultyComponent } from './faculty/add-faculty/add-faculty.component';
import { ListFacultyComponent } from './faculty/list-faculty/list-faculty.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { ListDepartmentComponent } from './department/list-department/list-department.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { ListCourseComponent } from './courses/list-course/list-course.component';
import { SetSchoolfeesComponent } from './payment/set-schoolfees/set-schoolfees.component';
import { ViewPaymentComponent } from './payment/view-payment/view-payment.component';
import { RegisteredCoursesComponent } from './courses/registered-courses/registered-courses.component';
import { PostListComponent } from './postOption/post-list/post-list.component';
import { ViewStudentsComponent } from './student/view-students/view-students.component';
import { ViewStaffComponent } from './staff_section/view-staff/view-staff.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PostLibraryComponent } from './library/post-library/post-library.component';
import { LibraryListComponent } from './library/library-list/library-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SharedModuleModule} from "../shared/shared-module/shared-module.module";


@NgModule({
  imports: [
    CommonModule,
    Admin_Routing_Module,
    FormsModule,
    SharedModuleModule,
  ],
  declarations: [
    ApproveStudentComponent,
    StudentsComponent,
    StaffComponent,
    ApproveBookComponent,
    PostComponent,
    AdminSectionComponent,
    StaffRoleComponent,
    LogoutComponent,
    EditportalComponent,
    AdminloginComponent,
    AddFacultyComponent,
    ListFacultyComponent,
    AddDepartmentComponent,
    ListDepartmentComponent,
    AddCourseComponent,
    ListCourseComponent,
    SetSchoolfeesComponent,
    ViewPaymentComponent,
    RegisteredCoursesComponent,
    PostListComponent,
    ViewStudentsComponent,
    ViewStaffComponent,
    ChangePasswordComponent,
    PostLibraryComponent,
    LibraryListComponent,
    DashboardComponent,
  ],
  providers:[AdminGuardService,
   AdminServiceService],

})
export class AdminModule { }
