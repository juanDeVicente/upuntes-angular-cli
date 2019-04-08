import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ContentService {

	constructor(private http: HttpClient) { }

	get_contents_from_subject(id_subject) {
		return this.http.get('http://localhost:80/contents/' + id_subject);
	}
}
