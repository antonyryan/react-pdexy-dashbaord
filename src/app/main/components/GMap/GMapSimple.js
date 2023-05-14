import React from 'react';

import settings from '../../settings';

import Marker from './GMapMarker';
import GoogleMapReact from 'google-map-react';

const JOINED_COLOR  = "#44db5e";
const INVITED_COLOR = "orange";
const PYXIE_COLOR = "#ffeb3b";

class GMapSimple extends React.Component 
{
	state = {
		mapApiLoaded: false,
		map: null,
		maps: null,
		zoom: settings.map.zoom,
		circle: null,
		items: []
	}

	apiHasLoaded = ( map, maps ) => {
		this.setState ( {
			mapApiLoaded: true,
			map: map,
			maps: maps,
		}, this.range_draw );
	};

	componentWillReceiveProps = ( props ) =>
	{
		this.range_draw ( props.range );
	};

	range_draw = ( new_range ) =>
	{
		if ( ! this.state.mapApiLoaded ) return;

		const { lat, lng } = this.props.location;
		let range = parseInt ( new_range || this.props.range );

		if ( this.state.circle ) this.state.circle.setMap ( null );

		if ( range === 0 ) return;
		if ( ! this.props.draw_marker ) return;

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

	render () 
	{
		// let ev = this.props.details [ this.props.events.current_event_id ];
		// if ( ev ) ev = ev.event;
		let ev = this.props.event;
		let { lat, lng } = this.props.location;

		if ( ! lat ) lat = 0;
		if ( ! lng ) lng = 0;


		return (
		<GoogleMapReact
			bootstrapURLKeys={{ key: settings.map.key, libraries: ['places', 'geometry'] } }
			center={[ parseFloat ( lat ), parseFloat ( lng ) ]}
			defaultZoom={ settings.map.zoom }
			zoom={this.props.zoom}

			yesIWantToUseGoogleMapApiInternals
			onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded ( map, maps ) }
		>
			{this.props.draw_marker ? (
				<Marker
					key={lat + lng}
					lat={lat}
					lng={lng}
					color="#ff000033"
				/>
			) : null}

			{ Object.keys ( this.props.clips ) && Object.values ( this.props.clips ).map ( clip => {
					return (
						<Marker
							key={clip._id}
							text={clip.info.address}
							lat={clip.info.lat}
							lng={clip.info.lng}
							color={JOINED_COLOR}
							onClick={ () => this.props.onClick ( clip._id ) }
						/>
					);

				} )
			}


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
							onClick={ () => color !== JOINED_COLOR ? this.props.onClick ( place.obj ) : null }
						/>
					);
				})
			}
		</GoogleMapReact>
		);
	}
};

export default GMapSimple;