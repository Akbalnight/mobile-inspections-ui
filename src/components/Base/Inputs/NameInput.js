export const nameInput = {
	componentType: 'Item',
	label: 'Наименование',
	name: 'name',
	rules: [
		{
			message: 'Заполните наименование',
			required: true
		}
	],
	child: {componentType: 'Input'}
};
