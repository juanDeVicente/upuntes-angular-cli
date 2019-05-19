import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CareerService} from '../services/career/career.service';
import {SubjectService} from '../services/subject/subject.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from '../models/subject';
import {User} from '../models/user';
import {UserService} from '../services/user/user.service';
import {BreadcrumbService} from '../services/breadcrumb/breadcrumb.service';

declare function change_modal(modal_id, modal_body_id, data): any;

@Component({
	selector: 'app-subject',
	templateUrl: './subject.component.html',
	styleUrls: ['./subject.component.css']
})

export class SubjectComponent implements OnInit {

	user:User;

	id_career;
	career;
	subjects_per_year;

	id_subject_to_delete;
	subject_to_delete_name;

	id_subject_to_update;

	form_update_subject = new FormGroup({
		name: new FormControl('', [Validators.required]),
		year: new FormControl('', [Validators.required]),
	});

	constructor(private route: ActivatedRoute, private career_service: CareerService, private subject_service: SubjectService, private user_service: UserService, private router: Router, private breadcrumb_service: BreadcrumbService) {
	}

	ngOnInit() {

		this.user_service.logged_user.asObservable().subscribe(
			user => {
				this.user = user;
				if (!this.user) {
					this.router.navigateByUrl('');
				}
			}
		);

		this.id_career = this.route.snapshot.paramMap.get('id_career');
		this.breadcrumb_service.set_career(this.id_career);
		this.breadcrumb_service.subject = undefined;

		this.career_service.get_career(this.id_career).subscribe(
			career => {
				this.career = career;
			},
			error1 => {
				console.log(error1);
			}
		);
		this.subject_service.get_career_subjects(this.id_career).subscribe(
			subjects => {
				let bad_subjects = subjects;
				let bad_subjects_keys = Object.keys(bad_subjects);
				this.subjects_per_year = [];

				for (let key of bad_subjects_keys) {
					this.subjects_per_year.push(bad_subjects[key]);
				}
			},
			error1 => {
				console.log(error1);
			}
		);
	}

	set_subject_to_delete(id_subject_to_delete, subject_to_delete_name){
		this.id_subject_to_delete = id_subject_to_delete;
		this.subject_to_delete_name = subject_to_delete_name;
	}

	delete_subject() {
		this.subject_service.delete_subject(this.id_subject_to_delete).subscribe(
			value => {
				change_modal('delete-subject-modal', 'delete-subject-modal-body', 'La asignatura ' + this.subject_to_delete_name + ' ha sido borrada.');
				this.id_subject_to_delete = null;
				this.subject_to_delete_name = null;
			},
			error1 => {
				console.log('Error al borrar la asignatura ' + this.subject_to_delete_name + ' con id ' + this.id_subject_to_delete);
			},
		);
	}

	set_subject_to_update(id_subject_to_update, subject_to_update_name, subject_to_update_year) {
		this.id_subject_to_update = id_subject_to_update;
		this.form_update_subject.setValue({name: subject_to_update_name, year: subject_to_update_year});
	}

	update_subject() {
		console.log(this.form_update_subject.get('name').value);
		this.subject_service.put_subject(new Subject(this.id_subject_to_update, this.id_career, this.form_update_subject.get('year').value, this.form_update_subject.get('name').value)).subscribe(
			value => {
				console.log('Asignatura actualizada');
				change_modal('update-subject-modal', 'update-subject-modal-body', 'La asignatura ' + this.form_update_subject.get('name').value + ' ha sido actualizada');
			},
			error1 => {
				console.log('error');
				console.log(error1);
			}
		);
	}

}
