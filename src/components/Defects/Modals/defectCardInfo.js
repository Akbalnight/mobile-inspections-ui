import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';

export const defectCardInfoModal = () => {
	let Row;
	const loadData = (callBack, row) => {
		Row = row;
		callBack(row);
	};

	const infoTabFields = [
		{
			componentType: 'Col',
			style: {
				marginLeft: 50,
			},
			children: [
				{
					componentType: 'Item',
					label: '№ в Журнале Дефектов',
					name: 'countDefectsLog', // с наймингов нужно определиться
					className: 'mb-0',
					child: {componentType: 'Text'},
				},
				{
					componentType: 'Item',
					label: 'Статус',
					name: 'statusDefectsLog', // с наймингов нужно определиться
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
				style: {
					marginTop: 20,
				},
			},
		},
		{
			componentType: 'Col',
			style: {
				marginLeft: 50,
			},
			children: [
				{
					componentType: 'Item',
					label: 'Дата обнаружения',
					name: 'dateDiscovery', // с наймингов нужно определиться
					className: 'mb-0',
					child: {componentType: 'Text'},
				},
				{
					componentType: 'Item',
					label: 'Оборудование',
					name: 'equipment', // с наймингов нужно определиться
					className: 'mb-0',
					child: {componentType: 'Text'},
				},
				{
					componentType: 'Item',
					label: 'Описание',
					name: 'description', // с наймингов нужно определиться
					className: 'mb-0',
					child: {componentType: 'Text'},
				},
				{
					componentType: 'Item',
					label: 'Обнаружил',
					name: 'staffDiscovered', // с наймингов нужно определиться
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
				style: {
					marginTop: 20,
				},
			},
		},
		{
			componentType: 'Col',
			style: {
				marginLeft: 50,
			},
			children: [
				{
					componentType: 'Item',
					label: 'Плановый срок устранения',
					name: 'plannedCorrectionPeriod', // с наймингов нужно определиться
					className: 'mb-0',
					child: {componentType: 'Text'},
				},
				{
					componentType: 'Item',
					label: 'Диспетчер',
					name: 'dispatcher', // с наймингов нужно определиться
					className: 'mb-0',
					child: {componentType: 'Text'},
				},
				{
					componentType: 'Item',
					label: 'Отклонение от КПЭ',
					name: 'deviationOf', // с наймингов нужно определиться
					className: 'mb-0',
					child: {componentType: 'Text'},
				},
				{
					componentType: 'Item',
					label: 'Причина возникновения',
					name: 'causeOfOccurrence', // с наймингов нужно определиться
					className: 'mb-0',
					child: {componentType: 'Text'},
				},
				{
					componentType: 'Item',
					label: 'План действий',
					name: 'actionPlan', // с наймингов нужно определиться
					className: 'mb-0',
					child: {componentType: 'Text'},
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
						componentType: 'LocalTable',
						style: {
							margin: 25,
						},
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
					children: [
						// {
						// 	componentType: 'Item',
						// 	child: {
						// 		componentType: 'Title',
						//         label: 'Тут будет компонент с медиа',
						//         level:5
						// 	},
						// },
						...exampleTableFields,
					],
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
								label: 'Title',
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
								label: 'Title',
							},
						},
					],
				},
			],
		},
	];

	return {
		type: 'viewObject',
		title: `Карточка дефекта ${Row}`,
		width: 800,
		bodyStyle: {height: 650},
		form: {
			name: 'defectDataView',
			noPadding: false,
			loadInitData: loadData,
			body: [...tabsField],
		},
	};
};
