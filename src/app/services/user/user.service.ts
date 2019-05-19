import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user';
import {BehaviorSubject} from 'rxjs';
import 'rxjs-compat/add/operator/map';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	public logged_user = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('logged_user')));

	constructor(private http: HttpClient) {
	}

	get_user(id_user) {
		return this.http.get('http://localhost:80/user/' + id_user);
	}

	save_user(user) {
		console.log(user);
		return this.http.post<User>('http://localhost:80/user', user);
	}

	login(email, password) {
		return this.http.post<User>('http://localhost:80/login', {email: email, password: password}).map(
			user => {
				console.log(user);
				localStorage.setItem('logged_user', JSON.stringify(user));
				this.logged_user.next(user);
			},
		);
	}

	logout() {
		localStorage.removeItem('logged_user');
		this.logged_user.next(null);
	}
	delete_user(id_user) {
		return this.http.delete('http://localhost:80/user/' + id_user);
	}
}
