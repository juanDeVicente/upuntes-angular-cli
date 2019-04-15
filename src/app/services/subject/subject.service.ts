import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from '../../models/subject';

@Injectable({
	providedIn: 'root'
})
export class SubjectService {

	constructor(private http: HttpClient) {
	}

	public get_career_subjects(id_career) {
		return this.http.get('http://localhost:80/subjects/' + id_career);
	}
	public get_subject(id_subject){
		return this.http.get('http://localhost:80/subject/' + id_subject);
	}
	public post_subject(subject: Subject){
		return this.http.post('http://localhost:80/subject', subject);
	}
	public delete_subject(id_subject){
		return this.http.delete('http://localhost:80/subject/' + id_subject);
	}
}
