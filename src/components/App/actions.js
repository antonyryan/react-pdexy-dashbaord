export const app_login = () =>
{
	return function ( dispatch ) {
		dispatch ( {
			type: 'app.login',
		} );
	};
};

export const app_logout = () =>
{
	return function ( dispatch ) {
		dispatch ( {
			type: 'app.logout',
		} );
	};
};

export const app_baseurl = ( base_url ) =>
{
console.log ( "app_baseurl: ", base_url );
	return function ( dispatch ) {
		dispatch ( {
			type: 'app.base_url',
			payload: { base_url }
		} );
	};
};