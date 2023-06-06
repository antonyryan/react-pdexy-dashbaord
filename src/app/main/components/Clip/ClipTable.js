import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ClipCard from './ClipCard';
import ClipModal from './ClipModal';

class ClipTable extends React.Component 
{
	state = {
		videoClip: null
	}

	openVideoDialog = videoClip => {
		this.setState({ videoClip });
	}

	onModalChange = () => this.setState({ videoClip: null})

	render ()
	{
		return (
			<Box pt={2}>
				<ClipModal
					clip={this.state.videoClip}
					open={!!this.state.videoClip}
					onModalChange={this.onModalChange}
					title={'Clip'}
				/>

				<Grid container spacing={2}>
					{(this.props.event && this.props.event.clips) ? (
						this.props.event.clips.map(clip => (
							<Grid item key={clip._id} sm={6} md={4} lg={4}>
								<ClipCard clip={clip} onClick={this.openVideoDialog}/>
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