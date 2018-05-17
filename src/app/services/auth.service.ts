import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserManager, UserManagerSettings, User, WebStorageStateStore } from 'oidc-client';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private usrMngrSettings: any;
	private manager: UserManager;
	private identity: User = null;

	private user: any = null;
	private _userSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	public user$: Observable<any> = this._userSource.asObservable();

	constructor(private http: HttpClient) {
		if (!window.ngAuthOidcConfig) {
			throw new Error('Missing configuration! Please provide one.');
		}

		this.usrMngrSettings = Object.assign({
			userStore: new WebStorageStateStore({ store: window.localStorage })
		}, window.ngAuthOidcConfig);

		this.manager = new UserManager(this.usrMngrSettings);

		this.subscribeManagerEvents();
	}

	isLoggedIn(): boolean {
		return this.identity !== null && !this.identity.expired;
	}

	getAuthorizationHeaderValue(): string {
		return `${this.identity.token_type} ${this.identity.access_token}`;
	}

	startAuthentication() {
		if (window.location.href.indexOf('login.html') === -1) {
			localStorage.setItem('redirectUrl', window.location.href);
		}

		return this.manager.signinRedirect();
	}

 	completeAuthentication(): Promise<void> {
		console.debug('auth-completed');
		return this.manager.signinRedirectCallback()
				.then(identity => {
					this.setIdentity(identity);

					window.location.href = localStorage.getItem('redirectUrl') || '/';
				})
				.catch(err => {
					// this.router.navigateByUrl('/debugin');
				});
	}

	verifyAuthentication(): Promise<User> {
		let promise = new Promise<User>((resolve: (res: User) => void, reject: (err: Error) => void) => {
			this.manager
				.getUser()
				.then((identity: User) => {
					if (identity) {
						console.debug('manager.getUser with identity');
						
						this.setIdentity(identity);
						resolve(identity);
					} else if (window.location.pathname.indexOf('auth-completed') === -1) {
						console.debug('manager.getUser without identity and not on auth-completed');
						console.debug('trying manager.signinSilent to check if user is authenticated');
						
						this.tryRetrieveIdentity(resolve, reject);
					}
				})
				.catch(err => {
					reject(new Error('Unauthorized request'));
				});
		});

		return promise;
	}

	getUserInfo() {
		this
			.http
			.get(`${this.usrMngrSettings.authority}/connect/userinfo`)
			.subscribe(
				user => {
					this.user = user;
					this._userSource.next(this.user);
				},
				err => console.log(err)
			);
	}

	logout() {
		return this.manager.signoutRedirect();
	}

	private subscribeManagerEvents() {
		this.manager.events.addUserLoaded((identity) => {
			console.debug('User Loaded Event Handler');
			this.setIdentity(identity);
		});
		this.manager.events.addAccessTokenExpired(() => this.logout());
	}

	private setIdentity(identity: any) {
		this.identity = identity;
		if (identity) {
			setTimeout(() => this.getUserInfo(), 0);
		}
	}

	private tryRetrieveIdentity(resolve: (res: User) => void, reject: (err: Error) => void) {
		this.manager.signinSilent()
			.then((identity) => {
				if (identity) {
					this.setIdentity(identity);
					return resolve(identity);
				}
				reject(new Error('Unauthorized request'));
			})
			.catch((err1) => {
				reject(new Error('Unauthorized request'));
			});
	}
}
