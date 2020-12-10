import {defectDetection} from '../../Base/Block/DefectDetection';

export const editDefectCard = (catalogName) =>
	OperationOnServer(catalogName, 'edit', {});

/**
 * Это модальное окно в зависимости от приходящего catalogName, может быть как в журнале дефектов, так и в панеле проблем
 */
const OperationOnServer = (catalogName, type, code) => {
	const loadData = (callBack, row) => {
		callBack(row);
	};

	const defectDetectionField = [
		catalogName === 'defects'
			? {
					componentType: 'Col',
					children: [
						{
							componentType: 'Item',
							name: 'statusProcessId',
							label: 'Статус обработки',
							child: {
								componentType: 'Text',
							},
							// возможно мы тут все-таки поставим РАДИО группу.
							// child: {
							// 	componentType: 'RadioGroup',
							// 	optionType: 'button',
							// 	size: 'small',
							// 	options: [
							// 		{
							// 			label: '1',
							// 			value: '1',
							// 			style: {
							// 				color: 'white',
							// 				backgroundColor: '#FF4040',
							// 			},
							// 		},
							// 		{
							// 			label: '2',
							// 			value: '2',
							// 			style: {
							// 				color: 'white',
							// 				backgroundColor: '#F2C94C',
							// 			},
							// 		},
							// 		{
							// 			label: '3',
							// 			value: '3',
							// 			style: {
							// 				color: 'white',
							// 				backgroundColor: '#9DCE5B',
							// 			},
							// 		},
							// 		{
							// 			label: '4',
							// 			value: '4',
							// 			style: {
							// 				color: 'white',
							// 				backgroundColor: '#98B8E3',
							// 			},
							// 		},
							// 	],
							// },
						},

						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Выявление дефекта',
								level: 5,
							},
						},
					],
			  }
			: {},
		{
			componentType: 'Item',
			name: 'code',
			label: '№ в журнале',
			className: 'mb-8',
			child: {
				componentType: 'Text',
			},
		},
		{...defectDetection},
	];

	const defectSapFields = [
		{
			componentType: 'Layout',
			className: 'mt-0',
			children: [
				{
					componentType: 'Col',
					className: 'mt-0',
					children: [
						{
							componentType: 'Item',
							label: '№ из SAP',
							name: 'sapMessageCode',
							className: 'mb-8',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'План действий',
							name: 'actionPlan',
							className: 'mb-8',
							child: {
								componentType: 'TextArea',
							},
						},
						{
							componentType: 'Item',
							label: 'Что происходит',
							name: 'actionDescription',
							className: 'mb-8',
							child: {
								componentType: 'Input',
							},
						},
						{
							componentType: 'Item',
							label: 'Статус из SAP',
							name: 'sapMessageCode',
							className: 'mb-8',
							child: {
								componentType: 'Input',
							},
						},
						{
							componentType: 'Item',
							label: 'Дата начала устранения',
							name: 'dateEliminationPlan',
							className: 'mb-8',
							child: {
								componentType: 'DatePicker',
								showTime: true,
							},
						},
						{
							componentType: 'Item',
							label: 'Дата окончания устранения',
							name: 'dateEliminationFact',
							className: 'mb-8',
							child: {
								componentType: 'DatePicker',
								showTime: true,
							},
						},
					],
				},
			],
		},
	];

	const correctionPlanFields = [
		{
			componentType: 'Item',
			className: 'mt-16',
			child: {
				componentType: 'Title',
				label: 'План устранения',
				level: 5,
			},
		},
		{
			componentType: 'Col',
			className: 'mt-16',
			children: [
				{
					componentType: 'Item',
					label: '№ из SAP',
					name: 'sapMessageCode',
					className: 'mb-8',
					child: {
						componentType: 'Text',
					},
				},
				{
					componentType: 'Item',
					label: 'Диспетчер',
					name: 'staffEliminationId',
					className: 'mb-8',
					child: {
						componentType: 'Text',
					},
				},
				{
					componentType: 'Item',
					label: 'Плановый срок устранения до',
					name: 'dateEliminationPlan',
					className: 'mb-8',
					child: {
						componentType: 'DatePicker',
						showTime: true,
					},
				},
			],
		},
	];

	const defectEliminationFields = [
		{
			componentType: 'Item',
			className: 'mt-16',
			child: {
				componentType: 'Title',
				label: 'Устранение дефекта',
				level: 5,
			},
		},
		{
			componentType: 'Col',
			className: 'mt-16',
			children: [
				{
					componentType: 'Item',
					label: 'Дата фактического устранения',
					name: 'dateEliminationFact',
					className: 'mb-8',
					child: {
						componentType: 'DatePicker',
						showTime: true,
					},
				},
				{
					componentType: 'Item',
					label: 'Ответственный',
					name: 'staffEliminationId',
					className: 'mb-8',
					child: {
						componentType: 'Input',
					},
				},
				{
					componentType: 'Item',
					label: 'Мероприятия по устранению',
					name: 'note',
					className: 'mb-8',
					child: {
						componentType: 'TextArea',
					},
				},
			],
		},
	];

	return {
		type: `${type}OnServer`, //сохраняем на сервер потому что хотим увидеть изменения в таблице
		title: 'Редактрование дефекта',
		width: catalogName === 'defects' ? 600 : 500,
		bodyStyle: {height: catalogName === 'defects' ? 860 : 680},
		form: {
			name: `${type}ModalForm`,
			loadInitData: loadData,
			onFinish: (values) => {
				console.log('values', values);
			},
			labelCol: {span: 10},
			wrapperCol: {span: 12},
			body: [
				code,
				...defectDetectionField,
				...(catalogName === 'defects'
					? correctionPlanFields
					: defectSapFields),
				...(catalogName === 'defects' ? defectEliminationFields : []),
			],
		},
	};
};
