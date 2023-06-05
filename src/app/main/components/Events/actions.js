import axios from '../axios';
import history from '@history';

export const events_list = ( name = '', status = '', start = 0, rows = 25 )  => {
	return function ( dispatch ) {
		dispatch ( {
			type: 'events.list',
			payload: { name, status, start, rows }
		} );
	};
};

export const events_admin_list = ()  => {
	return function ( dispatch ) {
		axios.get ( 
			"/api/event/admin/list"
		)
		.then  ( ( response ) => {
			dispatch ( {
				type: "events.admin_list",
				payload: { events: response.data.events }
			} );
		} )

		.catch ( ( err ) => {
			console.error ( "ERROR: ", err );
			dispatch ( err );
		} );
	};
};

export const events_filter_set = ( name, status ) =>
{
	return function ( dispatch ) {
		dispatch ( {
			type: 'events.filter_set',
			payload: { name, status }
		} );
	};
};

export const event_details = ( id ) =>
{
	return function ( dispatch ) {
		axios.get ( 
			"/api/event/admin/" + id
		)
		.then ( ( response ) => {
			dispatch ( {
				type: 'event.details',
				payload: { details: response.data.event }
			} );
		} )

		.catch ( ( err ) => {
			console.error ( "ERROR: ", err );
			dispatch ( err );
		} );
	};
};

export const event_details_clear = () =>
{
	return function ( dispatch ) {
		dispatch ( {
			type: 'event.details_clear',
			payload: {}
		} );
	};
};

export const event_create = ( dct, onError ) => {
	return function ( dispatch ) {
		axios.post ( 
			"/api/event/create", 
			dct
		)
		.then  ( ( response ) => {
			dispatch ( {
				type: 'event.create',
				payload: { event_details: response.data }
			} );

			sessionStorage.setItem('event_create', true);
			history.push ( `/event/${response.data.event._id}` );
		} )

		.catch ( ( err ) => {
			console.error ( "ERROR: ", err );
			dispatch ( err );
		} );
	};
};

export const event_set_current = ( event_id ) =>
{
	return function ( dispatch ) {
		dispatch ( {
			type: 'event.set_current',
			payload: { event_id }
		} );
	};
};

export const event_invite = ( id_user, id_event ) =>
{
	return function ( dispatch ) {
		axios.post ( 
			"/api/event/invite",
			{ id_user, id_event }
		)

		.then ( ( response ) => {
			dispatch ( {
				type: 'event.invite',
				payload: { id_event, id_user }
			} );
		} )
		.catch ( ( err ) => {} );
	};
};

export const event_close = ( id_event ) =>
{
	return function ( dispatch ) {
		axios.post ( 
			"/api/event/close",
			{ id_event }
		)
		.then ( ( response ) =>
		{
			dispatch ( {
				type: 'event.close',
				payload: { event: response.data.event }
			} );
		} );
	};
};

export const event_reopen = ( id_event ) =>
{
	return function ( dispatch ) {
		axios.post ( 
			"/api/event/reopen",
			{ id_event }
		)
		.then ( ( response ) =>
		{
			dispatch ( {
				type: 'event.reopen',
				payload: { event: response.data.event }
			} );
		} );
	};
};

export const event_start_editing = ( id_event ) =>
{
	return function ( dispatch ) {
		axios.post ( 
			"/api/event/start_editing",
			{ id_event }
		)
		.then ( ( response ) =>
		{
			dispatch ( {
				type: 'event.start_editing',
				payload: { event: response.data.event }
			} );
		} );
	};
};

export const event_oldmode = ( id_event ) =>
{
	return function ( dispatch ) {
		axios.post ( 
			"/api/event/oldmode",
			{ id_event }
		)
		.then ( ( response ) =>
		{
			dispatch ( {
				type: 'event.oldmode',
				payload: { event: id_event, url: response.data.url }
			} );
		} );
	};
};