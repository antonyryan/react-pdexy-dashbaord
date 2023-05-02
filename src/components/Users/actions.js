import axios from '../axios';

export const users_list = ( start = 0, rows = 25 )  => {
	return function ( dispatch ) {
		axios.get ( 
			"/api/users", 
			{ start, rows }
		)
		.then  ( ( response ) => {
			dispatch ( {
				type: 'users.list',
				payload: { users: response.data.users }
			} );
		} )

		.catch ( ( err ) => {
			console.error ( "ERROR: ", err );
			dispatch ( err );
		} );
	};
};