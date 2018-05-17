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