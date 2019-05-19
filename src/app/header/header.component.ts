import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {User} from '../models/user';
import {ReportService} from '../services/report/report.service';
import {IconsService} from '../services/icons/icons.service';
import {ContentService} from '../services/content/content.service';
import {BreadcrumbService} from '../services/breadcrumb/breadcrumb.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	user: User;
	reports: [];

	constructor(private user_service: UserService, private router: Router, private reports_service: ReportService, private icons_service: IconsService, private content_service: ContentService, private activate_route: ActivatedRoute, private breadcrumb_service: BreadcrumbService) {
	}

	ngOnInit() {

		this.user_service.logged_user.asObservable().subscribe(
			user => {
				this.user = user;
				if (user && user.admin == 1)
					this.get_reports();
			},
			error1 => {
				console.log(error1);
			}
		);
	}

	logout() {
		this.user_service.logout();
		this.router.navigateByUrl('');
	}

	get_icon(filename) {
		return this.icons_service.get_icon(filename);
	}

	remove_report(reports_index) {
		const report = this.reports[reports_index];
		this.reports_service.delete_report(report['id_report']).subscribe(
			next =>{
				this.reports.splice(reports_index, 1);
			},
			error1 => {
				console.log(error1);
			}
		)
	}
	remove_content(reports_index) {
		const report = this.reports[reports_index];
		this.content_service.delete_content(report['id_content']).subscribe(
			next =>{
				this.get_reports();
			},
			error1 => {
				console.log(error1);
			}
		)

	}
	private get_reports()
	{
		this.reports_service.get_reports().subscribe(
			next => {
				this.reports = <[]> next;
				console.log(this.reports);
			},
			error1 => {
				console.log(error1);
			}
		);
	}
}
