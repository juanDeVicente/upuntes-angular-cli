import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CareerService} from '../services/career/career.service';
import {SubjectService} from '../services/subject/subject.service';

@Component({
	selector: 'app-subject',
	templateUrl: './subject.component.html',
	styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

	career;
	subjects;

	constructor(private route: ActivatedRoute, private career_service: CareerService, private subject_service: SubjectService) {
	}

	ngOnInit() {
		let id_career = this.route.snapshot.paramMap.get('id_career');
		this.career_service.get_career(id_career).subscribe(
			career => {
				this.career = career;
			},
			error1 => {
				console.log(error1);
			}
		);
		this.subject_service.get_career_subjects(id_career).subscribe(
			subjects => {
				this.subjects = subjects;
			},
			error1 => {
				console.log(error1);
			}
		);
	}

}
