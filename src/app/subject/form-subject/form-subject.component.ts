import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subject} from '../../models/subject';
import {SubjectService} from '../../services/subject/subject.service';

declare function change_modal(modal_id, modal_body_id, data): any;

@Component({
	selector: 'app-form-subject',
	templateUrl: './form-subject.component.html',
	styleUrls: ['./form-subject.component.css']
})

export class FormSubjectComponent implements OnInit {

	subject_model = new FormGroup({
		year: new FormControl('', [Validators.required]),
		name: new FormControl('', [Validators.required])
	});

	public id_career;

	constructor(private route: ActivatedRoute, private subject_service: SubjectService) {
	}

	ngOnInit() {
		this.id_career = this.route.snapshot.paramMap.get('id_career');
	}

	onSubmit(){
		const subject = new Subject(null, this.id_career, this.subject_model.value['year'], this.subject_model.value['name']);
		this.subject_service.post_subject(subject).subscribe(
			value => {
				console.log('Insertado ' + value);
				change_modal('AddSubjectModal', 'modal_body_subject', 'Se ha añadido la asignatura ' + this.subject_model.value['name'] + ' correctamente.');
			},
			error1 => {
				console.log('Error al insertar ' + error1);
				change_modal('AddSubjectModal', 'modal_body_subject', 'Error al insertar.');
			}
		);
	}
}
