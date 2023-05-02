export default ( state = { users: [] }, action ) => {
	switch ( action.type )
	{
		case "location.user_list":
			console.log ( "location list", action.payload );
			return { ...state, users: [ ...action.payload.locations ] };
		default:
			return state;
	}
}