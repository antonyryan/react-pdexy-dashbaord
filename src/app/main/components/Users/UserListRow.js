import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { connect } from 'react-redux';

class UserListRow extends React.Component {
	render ()
	{
		return (
			<TableRow>
				<TableCell/>
				<TableCell>{this.props.email}</TableCell>
				<TableCell>{this.props.name}</TableCell>
				<TableCell>{this.props.lastname}</TableCell>
				<TableCell>{this.props.phone}</TableCell>
				<TableCell>ACTIONS</TableCell>
			</TableRow>
		);
	}
};

export default connect () ( UserListRow );