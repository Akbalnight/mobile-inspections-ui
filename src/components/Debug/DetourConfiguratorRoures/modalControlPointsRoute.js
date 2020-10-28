import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';

export const addControlPointToRoute = (catalogName) =>
	OperationOnLocal('add', catalogName, {});

export const editControlPointToRoute = (catalogName) =>
	OperationOnLocal('edit', catalogName, {});

const OperationOnLocal = (type, catalogName, code) => {
	let controlPointsId, techMapsId;

	const loadData = (callBack, row) => {
		callBack(null);
	};

	const headFields = [
		{
			componentType: 'Row',
			gutter: [16, 16],
			children: [
				{
					componentType: 'Col',
					span: 24,
					children: [
						{
							componentType: 'Item',
							name: 'groupControlPoint',
							child: {
								componentType: 'SingleSelect',
								widthControl: 0,
								widthPopup: 740,
								heightPopup: 250,
								expandColumnKey: 'id',
								rowRender: 'name',
								expandDefaultAll: true,
								onChangeKeys: (value, option) => {
									return (controlPointsId = option);
								},
								requestLoadRows: ({data, params}) =>
									apiGetHierarchicalDataByConfigName(
										'controlPoints'
									)({
										data: {
											...data,
										},
										params,
									}),
								requestLoadDefault: apiGetFlatDataByConfigName(
									'controlPoints'
								),
							},
						},
					],
				},
			],
		},
	];

	const equipmentTableConfig = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Оборудование',
				level: 5,
			},
		},
		{
			componentType: 'Layout',
			className: 'mb-16',
			children: [
				{
					componentType: 'Item',
					name: 'equipments',
					child: {
						componentType: 'LocalTable',
						selectable: true,
						requestLoadRows: ({data, params}) =>
							apiGetFlatDataByConfigName(
								'controlPointsEquipments'
							)({
								data: {...data, controlPointsId},
								params,
							}), // не отображает в онлайн режиме, необходимо праdильно выстоить
						requestLoadConfig: () =>
							apiGetConfigByName('controlPointsEquipments')(), // правльно разметить столбцы в конфиге,
					},
				},
			],
		},
	];

	const techMaps = [
		{
			componentType: 'Row',
			gutter: [16, 16],
			children: [
				{
					componentType: 'Col',
					span: 24,
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Технологические карты',
								level: 5,
							},
						},
						{
							componentType: 'Item',
							name: 'techMapsGroup',
							child: {
								componentType: 'SingleSelect',
								widthControl: 0,
								widthPopup: 740,
								heightPopup: 300,
								expandColumnKey: 'id',
								rowRender: 'name',
								expandDefaultAll: true,
								onChangeKeys: (value, option) => {
									return (techMapsId = option);
								},
								requestLoadRows: ({data, params}) =>
									apiGetFlatDataByConfigName('techMaps')({
										data: {
											...data,
										},
										params,
									}),
								requestLoadDefault: apiGetFlatDataByConfigName(
									'techMaps'
								),
							},
						},
						{},
					],
				},
			],
		},

		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'techMaps',
					child: {
						componentType: 'LocalTable',

						requestLoadRows: ({data, params}) =>
							apiGetFlatDataByConfigName('techOperations')({
								data: {
									...data,
									techMapsId,
								},
								params,
							}), // не отображает в онлайн режиме, необходимо праdильно выстоить
						requestLoadConfig: () =>
							apiGetConfigByName('techOperations')(), // правльно разметить столбцы в конфиге,
					},
				},
			],
		},
		{
			componentType: 'Row',
			gutter: [16, 16],
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',

							child: {
								componentType: 'Text',
								label: 'Продолжительность всех операций',
							},
						},
					],
				},
			],
		},
	];

	return {
		type: `${type}OnLocal`, //change ...OnServer нужно не забыть поставить requestSaveRow
		title:
			type === 'add'
				? 'Добавление контрольной точки'
				: 'Изменение контрольной точки',
		width: 783,
		bodyStyle: {
			height: 682,
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

			body: [code, ...headFields, ...equipmentTableConfig, ...techMaps],
		},
	};
};
