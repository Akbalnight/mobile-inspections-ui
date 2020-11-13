import {defectDetection} from '../../Base/Block/DefectDetection';

export const addDefectCard = () => OperationOnServer('catalogName', 'edit', {});

const OperationOnServer = (catalogName, type, code) => {
	let Row = null;
	const loadData = (callBack, row) => {
		Row = row;
		type === 'add' ? callBack(null) : callBack(Row);
	};

	const defectDetectionField = [
		catalogName === 'catalogName' //поменять на нужный журнал или панель
			? {
					componentType: 'Item',
					child: {
						componentType: 'Title',
						label: 'Выявление дефекта',
						level: 5,
					},
			  }
			: {},
		{...defectDetection},
	];

	const defectSapFields = [
		{
			componentType: 'Layout',
			className: 'mt-0',
			children: [
				{
					componentType: 'Col',
					span: 16,
					style: {marginLeft: 50},
					children: [
						{
							componentType: 'Item',
							label: '№ из SAP',
							name: 'countSAP',
							className: 'mb-8',
							child: {
								componentType: 'Input',
							},
						},
						{
							componentType: 'Item',
							label: 'План действий',
							name: 'actionCorrect',
							className: 'mb-8',
							child: {
								componentType: 'TextArea',
							},
						},
						{
							componentType: 'Item',
							label: 'Что происходит',
							name: 'whatsUp', //?
							className: 'mb-8',
							child: {
								componentType: 'Input',
							},
						},
						{
							componentType: 'Item',
							label: 'Статус из SAP',
							name: 'statusSAP',
							className: 'mb-8',
							child: {
								componentType: 'Input',
							},
						},
						{
							componentType: 'Item',
							label: 'Дата начала устранения',
							name: 'dateStartCorrect',
							className: 'mb-8',
							child: {
								componentType: 'DatePicker',
								showTime: true,
							},
						},
						{
							componentType: 'Item',
							label: 'Дата окончания устранения',
							name: 'dateEndCorrect',
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
			child: {
				componentType: 'Title',
				label: 'План устранения',
				level: 5,
			},
		},
		{
			componentType: 'Layout',
			className: 'mt-0',
			children: [
				{
					componentType: 'Col',
					span: 16,
					style: {marginLeft: 50},
					children: [
						{
							componentType: 'Item',
							label: '№ из SAP',
							name: 'countSAP',
							className: 'mb-8',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Диспетчер',
							name: 'dispatcher',
							className: 'mb-8',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Плановый срок устранения до',
							name: 'planDateEndCorrect',
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

	const defectEliminationFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Устранение дефекта',
				level: 5,
			},
		},
		{
			componentType: 'Layout',
			className: 'mt-0',
			children: [
				{
					componentType: 'Col',
					span: 16,
					style: {marginLeft: 50},
					children: [
						{
							componentType: 'Item',
							label: 'Дата фактического устранения',
							name: 'dateFactCorrect',
							className: 'mb-8',
							child: {
								componentType: 'DatePicker',
								showTime: true,
							},
						},
						{
							componentType: 'Item',
							label: 'Ответственный',
							name: 'staffResponsible',
							className: 'mb-8',
							child: {
								componentType: 'Input',
							},
						},
						{
							componentType: 'Item',
							label: 'Мероприятия по устранению',
							name: 'activityDescription',
							className: 'mb-8',
							child: {
								componentType: 'TextArea',
							},
						},
					],
				},
			],
		},
	];
	return {
		type: `${type}OnServer`, //сохраняем на сервер потому что хотим увидеть изменения в таблице
		title: 'Редактрование дефекта',
		width: 600,
		bodyStyle: {height: 860},
		initialValues: (row) => {
			return type === 'add' ? null : row;
		}, // оставил вариант с Add на случай если придется делать форму создания дефекта через modal
		form: {
			name: `${type}ModalForm`,
			loadInitData: loadData,
			onFinish: (values) => {
				console.log('values', values);
			},
			body: [
				code,
				...defectDetectionField,
				...(catalogName ? correctionPlanFields : defectSapFields),
				...(catalogName ? defectEliminationFields : []),
			],
		},
	};
};
