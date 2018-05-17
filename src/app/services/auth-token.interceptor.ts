import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
	constructor(private inj: Injector) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let headers = request.headers;

		const authService = this.inj.get(AuthService);
		if (authService.isLoggedIn()) {
			headers = headers.set('Authorization', authService.getAuthorizationHeaderValue());
		}

		const authRequest = request.clone({headers: headers});

		return next.handle(authRequest);
	}
}
