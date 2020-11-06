import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../../apis/catalog.api';

export const addChoiseExecutor = (catalogName) =>
	choiseExecutor('add', catalogName, {});

const choiseExecutor = (type, catalogName, code) => {
	let Row;
	const loadData = (callBack, row) => {
		Row = row;
		type === 'add' ? callBack(null) : callBack(Row);
	};

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
				widthControl: 0,
				expandColumnKey: 'id',
				rowRender: 'name',
				expandDefaultAll: true,
				dispatchPath: 'schedules.selectEmployeModal.structuralUnits',
				requestLoadRows: apiGetFlatDataByConfigName('techMaps'), // поставить правильный запрос
				requestLoadDefault: apiGetFlatDataByConfigName('techMaps'), // поставить правильный запрос
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
				widthControl: 0,
				expandColumnKey: 'id',
				rowRender: 'name',
				expandDefaultAll: true,
				dispatchPath: 'schedules.selectEmployeModal.workShift',
				subscribe: {
					name: 'schedulesWorkShift',
					path:
						'rtd.schedules.selectEmployeModal.structuralUnits.selected',
					onChange: ({value, setReloadTable}) =>
						value &&
						setReloadTable &&
						setReloadTable({
							filter: {structuralUnitsId: value.id},
						}),
				},
				requestLoadRows: apiGetFlatDataByConfigName('techMaps'), // поставить правильный запрос
				requestLoadDefault: apiGetFlatDataByConfigName('techMaps'), // поставить правильный запрос
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
					name: 'executorTable',
					child: {
						componentType: 'ServerTable',
						defaultFilter: {controlPointsId: null},
						subscribe: {
							name: 'executorTable',
							path:
								'rtd.schedules.selectEmployeModal.workShift.selected',
							onChange: ({value, setReloadTable}) =>
								value &&
								setReloadTable &&
								setReloadTable({
									filter: {workShiftId: value.id},
								}),
						},

						// поставить правильный запрос
						requestLoadRows: apiGetFlatDataByConfigName(
							'staffPositions'
						),
						// поставить правильный запрос
						requestLoadConfig: apiGetConfigByName('staffPositions'),
					},
				},
			],
		},
	];

	return {
		type: `${type}OnLocal`,
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
			labelCol: {span: 10},
			wrapperCol: {span: 14},

			loadInitData: loadData,
			onFinish: (values) => {
				console.log('values', values);
			},

			body: [code, ...selectFields, ...executorTableFields],
		},
	};
};
