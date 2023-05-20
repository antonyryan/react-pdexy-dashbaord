import React from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'reactstrap';

import Toolbar from '../components/Toolbar/Toolbar';
import EventForm from '../components/Events/EventForm';
import AppWrap from '../components/AppWrap/AppWrap';
import Box from '@material-ui/core/Box';

import { event_set_current, events_admin_list } from '../components/Events/actions';

class PageDashboard extends React.Component
{
	componentDidMount = () =>
	{
		this.props.dispatch ( events_admin_list () );
		this.props.dispatch ( event_set_current ( null ) );
	}

	render ()
	{
		return (
			<Container>
				<Toolbar />
				<Row>
					<Col>
						<AppWrap>
							<Box p={3}>
								<EventForm event={null} />
							</Box>
						</AppWrap>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default connect () ( PageDashboard );