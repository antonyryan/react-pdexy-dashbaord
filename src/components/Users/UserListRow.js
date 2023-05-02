import React from 'react';
import { connect } from 'react-redux';

class UserListRow extends React.Component {
	render ()
	{
		return (
			<tr>
				<td></td>
				<td>{this.props.email}</td>
				<td>{this.props.name}</td>
				<td>{this.props.lastname}</td>
				<td>{this.props.phone}</td>
				<td>ACTIONS</td>
			</tr>
		);
	}
};

export default connect () ( UserListRow );