import React from 'react';
import { connect } from 'react-redux';

import { events_list, events_admin_list } from './actions';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { debounce, cloneDeep } from 'lodash';
import EventListRow from './EventListRow';
import EventListTable from './EventListTable';

class EventsList extends React.Component 
{
	state = {
		name: '',
		status: 0,
		start: 0,
		rows: 25
	}

	componentDidMount = () => {
		this.props.dispatch ( events_list () );
	};

	/*
	render_rows = () =>
	{
		if ( ! this.props.events.length ) return;

		return this.props.events.map ( ( u ) => {
			return (
				<EventListRow {...u} key={u.event._id} />
			);
		} );
	}
	*/

	filter_form = ( evt ) =>
	{
		const t = evt.target;

		this.setState ( { [ t.name ] : t.value }, () => {
			// this.props.dispatch ( events_filter_set ( this.state.name, this.state.status ) );

			this.props.dispatch(events_list(
				this.state.name,
				this.state.status,
				this.state.start,
				this.state.rows
			));
		});
	};

	render () 
	{
		return (
			<div className='m-48'>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<TextField
							id="name"
							label="Name"
							name="name"
							onChange={e => debounce(this.filter_form, 500)(cloneDeep(e))}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<FormControl fullWidth>
							<InputLabel htmlFor="status">Status</InputLabel>
							<Select
								onChange={this.filter_form}
								value={this.state.status}
								inputProps={{ name: 'status', id: 'status' }}
							>
								<MenuItem value="0">(Any status)</MenuItem>
								<MenuItem value="1">1</MenuItem>
								<MenuItem value="2">2</MenuItem>
								<MenuItem value="3">3</MenuItem>
								<MenuItem value="4">4</MenuItem>
								<MenuItem value="5">5</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<EventListTable rows={this.props.events} />
			</div>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		events:  state.events.list,
		filters: state.events.filters
	};
};

export default connect ( mapStateToProps ) ( EventsList );
