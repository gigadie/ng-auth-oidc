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
	@Output() onVerified = new EventEmitter<any>();
	@Output() onRefreshed = new EventEmitter<any>();

	constructor(private auth: AuthService) { }

	ngOnInit() {
		this.auth
			.verifyAuthentication()
			.then((identity: User) => {
				// on first authorisation verification
				this.onVerified.emit({
					identity: identity,
					headers: {
						authorization: this.auth.getAuthorizationHeaderValue()
					}
				});

				// on subsequent token refresh
				this.auth
					.identity$
					.subscribe((refreshedIdentity: User) => {
						this.onRefreshed.emit({
							identity: refreshedIdentity,
							headers: {
								authorization: this.auth.getAuthorizationHeaderValue()
							}
						});
					});
			})
			.catch(err => {
				console.log(err);
				if (window.location.href.indexOf(this.signInUrl || 'login.html') === -1) {
					localStorage.setItem('redirectUrl', window.location.href);
				}
				window.location.href = this.signInUrl || '/login.html';
			});
	}

}
