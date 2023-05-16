import React from 'react';
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';

export default class Example extends React.Component {
	state = {
		isOpen: true
	}

	run_debug = () =>
	{
		/*
		var Client = require ( 'electron-rpc/client');
		var client = new Client();

		client.request ( 'debug' );
		*/
	};

	render() {
		return <></>
		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand tag={Link} to="/dashboard">
						<img src={logo} className="img-fluid" alt="Pyxie Logo" /> Pyxie
					</NavbarBrand>
						<Nav className="ml-auto" navbar>
							{/*window.process ? 
								<NavItem>
									<NavLink onClick={this.run_debug}>Debug</NavLink>
								</NavItem> : null
							*/}
							<NavItem>
								<NavLink tag={Link} to="/users">Users</NavLink>
							</NavItem>
							<NavItem>
								<NavLink tag={Link} to="/events">Events</NavLink>
							</NavItem>
						</Nav>
				</Navbar>
			</div>
		);
	}
}
