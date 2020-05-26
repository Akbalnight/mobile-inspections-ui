import {combineReducers} from 'redux';
import {configBuilder} from './configBuilder.reducer';
import {auth} from "./auth.reducer";

const reducer = combineReducers({
	auth,
	configBuilder,
});

export default reducer;
