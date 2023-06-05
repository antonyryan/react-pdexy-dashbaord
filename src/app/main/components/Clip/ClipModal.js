import React from 'react';
import { useDispatch } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import ClipCard from './ClipCard';
import { clip_info } from './actions';

const useStyles = makeStyles(theme => ({
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	dialogContent: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3)
	}
}));

function ClipModal(props) 
{
	const classes = useStyles();
	const dispatch = useDispatch();

	return (
		<Dialog
			open={props.open}
			onClose={() => props.onModalChange(false)}
		>
			<DialogTitle>
				<Typography>
					{props.title}
				</Typography>
				<IconButton
					className={classes.closeButton}
					onClick={() => props.onModalChange(false)}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent className={classes.dialogContent} dividers>
				{props.clip && (
					<ClipCard clip={props.clip} hideActionButton/>
				)}
			</DialogContent>
			{props.clip && (
				<DialogActions>
					<Button href={props.clip.video}>
						Download
					</Button>
					<Button
						color="primary"
						onClick={() => dispatch(clip_info(props.clip.id_event, props.clip._id))}
					>
						Info
					</Button>
					<Button color="secondary">
						Delete
					</Button>
				</DialogActions>
			)}
		</Dialog>
	);
};

export default ClipModal;