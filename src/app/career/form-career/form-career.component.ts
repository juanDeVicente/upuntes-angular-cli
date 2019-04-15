import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {CareerService} from '../../services/career/career.service';

@Component({
	selector: 'app-form-career',
	templateUrl: './form-career.component.html',
	styleUrls: ['./form-career.component.css']
})
export class FormCareerComponent implements OnInit {
	careers_names;

	careerForm = new FormGroup({
		career_name: new FormControl('', [Validators.required]),
		image: new FormControl('', [Validators.required, Validators.pattern('.*.png$|.*.jpg$|.*.jpeg$')]),
	});

	constructor(private career_service: CareerService) {
	}

	ngOnInit(): void {
		this.career_service.get_all_careers().subscribe(
			all_careers => {
				let careers_name = [];
				for (let elem in all_careers) {
					careers_name.push(all_careers[elem]['name']);
				}
				this.careers_names = careers_name;
			},
			error1 => {
				console.log(error1);
			}
		);
	}

	no_name_repeated(names): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			const valid = names.includes(control.value);
			return valid ? null : {'nombreNoValido': {value: control.value}};
		};
	}

	/**
	 * Accion para realizar cuando se pulse el botón de submit
	 */
	onSubmit() {
		console.log(this.careerForm.value)
		/*
		this.career_service.create_career(this.careerForm.value).subscribe(
			(career) => {
				console.log('Carrera ' + career + ' insertada');
			},
			(error1) => {
				console.log('Error al insertar la careera: ' + this.careerForm.value);
				console.log('Error: ' + error1)
			}
		);
		*/
	}

}
