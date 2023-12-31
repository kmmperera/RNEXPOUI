import auth from './auth';
import work from './workdetails';
import getusers from './admin/getusers';
import sendnotifications from './admin/sendnotifications';
import getchats from './admin/getchat';
import post from './admin/post';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth:auth,
	work:work,
	users:getusers,
	noti:sendnotifications,
	chats:getchats,
	post:post,
});

export default rootReducer;