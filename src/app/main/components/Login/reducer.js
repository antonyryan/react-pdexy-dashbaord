export default ( state = {}, action ) => {
	switch ( action.type )
	{
		case "auth.login":
			return { ...state, profile_id: action.payload.profile_id };
		default:
			return state;
	}
}