import React from 'react';
import { connect } from 'react-redux';

import { Row } from 'reactstrap';
import GMapSimple from '../GMap/GMapSimple';
import ClipModal from './ClipModal';

class ClipMap extends React.Component 
{
	clips = {}

	state = {
		clip: null,
		show_modal: false
	};

	componentWillMount = () =>
	{
		this.props.event.clips.forEach ( ( cl ) => {
			if ( ! cl.info ) return;

			if ( typeof cl.info == 'string' )
				cl.info = JSON.parse ( cl.info );

			if ( ! cl.info.lat ) return;

			this.clips [ cl._id ] = cl;   // { location: { lat: cl.info.lat, lng: cl.info.lng }, clip: cl };
		} );
	}

	clip_select = ( id ) =>
	{
		this.setState ( { clip: this.clips [ id ], show_modal: true } );
	}

	onModalChange  = ( show_modal ) => 
	{
		this.setState ( { show_modal })
	}

	render ()
	{
		return (
			<div>
				<ClipModal
					clip={this.state.clip}
					open={this.state.show_modal}
					onModalChange={this.onModalChange}
					title={'Clip'}
				/>
				<Row>
					<div className={'clip-map-container'}>
						<GMapSimple
							{...this.props}
							draw_marker={true}
							clips={this.clips}
							onClick={this.clip_select}
						/>
					</div>
				</Row>
			</div>
		);
	}
};

export default connect () ( ClipMap );