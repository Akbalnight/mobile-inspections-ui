import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
import {customColumnProps} from '../../TechMapsForm/TechMapColumnProps';

export const addControlPointToRoute = (catalogName) =>
	OperationOnLocal('add', catalogName, {});

export const editControlPointToRoute = (catalogName) =>
	OperationOnLocal('edit', catalogName, {}); // для редактрования сюда необходимо передать ROW

const OperationOnLocal = (type, catalogName, code) => {
	let controlPointsId, Row;

	const loadData = (callBack, row) => {
		Row = row;
		type === 'add' ? callBack(null) : callBack(Row);
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
							name: 'controlPointId',
							child: {
								componentType: 'SingleSelect',
								commandPanelProps: {
									systemBtnProps: {search: {}},
								},
								searchParamName: 'name',
								widthControl: 0,
								widthPopup: 740,
								heightPopup: 350,
								expandColumnKey: 'id',
								rowRender: 'name',
								expandDefaultAll: true,
								dispatchPath:
									'routes.controlPointModal.controlPoint',
								// onChangeKeys: (value, option) => {
								// 	return (controlPointsId = option);
								// },
								requestLoadRows: apiGetHierarchicalDataByConfigName(
									'controlPoints'
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
						componentType: 'ServerTable',
						selectable: true,
						footerShow: true,
						footerProps: {
							showElements: ['selected'],
							rightCustomSideElement: [
								{
									componentType: 'Item',
									child: {
										componentType: 'Text',
										label: 'DemoText',
									},
								},
							],
						},
						defaultFilter: {controlPointsId: null},
						subscribe: {
							name: 'controlPointEquipments',
							path:
								'rtd.routes.controlPointModal.controlPoint.selected',
							onChange: ({value, setReloadTable}) =>
								value &&
								setReloadTable &&
								setReloadTable({
									filter: {controlPointsId: value.id},
								}),
						},
						// не отображает в онлайн режиме, необходимо праdильно выстоить
						requestLoadRows: apiGetFlatDataByConfigName(
							'controlPointsEquipments'
						),
						// правльно разметить столбцы в конфиге,
						requestLoadConfig: apiGetConfigByName(
							'controlPointsEquipments'
						),
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
							name: 'techMapId',
							child: {
								componentType: 'SingleSelect',
								widthControl: 0,
								widthPopup: 740,
								heightPopup: 300,
								expandColumnKey: 'id',
								rowRender: 'name',
								expandDefaultAll: true,
								// onChangeKeys: (value, option) => {
								// 	return (techMapsId = option);
								// },
								dispatchPath:
									'routes.controlPointModal.techMap',
								requestLoadRows: apiGetHierarchicalDataByConfigName(
									'techMaps'
								),
								requestLoadDefault: apiGetFlatDataByConfigName(
									'techMaps'
								),
							},
						},
					],
				},
			],
		},

		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'techOperations',
					child: {
						componentType: 'ServerTable',
						customColumnProps: customColumnProps,
						defaultFilter: {techMapId: null},
						subscribe: {
							name: 'controlPointTechMap',
							path:
								'rtd.routes.controlPointModal.techMap.selected',
							onChange: ({value, setReloadTable}) =>
								value &&
								setReloadTable &&
								setReloadTable({
									filter: {techMapId: value.id},
								}),
						},
						footerShow: true,
						// не отображает в онлайн режиме, необходимо праdильно выстоить
						requestLoadRows: apiGetFlatDataByConfigName(
							'techOperationsSmall'
						),
						// правльно разметить столбцы в конфиге,
						requestLoadConfig: apiGetConfigByName(
							'techOperationsSmall'
						),
						onChange: (value) => {
							console.log(value);
						},
					},
				},
			],
		},
		{
			componentType: 'Row',
			gutter: [16, 24],
			children: [
				{
					componentType: 'Col',
					style: {
						padding: '32px 30px',
					},
					children: [
						{
							componentType: 'Item',
							name: 'techOperations',
							child: {
								componentType: 'Text',
								label: `Продолжительность всех операций: ${controlPointsId}`,
							},
						},
					],
				},
			],
		},
	];

	return {
		//change ...OnServer нужно не забыть поставить requestSaveRow
		// НЕ нужно должно быть OnLocal
		type: `${type}OnLocal`,
		title:
			type === 'add'
				? 'Создание контрольной точки'
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
