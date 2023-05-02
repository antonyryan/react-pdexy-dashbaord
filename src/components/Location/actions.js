import axios from '../axios';

export const location_user_list = () => {
	return function ( dispatch ) {
		axios.get ( 
			"/api/location/list", {
				params: {
					ref: 'user',
					rows: 99999
				}
			}
		)
		.then  ( ( response ) => {
			dispatch ( {
				type: 'location.user_list',
				payload: { locations: response.data.locations }
			} );
		} )

		.catch ( ( err ) => {
			console.error ( "ERROR: ", err );
			dispatch ( err );
		} );
	};
};