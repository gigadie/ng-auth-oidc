import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-ng-auth-login',
	template: `<button class="btn btn-default" (click)="signIn()" type="button" [disabled]="loggingIn">Sign in</button>`,
	styles: [],
	encapsulation: ViewEncapsulation.Native
})
export class NgAuthLoginComponent implements OnInit {

	loggingIn = false;

	constructor(private authService: AuthService) { }

	ngOnInit() {
	}

	signIn() {
		this.loggingIn = true;
		this.authService.startAuthentication();
	}

}
