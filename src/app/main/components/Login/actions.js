import axios from '../axios';

import { app_login } from '../App/actions';

export const auth_login = ( email, password, history, onLoginFailed ) => {
	return function ( dispatch ) {
		axios.post ( 
			"/api/auth/login", 
			{ email, password } 
		)
		.then  ( ( response ) => {
			dispatch ( {
				type: 'auth.login',
				payload: { profile_id: response.data.id_user }
			} );

			dispatch ( app_login () );
			history.push ( "/dashboard" );
		} )

		.catch ( ( err ) => {
			console.error ( "ERROR: ", err );
			onLoginFailed();
			// dispatch ( err );
		} );
	};
};