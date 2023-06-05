import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClipCard from './ClipCard';

function ClipModal(props) 
{
	return (
		<Dialog
			open={props.open}
			onClose={() => props.onModalChange(false)}
		>
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent>
				{props.clip && (
					<ClipCard clip={props.clip} />
				)}
			</DialogContent>
		</Dialog>
	);
};

export default ClipModal;