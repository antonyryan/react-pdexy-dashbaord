import axios from '../axios';


export const clip_info = ( id_event, id_clip )  => {
	return function ( dispatch ) {
		axios.post ( 
			"/api/clip/info",
			{ id_event, id_clip }
		)
		.then  ( ( response ) => {
			dispatch ( {
				type: 'clip.info',
				payload: {
					info: response.data.info,
					id_event: response.data.id_event,
					id_clip: response.data.id_clip
				}
			} );
		} )

		.catch ( ( err ) => {
			console.error ( "ERROR: ", err );
			dispatch ( err );
		} );
	};
};
