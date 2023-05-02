export const status2str = ( status ) =>
{
	switch ( status )
	{
		case 1: return 'Phase 0';
		case 2: return 'Running';
		case 3: return 'Closed ';
		case 4: return 'Editing';
		case 5: return 'Done';
		default:
			return '';
	}
};

export const topic2str = ( num ) =>
{
	switch ( num )
	{
		case 1: return 'undefined';
		case 2: return 'broadcast';
		case 3: return 'sport';
		case 4: return 'news';
		case 5: return 'life';
		default: return 'no_topic';
	}
};

export const kind2str = ( kind ) =>
{
	switch ( kind )
	{
		case 1: return 'undefined';
		case 2: return 'public';
		case 3: return 'reserved';
		case 4: return 'internal';
		default: return'no_kind';
	}
}
