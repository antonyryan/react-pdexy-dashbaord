import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { Form, FormGroup, Label, Input } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
				<Grid container>
					<Grid item xs={12}>
						<TextField
							id="email"
							name="email"
							label="Email"
							value={this.state.email}
							onChange={this.update}
							margin="normal"
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							id="password"
							name="password"
							type="password"
							label="Password"
							value={this.state.password}
							onChange={this.update}
							margin="normal"
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={12} align='center'>
						<Button variant='contained' onClick={this.submit}>Login</Button>
					</Grid>
				</Grid>
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
