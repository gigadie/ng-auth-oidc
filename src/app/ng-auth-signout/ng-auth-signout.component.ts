import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-ng-auth-signout',
	template: `<button class="btn btn-default" (click)="signOut()" type="button" [disabled]="signingOut">Sign out</button>`,
	styles: [],
	encapsulation: ViewEncapsulation.Native
})
export class NgAuthSignoutComponent implements OnInit {

	signingOut = false;

	constructor(private authService: AuthService) { }

	ngOnInit() {
	}

	signOut() {
		this.signingOut = true;
		this.authService.logout();
	}

}
