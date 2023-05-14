import React from 'react';
import { connect } from 'react-redux';

import { Table, Input, Form, FormGroup, Row, Col, Label } from 'reactstrap';

import { events_list, events_admin_list } from './actions';

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

			this.props.dispatch ( events_list ( this.state.name, this.state.status, this.state.start, this.state.rows ) );
		} );
	};

	render () 
	{
		return (
			<div>
				<Form>
					<Row form>
						<Col md={6}>
							<FormGroup>
								<Label for="name">Name</Label>
								<Input type="text" name="name" onBlur={this.filter_form}/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="name">Status</Label>
								<Input type="select" name="status" onChange={this.filter_form}>
									<option value="">(Any status)</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</Input>
							</FormGroup>
						</Col>
					</Row>
				</Form>
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
