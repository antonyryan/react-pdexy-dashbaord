import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button } from 'reactstrap';
import { event_close, event_reopen, event_start_editing, event_oldmode } from './actions';

import SortableTbl from 'react-sort-search-table';

class ActionButtons extends React.Component {
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
		const event = this.props.rowData;

		const evt = `/event/${event._id}`;
		return (
				<td>
					<Button color="secondary" tag={Link} to={evt}>Details</Button>
					{ ' ' }
					{ event.status < 3 ? (
						<Button color="danger" onClick={ () => this.close ( event._id )}>Close</Button>
					) : null }
					{ ' ' }
					{ event.status === 3 ? (
						<Button color="primary" onClick={ () => this.reopen ( event._id )}>Re-open</Button>
					) : null }
					{ ' ' }
					{ event.status === 3 ? (
						<Button color="warning" onClick={ () => this.start_edit ( event._id )}>Start Edit</Button>
					) : null }
					{ ' ' }
					<Button color="success" onClick={ () => this.oldmode ( event._id )}>Download</Button>
				</td>
		);
	}
}

class EventListTable extends React.Component {
	cols = [
		"name",
		"descr",
		"range",
		"status",
		"tags",
		"actions"
	];

	head = [
		"Name",
		"Description",
		"Range",
		"Status",
		"Tags",
		"Actions"
	];

	render ()
	{
		const rows = this.props.rows.map ( ( r ) => r.event );
		console.log ( "ROWS: ", rows.length );
		return (
			<SortableTbl 
				tblData={rows} 
				tHead={this.head} 
				dKey={this.cols} 
				search={false} 
				defaultCSS={false} 
				customTd={[
					{ custd: ActionButtons, keyItem: "actions" }
				]}
			/>
		);
	}
};

export default connect () ( EventListTable );