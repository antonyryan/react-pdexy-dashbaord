import React from 'react';
import { connect } from 'react-redux';

import { clip_info } from './actions';

import { Row, Col, Container } from 'reactstrap';

import ClipCard from './ClipCard';

class ClipTable extends React.Component 
{
	do_clip_info = ( clip ) =>
	{
		this.props.dispatch ( clip_info ( clip.id_event, clip._id ) );
	}

	clips_list = () => 
	{
		if ( ! this.props.event || ! this.props.event.clips ) 
		{
			return ( 
				<Col>No clips for this event</Col>
			);
		}

		return this.props.event.clips.map ( ( clip ) => {
			return (
				<Col key={clip._id} sm="6" lg="4" className={'clips-col'}>
					<ClipCard clip={clip} />
				</Col>
			);
		} );

	}

	render ()
	{
		return (
			<div>
				<Container>
					<Row>
						{this.clips_list()}
					</Row>
				</Container>
			</div>
		);
	}
};

export default connect () ( ClipTable );