/**
 * Limiting StartDate piker
 */
export const disabledStartDate = (startValue, endValue) => {
	if (!startValue || !endValue) {
		return false;
	}
	console.log('1>>>', startValue.valueOf(), '2>>>', endValue.valueOf());
	return startValue.valueOf() >= endValue.valueOf();
};

/**
 * Limiting EndDate piker
 */
export const disabledEndDate = (startValue, endValue) => {
	if (!endValue || !startValue) {
		return false;
	}
	return endValue.valueOf() <= startValue.valueOf();
};
