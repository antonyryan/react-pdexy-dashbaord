import React from 'react';
import { connect } from 'react-redux';

import { Input} from 'reactstrap';

import settings from '../../settings';

import Marker from './GMapMarker';

import GoogleMapReact from 'google-map-react';
import Geosuggest from 'react-geosuggest';

import { location_user_list } from '../Location/actions';
import { event_invite } from '../Events/actions';

const JOINED_COLOR  = "#44db5e";
const INVITED_COLOR = "orange";
const PYXIE_COLOR = "#ffeb3b";


class GMapMap extends React.Component
{
	state = {
		range: 500,

		location: { lat: 0, lng: 0, address: 'No name' },
		draw_marker: false,

		items: [],		// Elements on map

		zoom: settings.map.zoom,

		mapApiLoaded: false,
		map: null,
		maps: null,
		circle: null
	};

	_set_loc = ( lat, lng, address ) =>
	{
		this.setState ( { location : { lat, lng, address }, zoom: 14 }, this.range_draw );

		this.props.location_update && this.props.location_update ( lat, lng, address, this.state.range );
	};

	_start_polling = () =>
	{
		this.props.dispatch ( location_user_list () );
	};

	componentDidMount = () => 
	{
		this._start_polling ();
		setInterval ( () => {
			this.props.dispatch ( location_user_list () );
		}, 300 * 1000 );

		if ( ! this.props.location_update )
			return this.setState ( { draw_marker: true } );


		if ( this.props.location_update )
		{
			if ( "geolocation" in navigator ) 
			{
  				// check if geolocation is supported/enabled on current browserposition.coords.longitudeu
  				navigator.geolocation.getCurrentPosition (
					  ( position ) =>
					  {
						  this._set_loc ( position.coords.latitude, position.coords.longitude );
					  },
					  ( err ) =>
					  {
						  console.log ( err );
					  } 
				);
			}
		}
	}

	componentWillReceiveProps = ( news ) =>
	{
		const props = { ...news };
		let loc;
		let old = { ...this.state.location };

		if ( props.location && ! props.location.lat )
			props.location = this.state.location;

		if ( ! props.range ) props.range = this.state.range;

		if ( props.location ) loc = props.location;
		delete props.location;

		this.setState ( { ...props }, () =>
		{
			if ( loc.lat === old.lat && loc.lng === old.lng ) return;

			if ( loc ) this._set_loc ( loc.lat, loc.lng, loc.address );
			this.range_draw  ();
		});
	};

	location_select = ( suggest ) =>
	{
		if ( ! suggest ) return;

		const lat = parseFloat ( suggest.location.lat );
		const lng = parseFloat ( suggest.location.lng );
		const address = suggest.gmaps.formatted_address;

		this.setState ( { draw_marker: true } );
		this._set_loc ( lat, lng, address );
	}

	range_draw = () =>
	{
		if ( ! this.state.mapApiLoaded ) return;

		const { lat, lng } = this.state.location;
		let range = parseInt ( this.state.range );

		if ( this.state.circle ) this.state.circle.setMap ( null );

		if ( range === 0 ) return;
		if ( ! this.state.draw_marker ) return;

		const circle = new this.state.maps.Circle({
          strokeColor: '#000000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FFFF00',
          fillOpacity: 0.3,
          map: this.state.map,
          center: { lat: parseFloat ( lat ), lng: parseFloat ( lng ) },
          radius: range
		});

		this.setState ( { circle } );
	}

	update_range = ( ev ) =>
	{
		const t = ev.target;
		this.setState ( { [ t.name ] : t.value }, this.range_draw );
	}

	apiHasLoaded = ( map, maps ) => {
		this.setState ( {
			mapApiLoaded: true,
			map: map,
			maps: maps,
		}, this.range_draw );
	}

	send_invite = ( id_user ) =>
	{
		const id_event = this.props.events.current_event_id;

		if ( ! id_event ) return;

		this.props.dispatch ( event_invite ( id_user, id_event ) );

	};

	render ()
	{
		let ev = this.props.details[this.props.events.current_event_id];
		if ( ev ) ev = ev.event;

		return (
			<div style={{ height: '50vh', width: '100%', position: 'relative' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: settings.map.key, libraries: ['places', 'geometry'] } }
					center={[ parseFloat ( this.state.location.lat ), parseFloat ( this.state.location.lng ) ]}
					defaultZoom={ settings.map.zoom }
					zoom={this.state.zoom}

					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded ( map, maps ) }
				>
					{this.state.draw_marker ? (
						<Marker
							key={this.state.location.lat + this.state.location.lng}
							lat={this.state.location.lat}
							lng={this.state.location.lng}
							color="#ff000033"
						/>
					) : null}


					{this.props.eyes.length &&
						this.props.eyes.map(place => {
							const user = place.obj.toString ();
							let color = PYXIE_COLOR;

							if ( ev )
							{
								if ( ev.contributors.filter ( ( c ) => c._id.toString () === user ).length )
									color = JOINED_COLOR;
								else if ( ev.invited.includes ( user ) )
									color = INVITED_COLOR; // invited
							}

							return (
								<Marker
									key={place._id}
									text={place.address}
									lat={place.lat}
									lng={place.lng}
									color={color}
									onClick={ () => color !== JOINED_COLOR ? this.send_invite ( place.obj ) : null }
								/>
							);
						})
					}
				</GoogleMapReact>
				<div className="suggest-container">
					<div className="text">
						{this.state.mapApiLoaded && (
							<Geosuggest
								onSuggestSelect={this.location_select}
								initialValue={this.state.location.address}
								disabled={!this.state.location_update}
							/>
						)}
					</div>
					<div className="range">
						<Input
							type="number"
							name="range"
							id="range"
							placeholder="Range"
							min="0"
							max="9999"
							onChange={this.update_range}
							value={this.state.range}
							disabled={!this.state.location_update}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		eyes:  state.locations.users,
		details: state.events.details,
		events: state.events
	};
};

export default connect ( mapStateToProps ) ( GMapMap );
