import {combineReducers} from 'redux';
import {configBuilder} from './configBuilder.reducer';
import {authReducer} from 'mobile-inspections-base-ui';
import {rtdReducer} from 'rt-design';

const reducer = combineReducers({
	auth: authReducer,
	configBuilder,
	rtd: rtdReducer,
});

export default reducer;
