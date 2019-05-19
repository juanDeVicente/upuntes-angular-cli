import {Injectable} from '@angular/core';
import {CareerService} from '../career/career.service';
import {SubjectService} from '../subject/subject.service';


@Injectable({
	providedIn: 'root'
})
export class BreadcrumbService {
	career: {id_career, name};
	subject: {id_subject, name};

	constructor(private career_service: CareerService, private subject_service: SubjectService) {

	}
	set_career(id_career) {
		this.career_service.get_career(id_career).subscribe(
			next =>{
				// @ts-ignore
				this.career = {id_career: id_career, name: next.name};
			}
		)
	}
	set_subject(id_subject) {
		if (id_subject == undefined) {
			this.subject = undefined;
			return;
		}
		this.subject_service.get_subject(id_subject).subscribe(
			next =>{
				// @ts-ignore
				this.subject = {id_subject: id_subject, name: next.name};
			}
		)
	}
}
