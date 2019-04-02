import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class SubjectService {

	constructor(private http: HttpClient) {
	}

	public get_career_subjects(id_career) {
		return this.http.get('http://localhost:80/subject/' + id_career);
	}
}
