import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';
import {User} from '../models/user';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user_form = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.pattern('.*@live.u-tad.com')]),
		password: new FormControl('', [Validators.required]),
	});

	constructor(private user_service: UserService, private router: Router) {
	}

	ngOnInit() {
		let user_logged: User;
		this.user_service.logged_user.asObservable().subscribe(
			user => user_logged = user
		);
		if (user_logged) {
			this.router.navigateByUrl('careers');
		}
	}

	onSubmit() {
		document.getElementById('wrong_login_id').hidden = true;
		(<HTMLInputElement> document.getElementById('button_login_id')).disabled = true;
		document.getElementById('load_icon_login').style.display = 'inline';
		this.user_service.login(this.user_form.get('email').value, this.user_form.get('password').value).subscribe(
			next => {
				this.router.navigateByUrl('/careers');
			},
			error1 => {
				console.log('error');
				console.log(error1);
				document.getElementById('wrong_login_id').hidden = false;
				(<HTMLInputElement> document.getElementById('button_login_id')).disabled = !this.user_form.valid;
				document.getElementById('load_icon_login').style.display = 'none';
			});
	}
}
