import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {CareerService} from '../../services/career/career.service';

declare function change_modal(modal_id, modal_body_id, data): any;

@Component({
	selector: 'app-form-career',
	templateUrl: './form-career.component.html',
	styleUrls: ['./form-career.component.css']
})

export class FormCareerComponent implements OnInit {
	careers_names;

	career_form = new FormGroup({
		career_name: new FormControl('', [Validators.required]),
		image: new FormControl(null, [Validators.required, Validators.pattern('.*.svg')]),
	});

	image: File;

	image_placeholder = 'Imagen de carrera';

	constructor(private career_service: CareerService, private cd: ChangeDetectorRef) {
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

	fileChange(event) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.image = file;

			this.image_placeholder = file.name;
		}
	}

	/**
	 * Accion para realizar cuando se pulse el botón de submit
	 */
	onSubmit() {
		(<HTMLInputElement> document.getElementById('button_add_career')).disabled = true;
		document.getElementById('load_icon_add_career').style.display = 'inline';
		let form_data = new FormData();
		form_data.append('career_name', this.career_form.get('career_name').value);
		form_data.append('image', this.image);
		this.career_service.post_career(form_data).subscribe(
			(career) => {
				change_modal('modal_add_career', 'modal_add_career_body', 'Se ha añadido la carrera correctamente');
				console.log('Carrera ' + career.toString() + ' insertada');
			},
			(error1) => {
				console.log('Error al insertar la careera: ' + this.career_form.value);
				console.log(error1);
			}
		);
	}

}
