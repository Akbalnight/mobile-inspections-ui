import {combineReducers} from 'redux';
import {configBuilder} from './configBuilder.reducer';
import {authReducer} from 'mobile-inspections-base-ui';
import {tableReducer} from 'rt-design';

const reducer = combineReducers({
	auth: authReducer,
	configBuilder,
	table: tableReducer,
});

export default reducer;
