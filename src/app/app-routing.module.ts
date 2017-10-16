import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { HomepageComponent } from './homepage/homepage.component';
import { HomePageNavComponent } from './home-page-nav/home-page-nav.component';
import { AdminstrationComponent } from './all_users/adminstration/adminstration.component';
import { LibraryComponent } from './all_users/library/library.component';
import { StudentPortalComponent } from './student/student-portal/student-portal.component';
import { TimetableComponent } from './all_users/timetable/timetable.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LogoutComponent} from "./logout/logout.component";
import {StaffPortalComponent} from "./staff/staff-portal/staff-portal.component";
import {DetailsComponent} from "./details/details.component";
import {TestingComponent} from "./testing/testing/testing.component";
import {EventsComponent} from "./all_users/events/events.component";


const appModuleRoute:Routes=[
    {path:'home', component:HomepageComponent},
    {path:'detail', component:DetailsComponent},
    {path:'nav/:id', component:HomePageNavComponent},
    {path:'administration', component:AdminstrationComponent},
    {path:'library', component:LibraryComponent},
    {path:'portal', component:StudentPortalComponent},
    {path:'staff_portal', component:StaffPortalComponent},
    {path:'timetable/:id', component:TimetableComponent},
    {path:'events/:id', component:EventsComponent},
    {path:'testing', component:TestingComponent},
    {path:'logout', component:LogoutComponent},
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'**', component:PageNotFoundComponent}
]
@NgModule({
    imports: [
        RouterModule.forRoot(
            appModuleRoute
        ),
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule {}
