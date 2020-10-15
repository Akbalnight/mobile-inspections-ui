import {combineReducers} from 'redux';
import {configBuilder} from './configBuilder.reducer';
import {auth} from './auth.reducer';
import {tableReducer} from 'rt-design';

const reducer = combineReducers({
	auth,
	configBuilder,
	table: tableReducer
});

export default reducer;
