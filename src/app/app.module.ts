import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {ModalComponent} from './modal/modal.component';
import {PersonsService} from './persons.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CareerComponent } from './career/career.component';
import { SubjectComponent } from './subject/subject.component';
import {CareerService} from './services/career/career.service';
import { YearComponent } from './year/year.component';
import { AppRoutingModule } from './app-routing.module';
import {SubjectService} from './services/subject/subject.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ContentComponent,
        ModalComponent,
        CareerComponent,
        SubjectComponent,
        YearComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [PersonsService, CareerService, SubjectService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
