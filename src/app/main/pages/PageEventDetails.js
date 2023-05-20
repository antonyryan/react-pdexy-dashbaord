import React from 'react';
import { connect } from 'react-redux';

import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import Toolbar from '../components/Toolbar/Toolbar';
import EventDetails from '../components/Events/EventDetails';
import ClipTable from '../components/Clip/ClipTable';
import ClipMap   from '../components/Clip/ClipMap';
import ContributorsTable from '../components/Users/ContributorsTable';

import { event_set_current, event_oldmode } from '../components/Events/actions';


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
		active_tab: 1,
		event: null,
		show_map: true
	};

	event = '';

	componentWillMount = () =>
	{
		const event_id = this.props.match.params.id;

		// this.setState ( { event: this.props.details [ event_id ] } );
		this.event =  this.props.details [ event_id ].event;

// console.log ( "EV2: ", this.props.details [ event_id ] );
		this.props.dispatch ( event_set_current ( event_id ) );
	};

	componentDidMount = () =>
	{
		const event_id = this.props.match.params.id;

		this.setState ( { event: this.props.details [ event_id ], active_tab: 1 } );

		// this.setState ( { active_tab: 1 } );
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
						<EventDetails event={this.event} />
					</TabPanel>
					<TabPanel value={this.state.active_tab} index={1}>
						<Button onClick={() => this.setState({show_map: true})}>Maps</Button>
						<Button onClick={() => this.setState({show_map: false})}>Clips</Button>
						{this.state.show_map === false
							? <ClipTable event={this.event} />
							: <ClipMap
								event={this.event}
								range={0}
								location={this.event.location}
								eyes={[]}
							/>
						}
					</TabPanel>
					<TabPanel value={this.state.active_tab} index={2}>
						<ContributorsTable event={this.event} />
					</TabPanel>
				</SwipeableViews>
			</>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		details:  state.events.details
	};
};

export default connect ( mapStateToProps ) ( PageEventDetails );