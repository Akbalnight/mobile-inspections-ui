/**
 * Limiting StartDate piker
 */
export const disabledStartDate = (startValue, endValue) => {
	if (!startValue || !endValue) {
		return false;
	}

	return startValue.startOf('day').valueOf() >= endValue.valueOf();
};

/**
 * Limiting EndDate piker
 */
export const disabledEndDate = (startValue, endValue) => {
	if (!endValue || !startValue) {
		return false;
	}
	return endValue.valueOf() <= startValue.startOf('day').valueOf();
};
