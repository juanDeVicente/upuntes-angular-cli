import {Component, OnInit} from '@angular/core';
import {CareerService} from '../services/career/career.service';
import {User} from '../models/user';
import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BreadcrumbService} from '../services/breadcrumb/breadcrumb.service';

declare function change_modal(modal_id, modal_body_id, data): any;

@Component({
	selector: 'app-career',
	templateUrl: './career.component.html',
	styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
	user: User;
	all_careers;

	//Career to delete
	id_career_to_delete;
	career_name_to_delete;
	//Career to update
	image_placeholder = 'Imagen de carrera';
	image: File;
	form_update_career = new FormGroup({
		id_career: new FormControl('', [Validators.required]),
		career_name: new FormControl('', [Validators.required]),
		image: new FormControl(null, [Validators.required, Validators.pattern('.*.svg')]),
	});

	constructor(private careerService: CareerService, private user_service: UserService, private router: Router, private breadcrumb_service: BreadcrumbService) {
	}

	ngOnInit() {

		this.breadcrumb_service.career = undefined;
		this.breadcrumb_service.subject = undefined;
		this.user_service.logged_user.asObservable().subscribe(
			user => {
				this.user = user;
				if (!this.user) {
					this.router.navigateByUrl('');
				}
			}
		);
		this.careerService.get_all_careers().subscribe(
			all_careers => {
				this.all_careers = all_careers;
			},
			error1 => {
				console.log(error1);
			}
		);
	}

	set_career_to_delete(id_career_to_delete, career_name_to_delete) {
		this.id_career_to_delete = id_career_to_delete;
		this.career_name_to_delete = career_name_to_delete;
	}

	set_career_to_update(id_career_to_update, career_name_to_update){
		this.form_update_career.controls['id_career'].setValue(id_career_to_update);
		this.form_update_career.controls['career_name'].setValue(career_name_to_update);
	}

	delete_career() {
		console.log(this.id_career_to_delete);
		(<HTMLInputElement>document.getElementById('button_delete_career')).disabled = true;
		this.careerService.delete_career(this.id_career_to_delete).subscribe(
			next =>{
				console.log('Carrera borrada');
				location.reload();
			},
				error1 =>{
					(<HTMLInputElement>document.getElementById('button_delete_career')).disabled = false;
				console.log(error1);
			}
		);
	}

	fileChange(event) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.image = file;

			console.log(this.image);

			this.image_placeholder = file.name;
		}
	}

	update_career() {
		(<HTMLInputElement>document.getElementById('btn_modify_career')).disabled = true;
		let form_data = new FormData();
		form_data.append('career_name', this.form_update_career.get('career_name').value);
		form_data.append('image', this.image);

		this.careerService.update_career(this.form_update_career.get('id_career').value, form_data).subscribe(
			next =>{
				console.log('Carrera actualizada');
				change_modal('update-career-modal', 'update-career-modal-body', 'Carrera actualizada correctamente');
			},
			error1 =>{
				console.log(error1);
				(<HTMLInputElement>document.getElementById('btn_modify_career')).disabled = false;
			}
		)

	}

}
