import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CareerService} from '../services/career/career.service';
import {SubjectService} from '../services/subject/subject.service';

declare function change_modal(modal_id, modal_body_id, data): any;

@Component({
	selector: 'app-subject',
	templateUrl: './subject.component.html',
	styleUrls: ['./subject.component.css']
})

export class SubjectComponent implements OnInit {

	id_career;
	career;
	subjects_per_year;

	id_subject_to_delete;
	subject_to_delete_name;

	constructor(private route: ActivatedRoute, private career_service: CareerService, private subject_service: SubjectService) {
	}

	ngOnInit() {
		this.id_career = this.route.snapshot.paramMap.get('id_career');
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

}
