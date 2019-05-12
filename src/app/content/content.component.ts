import {Component, OnInit} from '@angular/core';
import {ContentService} from '../services/content/content.service';
import {ActivatedRoute} from '@angular/router';
import {SubjectService} from '../services/subject/subject.service';
import {UserService} from '../services/user/user.service';

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

	users_owners = {};

	split:number = 4;

	constructor(private content_service: ContentService, private subject_service: SubjectService, private user_service: UserService, private route: ActivatedRoute) {

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
				for (let content in this.contents)
					this.get_author(this.contents[content]['id_user_owner']);

				let temp = [];
				for (let i = 0 ; i < this.contents.length ; i+=this.split)
				{
					console.log(this.contents.slice(i , i + this.split));
					temp.push(this.contents.slice(i , i + this.split));
				}
				console.log(temp);
				this.contents = temp
			},
			error1 => {
				console.log(error1);
			}
		);
	}
	get_author(id){

		if (this.users_owners[id] == undefined) {
			this.user_service.get_user(id).subscribe(
				next => {
					this.users_owners[id] = next
				},
				error1 => {
					console.log('No se puede recuperar el usuario con id ' + id);
				}
			);
		}
	}

}
