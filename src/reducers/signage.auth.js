export const signageAuth = (state = {}, action) => {
	console.log('Signage reducer');
	switch (action.type) {
		case 'SIGNAGE_AUTH':
			return {
				...state,
				auth: action.payload,
			};
		default:
			return state;
	}
};
