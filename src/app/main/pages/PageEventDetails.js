import React from 'react';
import { connect } from 'react-redux';

import { ButtonGroup, Button, Container, Row, Col, Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap';

import Toolbar from '../components/Toolbar/Toolbar';
import EventDetails from '../components/Events/EventDetails';
import ClipTable from '../components/Clip/ClipTable';
import ClipMap   from '../components/Clip/ClipMap';
import ContributorsTable from '../components/Users/ContributorsTable';

import { event_set_current, event_oldmode } from '../components/Events/actions';

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
		if ( this.state.active_tab === tab ) return;

		this.setState ( { active_tab: tab } );
	}

	oldmode = () =>
	{
		const id_event = this.props.match.params.id;
		this.props.dispatch ( event_oldmode ( id_event ) );
	}

	render ()
	{
		return (
			<Container>
				<Toolbar />
				<Nav tabs>
					<NavItem>
						<NavLink
							id="__my_link"
							onClick={() => { this.toggle('1'); }}
						>
							Event 
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							onClick={() => { this.toggle('2'); }}
						>
							Clips
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							onClick={() => { this.toggle('4'); }}
						>
							Users
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink onClick={this.oldmode}>Download</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.state.active_tab}>
					<TabPane tabId="1">
						<Row>
							<Col sm="12">
								<EventDetails event={this.event} />
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId="2">
						<Row>
							<Col sm="12">
								<ButtonGroup size="sm" style={{ paddingTop: '10px' }}>
									<Button onClick={() => this.setState({show_map: true})}>Maps</Button>
									<Button onClick={() => this.setState({show_map: false})}>Clips</Button>
								</ButtonGroup>
								{this.state.show_map === false 
								? <ClipTable event={this.event} />
								: <ClipMap event={this.event} range={0} location={this.event.location} eyes={[]} />
								}
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId="4" style={{display: 'hidden'}}>
						<Row>
							<Col sm="12">
								<ContributorsTable event={this.event} />
							</Col>
						</Row>
					</TabPane>
				</TabContent>
			</Container>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		details:  state.events.details
	};
};

export default connect ( mapStateToProps ) ( PageEventDetails );