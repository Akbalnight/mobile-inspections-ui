export const noop = () => {};

export const flatten = arrayOfArrays =>
	arrayOfArrays.reduce(
		(flattened, item) =>
			flattened.concat(Array.isArray(item) ? flatten(item) : [item]),
		[]
	);

export const getTableRowKeys = (data, rowKey) => {
	const rowKeys = data.map(item => {
		if (item.children && item.children.length) {
			return [item[rowKey], getTableRowKeys(item.children, rowKey)];
		}
		return item[rowKey];
	});
	return [...rowKeys];
};
