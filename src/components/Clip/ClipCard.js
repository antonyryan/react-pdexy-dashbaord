import React from 'react';
import { connect } from 'react-redux';

import { clip_info } from './actions';

import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

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
					height='100%' />
				<CardBody>
					<CardTitle>Status: {this.props.clip.status} - Length: {this.props.clip.length}</CardTitle>
					<CardText>
						{this.props.clip.owner.name} {this.props.clip.owner.lastname}
						<br />
						{/* <Button className={'card-clip-button'} color="primary">Video</Button> */}
						<a className="btn btn-success card-clip-button" href={this.props.clip.video} target="_blank" rel="noopener noreferrer">Download</a> 
						<Button className={'card-clip-button'} color="info" onClick={ () => this.do_clip_info(this.props.clip)} >Info</Button>
						<Button className={'card-clip-button'} color="danger">Delete</Button>
					</CardText>
				</CardBody>
			</Card>
		);

	}
};

export default connect () ( ClipCard );