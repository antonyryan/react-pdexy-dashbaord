export function dateFromTimestamp ( ts )
{
	if ( ! ts ) ts = "";

	let _t = ts.toString ();

	// 1561630348   (shorter timestamps must be converted)
	if ( _t.length <= 10 ) _t += "000";

	return new Date ( parseInt ( _t ) );
};