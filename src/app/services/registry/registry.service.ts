import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class RegistryService
{
	constructor(private http: HttpClient) {
	}

	public post_registry(email) {
		return this.http.post('http://localhost:80/registry', {email: email});
	}
}
