import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { auth_login } from './actions';
import { app_baseurl } from '../App/actions';

class Login extends React.Component {
	state = {
		email: 'info@example.com',
		password: 'ciao'
	}

	submit =  ( evt ) =>
	{
		evt.preventDefault ();

		this.props.dispatch ( auth_login ( this.state.email, this.state.password, this.props.history ) );
	};

	update = ( evt ) =>
	{
		const name = evt.target.name;
		const val  = evt.target.value;

		this.setState ( { [ name ] : val } );
	};

	updateBaseURL = ( evt ) =>
	{
		const b = evt.target.value;

		this.props.dispatch ( app_baseurl ( b ) );
	};

	render () 
	{
		return (
			<div>
				<Form>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input type="email" name="email" id="email" placeholder="Insert your email" onChange={this.update} value={this.state.email}/>
					</FormGroup>
					<FormGroup>
						<Label for="password">Password</Label>
						<Input type="password" name="password" id="examplePassword" placeholder="Password here" onChange={this.update} value={this.state.password}/>
					</FormGroup>
					{/*
					<FormGroup>
						<Label for="base_url">Base URL</Label>
						<Input type="text" name="base_url" onChange={this.updateBaseURL} value={this.props.base_url}/>
					</FormGroup>
					*/}
					<Button onClick={this.submit}>Login</Button>
				</Form>
			</div>
		);
	}
};

const mapStateToProps = ( state ) =>
{
	return {
		base_url: state.app.base_url
	}
};

export default connect ( mapStateToProps ) ( withRouter ( Login ) );
