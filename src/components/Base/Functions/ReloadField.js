/**
 * Reload filter fields
 */
export const reloadFilterFields = (subscribeWay, name = 'reset') => {
	return {
		name: `${name}OnReload`,
		path: `rtd.${subscribeWay}`,
		onChange: ({setSubscribeProps}) => {
			setSubscribeProps({
				value: undefined,
			});
		},
	};
};
