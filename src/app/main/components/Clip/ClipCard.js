import React from 'react';
import { connect } from 'react-redux';

import { clip_info } from './actions';

import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ReactPlayer from 'react-player'

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
				<ReactPlayer 
					url={this.props.clip.video} 
					controls={true}
					playing={false}
					width='100%'
					height='100%'
				/>
				<CardBody>
					<CardTitle>Status: {this.props.clip.status} - Length: {this.props.clip.length}</CardTitle>
					<div>
						<div>
							{this.props.clip.owner.name} {this.props.clip.owner.lastname}
						</div>
						{!this.props.hideActionButton && (
							<Grid container spacing={1} className='mt-4'>
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
						)}
					</div>
				</CardBody>
			</Card>
		);

	}
};

export default connect () ( ClipCard );