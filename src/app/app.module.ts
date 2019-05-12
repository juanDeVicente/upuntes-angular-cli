import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {PersonsService} from './persons.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {UserService} from './services/user/user.service';
import { FormUploadComponent } from './content/form-upload/form-upload.component';
import { NoteComponent } from './note/note.component';
import { RegistryComponent } from './login/registry/registry.component';
import {TokenInterceptor} from './token.interceptor';

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
		ProfileComponent,
		FormUploadComponent,
		NoteComponent,
		RegistryComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		ReactiveFormsModule
	],
	providers: [
		PersonsService,
		CareerService,
		SubjectService,
		ContentService,
		UserService,
		{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
		],
	bootstrap: [AppComponent]
})
export class AppModule {
}
