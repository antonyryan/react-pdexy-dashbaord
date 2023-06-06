import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Card, CardBody, CardTitle } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { clip_info } from './actions';
import { status2str } from '../Events/helpers';

const styles = {
	videoThumbnail: {
		cursor: 'pointer',
		transition: '.3s ease-in-out, .3s filter',

		'&:hover': {
			transform: 'scale(1.1)',
			filter: 'brightness(200%)'
		}
	},

	thumbnailContainer: {
		overflow: 'hidden',
		textAlign: 'center',
		height: '150px',
		marginBottom: '10px'
	}
}

class ClipCard extends React.Component 
{
	do_clip_info = ( clip ) =>
	{
		this.props.dispatch ( clip_info ( clip.id_event, clip._id ) );
	}

	render = () => 
	{
		return (
			<Card>
				<div className={this.props.classes.thumbnailContainer}>
					<img
						src={this.props.clip.thumb}
						alt=''
						className={this.props.classes.videoThumbnail}
						onClick={() => this.props.onClick(this.props.clip)}
					/>
				</div>
				<CardBody>
					<CardTitle className='text-center'>
						Status: {status2str(this.props.clip.status)}, Length: {this.props.clip.length}
					</CardTitle>
					<div>
						<div className='text-center'>
							{this.props.clip.owner.name} {this.props.clip.owner.lastname}
						</div>
						<Grid
							container
							spacing={1}
							justify='center'
							className='mt-4'
						>
							<Grid item>
								{/* <Button className={'card-clip-button'} color="primary">Video</Button> */}
								<Button
									variant='outlined'
									size='small'
									href={this.props.clip.video}
								>
									Download
								</Button> 
							</Grid>
							<Grid item>
								<Button
									variant='outlined'
									size='small'
									color='primary'
									onClick={ () => this.do_clip_info(this.props.clip)}
								>
									Info
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant='outlined'
									color='secondary'
									size='small'
								>
									Delete
								</Button>
							</Grid>
						</Grid>
					</div>
				</CardBody>
			</Card>
		);

	}
};

export default compose(
	connect(),
	withStyles(styles)
)(ClipCard);
