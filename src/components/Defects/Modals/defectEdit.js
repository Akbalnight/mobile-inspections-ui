import {EditOutlined} from '@ant-design/icons';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';
import {defectDetection} from '../../Base/Block/DefectDetection';

/**
 *
 * Форма изменение дефекта, все поля и правила по макетам
 */
export const editDefectCard = (catalogName) =>
	OperationOnServer(catalogName, 'edit', {});

const OperationOnServer = (catalogName, type, code) => {
	const loadData = (callBack, row) => {
		callBack(row);
	};

	const processBeforeSaveForm = (rawValues) => {
		const values = {...rawValues};

		return values;
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
								componentType: 'SingleSelect',
								rowRender: 'name',
								widthControl: 0,
								requestLoadRows: apiGetFlatDataByConfigName(
									'defectStatusesProcess'
								),
								requestLoadDefault: apiGetFlatDataByConfigName(
									'defectStatusesProcess'
								),
							},
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
					name: 'staffEliminationName',
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
						componentType: 'SingleSelect',
						widthControl: 0,
						rowRender: 'positionName',
						requestLoadRows: apiGetFlatDataByConfigName('staff'),
						requestLoadDefault: apiGetFlatDataByConfigName('staff'),
					},
				},
				{
					componentType: 'Item',
					label: 'Мероприятия по устранению',
					name: 'note',
					className: 'mb-8',
					child: {
						componentType: 'Input',
					},
				},
			],
		},
	];

	return {
		componentType: 'Item',
		child: {
			componentType: 'Modal',
			buttonProps: {
				type: 'default',
				icon: <EditOutlined />,
			},

			modalConfig: {
				type: `${type}OnServer`,
				title: 'Редактрование дефекта',
				width: catalogName === 'defects' ? 600 : 500,
				bodyStyle: {height: catalogName === 'defects' ? 860 : 680},
				requestSaveRow: apiSaveByConfigName(
					catalogName === 'defects'
						? 'saveEditModalDefect'
						: 'saveEditModalPanelProblem'
				),
				form: {
					name: `${type}ModalForm`,
					loadInitData: loadData,
					methodSaveForm: 'PUT',
					processBeforeSaveForm: processBeforeSaveForm,
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
						...(catalogName === 'defects'
							? defectEliminationFields
							: []),
					],
				},
			},
		},
	};
};
