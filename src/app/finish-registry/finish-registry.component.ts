import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistryService} from '../services/registry/registry.service';

@Component({
	selector: 'app-finish-registry',
	templateUrl: './finish-registry.component.html',
	styleUrls: ['./finish-registry.component.css']
})
export class FinishRegistryComponent implements OnInit {

	constructor(private route: ActivatedRoute, private registry_service: RegistryService, private router: Router) {
	}

	ngOnInit() {
		const token_registry = this.route.snapshot.paramMap.get('token');
		this.registry_service.finish_registry(token_registry).subscribe(
			next => {
				this.router.navigateByUrl('');
				window.alert('Registro finalizado correctamente');
			},
			error1 => {
				console.log(error1);
				this.router.navigateByUrl('');
				window.alert('Token incorrecto');
			}
		)
	}

}
