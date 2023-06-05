import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';


import Toolbar from '../components/Toolbar/Toolbar';
import EventDetails from '../components/Events/EventDetails';
import ClipTable from '../components/Clip/ClipTable';
import ClipMap   from '../components/Clip/ClipMap';
import ContributorsTable from '../components/Users/ContributorsTable';

import {
	event_set_current,
	events_admin_list,
	event_oldmode
} from '../components/Events/actions';


const styles = {
	snack: {
		top: 125,
		'& div': {
			background: '#424242',
			color: 'white'
		}
	}
}


function TabPanel(props) {
	const { children, value, index, ...other } = props;
  
	return (
	  <Typography
		component="div"
		role="tabpanel"
		hidden={value !== index}
		id={`full-width-tabpanel-${index}`}
		aria-labelledby={`full-width-tab-${index}`}
		{...other}
	  >
		<Box p={3}>{children}</Box>
	  </Typography>
	);
  }

class PageEventDetails extends React.Component
{
	state = {
		active_tab: 0,
		event: null,
		event_create: false,
		show_map: true
	};

	componentWillMount = () =>
	{
		const event_id = this.props.match.params.id;

		// this.setState ( { event: this.props.details [ event_id ] } );

		if (this.props.details[event_id]) {
			this.setState({ event: this.props.details[ event_id ].event });
		} else {
			this.props.dispatch ( events_admin_list ( event_id ) );
		}

// console.log ( "EV2: ", this.props.details [ event_id ] );
		this.props.dispatch ( event_set_current ( event_id ) );
	};

	shouldComponentUpdate = props =>
	{
		const event_id = this.props.match.params.id;
		
		if (props.details[ event_id ] && !this.props.details[event_id]) {
			this.setState({ event: props.details[ event_id ].event });
		}
		return true;
	}

	componentDidMount = () =>
	{
		// const event_id = this.props.match.params.id;

		this.setState ( { active_tab: 0 } );
		if (sessionStorage.getItem('event_create')) {
			this.setState({event_create: true});
			sessionStorage.removeItem('event_create');
		}

		const e = document.getElementById ( "__my_link" );
		if ( e ) e.click ();
	}

	toggle = (tab) => 
	{
		if (tab === 3) {
			const id_event = this.props.match.params.id;
			this.props.dispatch ( event_oldmode ( id_event ) );
		} else if (this.state.active_tab !== tab ) {
			this.setState ( { active_tab: tab } );
		}
	}

	render ()
	{
		if (!this.state.event) {
			return <div>Loading...</div>
		}

		return (
			<>
				<Toolbar />
				<AppBar position="static" color="default">
					<Tabs
						value={this.state.active_tab}
						onChange={(e, value) => this.toggle(value)}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
					>
						<Tab label="Event" />
						<Tab label="Clips" />
						<Tab label="Users" />
						<Tab label="Download" />
					</Tabs>
				</AppBar>

				<SwipeableViews
					axis={'x'}
					index={this.state.active_tab}
					onChangeIndex={this.toggle}
				>
					<TabPanel value={this.state.active_tab} index={0}>
						<EventDetails event={this.state.event} />
					</TabPanel>
					<TabPanel value={this.state.active_tab} index={1}>
						<Paper className='p-24'>
							<Button
								color={this.state.show_map ? 'primary' : 'default'}
								onClick={() => this.setState({show_map: true})}
							>
								Maps
							</Button>
							<Button
								color={!this.state.show_map ? 'primary' : 'default'}
								onClick={() => this.setState({show_map: false})}
							>
								Clips
							</Button>
							{this.state.show_map === false
								? <ClipTable event={this.state.event} />
								: <ClipMap
									event={this.state.event}
									range={0}
									location={this.state.event.location}
									eyes={[]}
								/>
							}
						</Paper>
					</TabPanel>
					<TabPanel value={this.state.active_tab} index={2}>
						<ContributorsTable event={this.state.event} />
					</TabPanel>
				</SwipeableViews>

				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					open={this.state.event_create}
					autoHideDuration={3000}
					className={this.props.classes.snack}
					onClose={(event, reason) => reason === 'clickaway' ? true : this.setState({event_create: false})}
					message='Event correctly created'
				/>
			</>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		details:  state.events.details
	};
};

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(PageEventDetails);
