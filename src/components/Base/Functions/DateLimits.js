/**
 * Ограничиваем StartDate piker
 */
export const disabledStartDate = (startValue, endValue) => {
	if (!startValue || !endValue) {
		return false;
	}
	return startValue.valueOf() > endValue.valueOf();
};

/**
 * Ограничиваем EndDate piker
 */
export const disabledEndDate = (startValue, endValue) => {
	if (!endValue || !startValue) {
		return false;
	}
	return endValue.valueOf() <= startValue.valueOf();
};
/**
 * Очистка поля
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
