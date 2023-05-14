import React from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'reactstrap';

import Toolbar from '../components/Toolbar/Toolbar';

import EventList from '../components/Events/EventList';

import { events_admin_list } from '../components/Events/actions';

class PageEvents extends React.Component
{
	state = {
		details_loaded: false
	};

	componentDidMount = () =>
	{
		const objs = Object.keys ( this.props.details );

		if ( ! objs.length )
			this.props.dispatch ( events_admin_list () );
		else
			this.setState ( { details_loaded: true } );
	}

	componentWillReceiveProps = ( newProps, oldProps ) =>
	{
		this.setState ( { details_loaded: true } );
	}

	render ()
	{
		return (
			<Container>
				<Toolbar />
				{ this.state.details_loaded ?
					( <Row>
					<Col>
						<EventList />
					</Col>
					</Row>
					)  : 'Loading...' }
			</Container>
		);
	}
}

const mapStateToProps = ( state ) => 
{
	return {
		details: state.events.details
	}
}

export default connect ( mapStateToProps ) ( PageEvents );