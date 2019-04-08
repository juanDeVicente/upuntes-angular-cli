import {Component, OnInit} from '@angular/core';
import {ContentService} from '../services/content/content.service';
import {ActivatedRoute} from '@angular/router';
import {SubjectService} from '../services/subject/subject.service';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
	id_career;
	id_subject;

	subject;
	contents;

	constructor(private content_service: ContentService, private subject_service: SubjectService, private route: ActivatedRoute) {

	}

	ngOnInit() {
		this.id_career = this.route.snapshot.paramMap.get('id_career');
		this.id_subject = this.route.snapshot.paramMap.get('id_subject');

		this.subject = this.subject_service.get_subject(this.id_subject).subscribe(
			next => {
				this.subject = next;
			},
			error1 => {
				console.log(error1);
			}
		);

		this.content_service.get_contents_from_subject(this.id_subject).subscribe(
			next => {
				this.contents = next;
			},
			error1 => {
				console.log(error1);
			}
		);

	}

}
