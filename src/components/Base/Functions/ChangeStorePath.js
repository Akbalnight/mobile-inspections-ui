export const changeStorePath = (mainWay, catalogName) =>
	mainWay !== catalogName
		? `${mainWay}.${catalogName}Table`
		: `${catalogName}.table`;
