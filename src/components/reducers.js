import { combineReducers } from 'redux';

import app         from './App/reducer';
import login       from '../components/Login/reducer';
import users       from '../components/Users/reducer';
import events      from '../components/Events/reducer';
import locations   from '../components/Location/reducer';

const reds = combineReducers ({
	app,
	login,
	users,
	events,
	locations
});

export default reds;