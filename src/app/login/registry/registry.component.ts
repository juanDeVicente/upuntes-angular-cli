import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {RegistryService} from '../../services/registry/registry.service';

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

		this.user_service.save_user(this.form_email.value).subscribe(
			next => {
				console.log('Usuario creado!');
			},
			error1 => {
				console.log('error');
				console.log(error1);
			}
		);
	}
}
