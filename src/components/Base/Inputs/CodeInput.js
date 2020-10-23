export const codeInput = {
	componentType: 'Item',
	label: 'Код',
	name: 'code',
	rules: [
		{
			message: 'Заполните код',
			required: true
		}
	],
	child: {componentType: 'InputNumber'}
};
