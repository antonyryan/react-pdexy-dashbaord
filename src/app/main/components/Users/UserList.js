import React from 'react';
import { connect } from 'react-redux';

import MUIDataTable from "mui-datatables";
import Box from "@material-ui/core/Box";

import { users_list } from './actions';

import UserListRow from './UserListRow';

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
			selectableRows: 'none',
		};

		return (
			<Box p={3}>
				<MUIDataTable
					title={"Users"}
					data={this.props.users.map(u => ([u.email, u.name, u.lastname, u.phone]))}
					columns={['Email', 'First Name', 'Last Name', 'Phone']}
					options={options}
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

export default connect ( mapStateToProps ) ( UserList );
