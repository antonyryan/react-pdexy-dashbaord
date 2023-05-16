import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import Login from '../components/Login/Login';

import logo from '../../assets/logo.svg';


class PageLogin extends React.Component
{
	render ()
	{
		return (
			<Container>
				<Row>
					<Col md={{ offset: 4, size: 4 }}>
						<img src={logo} alt="Pyxie Logo" className="img-responsive" />
					</Col>
				</Row>
				<Row>
					<Col md={{ offset: 3, size: 6 }} >
						<Login />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default PageLogin;