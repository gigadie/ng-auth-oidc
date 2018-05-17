import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';

import { User } from 'oidc-client';

import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-ng-auth-guard',
	template: ``,
	styles: [],
	encapsulation: ViewEncapsulation.Native
})
export class NgAuthGuardComponent implements OnInit {

	@Input() signInUrl: string;
	@Output() onVerified = new EventEmitter<string>();

	constructor(private auth: AuthService) { }

	ngOnInit() {
		this.auth
			.verifyAuthentication()
			.then((identity: User) => {
				console.debug(`Identity verified: ${JSON.stringify(identity)}`);
				this.onVerified.emit('Identity verified');
			})
			.catch(err => {
				console.log(err);
				window.location.href = this.signInUrl || '/login.html';
			});
	}

}
