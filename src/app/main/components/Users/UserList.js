import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import MUIDataTable from "mui-datatables";
import { withStyles } from '@material-ui/core/styles';

import Box from "@material-ui/core/Box";

import { users_list } from './actions';

import UserListRow from './UserListRow';


const styles = {
	tableHeight: {
		maxHeight: 'calc(100vh - 240px)'
	}
}

class UserList extends React.Component {
	componentDidMount = () => {
		this.props.dispatch ( users_list () );
	};

	render_rows = () =>
	{
		if ( ! this.props.users.length ) return;

		return this.props.users.map ( ( u ) => {
			return (
				<UserListRow {...u} key={u._id} />
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
			rowsPerPageOptions: [10, 25, 50, 100],
			selectableRows: 'none',
			responsive: 'scroll'
		};

		return (
			<Box p={3}>
				<MUIDataTable
					title={"Users"}
					data={this.props.users.map(u => ([u.email, u.name, u.lastname, u.phone]))}
					columns={['Email', 'First Name', 'Last Name', 'Phone']}
					options={options}
					classes={{responsiveScroll: this.props.classes.tableHeight}}
				/>
			</Box>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		users: state.users.users
	};
};

export default compose(
	connect ( mapStateToProps ),
	withStyles(styles)
)( UserList );
