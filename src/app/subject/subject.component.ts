import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CareerService} from '../services/career/career.service';
import {SubjectService} from '../services/subject/subject.service';
import {async} from 'q';

@Component({
	selector: 'app-subject',
	templateUrl: './subject.component.html',
	styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

	id_career;
	career;
	subjects_per_year;

	constructor(private route: ActivatedRoute, private career_service: CareerService, private subject_service: SubjectService) {
	}

	ngOnInit() {
		this.id_career = this.route.snapshot.paramMap.get('id_career');
		this.career_service.get_career(this.id_career).subscribe(
			career => {
				this.career = career;
			},
			error1 => {
				console.log(error1);
			}
		);
		this.subject_service.get_career_subjects(this.id_career).subscribe(
			subjects => {
				let bad_subjects = subjects;
				let bad_subjects_keys = Object.keys(bad_subjects);
				this.subjects_per_year = [];

				for (let key of bad_subjects_keys) {
					this.subjects_per_year.push(bad_subjects[key]);
				}
			},
			error1 => {
				console.log(error1);
			}
		);
	}

}
