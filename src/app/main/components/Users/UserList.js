import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell/>
						<TableCell>
							Email
						</TableCell>
						<TableCell>
							First name
						</TableCell>
						<TableCell>
							Last name
						</TableCell>
						<TableCell>
							Phone
						</TableCell>
						<TableCell>
							Actions
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{this.render_rows ()}
				</TableBody>
			</Table>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		users: state.users.users
	};
};

export default connect ( mapStateToProps ) ( UserList );
