import React from 'react';
import { connect } from 'react-redux';

import { Table, Col } from 'reactstrap';
import MUIDataTable from "mui-datatables";
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
		const options = {
			filter: false,
			search: false,
			download: false,
			print: false,
			viewColumns: false,
			selectableRows: 'none',
		};
		
		const data = this.props.event && this.props.event.clips
			? this.props.event.contributors.map(u => ([u.email, u.name, u.lastname, u.phone]))
			: []

		return (
			<MUIDataTable
				data={data}
				columns={['Email', 'First Name', 'Last Name', 'Phone']}
				options={options}
			/>
		);
	}
};

const mapStateToProps = ( state ) => {
	return {
		details: state.events.details
	};
};

export default connect ( mapStateToProps ) ( ContributorsTable );