import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';

declare function change_modal(modal_id, modal_body_id, data): any;

@Component({
	selector: 'app-registry',
	templateUrl: './registry.component.html',
	styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
	form_email = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.pattern('.*@live.u-tad.com')]),
		password: new FormControl('', [Validators.required])
	});

	constructor(private user_service: UserService) {
	}

	ngOnInit() {
	}

	onSubmit() {
		(<HTMLInputElement>document.getElementById('btn-registry')).disabled = true;
		this.user_service.save_user(this.form_email.value).subscribe(
			next => {
				change_modal('register_modal', 'modal_body_register', 'Registro realizado correctamente.<br>Accede a ' + this.form_email.get('email').value + ' para continuar el registro');
			},
			error1 => {
				(<HTMLInputElement>document.getElementById('btn-registry')).disabled = true;
				console.log('error');
				console.log(error1);
			}
		);
	}
}
