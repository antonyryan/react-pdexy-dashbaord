import React, { Component } from 'react';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import withAuth from './lib/withAuth';

import PageLogin from './pages/PageLogin';
import PageUsers from './pages/PageUsers';
import PageEvents from './pages/PageEvents';
import PageEventDetails from './pages/PageEventDetails';
import PageDashboard from './pages/PageDashboard';

import store from './components/store';

class App extends Component 
{
	render() 
	{
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Route path="/dashboard" component={withAuth(PageDashboard)} />
						<Route path="/users" component={withAuth(PageUsers)} />
						<Route path="/events" component={withAuth(PageEvents)} />
						<Route path="/event/:id" component={withAuth(PageEventDetails)} />
						<Route path="/" component={PageLogin} />
						<Route path="/login" component={PageLogin} />
					</Switch>
				</Router>
			</Provider>		
		);
	}
}

export default App;
