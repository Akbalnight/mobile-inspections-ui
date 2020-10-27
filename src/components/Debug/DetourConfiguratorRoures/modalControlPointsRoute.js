import {notification} from 'antd';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';

export const addControlPointToRoute = (catalogName) =>
	OperationOnLocal('add', catalogName, {});

export const editControlPointToRoute = (catalogName) =>
	OperationOnLocal('edit', catalogName, {});

const OperationOnLocal = (type, catalogName, code) => {
	const loadData = (callBack) => {
		if (type === 'add') {
			callBack({
				code: null,
				name: null,
				isGroup: false,
				parentId: null,
				equipments: [],
				techMaps: [],
			});
		} else {
			apiGetFlatDataByConfigName('controlPoints')({
				data: {id: type},
			})
				.then((response) => {
					console.log('loadData => response ', response.data);
					callBack(response.data[0]);
				})
				.catch((error) => {
					if (error.response) {
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
						notification.error({
							message:
								'Произошла ошибка при загрузки данных формы',
						});
					}
				});
		}
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
								requestLoadRows: ({data, params}) =>
									apiGetFlatDataByConfigName('controlPoints')(
										{
											data: {
												...data,
												// isGroup: true
											},
											params,
										}
									),
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
								data: {...data},
								params,
							}), //controlPointsId: pageParams.id
						requestLoadConfig: () =>
							apiGetConfigByName('controlPointsEquipments')(),
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
							name: 'groupControlPoint',
							child: {
								componentType: 'SingleSelect',
								widthControl: 0,
								widthPopup: 740,
								heightPopup: 300,
								expandColumnKey: 'id',
								rowRender: 'name',
								expandDefaultAll: true,
								requestLoadRows: ({data, params}) =>
									apiGetFlatDataByConfigName('techMaps')({
										data: {
											...data,
											// isGroup: true,
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
									code: null,
								},
								params,
							}), //controlPointsId: pageParams.id,
						requestLoadConfig: () =>
							apiGetConfigByName('techOperations')(),
					},
				},
			],
		},
		{
			componentType: 'Item',
			child: {
				componentType: 'Text',
				label: 'TYPE',
			},
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
