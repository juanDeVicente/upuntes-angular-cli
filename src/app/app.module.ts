import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {PersonsService} from './persons.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CareerComponent } from './career/career.component';
import { SubjectComponent } from './subject/subject.component';
import {CareerService} from './services/career/career.service';
import { AppRoutingModule } from './app-routing.module';
import {SubjectService} from './services/subject/subject.service';
import {ContentService} from './services/content/content.service';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ContentComponent,
        CareerComponent,
        SubjectComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [PersonsService, CareerService, SubjectService, ContentService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
