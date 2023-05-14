import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { status2str } from './helpers';

import { Button } from 'reactstrap';

import { event_close, event_reopen, event_start_editing, event_oldmode } from './actions';

class EventListRow extends React.Component {
	close = ( id ) =>
	{
		this.props.dispatch ( event_close ( id ) );
	}

	reopen = ( id ) =>
	{
		this.props.dispatch ( event_reopen ( id ) );
	}

	start_edit = ( id ) =>
	{
		this.props.dispatch ( event_start_editing ( id ) );
	}

	oldmode = ( id ) =>
	{
		this.props.dispatch ( event_oldmode ( id ) );
	}

	render ()
	{
		const evt = `/event/${this.props.event._id}`;
		return (
			<tr>
				<td></td>
				<td>{this.props.event.name}</td>
				<td>{this.props.event.descr}</td>
				<td>{this.props.event.range}</td>
				<td>{status2str ( this.props.event.status )}</td>
				<td>
					<Button color="secondary" tag={Link} to={evt}>Details</Button>
					{ ' ' }
					{ this.props.event.status < 3 ? (
						<Button color="danger" onClick={ () => this.close ( this.props.event._id )}>Close</Button>
					) : null }
					{ ' ' }
					{ this.props.event.status === 3 ? (
						<Button color="primary" onClick={ () => this.reopen ( this.props.event._id )}>Re-open</Button>
					) : null }
					{ ' ' }
					{ this.props.event.status === 3 ? (
						<Button color="warning" onClick={ () => this.start_edit ( this.props.event._id )}>Start Edit</Button>
					) : null }
					{ ' ' }
					<Button color="success" onClick={ () => this.oldmode ( this.props.event._id )}>Download</Button>
				</td>
			</tr>
		);
	}
};

export default connect () ( EventListRow );