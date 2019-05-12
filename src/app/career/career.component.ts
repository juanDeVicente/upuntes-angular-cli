import {Component, OnInit} from '@angular/core';
import {CareerService} from '../services/career/career.service';
import {User} from '../models/user';
import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

	constructor(private careerService: CareerService, private user_service: UserService, private router: Router) {
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

			this.image_placeholder = file.name;
		}
	}

	update_career() {

	}

}
