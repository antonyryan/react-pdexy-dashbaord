export default ( state = { users: [] }, action ) => {
	switch ( action.type )
	{
		case "users.list":
			return { ...state, users: [ ...action.payload.users ] };
		default:
			return state;
	}
}