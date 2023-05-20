import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { clip_info } from './actions';

import ClipCard from './ClipCard';

class ClipTable extends React.Component 
{
	do_clip_info = ( clip ) =>
	{
		this.props.dispatch ( clip_info ( clip.id_event, clip._id ) );
	}

	render ()
	{
		return (
			<Box pt={2}>
				<Grid container spacing={2}>
					{(this.props.event && this.props.event.clips) ? (
						this.props.event.clips.map(clip => (
							<Grid item key={clip._id} sm={6} md={4} lg={4}>
								<ClipCard clip={clip} />
							</Grid>
						))
					) : (
						<Grid item>No clips for this event</Grid>
					)}
				</Grid>
			</Box>
		);
	}
};

export default connect () ( ClipTable );