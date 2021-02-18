/**
 * модальное окно просмотра обхода. Форма была собрана из макета интерфейса
 */

export const detourViewModal = () => {
	const loadData = (callBack, row) => {
		callBack(row);
	};
	const infoFields = [
		{
			componentType: 'Col',
			children: [
				{
					componentType: 'Item',
					label: 'Наименование обхода',
					name: 'name',
					className: 'mb-0',
					child: {
						componentType: 'Text',
					},
				},

				{
					componentType: 'Item',
					label: 'Наименование маршрута',
					name: 'routeName',
					className: 'mb-0',
					child: {
						componentType: 'Text',
					},
				},
				{
					componentType: 'Item',
					label: 'Дата начала',
					name: 'dateStartPlan',
					className: 'mb-0',
					child: {
						componentType: 'Text',
					},
				},
				{
					componentType: 'Item',
					label: 'Дата окончания',
					name: 'dateFinishPlan',
					className: 'mb-0',
					child: {
						componentType: 'Text',
					},
				},
				{
					componentType: 'Item',
					label: 'Исполнитель',
					name: 'staffName',
					className: 'mb-0',
					child: {
						componentType: 'Text',
					},
				},
				{
					componentType: 'Item',
					label: 'Порядок обхода',
					name: 'saveOrderControlPoints',
					className: 'mb-0',
					valuePropName: 'checked',
					child: {
						componentType: 'Checkbox',
						label: 'Учитывать',
						disabled: true,
					},
				},
				{
					componentType: 'Item',
					label: 'Допустимое откл., мин',
					name: 'possibleDeviationLocationTime',
					className: 'mb-0',
					child: {
						componentType: 'Text',
					},
				},
				{
					componentType: 'Item',
					label: 'Время обхода',
					name: 'takeIntoAccountTimeLocation',
					className: 'mb-0',
					valuePropName: 'checked',
					child: {
						componentType: 'Checkbox',
						label: 'Учитывать',
						disabled: true,
					},
				},
				{
					componentType: 'Item',
					label: 'Допустимое откл. на точке, мин',
					name: 'possibleDeviationLocationTime',
					className: 'mb-0',
					child: {
						componentType: 'Text',
					},
				},
				{
					componentType: 'Item',
					label: 'Время начала обхода',
					name: 'takeIntoAccountDateStart',
					className: 'mb-0',
					valuePropName: 'checked',
					child: {
						componentType: 'Checkbox',
						label: 'Учитывать',
						disabled: true,
					},
				},
				{
					componentType: 'Item',
					label: 'Допустимое откл., мин',
					name: 'possibleDeviationDateStart',
					className: 'mb-0',
					child: {
						componentType: 'Text',
					},
				},
				{
					componentType: 'Item',
					label: 'Время окончания обхода',
					name: 'takeIntoAccountDateFinish',
					className: 'mb-0',
					valuePropName: 'checked',
					child: {
						componentType: 'Checkbox',
						label: 'Учитывать',
						disabled: true,
					},
				},
				{
					componentType: 'Item',
					label: 'Допустимое откл., мин',
					name: 'possibleDeviationDateFinish',
					className: 'mb-0',
					child: {
						componentType: 'Text',
					},
				},
			],
		},
	];

	return {
		type: 'viewObject',
		title: `Просмотр обхода`,
		width: 426,
		bodyStyle: {
			height: 539,
		},
		form: {
			name: 'schedulesDataView',
			loadInitData: loadData,
			labelCol: {span: 12},
			wrapperCol: {span: 12},
			body: [...infoFields],
		},
	};
};
