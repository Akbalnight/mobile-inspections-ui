import {combineReducers} from 'redux';
import {configBuilder} from './configBuilder.reducer';
import {tableReducer} from 'rt-design';

const reducer = combineReducers({
	configBuilder,
	table: tableReducer
});

export default reducer;
