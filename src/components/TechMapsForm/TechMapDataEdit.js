import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form, notificationError} from 'rt-design';
import {useHistory, useParams} from 'react-router';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveTechMap,
} from '../../apis/catalog.api';
import {codeInput} from '../Base/Inputs/CodeInput';
import {nameInput} from '../Base/Inputs/NameInput';
import {
	addTechOperation,
	editTechOperation,
} from './Modals/techOperationsModal.js';
import {paths} from '../../constants/paths';
import {customColumnProps, customFields} from './tableProps';

const TechMapDataEdit = () => {
	const pageParams = useParams();
	const history = useHistory();

	const loadData = (callBack) => {
		if (pageParams.id === 'new') {
			callBack({
				code: null,
				name: null,
				parentId: null,
				isGroup: false,
				techMapsStatusId: null,
				dateStart: null,
			});
		} else {
			apiGetFlatDataByConfigName('techMaps')({
				data: {id: pageParams.id},
			})
				.then((response) => {
					// console.log("loadData => response ", response.data);
					callBack(response.data[0]);
				})
				.catch((error) =>
					notificationError(error, 'Ошибка загрузки данных формы')
				);
		}
	};

	const loadGroupsHandler = ({data, params}) => {
		const newData = {...data, isGroup: true};
		return apiGetHierarchicalDataByConfigName('techMaps')({
			data: newData,
			params,
		});
	};

	const loadTechOperationsHandler = ({data, params}) => {
		const newData = {
			...data,
			techMapId: pageParams.id === 'new' ? null : pageParams.id,
		};
		return apiGetFlatDataByConfigName('techOperations')({
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
						nameInput,
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
								requestLoadRows: loadGroupsHandler,
								requestLoadDefault: apiGetFlatDataByConfigName(
									'techMaps'
								),
							},
						},
						{
							componentType: 'Item',
							label: 'Статус',
							name: 'techMapsStatusId',
							child: {
								componentType: 'SingleSelect',
								widthControl: 0,
								widthPopup: 200,
								heightPopup: 150,
								rowRender: 'name',
								requestLoadRows: apiGetFlatDataByConfigName(
									'techMapsStatuses'
								),
								requestLoadDefault: apiGetFlatDataByConfigName(
									'techMapsStatuses'
								),
							},
						},
						{
							componentType: 'Item',
							label: 'Действует с',
							name: 'dateStart',
							child: {
								componentType: 'DatePicker',
								format: 'DD.MM.YYYY',
							},
						},
					],
				},
			],
		},
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Технологические операции',
				level: 5,
			},
		},
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'techOperations',
					child: {
						componentType: 'LocalTable',

						// Назначение кнопкам их типы форм
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								edit: {actionType: ['modal', 'modal']},
								delete: {},
								up: {},
								down: {},
							},
						},
						headerHeight: 50,
						customFields: customFields,
						customColumnProps: customColumnProps,
						modals: [addTechOperation, editTechOperation],

						// Получение плоской таблицы с дополнительными параметрами
						requestLoadRows: loadTechOperationsHandler,

						// Получение конфигурации по имени
						requestLoadConfig: apiGetConfigByName('techOperations'),
					},
				},
			],
		},
	];

	const formConfig = {
		name: 'TechMapData',
		labelCol: {span: 8},
		wrapperCol: {span: 16},
		loadInitData: loadData,
		requestSaveForm: apiSaveTechMap,
		methodSaveForm: pageParams.id === 'new' ? 'POST' : 'PUT',
		onFinish: () => {
			history.push(paths.DETOURS_CONFIGURATOR_TECH_MAPS_FORM.path);
		},
		header: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					label: 'Информация о технологической карте',
					className: 'mb-0',
					level: 3,
				},
			},
		],
		body: [...headFields],
		footer: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Button',
					label: 'Закрыть',
					className: 'mr-8',
					onClick: () =>
						history.push(
							paths.DETOURS_CONFIGURATOR_TECH_MAPS_FORM.path
						),
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

TechMapDataEdit.propTypes = {};

export default TechMapDataEdit;
