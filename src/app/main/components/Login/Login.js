import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import logo from 'app/assets/logo.svg';
import { auth_login } from './actions';
import { app_baseurl } from '../App/actions';


const styles = {
	notify: {
		minHeight: 50
	}
}

class Login extends React.Component {
	state = {
		email: 'info@example.com',
		password: 'ciao',
		notify: false,
		doing: false
	}

	submit =  ( evt ) =>
	{
		evt.preventDefault ();

		this.setState({ doing: true, notify: false });
		clearTimeout(this.timer);

		this.props.dispatch ( auth_login (
			this.state.email,
			this.state.password,
			this.props.history,
			this.handleLoginFailed
		) );
	};

	handleLoginFailed = () => {
		this.setState({
			notify: true,
			doing: false
		}, () => {
			this.timer = setTimeout(() => this.setState({ notify: false }), 3000)
		})
	}

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
			<>
				<div className='text-center'>
					<img src={logo} alt="Pyxie Logo" className="img-responsive w-1/3"/>
				</div>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							id="email"
							name="email"
							label="Email"
							value={this.state.email}
							onChange={this.update}
							margin="normal"
							// variant="outlined"
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
							// variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={12} align='center'>
						<Button
							variant='contained'
							onClick={this.submit}
							disabled={this.state.doing}
						>
							Login
						</Button>
					</Grid>
					<Grid item xs={12} align='center' className={this.props.classes.notify}>
						{this.state.notify && (
							<Typography color='secondary' align='center'>
								Invalid credential. Please try again.
							</Typography>
						)}
						{this.state.doing && (
							<CircularProgress size={24} thickness={4}/>
						)}
					</Grid>
				</Grid>
			</>
		);
	}
};

const mapStateToProps = ( state ) =>
{
	return {
		base_url: state.app.base_url
	}
};

export default compose(
	connect ( mapStateToProps ),
	withStyles(styles),
	withRouter
) ( Login );
