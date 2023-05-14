import { combineReducers } from 'redux';

import app         from './App/reducer';
import login       from '../components/Login/reducer';
import users       from '../components/Users/reducer';
import events      from '../components/Events/reducer';
import locations   from '../components/Location/reducer';

import fuse from 'app/store/reducers/fuse';
import auth from 'app/auth/store/reducers';
import quickPanel from 'app/fuse-layouts/shared-components/quickPanel/store/reducers';

const reds = combineReducers ({
	app,
	login,
	users,
	events,
	locations,

	fuse,
	auth,
	quickPanel
});

export default reds;