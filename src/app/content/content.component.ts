import {Component, OnInit} from '@angular/core';
import {PersonsService} from '../persons.service';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
	people;
	people_name = [];
	name = '';

	constructor(private personsService: PersonsService) {

	}

	ngOnInit() {
		this.personsService.get_all_persons().subscribe(
			persons => {
				this.people = persons;
			},
			error => console.log(error)
		);
	}

	on_clicked() {
		this.people_name = this.personsService.get_person_by_name(this.name);
	}


}
