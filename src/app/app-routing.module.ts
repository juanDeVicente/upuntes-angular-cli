import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CareerComponent} from './career/career.component';
import {SubjectComponent} from './subject/subject.component';
import {ContentComponent} from './content/content.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {NoteComponent} from './note/note.component';
import {RegistryComponent} from './login/registry/registry.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'careers', component: CareerComponent},
  {path: 'careers/:id_career', component: SubjectComponent},
  {path: 'careers/:id_career/:id_subject', component: ContentComponent},
  {path: 'profile/:id_user', component: ProfileComponent},
  {path: 'note/:id_content', component: NoteComponent},
  {path: 'registry/:token', component: RegistryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
