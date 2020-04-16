import {combineReducers} from 'redux';
import {configBuilder} from './configBuilder.reducer';

const reducer = combineReducers({
	configBuilder,
});

export default reducer;
