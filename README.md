# ng-auth-oidc
***
#### OAuth2 Implicit Flow with OpenID Connect (e.g. identity-server4) implemented with Angular Elements

The goal of this library is to give an out-of-the-box solution to implement Authentication/Authorisation in any Front End application or website, which is using the standard OpenID Connect.

> **Note**: The implementation has been carried out considering identity-server4 as Identity Server, but it should work with any Identity Server which implements the standard. In the demo project, the file `auth-oidc-config-template.js` is the object representing the configuration of the client recognised by the server, again the template has been created with in mind [identity-server4](https://identityserver4.readthedocs.io/).

## Dependencies

- [angular](https://angular.io/) (6.x.x)
- [oidc-client.js](https://github.com/IdentityModel/oidc-client-js) (1.5.x)

## How to Install
```shell
npm install ng-auth-oidc --save
```

## How to use
You can always refer to the demo project, but it's pretty straightforward.
In your application html file all you need to do is to load the configuration file, (there is an example in `demo/assets/auth-oidc-config-template.js`). Example of config file:
```javascript
/* User client settings for OpenID Connect Server*/
var ngAuthOidcConfig = {
	authority: 'url/to/identity/server',
	client_id: 'your_client_id',
	redirect_uri: 'url/to/this/app/auth-completed.html',
	post_logout_redirect_uri: 'url/to/this/app',
	response_type: 'id_token token',
	scope: 'openid profile api1',
	filterProtocolClaims: true,
	loadUserInfo: true,
	automaticSilentRenew: true,
	silent_redirect_uri: 'url/to/this/app/silent-refresh.html'
};
```
Right after you need to load the library you can find in `dist/ng-auth-oidc/assets/ng-auth-oidc.min.js`. The order is necessary.
#### This is how to load the library:
```html
<script type="text/javascript" src="path/to/your/auth-oidc-config.js"></script>
<script type="text/javascript" src="path/to/dist/ng-auth-oidc/assets/ng-auth-oidc.min.js"></script>
```

And then you are automatically able to use the Custom Elements in your html, which are the following:
* **ng-auth-guard** - this element will be needed in every private/protected page of your application. It will be responsible of verifying the current user is autheticated. If the user is not autheticated it will redirect to a specific configurable page or by default to the `/login.html` page of your website. If the user is authenticated it will provide silent refresh (for this you need to configure a silent-refresh.html page in your project). This accepts a param `signInUrl` and exposes an event `onVerified` you can listen to.
* **ng-auth-login** - this element needs to be included in your `login.html` page. It renders a simple button, so you can style it the way you prefer, when clicked it triggers a redirection (with the configuration of your specific client) to the specified identity server uri.
* **ng-auth-completed** - this element need to be included in your `auth-completed.html` page. Which you configured in the config file.
* **ng-auth-signout** - this element needs to be included in every private/protected page where you want to give the user the ability to sign-out. It renders a simple button, so you can style it the way you prefer, when clicked it triggers a redirection (with the configuration of your specific client) to the specified identity server signout uri.
&NewLine;
&NewLine;

#### Full example below:
> index.html
```html
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>NgAuthOidc</title>
	<base href="/">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
	<h1>NG-Auth OIDC</h1>
	<h2>This is a public page</h2>
	<a href="/private.html">Link to a private page</a>
</body>
</html>
```
> private.html
```html
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>NgAuthOidc</title>
	<base href="/">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<style>
		.auth-mask {
			background-color: #FFF;
			position: fixed; left: 0; top: 0; width: 100%; height: 100%;
			display: flex; justify-content: center; align-items: center;
		}
	</style>
	<!-- Load here the config file -->
	<script type="text/javascript" src="/assets/auth-oidc-config.js"></script>
</head>
<body>
	<h1>NG-Auth OIDC</h1>
	<h1>This is a private page</h1>

	<auth-guard signInUrl="/login.html"></auth-guard>
	<div class="signout"> <!-- if you want to style the sign-out button -->
		<auth-signout></auth-signout>
	</div>
	<div class="auth-mask" style="">Loading...</div>
	
    <!-- Load here the library -->
	<script type="text/javascript" src="./assets/ng-auth-oidc.min.js"></script>

    <!-- An example of subscribing to onVerified event -->
	<script>
		const authGuard = document.querySelector('auth-guard');
		authGuard.addEventListener('onVerified', (data) => {
			const authMask = document.querySelector('.auth-mask');
			if (authMask) {
				if (authMask.hasOwnProperty('remove')) {
					authMask.remove();
				} else {
					authMask.parentNode.removeChild(authMask);
				}
			}
		});
	</script>
</body>
</html>
```
> login.html
```html
<!DOCTYPE html><html lang="en"><head>
	<meta charset="utf-8">
	<title>Sign-in</title>
	<base href="/">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script type="text/javascript" src="./assets/auth-oidc-config.js"></script>
</head>
<body>
	<h1>You need to sign in</h1>
	<auth-login></auth-login>
	<script type="text/javascript" src="./assets/ng-auth-oidc.min.js"></script>
</body>
</html>
```
The following two pages are required by OpenID Connect to implement the implicit flow.
> silent-refresh.html
```html
<!doctype html>
<html lang="en">
	<head></head>
	<body>
		<script type="text/javascript" src="./assets/oidc-client/oidc-client.min.js"></script>
		<script type="text/javascript">
			new Oidc.UserManager()
					.signinSilentCallback()
					.then(() => {})
					.catch((err) => console.log(err));
		</script>
	</body>
</html>
```
> silent-signout.html
```html
<!doctype html>
<html lang="en">
	<head>
		<script type="text/javascript" src="./assets/auth-oidc-config.js"></script>
	</head>
	<body>
		<script type="text/javascript" src="./assets/oidc-client/oidc-client.js"></script>
		<script type="text/javascript">
			if (!ngAuthOidcConfig) {
				throw new Error('Missing configuration! Please provide one.');
			}

			const usrMngr = new Oidc.UserManager({ 
				authority: ngAuthOidcConfig.authority,
				client_id: ngAuthOidcConfig.client_id,
				userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })
			});

			usrMngr.removeUser()
					.then((aa) => console.log(aa))
					.catch((err) => console.log(err));
		</script>
	</body>
</html>
```

&NewLine;

***
For more info related to implicit flow and Auth2 OpenID Connect, I would suggest you to have a look at [OpenID Connect](http://openid.net/connect/), and Scott Brady's [Post 1](https://www.scottbrady91.com/OpenID-Connect/Silent-Refresh-Refreshing-Access-Tokens-when-using-the-Implicit-Flow) and [Post 2](https://www.scottbrady91.com/Angular/SPA-Authentiction-using-OpenID-Connect-Angular-CLI-and-oidc-client).