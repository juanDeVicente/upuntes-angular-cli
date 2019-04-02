import {Component, OnInit} from '@angular/core';
import {CareerService} from '../services/career/career.service';

@Component({
	selector: 'app-career',
	templateUrl: './career.component.html',
	styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit
{
	all_careers;
	constructor(private careerService: CareerService) {
	}

	ngOnInit()
	{
		this.careerService.get_all_careers().subscribe(
			all_careers => {this.all_careers = all_careers;},
			error1 => {console.log(error1)}
		);
	}

}
