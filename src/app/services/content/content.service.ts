import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ContentService {
	type: XMLHttpRequestResponseType ;
	constructor(private http: HttpClient) { }

	get_contents_from_subject(id_subject) {
		return this.http.get('http://localhost:80/contents/' + id_subject);
	}
	post_content(content_form_data: FormData){
		let headers = new HttpHeaders();
		headers.set('Content-Type', 'application/x-object');
		headers.set('Accept', "multipart/form-data");
		let params = new HttpParams();

		return this.http.post('http://localhost:80/content', content_form_data, { params, headers });
	}
	delete_content(id_content){
		return this.http.delete('http://localhost:80/content/' + id_content);
	}
	get_contents_from_user(id_user) {
		return this.http.get('http://localhost:80/contents/user/' + id_user);
	}
}
