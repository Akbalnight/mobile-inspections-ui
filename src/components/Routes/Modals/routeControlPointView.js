import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {customColumnProps} from '../../TechMapsForm/TechMapColumnProps';

export const controlPointViewModal = () => {
	let techMapsId, Row;

	const loadData = (callBack, row) => {
		Row = row;
		callBack(row);
	};

	const loadControlPointEquipmentsHandler = ({data, params}) => {
		const newData = {...data, controlPointsId: Row.id};
		return apiGetFlatDataByConfigName('controlPointsEquipments')({
			data: newData,
			params,
		});
	};
	const headFields = [
		{
			componentType: 'Row',
			// gutter: [4, 8],
			children: [
				{
					componentType: 'Col',
					span: 8,
					children: [
						{
							componentType: 'Item',
							label: 'Код',
							name: 'code',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							label: 'Наименование',
							name: 'name',
							className: 'md-16',
							child: {componentType: 'Text'},
						},
					],
				},
			],
		},
	];

	const equipmentFields = [
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
					name: 'controlPointEquipmentsTable',
					child: {
						componentType: 'LocalTable',
						// customColumnProps: ,
						requestLoadRows: loadControlPointEquipmentsHandler,
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
						customColumnProps: customColumnProps,
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
							child: {
								componentType: 'Text',
								label: `Продолжительность всех операций: {результат вычесления времени}`,
							},
						},
					],
				},
			],
		},
	];

	return {
		type: 'viewObject',
		title: 'Контрольная точка',
		width: 783,
		bodyStyle: {
			height: 682,
		},
		form: {
			name: 'controlPointsDataView',
			loadInitData: loadData,
			body: [...headFields, ...equipmentFields, ...techMaps],
		},
	};
};
