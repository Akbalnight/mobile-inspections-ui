export const setConfigs = configs => ({
	type: 'SET_CONFIGS',
	configs
});

export const loadConfigs = () => dispatch => {
	const action = {type: 'LOAD_CONFIGS', configs: {}};
	dispatch(action);
};
