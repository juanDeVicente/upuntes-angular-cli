import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentService} from '../../services/content/content.service';

declare function change_modal(modal_id, modal_body_id, data): any;

@Component({
	selector: 'app-form-upload',
	templateUrl: './form-upload.component.html',
	styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

	id_career;
	id_subject;

	form_update = new FormGroup({
		content_name: new FormControl('', [Validators.required]),
		period: new FormControl('', [Validators.required]),
		content_file: new FormControl('', [Validators.required])
	});

	content: File;

	content_placeholder = 'Contenido';

	constructor(private route: ActivatedRoute, private content_service: ContentService, private router: Router) {
	}

	ngOnInit() {
		this.id_career = this.route.snapshot.paramMap.get('id_career');
		this.id_subject = this.route.snapshot.paramMap.get('id_subject');
	}

	onSubmit() {
		(<HTMLInputElement>document.getElementById('upload-content-button')).disabled = true;
		let form_data = new FormData();
		form_data.append('content_name', this.form_update.get('content_name').value);
		form_data.append('id_subject', this.id_subject);
		form_data.append('period', this.form_update.get('period').value);
		form_data.append('content', this.content);

		this.content_service.post_content(form_data).subscribe(
			next =>{
				change_modal('upload-file-modal', 'upload-file-modal-modal-body', 'El contenido ha sido subido');
			},
			error1 => {
				console.log(error1);
			}
		)

	}
	fileChange(event) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			if (file.size/1024/1024 > 200)
			{
				window.alert('El tamaño del archivo debe ser menor o igual que 200MB');
				this.form_update.patchValue({content_file: ''});
				return;
			}
			this.content = file;


			this.form_update.patchValue({content_name: file.name});
			this.content_placeholder = file.name;
		}
	}

}
