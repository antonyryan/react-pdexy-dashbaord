import React from 'react';
import { connect } from 'react-redux';

import { events_admin_list } from '../Events/actions';

class AppWrap extends React.Component
{
	componentDidMount = ( news ) =>
	{
		this.props.dispatch ( events_admin_list () );
	}

	render ()
	{
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
};

const mapStateToProps = ( state ) => 
{
	return {
		app:  state.app,
	};
};

export default connect ( mapStateToProps ) ( AppWrap );
