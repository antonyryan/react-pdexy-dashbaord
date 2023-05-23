import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import history from '@history';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import {
	event_close,
	event_reopen,
	event_start_editing,
	event_oldmode
} from './actions';

import MUIDataTable from "mui-datatables";


const styles = {
	tableHeight: {
		maxHeight: 'calc(100vh - 340px)'
	}
}

const ActionButtons = connect()(class extends React.Component {
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

	handleDetail = evt => e => {
		e.preventDefault();
		history.push(evt)
	}

	render () 
	{
		const event = this.props.rowData;

		const evt = `/event/${event._id}`;
		return (
				<Grid container spacing={1}>
					<Grid item>
						<Button
							variant='outlined'
							size='small'
							href={evt}
							onClick={this.handleDetail(evt)}
						>
							Details
						</Button>
					</Grid>
					{ event.status < 3 && (
						<Grid item>
							<Button
								variant='outlined'
								size='small'
								color="secondary"
								onClick={ () => this.close ( event._id )}
							>
								Close
							</Button>
						</Grid>
					)}
					{ event.status === 3 && (
						<Grid item>
							<Button
								variant='outlined'
								size='small'
								color="primary"
								onClick={ () => this.reopen ( event._id )}
							>
								Re-open
							</Button>
						</Grid>
					)}
					{ event.status === 3 && (
						<Grid item>
							<Button
								variant='outlined'
								size='small'
								color="primary"
								onClick={ () => this.start_edit ( event._id )}
							>
								Start Edit
							</Button>
						</Grid>
					)}
					<Grid item>
						<Button
							variant='outlined'
							size='small'
							color='primary'
							onClick={ () => this.oldmode ( event._id )}
						>
							Download
						</Button>
					</Grid>
				</Grid>
		);
	}
})

class EventListTable extends React.Component {

	columns = [
		{ name: 'name', label: "Label" },
		{ name: 'descr', label: "Description" },
		{ name: 'range', label: "Range" },
		{ name: 'status', label: "Status" },
		{ name: 'tags', label: "Tags" },
		{
			name: 'actions',
			label: "Actions",
			options: {
				customBodyRender: value => <ActionButtons rowData={value}/>
			}
		},
	];

	options = {
		filter: false,
		search: false,
		download: false,
		print: false,
		viewColumns: false,
		rowsPerPageOptions: [10, 25, 50, 100],
		selectableRows: 'none',
		responsive: "scroll"
	};

	render ()
	{
		const rows = this.props.rows.map ( ({event: { name, descr, range, status, tags, _id }}) => ({
			name, descr, range, status, tags, actions: { status, _id }
		}) );


		return (
			<MUIDataTable
				title={"Events"}
				data={rows}
				columns={this.columns}
				options={this.options}
				className={'shadow-none'}
				classes={{responsiveScroll: this.props.classes.tableHeight}}
			/>
		);
	}
};

export default compose(
	connect(),
	withStyles(styles)
)(EventListTable);