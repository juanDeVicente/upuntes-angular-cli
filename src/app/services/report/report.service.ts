import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ReportService {

	constructor(private http: HttpClient) {
	}

	post_report(report) {
		return this.http.post('http://localhost:80/report', report);
	}
	get_reports() {
		return this.http.get('http://localhost:80/reports');
	}
	delete_report(id_report: number) {
		return this.http.delete('http://localhost:80/report/' + id_report);
	}
}
