import React from 'react';
import { connect } from 'react-redux';

import { Table} from 'reactstrap';

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
				{this.render_rows ()}
			</tbody>
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
