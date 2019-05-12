import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Career} from '../../models/career';

@Injectable({
	providedIn: 'root'
})
export class CareerService
{
	constructor(private http: HttpClient) {

	}

	get_all_careers()
	{
		return this.http.get('http://localhost:80/careers');
	}
	get_career(id_career)
	{
		return this.http.get('http://localhost:80/career/' + id_career)
	}
	post_career(career_data: FormData)
	{
		return this.http.post('http://localhost:80/career', career_data);
	}
	delete_career(id_career)
	{
		return this.http.delete('http://localhost:80/career/' + id_career);
	}
}
