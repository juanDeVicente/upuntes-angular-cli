import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {PersonsService} from './persons.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CareerComponent} from './career/career.component';
import {SubjectComponent} from './subject/subject.component';
import {CareerService} from './services/career/career.service';
import {AppRoutingModule} from './app-routing.module';
import {SubjectService} from './services/subject/subject.service';
import {ContentService} from './services/content/content.service';
import {LoginComponent} from './login/login.component';
import { FormCareerComponent } from './career/form-career/form-career.component';
import { FormSubjectComponent } from './subject/form-subject/form-subject.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ContentComponent,
		CareerComponent,
		SubjectComponent,
		LoginComponent,
		FormCareerComponent,
		FormSubjectComponent,
		ProfileComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		ReactiveFormsModule
	],
	providers: [PersonsService, CareerService, SubjectService, ContentService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
