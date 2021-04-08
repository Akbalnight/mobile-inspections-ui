/**
 * Reload filter fields
 */
export const reloadFilterFields = (subscribeWay) => {
	return {
		name: 'onReload',
		path: `rtd.${subscribeWay}`,
		onChange: ({setSubscribeProps}) => {
			setSubscribeProps({
				value: undefined,
			});
		},
	};
};
