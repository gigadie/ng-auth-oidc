import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-ng-auth-completed',
	template: `<ng-content></ng-content>`,
	styles: [],
	encapsulation: ViewEncapsulation.Native
})
export class NgAuthCompletedComponent implements OnInit {

	constructor(private auth: AuthService) { }

	ngOnInit() {
		this.auth.completeAuthentication();
	}

}
