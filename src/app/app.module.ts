import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
//import { HttpErrorResponse } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import {EportalServiceService} from './eportal-service.service';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {AuthServiceService} from "./auth-service.service";
import { LeftbarComponent } from './leftbar/leftbar.component';
import { HomePageNavComponent } from './home-page-nav/home-page-nav.component';
import { AdminstrationComponent } from './all_users/adminstration/adminstration.component';
import { LibraryComponent } from './all_users/library/library.component';
import { StudentPortalComponent } from './student/student-portal/student-portal.component';
import { TimetableComponent } from './all_users/timetable/timetable.component';
import {LoginserviceService} from "./loginservice.service";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {StudentModuleRoute} from "./student/student-section/student.module";
import { LogoutComponent } from './logout/logout.component';
import {StaffModule} from "./staff/staff.module";
import {AdminModule} from "./admin/admin.module";
import { AngularFireModule } from 'angularfire2';
import { O2UploadToFbsComponent } from 'o2-upload-to-fbs';
import {AuthGuardService} from "./auth-guard.service";
import {AuthService} from "./auth.service";
import { DetailsComponent } from './details/details.component';
import { TestingComponent } from './testing/testing/testing.component';
import { EventsComponent } from './all_users/events/events.component';
import {SharedModuleModule} from "./shared/shared-module/shared-module.module";
import {SharedHttpServiceService} from "./shared/service/shared-http-service.service";



export const firebaseConfig = {
  apiKey: "AIzaSyDZYmn0zuYRq_SI9RilDZSB4RlD1tOViu4",
  authDomain: "myfirebase-7eb89.firebaseapp.com",
  databaseURL: "https://myfirebase-7eb89.firebaseio.com",
  projectId: "myfirebase-7eb89",
  storageBucket: "myfirebase-7eb89.appspot.com",
  messagingSenderId: "68598418709"

};


@NgModule({
  declarations: [
    O2UploadToFbsComponent,
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    LeftbarComponent,
    HomePageNavComponent,
    AdminstrationComponent,
    LibraryComponent,
    StudentPortalComponent,
    TimetableComponent,
    PageNotFoundComponent,
    LogoutComponent,
    DetailsComponent,
    TestingComponent,
    EventsComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModuleModule,
    StaffModule,
    AdminModule,
   StudentModuleRoute,
    AppRoutingModule,
    Angular2FontawesomeModule
  ],
  providers: [SharedHttpServiceService,
              EportalServiceService,
              AuthServiceService,
              LoginserviceService,
              AuthGuardService,
              AuthService,

],
  bootstrap: [AppComponent]
})
export class AppModule { }
