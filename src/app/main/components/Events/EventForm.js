import React from 'react';
import { connect } from 'react-redux';

import GMapMap from '../GMap/GMapMap';

import {KeyboardDateTimePicker} from "@material-ui/pickers";
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
		console.log('event form')
		const ev = this.props.event;

		if ( ev ) console.log ( "EV: ", ev, new Date ( parseInt ( ev.start ) * 1000 ) );

		if ( ev )
		{
			const topic = topic2str ( ev.topic );

			this.setState ( { 
				name: ev.name,
				descr: ev.descr,
				start: dateFromTimestamp ( ev.start ),
				end: dateFromTimestamp ( ev.end ),
				range: ev.range,
				topic: topic === 'no_topic' ? '' : topic,
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
			<Paper className='p-24'>
				<form onSubmit={this.submit}>
					<input type="hidden" name="id" value={this.state.id} />
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								id="name"
								label="Event Name"
								name="name"
								value={this.state.name}
								onChange={this.update}
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="descr"
								label="Description"
								name="descr"
								value={this.state.descr}
								onChange={this.update}
								multiline={true}
								placeholder="Event description"
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
							/>
						</Grid>

						<Grid item xs={12} sm={4}>
							<FormControl fullWidth>
								<InputLabel shrink htmlFor="kind">Kind</InputLabel>
								<Select
									value={this.state.kind}
									onChange={this.update}
									inputProps={{ name: 'kind', id: 'kind' }}
								>
									<MenuItem value="public">Public</MenuItem>
									<MenuItem value="private">Private</MenuItem>
									<MenuItem value="internal">Internal</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={4}>
							<FormControl fullWidth>
								<InputLabel shrink htmlFor="topic">Topic</InputLabel>
								<Select
									value={this.state.topic}
									onChange={this.update}
									shrink
									inputProps={{ name: 'topic', id: 'topic' }}
								>
									<MenuItem value="generic">Generic</MenuItem>
									<MenuItem value="life">Life</MenuItem>
									<MenuItem value="sport">Sport</MenuItem>
									<MenuItem value="movie">Movie</MenuItem>
									<MenuItem value="music">Music</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								label="Coupon"
								name="coupon"
								value={this.state.coupon}
								onChange={this.update}
								placeholder="Event Coupon"
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								id="notify"
								label="Notify"
								name="notify"
								value={this.state.notify}
								onChange={this.update}
								type="email"
								placeholder="Notify Email"
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<KeyboardDateTimePicker
								ampm={false}
								label="Start Date"
								value={this.state.start}
								onChange={v => this.udpate_date ('start', v )}
								// disablePast
								fullWidth
								showTodayButton
								format="yyyy/MM/dd HH:mm"
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<KeyboardDateTimePicker
								ampm={false}
								label="Start Date"
								value={this.state.end}
								onChange={v => this.udpate_date ('end', v )}
								// disablePast
								fullWidth
								showTodayButton
								format="yyyy/MM/dd HH:mm"
							/>
						</Grid>
						<Grid item xs={12}>
							<GMapMap
								location={this.state.location}
								range={this.state.event ? this.state.range : 0}
								location_update={this.state.event ? null : this.location_update}
							/>
						</Grid>
						<Grid item align='center' xs={12}>
							<Button variant='contained' type='submit'>
								{ this.state.event ? 'Update Event' : 'Create Event' }
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		);
	}
}

export default connect () ( EventForm );
