import React from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'reactstrap';

import Toolbar from '../components/Toolbar/Toolbar';

import UserList from '../components/Users/UserList';


class PageUsers extends React.Component
{
	state = {
	};

	render ()
	{
		return (
			<Container>
				<Toolbar />
				<Row>
					<Col>
						<UserList />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default connect () ( PageUsers );