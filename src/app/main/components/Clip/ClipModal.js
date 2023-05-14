import React from 'react';
import { connect } from 'react-redux';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ClipCard from './ClipCard';

class ClipModal extends React.Component 
{
	state = {
		modal: false,
		backdrop: true
	};
	
	toggle = () => 
	{
		this.setState ( prevState => ({
			modal: !prevState.modal
		}), () => { this.props.onModalChange ( this.state.modal ) } );

	}

	componentWillReceiveProps = ( props ) =>
	{
		this.setState ( { modal: props.open } );
	}

	render = () => 
	{
		return (
			<Modal size='lg' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
				<ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
				<ModalBody>
					<ClipCard clip={this.props.clip} />
				</ModalBody>
			</Modal>
		);
	}
};

export default connect () ( ClipModal );