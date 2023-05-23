import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import UserListRow from './UserListRow';


const styles = {
	tableHeight: {
		maxHeight: 'calc(100vh - 220px)'
	}
}


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
			rowsPerPageOptions: [10, 25, 50, 100],
			viewColumns: false,
			selectableRows: 'none',
			responsive: "scroll"
		};
		
		const data = this.props.event && this.props.event.clips
			? this.props.event.contributors.map(u => ([u.email, u.name, u.lastname, u.phone]))
			: []

		return (
			<MUIDataTable
				data={data}
				columns={['Email', 'First Name', 'Last Name', 'Phone']}
				options={options}
				classes={{responsiveScroll: this.props.classes.tableHeight}}
			/>
		);
	}
};

const mapStateToProps = ( state ) => {
	return {
		details: state.events.details
	};
};


export default compose(
	connect ( mapStateToProps ),
	withStyles(styles)
)( ContributorsTable );