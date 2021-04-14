export const codeInput = {
	componentType: 'Item',
	label: 'Код',
	name: 'code',
	// rules: [
	// 	{
	// 		message: 'Заполните код',
	// 		required: true,
	// 	},
	// ], // пока поле скрыто, нельзя его требовать
	child: {componentType: 'InputNumber'},
	hidden: true,
};
