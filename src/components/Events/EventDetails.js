import React from 'react';

import EventForm from './EventForm';

import AppWrap from '../AppWrap/AppWrap';

class EventDetails extends React.Component {
	render () 
	{
		return (
			<AppWrap>
				<EventForm {...this.props} isDetails={true} />
			</AppWrap>
		);
	}
}

export default EventDetails;
