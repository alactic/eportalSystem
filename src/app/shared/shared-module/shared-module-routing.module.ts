import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FooterComponent} from "../component/footer/footer.component";
import {SubHeaderComponent} from "../component/sub-header/sub-header.component";
import {HomepageComponent} from "../../homepage/homepage.component";
import {HomePageNavComponent} from "../../home-page-nav/home-page-nav.component";
import {AdminstrationComponent} from "../../all_users/adminstration/adminstration.component";
import {LibraryComponent} from "../../all_users/library/library.component";
import {StudentPortalComponent} from "../../student/student-portal/student-portal.component";
import {StaffPortalComponent} from "../../staff/staff-portal/staff-portal.component";
import {EventsComponent} from "../../all_users/events/events.component";
import {DetailsComponent} from "../../details/details.component";

const sharedModule:Routes=[
   // {path:'home', component:HomepageComponent},
    //{path:'library', component:LibraryComponent},

]
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(sharedModule)
    ],
    exports:[
        sharedModule
    ]
})
export class SharedRoutingModule { }
