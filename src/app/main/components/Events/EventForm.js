import React from 'react';
import { connect } from 'react-redux';

import { Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';

import DateTime from 'react-datetime';
import GMapMap from '../GMap/GMapMap';

import { event_create } from './actions';
import { kind2str, topic2str } from './helpers';
import { dateFromTimestamp } from '../../lib/utils';

class EventForm extends React.Component
{
	state = {
		name: '',
		descr: '',
		start: new Date (),
		end: ( new Date ().getTime () ) + ( 60 * 60 * 24 * 1000 ),
		range: 0,
		topic: '',
		kind: '',
		location: { lat: 0, lng: 0, address: 'No name' },
		event: null,
		ready: false,
		coupon: '',
		notify: ''
	};

	componentDidMount = () =>
	{
		const ev = this.props.event;

		if ( ev ) console.log ( "EV: ", ev, new Date ( parseInt ( ev.start ) * 1000 ) );

		if ( ev )
		{
			this.setState ( { 
				name: ev.name,
				descr: ev.descr,
				start: dateFromTimestamp ( ev.start ),
				end: dateFromTimestamp ( ev.end ),
				range: ev.range,
				topic: topic2str ( ev.topic ),
				kind: kind2str ( ev.kind ),
				coupon: ev.tags,
				location: ev.location ? ev.location : { lat: 0, lng: 0, address: '' },
				event: ev,
				ready: true,
				notify: ev.notify
			} );
		}

	};

	componentWillReceiveProps = ( news ) =>
	{
		const props = { ...news };

		props.id = props._id;


		this.setState ( { ...props } );  // , this.range_draw );
	};

	update = ( ev ) =>
	{
		const t = ev.target;
		this.setState ( { [ t.name ] : t.value } );
	}

	udpate_date = ( name, val ) =>
	{
		this.setState ( { [ name ] : val._d } );
	}

	location_update = ( lat, lng, address, range ) =>
	{
		console.log ( "LOCATION UPDATE: ", lat, lng );
		this.setState ( { location: { lat, lng, address }, range } );
	};

	submit = ( ev ) =>
	{
		ev.preventDefault ();

		const dct = { ...this.state };

		dct.start = new Date ( dct.start ).getTime ();
		dct.end   = new Date ( dct.end ).getTime ();
		// FIXME: in questo momento il campo 'coupon' mostra tutti i tag legati all'evento
		// se ce n'è più di uno, la riga qui sotto va ripensata
		dct.tags  = [ dct.coupon ];

		this.props.dispatch ( event_create ( dct ) );
	}

	render ()
	{
		if ( ! this.state.ready && this.props.isDetails )
			return <div>Loading...</div>;

		return (
		<Form onSubmit={this.submit}>
			<input type="hidden" name="id" value={this.state.id} />
			<FormGroup>
				<Label for="name">Name</Label>
				<Input type="text" name="name" id="name" placeholder="Event Name" onChange={this.update} value={this.state.name} />
			</FormGroup>
			<FormGroup>
				<Label for="descr">Description</Label>
				<Input type="textarea" name="descr" id="textarea" placeholder="Event description" onChange={this.update} value={this.state.descr}/>
			</FormGroup>
			<Row>
				<Col>
					<FormGroup>
						<Label for="kind">Kind</Label>
						<Input type="select" name="kind" id="kind" onChange={this.update} value={this.state.kind}>
							<option value="">(Select)</option>
							<option value="public">Public</option>
							<option value="private">Private</option>
							<option value="internal">Internal</option>
						</Input>
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label for="topic">Topic</Label>
						<Input type="select" name="topic" id="topic" onChange={this.update} value={this.state.topic}>
							<option value="">(Select)</option>
							<option value="generic">Generic</option>
							<option value="life">Life</option>
							<option value="sport">Sport</option>
							<option value="movie">Movie</option>
							<option value="music">Music</option>
						</Input>
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label for="coupon">Coupon</Label>
						<Input type="text" name="coupon" id="coupon" placeholder="Event Coupon" onChange={this.update} value={this.state.coupon} />
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col>
					<FormGroup>
						<Label for="start_date">Notify</Label>
						<Input type="email" name="notify" onChange={this.update} value={this.state.notify} />
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col>
					<FormGroup>
						<Label for="start_date">Start Date</Label>
						<DateTime name="start" input onChange={( v ) => this.udpate_date ('start', v )} value={this.state.start} />
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label for="end_date">End Date</Label>
						<DateTime name="end" input onChange={( v ) => this.udpate_date ( 'end', v )} value={this.state.end} />
					</FormGroup>
				</Col>
			</Row>
			<GMapMap location={this.state.location} range={this.state.event ? this.state.range : 0} location_update={this.state.event ? null : this.location_update} />
			<FormGroup style={{marginTop: '1em'}}>
				{ this.state.event ? <Button block>Update Event</Button> : <Button block>Create Event</Button> }
			</FormGroup>
		</Form>
		);
	}
}

export default connect () ( EventForm );
