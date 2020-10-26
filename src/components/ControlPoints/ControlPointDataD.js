import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveControlPoints,
} from '../../apis/catalog.api';
import {notification} from 'antd';
import {useHistory, useParams} from 'react-router';
import {TechMapSelectModal} from '../Base/Modals/TechMapSelectModal';
import {EquipmentSelectModal} from '../Base/Modals/EquipmentSelectModal';

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
					// console.log("loadData => response ", response.data);
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
						{
							componentType: 'Item',
							label: 'Код',
							name: 'code',
							rules: [
								{
									message: 'Заполните код',
									required: true,
								},
							],
							child: {
								componentType: 'InputNumber',
							},
						},
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
				// type: 'secondary',
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
						componentType: 'LocalTable', //'LocalTable', // 'ServerTable', 'InfinityTAble'
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								delete: {actionType: 'modal'},
							},
						},
						modals: [{...EquipmentSelectModal}],
						customFields: [
							{
								name: 'controlPointId',
								value: () => pageParams.id,
							},
							{
								name: 'equipmentId',
								value: (row) => row.id,
							},
						],
						// selectable: true,
						// showSelection: true,
						requestLoadRows: ({data, params}) =>
							apiGetFlatDataByConfigName(
								'controlPointsEquipments'
							)({
								data: {...data, controlPointsId: pageParams.id},
								params,
							}),
						requestLoadConfig: () =>
							apiGetConfigByName('controlPointsEquipments')(),
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
						componentType: 'LocalTable', //'LocalTable', // 'ServerTable', 'InfinityTAble'
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								delete: {actionType: 'modal'},
							},
						},
						modals: [{...TechMapSelectModal}],
						customFields: [
							{
								name: 'controlPointId',
								value: () => pageParams.id,
							},
							{
								name: 'techMapId',
								value: (row) => row.id,
							},
							{
								name: 'isGroup',
								validate: (row, rows) => !row.isGroup,
							},
						],
						requestLoadRows: ({data, params}) =>
							apiGetFlatDataByConfigName('controlPointsTechMaps')(
								{
									data: {
										...data,
										controlPointsId: pageParams.id,
									},
									params,
								}
							),
						requestLoadConfig: () =>
							apiGetConfigByName('controlPointsTechMaps')(),
					},
				},
			],
		},
	];
	const onFinish = (values) => {
		console.log('Success:', values);
		history.goBack();
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
					label: 'Информация о контрольной точке',
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
