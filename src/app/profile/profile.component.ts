import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';
import {User} from '../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentService} from '../services/content/content.service';
import {IconsService} from '../services/icons/icons.service';
import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {ReportService} from '../services/report/report.service';

declare function change_modal(modal_id, modal_body_id, data): any;

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user:User;
	logged_user:User;

	contents: [];

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

	constructor(private user_service: UserService, private content_service: ContentService, private icons_service: IconsService, private report_service: ReportService, private route: ActivatedRoute, private router: Router) {
	}

	ngOnInit() {
		const id_user = this.route.snapshot.paramMap.get('id_user');
		this.user_service.get_user(id_user).subscribe(
			next =>{
				this.user = <User>next;
				if (this.user.enabled == 0)
					this.router.navigateByUrl('careers');
				this.get_contents(this.user.id_user);
			}
		);
		this.user_service.logged_user.asObservable().subscribe(
			user => {
				this.logged_user = user;
			},
			error1 => {
				console.log(error1);
			}
		);

	}

	private get_contents(user_id: number) {
		this.content_service.get_contents_from_user(user_id).subscribe(
			next =>{
				this.contents = <[]>next;
				console.log(this.contents);
			},
			error1 => {
				console.log(error1);
			}
		);
	}
	get_icon(filename) {
		return this.icons_service.get_icon(filename);
	}
	remove_content(id_content) {
		return this.content_service.delete_content(id_content).subscribe(
			next =>{
				console.log('Contenido borrado!');
				this.get_contents(this.user.id_user);
			},
			error1 => {
				console.log(error1);
			}
		);
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
				change_modal('report-content-modal', 'report-content-modal-body', 'El contenido ha sido reportado, ¡gracias por hacer u-puntes mejor!');
			},
			error1 =>{
				console.log(error1);
			}
		)
	}
	delete_user()
	{
		this.user_service.delete_user(this.user.id_user).subscribe(
			next =>{
				console.log('usuario expulsado');
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

