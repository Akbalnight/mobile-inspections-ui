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

/** 
 *  объединил и вынес функции
	/** заменил эти функции loadRowsHandler
	 * requestLoadRows: ({data, params}) =>
		apiGetFlatDataByConfigName('controlPointsEquipments')
				({
			data: {...data,	controlPointsId: pageParams.id,},
			params,
				}),
	 * requestLoadRows: ({data, params}) =>
		apiGetFlatDataByConfigName('controlPointsTechMaps')
				({
			data: {...data,	controlPointsId: pageParams.id,},
			params,
				}),
	 */

const ControlPointDataD = (props) => {
	const pageParams = useParams();
	const history = useHistory();

	const loadData = (callBack) => {
		if (pageParams.id === 'new') {
			callBack({
				code: null,
				name: null,
				parentId: null,
				equipments: [],
				techMaps: [],
				isGroup: false,
			});
		} else {
			apiGetFlatDataByConfigName('controlPoints')({
				data: {id: pageParams.id},
			})
				.then((response) => {
					callBack(response.data[0]);
				})
				.catch((error) =>
					notificationError(error, 'Ошибка загрузки данных формы')
				);
		}
	};

	const loadRowsHandler = (catalogName, {params, data}) => {
		const newData = {...data, controlPointsId: pageParams.id};
		return apiGetFlatDataByConfigName(catalogName)({
			data: newData,
			params,
		});
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
						pageParams.id === 'new' ? {} : codeInput,
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
						customFields: [...equipmentTableCustom(pageParams)],
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
						customFields: [...techMapsTableCustom(pageParams)],
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
		methodSaveForm: pageParams.id === 'new' ? 'POST' : 'PUT',
		onFinish: onFinish,
		header: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					label:
						pageParams.id === 'new'
							? `Создание контрольной точки`
							: `Редактирование контрольной точки`,
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

	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
};

ControlPointDataD.propTypes = {};

export default ControlPointDataD;
