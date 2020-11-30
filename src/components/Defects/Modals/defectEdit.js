import {defectDetection} from '../../Base/Block/DefectDetection';

export const addDefectCard = () => OperationOnServer('catalogName', 'edit', {});

/**
 * Это модальное окно в зависимости от приходящего catalogName, может быть как в журнале дефектов, так и в панеле проблем
 */
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
		{
			componentType: 'Item',
			name: 'id',
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
					span: 16,
					style: {marginLeft: 50},
					children: [
						{
							componentType: 'Item',
							label: '№ из SAP',
							name: 'sapMessageId',
							className: 'mb-8',
							child: {
								componentType: 'Text', // 'Text' ведь номер в сап может и не будет меняться
							},
						},
						{
							componentType: 'Item',
							label: 'План действий',
							name: 'actionCorrect', // найминг тут неверный
							className: 'mb-8',
							child: {
								componentType: 'TextArea',
							},
						},
						{
							componentType: 'Item',
							label: 'Что происходит',
							name: 'whatsUp', // найминг тут неверный
							className: 'mb-8',
							child: {
								componentType: 'Input',
							},
						},
						{
							componentType: 'Item',
							label: 'Статус из SAP',
							name: 'statusSAP', // найминг тут неверный
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
					style: {marginLeft: 50},
					children: [
						{
							componentType: 'Item',
							label: '№ из SAP',
							name: 'sapMessageId',
							className: 'mb-8',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Диспетчер',
							name: 'dispatcher', // найминг туту неверный
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
					style: {marginLeft: 50},
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
							name: 'activityDescription', // найминг туту неверный
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
			labelCol: {span: 12},
			wrapperCol: {span: 12},
			body: [
				code,
				...defectDetectionField,
				...(catalogName ? correctionPlanFields : defectSapFields),
				...(catalogName ? defectEliminationFields : []),
			],
		},
	};
};
