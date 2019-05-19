import {Component, OnInit} from '@angular/core';
import {ContentService} from '../services/content/content.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectService} from '../services/subject/subject.service';
import {UserService} from '../services/user/user.service';
import 'rxjs/Rx';
import {User} from '../models/user';
import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {ReportService} from '../services/report/report.service';
import {IconsService} from '../services/icons/icons.service';
import {BreadcrumbService} from '../services/breadcrumb/breadcrumb.service';

declare function change_modal(modal_id, modal_body_id, data): any;

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
	user: User;

	id_career;
	id_subject;

	subject;
	contents;

	split: number = 3;

	//Delete content
	id_content_to_delete;
	content_name_to_delete;

	//Report component
	id_content_to_report;
	content_name_to_report;

	report_form = new FormGroup({
		checkboxGroup: new FormGroup({
			is_bad_content: new FormControl(false),
			is_wrong_content: new FormControl(false),
			no_subject_content: new FormControl(false),
		},
			[requireCheckboxesToBeCheckedValidator(1)])
	});

	constructor(private content_service: ContentService, private subject_service: SubjectService, private user_service: UserService, private report_service: ReportService, private icons_service :IconsService, private route: ActivatedRoute, private router: Router, private breadcrumb_service: BreadcrumbService) {

	}

	ngOnInit() {
		this.id_career = this.route.snapshot.paramMap.get('id_career');
		this.id_subject = this.route.snapshot.paramMap.get('id_subject');

		this.breadcrumb_service.set_career(this.id_career);
		this.breadcrumb_service.set_subject(this.id_subject);

		this.user_service.logged_user.asObservable().subscribe(
			user => {
				this.user = user;
				if (!this.user) {
					this.router.navigateByUrl('');
				}
			}
		);

		this.subject = this.subject_service.get_subject(this.id_subject).subscribe(
			next => {
				this.subject = next;
			},
			error1 => {
				console.log(error1);
			}
		);

		this.content_service.get_contents_from_subject(this.id_subject).subscribe(
			next => {
				this.contents = next;
				console.log(next);

				let temp = [];
				for (let i = 0; i < this.contents.length; i += this.split) {
					temp.push(this.contents.slice(i, i + this.split));
				}
				this.contents = temp;
			},
			error1 => {
				console.log(error1);
			}
		);
	}
	get_icon(filename){
		return this.icons_service.get_icon(filename);
	}
	set_content_to_delete(id_content_to_delete, content_name_to_delete) {
		this.id_content_to_delete = id_content_to_delete;
		this.content_name_to_delete = content_name_to_delete;
	}

	delete_content() {
		(<HTMLInputElement>document.getElementById('delete_content_button')).disabled = true;
		this.content_service.delete_content(this.id_content_to_delete).subscribe(
			next =>{
				console.log('Contenido borrado!');
				change_modal('delete-content-modal', 'delete-content-modal-body', 'El contenido ha sido eliminado.');
			},
			error1 => {
				console.log(error1);
			}
		)
	}

	set_content_to_report(id_content_to_report, content_name_to_report) {
		this.id_content_to_report = id_content_to_report;
		this.content_name_to_report = content_name_to_report;
	}

	report_content() {
		(<HTMLInputElement>document.getElementById('report_content_button')).disabled = true;
		const report = {
			id_content_reported: this.id_content_to_report,
			is_bad_content: this.report_form.get('checkboxGroup').get('is_bad_content').value,
			is_wrong_content: this.report_form.get('checkboxGroup').get('is_wrong_content').value,
			no_subject_content: this.report_form.get('checkboxGroup').get('no_subject_content').value
		};
		console.log(report);
		this.report_service.post_report(report).subscribe(
			next =>{
				console.log('Contenido reportado');
				change_modal('report-content-modal', 'report-content-modal-body', 'El contenido ha sido reportado, ¡gracias por hacer <img src="assets/Upuntes_Logo.svg" style="width: auto; height: 1em;"> mejor!');
			},
			error1 =>{
				console.log(error1);
			}
		)
	}
}
export function requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
	return function validate (formGroup: FormGroup) {
		let checked = 0;

		Object.keys(formGroup.controls).forEach(key => {
			const control = formGroup.controls[key];

			if (control.value === true) {
				checked ++;
			}
		});

		if (checked < minRequired) {
			return {
				requireCheckboxesToBeChecked: true,
			};
		}

		return null;
	};
}
