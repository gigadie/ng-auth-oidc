import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './services/auth-token.interceptor';

import { NgAuthGuardComponent } from './ng-auth-guard/ng-auth-guard.component';
import { NgAuthCompletedComponent } from './ng-auth-completed/ng-auth-completed.component';
import { NgAuthLoginComponent } from './ng-auth-login/ng-auth-login.component';
import { NgAuthSignoutComponent } from './ng-auth-signout/ng-auth-signout.component';

export const NgAuthOidcElements = [
	NgAuthGuardComponent,
	NgAuthCompletedComponent,
	NgAuthLoginComponent,
	NgAuthSignoutComponent
];

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthTokenInterceptor,
		multi: true
	}],
	declarations: [
		...NgAuthOidcElements
	],
	entryComponents: [
		...NgAuthOidcElements
	]
})
export class AppModule {
	constructor(private injector: Injector) {
		const authGuard = createCustomElement(NgAuthGuardComponent, { injector });
		customElements.define('auth-guard', authGuard);

		const authLogin = createCustomElement(NgAuthLoginComponent, { injector });
		customElements.define('auth-login', authLogin);

		const authCompleted = createCustomElement(NgAuthCompletedComponent, { injector });
		customElements.define('auth-completed', authCompleted);

		const authSignout = createCustomElement(NgAuthSignoutComponent, { injector });
		customElements.define('auth-signout', authSignout);
	}

	ngDoBootstrap() { }
}
