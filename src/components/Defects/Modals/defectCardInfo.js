import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';

export const defectCardInfoModal = (history) => {
	// let Row;
	const loadData = (callBack, row) => {
		// Row = row;
		callBack(row);
	};
	//вариант возможный для использования
	/**
	 * Почему представил вариант который ниже.
	 * Мы открваем карточку дефекта и имеем сразу номер и стату, в случае необходимости кнопку реадктирвать
	 * второстепенная иснформация , а так же разного рода таблицы прячем в Tabs. Единственное при переключении у меня не коректное отображение. но это настраивается.
	 *
	 * в случае если оставляем как в макете фигма.
	 * У нас в футер падает кнопка редактировать (логика та же что и в первом варинте), но тогда придется для кнопеи закрыть в футере писать логику вручную
	 *
	 * history нужен только для кнопки редактировать. Чтобы отправить нас в последующее редактирование
	 */
	const defectInfoField = [
		// {
		// 	componentType: 'Col',
		// 	children: [
		// 		{
		// 			componentType: 'Item',
		// 			label: '№ в Журнале Дефектов',
		// 			name: 'code',
		// 			className: 'mb-0',
		// 			child: {componentType: 'Text'},
		//
		// 		},
		// 		{
		// 			componentType: 'Item',
		// 			label: 'Статус',
		// 			name: 'statusProcessId',
		// 			className: 'mb-0',
		// 			child: {componentType: 'Text'},
		// 		},
		// 	],
		// },
	];

	const infoTabFields = [
		{
			componentType: 'Layout',
			style: {padding: '24px'},
			children: [
				//стандартный вариант
				{
					componentType: 'Col',
					children: [
						{
							componentType: 'Item',
							label: '№ в Журнале Дефектов',
							name: 'code',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'Статус',
							name: 'statusProcessId',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
				{
					componentType: 'Item',
					child: {
						componentType: 'Title',
						label: 'Выявление дефекта',
						level: 5,
					},
				},

				{
					componentType: 'Col',
					children: [
						{
							componentType: 'Item',
							label: 'Дата обнаружения',
							name: 'dateDetectDefect',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'Оборудование',
							name: 'equipmentName',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'Описание',
							name: 'description',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'Обнаружил',
							name: 'staffDetectId',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
				{
					componentType: 'Item',
					child: {
						componentType: 'Title',
						label: 'План устранения',
						level: 5,
					},
				},
				{
					componentType: 'Col',
					children: [
						{
							componentType: 'Item',
							label: 'Плановый срок устранения',
							name: 'dateEliminationPlan',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'Диспетчер',
							name: 'staffEliminationId', // с наймингов нужно определиться
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'Отклонение от КПЭ',
							name: 'kpi',
							className: 'mb-0',
							valuePropName: 'checked',
							rules: [
								{
									type: 'boolean',
								},
							],
							child: {
								componentType: 'Checkbox',
								disabled: true,
							},
						},

						{
							componentType: 'Item',
							label: 'Причина возникновения',
							name: 'descriptionCauses',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'План действий',
							name: 'actionPlan',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
			],
		},
	];

	const exampleTableFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'Title',
						label: 'Тут будет компонент с медиа',
						level: 5,
					},
				},
				{
					componentType: 'Item',
					child: {
						componentType: 'LocalTable',
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'page'},
								edit: {actionType: ['page', 'modal']},
								up: {},
								down: {},
								delete: {},
							},
						},

						requestLoadRows: apiGetHierarchicalDataByConfigName(
							'controlPoints'
						),
						requestLoadConfig: apiGetConfigByName('controlPoints'),
					},
				},
			],
		},
	];

	const tabsField = [
		{
			componentType: 'Tabs',
			type: 'card',
			size: 'large',
			style: {paddingTop: '24px'},
			children: [
				{
					componentType: 'TabPane',
					tab: 'Информация о дефекте',
					key: 'infoTab',
					children: [...infoTabFields],
				},
				{
					componentType: 'TabPane',
					tab: 'Вложения',
					key: 'filesTab',
					children: [...exampleTableFields],
				},
				{
					componentType: 'TabPane',
					tab: 'Оборудование',
					key: 'equipmentsTab',
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Оборудование',
							},
						},
					],
				},
				{
					componentType: 'TabPane',
					tab: 'Обход',
					key: 'scheduleTab',
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Обход',
							},
						},
					],
				},
			],
		},
	];

	return {
		type: 'viewObject',
		title: `Карточка дефекта`,
		width: 800,
		bodyStyle: {height: 650},
		form: {
			name: 'defectDataView',
			noPadding: true,
			labelCol: {span: 8},
			wrapperCol: {span: 16},
			loadInitData: loadData,
			body: [...defectInfoField, ...tabsField],
		},
	};
};
