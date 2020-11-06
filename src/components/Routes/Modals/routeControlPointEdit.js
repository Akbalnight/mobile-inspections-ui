import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
import {techOperations} from './techOperationsConfig';

export const addControlPointToRoute = () => OperationOnLocal('add', {});

export const editControlPointToRoute = () => OperationOnLocal('edit', {});

const OperationOnLocal = (type, code) => {
	let Row = null;
	const loadData = (callBack, row) => {
		Row = {...row};
		if (Row.jsonEquipments) Row.equipments = JSON.parse(Row.jsonEquipments);
		// console.log(row);
		type === 'add' ? callBack(null) : callBack(Row);
	};

	const addControlPoint = {
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
	};

	const editControlPoint = {
		componentType: 'Row',
		children: [
			{
				componentType: 'Col',
				span: 12,
				children: [
					{
						componentType: 'Item',
						label: 'Наименование',
						name: 'controlPointName',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
				],
			},
		],
	};

	const loadControlPointsEquipments = ({params, data}) => {
		let newData = {...data};
		// console.log('loadControlPointsEquipments Row => ', Row);
		if (type === 'edit')
			newData.controlPointsId = Row ? Row.controlPointId : null;
		return apiGetFlatDataByConfigName('controlPointsEquipments')({
			params,
			data: newData,
		});
	};
	//
	const loadControlPointsTechOperations = ({params, data}) => {
		let newData = {...data};
		// console.log('loadControlPointsEquipments newData.techMapId => ', newData.techMapId);
		if (type === 'edit' && newData.techMapId === undefined) {
			newData.techMapId = Row ? Row.techMapId : null;
		}
		return apiGetFlatDataByConfigName('techOperationsSmall')({
			params,
			data: newData,
		});
	};

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
						componentType:
							type === 'add' ? 'ServerTable' : 'LocalTable',
						rowKey: 'equipmentId',
						selectable: true,
						footerProps: {
							showElements: ['selected'],
						},
						defaultFilter: {controlPointsId: null},
						subscribe:
							type === 'add'
								? {
										name: 'controlPointEquipments',
										path:
											'rtd.routes.controlPointModal.controlPoint.selected',
										onChange: ({value, setReloadTable}) => {
											value &&
												setReloadTable &&
												setReloadTable({
													filter: {
														controlPointsId: value.id
															? value.id
															: value,
													},
												});
										},
								  }
								: {},
						// не отображает в онлайн режиме, необходимо праdильно выстоить
						requestLoadRows: loadControlPointsEquipments,
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
		...techOperations(loadControlPointsTechOperations),
	];

	const hiddenFields = [
		{
			componentType: 'Item',
			name: 'techMapName',
			hidden: true,
			child: {
				componentType: 'Text',
				subscribe: {
					name: 'controlPointTechMap',
					path: 'rtd.routes.controlPointModal.techMap.selected',
					onChange: ({value, setSubscribeProps}) =>
						value && setSubscribeProps({value: value.name}),
				},
			},
		},
		{
			componentType: 'Item',
			name: 'controlPointName',
			hidden: true,
			child: {
				componentType: 'Text',
				subscribe: {
					name: 'controlPointEquipments',
					path: 'rtd.routes.controlPointModal.controlPoint.selected',
					onChange: ({value, setSubscribeProps}) =>
						value && setSubscribeProps({value: value.name}),
				},
			},
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
		width: 800,
		bodyStyle: {
			height: 700,
		},

		initialValues: (row) => {
			return type === 'add' ? null : row;
		},
		form: {
			name: `${type}ModalForm`,
			loadInitData: loadData,
			onFinish: (values) => {
				console.log('values', values);
			},
			body: [
				code,
				type === 'add' ? {...addControlPoint} : {...editControlPoint},
				...equipmentTableConfig,
				...techMaps,
				...hiddenFields,
			],
		},
	};
};
