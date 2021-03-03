import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form, notificationError} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveControlPoints,
} from '../../apis/catalog.api';
import {useHistory, useParams} from 'react-router';
import {TechMapSelectModal} from '../Base/Modals/TechMapSelectModal';
import {EquipmentSelectModal} from '../Base/Modals/EquipmentSelectModal';
import {paths} from '../../constants/paths';
import {codeInput} from '../Base/Inputs/CodeInput';
import {equipmentTableCustom, techMapsTableCustom} from './tableProps';

export const ControlPointAdd = () => {
	return (
		<BasePage>
			<ControlPointDataD />
		</BasePage>
	);
};

export const ControlPointEdit = () => {
	const pageParams = useParams();
	return (
		<BasePage>
			<ControlPointDataD controlPointId={pageParams.id} />
		</BasePage>
	);
};

const ControlPointDataD = (props) => {
	const {controlPointId} = props;
	// const pageParams = useParams();
	const history = useHistory();

	const loadData = (callBack) => {
		if (controlPointId) {
			apiGetFlatDataByConfigName('controlPoints')({
				data: {id: controlPointId},
			})
				.then((response) => {
					callBack(response.data[0]);
				})
				.catch((error) =>
					notificationError(error, 'Ошибка загрузки данных формы')
				);
		} else {
			callBack({
				code: null,
				name: null,
				parentId: null,
				equipments: [],
				techMaps: [],
				isGroup: false,
			});
		}
	};

	const loadRowsHandler = (catalogName, {params, data}) => {
		if (controlPointId) {
			const newData = {...data, controlPointsId: controlPointId};
			return apiGetFlatDataByConfigName(catalogName)({
				data: newData,
				params,
			});
		} else return new Promise((resolve) => resolve({data: []}));
	};

	const headFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Описание',
				level: 5,
			},
		},
		{
			componentType: 'Row',
			gutter: [16, 16],
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						// pageParams.id === 'new' ? {} : codeInput,
						controlPointId ? codeInput : {},
						{
							componentType: 'Item',
							label: 'Наименование',
							name: 'name',
							rules: [
								{
									message: 'Заполните наименование',
									required: true,
								},
							],
							child: {
								componentType: 'Input',
							},
						},
						{
							componentType: 'Item',
							label: 'Группа',
							name: 'parentId',
							child: {
								componentType: 'SingleSelect',
								widthControl: 0,
								heightPopup: 300,
								expandColumnKey: 'id',
								rowRender: 'name',
								nodeAssociated: false,
								expandDefaultAll: true,
								requestLoadRows: ({data, params}) =>
									apiGetHierarchicalDataByConfigName(
										'controlPoints'
									)({
										data: {...data, isGroup: true},
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
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								delete: {actionType: 'modal'},
							},
						},
						modals: [{...EquipmentSelectModal}],
						customFields: [...equipmentTableCustom(controlPointId)],
						requestLoadRows: (info) =>
							loadRowsHandler('controlPointsEquipments', info),
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
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Технологические карты',
				level: 5,
			},
		},
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'techMaps',
					child: {
						componentType: 'LocalTable',
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								delete: {actionType: 'modal'},
							},
						},
						modals: [{...TechMapSelectModal}],
						customFields: [...techMapsTableCustom(controlPointId)],
						requestLoadRows: (info) =>
							loadRowsHandler('controlPointsTechMaps', info),
						requestLoadConfig: apiGetConfigByName(
							'controlPointsTechMaps'
						),
					},
				},
			],
		},
	];
	const onFinish = (values) => {
		history.push(paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.path);
	};
	//
	// const onFinishFailed = errorInfo => {
	//     console.log('Failed:', errorInfo);
	// };

	const formConfig = {
		// name: 'PageFormData',
		labelCol: {span: 8},
		wrapperCol: {span: 16},
		loadInitData: loadData,
		requestSaveForm: apiSaveControlPoints,
		methodSaveForm: controlPointId ? 'PUT' : 'POST',
		onFinish: onFinish,
		header: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					label: controlPointId
						? `Редактирование контрольной точки`
						: `Создание контрольной точки`,
					className: 'mb-0',
					level: 3,
				},
			},
		],
		body: [...headFields, ...equipmentTableConfig, ...techMaps],
		footer: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Button',
					label: 'Закрыть',
					className: 'mr-8',
					onClick: () => history.goBack(),
				},
			},
			{
				componentType: 'Item',
				child: {
					componentType: 'Button',
					label: 'Сохранить',
					type: 'primary',
					htmlType: 'submit',
				},
			},
		],
	};

	// return (
	// 	<BasePage
	// 		path={
	// 			pageParams.id === 'new'
	// 				? '/detours-configurator/control-points/new'
	// 				: undefined
	// 		}
	// 	>
	// 		<Form {...formConfig} />
	// 	</BasePage>
	// );
	return <Form {...formConfig} />;
};
