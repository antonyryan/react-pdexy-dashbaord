import React from 'react';
import { connect } from 'react-redux';


import ClipTable from '../Clip/ClipTable';

class EventClip extends React.Component {
	state = {
		id: ''
	}

	render () 
	{
		return (
			<ClipTable {...this.props.details} />
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		details: state.events.details
	};
};

export default connect ( mapStateToProps ) ( EventClip );
