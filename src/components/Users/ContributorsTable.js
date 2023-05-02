import React from 'react';
import { connect } from 'react-redux';

import { Table, Col } from 'reactstrap';

import UserListRow from './UserListRow';

class ContributorsTable extends React.Component 
{
	download = ( url ) =>
	{
		document.location = url;
	}

	componentDidMount = () =>
	{
		console.log ( "USERS: ", this.props.event.contributors );
	};

	users_list = () => 
	{
		if ( ! this.props.event || ! this.props.event.clips ) 
		{
			return ( 
				<Col>No users for this event</Col>
			);
		}

		return this.props.event.contributors.map ( ( contrib ) => {
			console.log('contrib: ', contrib)
			return (
				<UserListRow {...contrib} key={contrib._id} />
			);
		} );
	}

	render ()
	{
		return (
			<Table striped bordered>
			<tbody>
				<tr>
					<th>
					</th>
					<th>
						email
					</th>
					<th>
						First name
					</th>
					<th>
						Last name
					</th>
					<th>
						Phone
					</th>
					<th>
						Actions
					</th>
				</tr>
				{this.users_list ()}
			</tbody>
			</Table>
		);
	}
};

const mapStateToProps = ( state ) => {
	return {
		details: state.events.details
	};
};

export default connect ( mapStateToProps ) ( ContributorsTable );