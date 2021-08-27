import {initialState} from '../initialStore/configBuilderStore';

export const configBuilder = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_CONFIGS':
			return {
				...state,
				configs: action.configs,
			};
		case 'LOAD_CONFIGS':
			// console.log("RES LOAD_CONFIGS");
			return {
				...state,
				configs: action.configs,
			};
		default:
			return state;
	}
};
