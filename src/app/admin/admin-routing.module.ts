import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ApproveStudentComponent } from './approve-student/approve-student.component';
import { StudentsComponent } from './student/students/students.component';
import { StaffComponent } from './staff_section/staff/staff.component';
import { ApproveBookComponent } from './approve-book/approve-book.component';
import { PostComponent } from './postOption/post/post.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { StaffRoleComponent } from './staff-role/staff-role.component';
import {AdminGuardService} from "./admin-guard.service";
import {AdminloginComponent} from "./adminlogin/adminlogin.component";
import {EditportalComponent} from "./editadmin/editadmin.component";
import {AddFacultyComponent} from "./faculty/add-faculty/add-faculty.component";
import {ListFacultyComponent} from "./faculty/list-faculty/list-faculty.component";
import {AddDepartmentComponent} from "./department/add-department/add-department.component";
import {ListDepartmentComponent} from "./department/list-department/list-department.component";
import {AddCourseComponent} from "./courses/add-course/add-course.component";
import {ListCourseComponent} from "./courses/list-course/list-course.component";
import {SetSchoolfeesComponent} from "./payment/set-schoolfees/set-schoolfees.component";
import {ViewPaymentComponent} from "./payment/view-payment/view-payment.component";
import {RegisteredCoursesComponent} from "./courses/registered-courses/registered-courses.component";
import {PostListComponent} from "./postOption/post-list/post-list.component";
import {ViewStudentsComponent} from "./student/view-students/view-students.component";
import {ViewStaffComponent} from "./staff_section/view-staff/view-staff.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {PostLibraryComponent} from "./library/post-library/post-library.component";
import {LibraryListComponent} from "./library/library-list/library-list.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const Admin_Routing:Routes=[
    {
        path: 'admin',
        canActivate:[AdminGuardService],
        component: AdminSectionComponent,
        children: [
            {path:'', component:DashboardComponent},
            {path: 'edit', component: EditportalComponent},
            {path: 'addStudent', component: StudentsComponent},
            {path: 'staff', component: StaffComponent},
            {path: 'addFaculty', component: AddFacultyComponent},
            {path: 'listFaculty', component: ListFacultyComponent},
            {path: 'addDept', component: AddDepartmentComponent},
            {path: 'listDept', component: ListDepartmentComponent},
            {path: 'addCourse', component: AddCourseComponent},
            {path: 'listCourse', component: ListCourseComponent},
            {path: 'setSchoolfees', component: SetSchoolfeesComponent},
            {path: 'registeredCourses', component: RegisteredCoursesComponent},
            {path: 'viewPayment', component: ViewPaymentComponent},
            {path:'approve_book', component:ApproveBookComponent},
            {path:'post', component:PostComponent},
            {path:'staff_role', component:StaffRoleComponent},
            {path:'postList', component:PostListComponent},
            {path:'viewStudents', component:ViewStudentsComponent},
            {path:'viewStaff', component:ViewStaffComponent},
            {path:'changepassword', component:ChangePasswordComponent},
            {path:'libraryPost', component:PostLibraryComponent},
            {path:'libraryList', component:LibraryListComponent},
        ]
    },
    {path:'admin/portal/login', component:AdminloginComponent}
    ]

@NgModule({
    imports:[
        RouterModule.forChild(Admin_Routing)
    ],
    exports:[
        RouterModule
    ]
})
export class Admin_Routing_Module{}
