import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CareerComponent} from './career/career.component';
import {SubjectComponent} from './subject/subject.component';

const routes: Routes = [
  {path: '', redirectTo: 'careers', pathMatch: 'full'},
  {path: 'careers', component: CareerComponent},
  {path: 'careers/:id_career', component: SubjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
