import {
	apiGetConfigByName,
	apiGetDataByConfigName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';

export const addChoiseExecutor = (catalogName) =>
	choiseExecutor('add', catalogName, {});

/**
 * В данном модальном окне происходит выбор исполнителя из подразделения, смены и конкретного сотрудника. ннужно продумать конфиги для подачи в эту модалку
 */
const choiseExecutor = (type, catalogName, code) => {
	const loadData = (callBack, row) => {
		type === 'add' ? callBack(null) : callBack(row);
	};
	const configFilterPanel = [
		{
			componentType: 'SingleSelect',
			name: 'staffIds',
			className: 'mr-16',
			rowRender: 'positionName',
			title: 'Сотрудник',
			widthControl: 150,
			widthPopup: 300,
			heightPopup: 200,
			requestLoadRows: apiGetFlatDataByConfigName('staff'),
			requestLoadConfig: apiGetConfigByName('staff'),
		},
	];

	const selectFields = [
		{
			componentType: 'Item',
			name: 'structuralUnits', // ввел это понятие, прокинул по модалке дальше
			label: 'Структурное подразделение',
			rules: [
				{
					message: 'Заполните вариант подразделения',
					required: true,
				},
			],
			child: {
				componentType: 'SingleSelect',
				expandColumnKey: 'id',
				rowRender: 'name',
				widthControl: 0,
				widthPopup: 300,
				heightPopup: 200,
				dispatchPath: 'schedules.selectEmployeModal.structuralUnits',
				requestLoadRows: apiGetHierarchicalDataByConfigName(
					'departments'
				),
				requestLoadDefault: apiGetFlatDataByConfigName('departments'),
			},
		},
		{
			componentType: 'Item',
			name: 'workShift', // ввел это понятие, прокинул по модалке дальше
			label: 'Рабочая смена',
			rules: [
				{
					message: 'Заполните вариант смены',
					required: true,
				},
			],
			child: {
				componentType: 'SingleSelect',
				expandColumnKey: 'id',
				rowRender: 'positionName',
				widthControl: 0,
				widthPopup: 300,
				heightPopup: 200,
				dispatchPath: 'schedules.selectEmployeModal.workShift',
				subscribe: {
					name: 'schedulesWorkShift',
					path:
						'rtd.schedules.selectEmployeModal.structuralUnits.selected',
					onChange: ({value, setReloadTable}) =>
						value &&
						setReloadTable &&
						setReloadTable({
							filter: {departmentName: value.name}, // настроить фильтрацио по сменам
						}),
				},
				requestLoadRows: apiGetFlatDataByConfigName('staff'), // поставить правильный запрос
				requestLoadDefault: apiGetFlatDataByConfigName('staff'), // поставить правильный запрос
			},
		},
	];

	const executorTableFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Исполнитель:',
				level: 5,
			},
		},
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'executor',
					child: {
						componentType: 'ServerTable',
						style: {height: '200px'},
						filterPanelProps: {
							configFilter: [...configFilterPanel],
						},
						requestLoadRows: apiGetFlatDataByConfigName(
							'controlPoints'
						),
						requestLoadConfig: apiGetDataByConfigName(
							'controlPoints'
						),
						// subscribe: {
						// 	name: 'executor',
						// 	path:
						// 		'rtd.schedules.selectEmployeModal.workShift.selected',
						// 	onChange: ({value, setReloadTable}) =>
						// 		value &&
						// 		setReloadTable &&
						// 		setReloadTable({
						// 			filter: {departmentName: value.name},
						// 		}),
						// },
					},
				},
			],
		},
	];

	return {
		type: `viewObject`, // нужно подумать куда будет сохранять
		title: 'Выбор исполнителя',
		width: 576,
		bodyStyle: {
			height: 496,
		},

		initialValues: (row) => {
			return null;
		},
		form: {
			name: `${type}ModalForm`,
			labelCol: {span: 8},
			wrapperCol: {span: 12},
			loadInitData: loadData,
			body: [code, ...selectFields, ...executorTableFields],
		},
	};
};
