export default ( state = { list: [], filters: { name: 'ciao' }, details: {}, current_event_id: null }, action ) => {
	var name, status, rows, start, list, details, ev, event;

	switch ( action.type )
	{
		case "events.list":
			name   = action.payload.name   || '';
			status = parseInt ( action.payload.status || 0 );
			rows   = action.payload.rows   || 25;
			start  = action.payload.start  || 0;
			list   = [];

			name = name.toLowerCase ();

			const ent = Object.values ( state.details );

			list = ent.filter ( ( e ) =>
			{
				let valid = true;

				if ( name && e.event.name.toLowerCase ().indexOf ( name ) === -1 ) valid = false;
				if ( status && e.event.status !== status ) valid = false;

				return valid;
			} );

			return { ...state, list };

		case "events.admin_list":
			details = {};
			list = [];

			action.payload.events.map ( ( ev ) => details[ev.event._id] = ev );

			return { ...state, details, list };

		case "events.filter_set":
			name   = action.payload.name   || '';
			status = parseInt ( action.payload.status || 0 );

			name = name.toLowerCase ();

			return { ...state, filters: { name, status } };

		case "event.close":
		case "event.reopen":
		case "event.start_editing":
			event = action.payload.event;

			details = { ...state.details };
			ev = details [ event._id ];
			ev.event = { ...event };
			details [ event._id ] = ev;
			list = [ ...state.list ];

			return { ...state, details, list };

		case "event.oldmode":
			ev = action.payload.event;

			console.log ( "OLD MODE: ", action.payload );

			window.location = action.payload.url + "/events/oldmode/" + ev;

			return state;

		case "event.details":
			return { ...state, details: action.payload.details };

		case "event.details_clear":
			return { ...state, details: {} };

		case "event.invite":
			details = { ...state.details };
			ev = details [ action.payload.id_event ];
			ev.event.invited.push ( action.payload.id_user );
			details [ action.payload.id_event ] = ev;

			list = [ ...state.list ];

			return { ...state, details, list };

		case "event.create":
			const created_event = action.payload.event_details;
			return {
				...state,
				details: { ...state.details, [created_event.event._id]: created_event }
			};
			
			return state;   // { ...state, profile_id: action.payload.profile_id };

		case "event.set_current":
			return { ...state, current_event_id: action.payload.event_id };

		case "clip.info":
			console.log ( "CLIP INFO", action.payload );

			return state;

		default:
			return state;
	}
}