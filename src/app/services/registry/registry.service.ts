import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class RegistryService
{
	constructor(private http: HttpClient) {
	}

	public finish_registry(token) {
		return this.http.get('http://localhost:80/registry/' + token);
	}
}
