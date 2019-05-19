import {Injectable} from '@angular/core';
import * as icons from 'node_modules/file-icons-js/index.js';

@Injectable({
	providedIn: 'root'
})
export class IconsService {

	constructor() {
	}

	get_icon(filename) {
		const icon = icons.getClassWithColor(filename);
		if (icon == null) {
			return 'binary-icon';
		}
		return icon;
	}
}
