import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {useHistory, useParams} from 'react-router';
import {Form, notificationError} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveByConfigName,
} from '../../apis/catalog.api';
import {ReactComponent as ExecutorIcon} from '../../imgs/detour/executor-btn.svg';
import {paths} from '../../constants/paths';

export default function DetoursForm() {
	const pageParams = useParams();
	const history = useHistory();

	const loadData = (callBack) => {
		if (pageParams.id === 'new') {
			callBack({
				name: null,
				duration: null,
				repeatBy: '1',
			});
		} else {
			apiGetFlatDataByConfigName('detours')({
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

	const configFilterPanel = [
		{
			componentType: 'SingleSelect',
			name: 'id',
			className: 'mr-16',
			rowRender: 'positionName',
			title: 'Сотрудник',
			widthControl: 150,
			widthPopup: 300,
			heightPopup: 200,
			requestLoadRows: apiGetFlatDataByConfigName('staff'),
			requestLoadConfig: apiGetConfigByName('staff'),
		},
	];

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
				expandColumnKey: 'id',
				rowRender: 'name',
				widthControl: 0,
				widthPopup: 300,
				heightPopup: 200,
				dispatchPath:
					'detourSchedules.selectEmployeModal.structuralUnits',
				requestLoadRows: apiGetHierarchicalDataByConfigName(
					'departments'
				),
				requestLoadDefault: apiGetFlatDataByConfigName('departments'),
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
				expandColumnKey: 'id',
				rowRender: 'positionName',
				widthControl: 0,
				widthPopup: 300,
				heightPopup: 200,
				defaultFilter: {departmentName: null},
				dispatchPath: 'detourSchedules.selectEmployeModal.workShift',
				subscribe: {
					name: 'schedulesWorkShift',
					path:
						'rtd.detourSchedules.selectEmployeModal.structuralUnits.selected',
					onChange: ({value, setReloadTable}) =>
						value &&
						setReloadTable &&
						setReloadTable({
							filter: {departmentName: value.name}, // настроить фильтрацио по сменам
						}),
				},
				requestLoadRows: apiGetFlatDataByConfigName('staff'), // поставить правильный запрос
				requestLoadDefault: apiGetFlatDataByConfigName('staff'), // поставить правильный запрос
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
						style: {height: '240px'},
						defaultFilter: {positionId: null},
						selectable: true,
						filterPanelProps: {
							configFilter: [...configFilterPanel],
						},
						requestLoadRows: apiGetFlatDataByConfigName(
							'staffAuto'
						),
						requestLoadConfig: apiGetConfigByName('staffAuto'),
						dispatchPath:
							'detourSchedules.executorTableChoise.executor',
						subscribe: {
							name: 'executor',
							path:
								'rtd.detourSchedules.selectEmployeModal.workShift.selected',
							onChange: ({value, setReloadTable}) =>
								value &&
								setReloadTable &&
								setReloadTable({
									filter: {positionId: value.positionId},
								}),
						},
					},
				},
			],
		},
	];

	// Описание
	const headFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Описание',
				className: 'mt-16',
				level: 5,
			},
		},
		pageParams.id === 'new'
			? {}
			: {
					componentType: 'Item',
					label: 'Код',
					name: 'code',
					child: {
						componentType: 'Text',
					},
			  },
		{
			componentType: 'Item',
			label: 'Наименование обхода',
			name: 'name',
			rules: [
				{
					message: 'Заполните наименование',
					required: true,
				},
			],
			child: {
				componentType: 'Input',
				maxLength: 100,
			},
		},
		{
			componentType: 'Item',
			label: 'Дата начала',
			name: 'dateStartPlan',
			rules: [
				{
					message: 'Заполните дату начала обхода',
					required: true,
				},
			],
			child: {
				componentType: 'DatePicker',
				format: 'DD.MM.YYYY HH:mm:ss',
				showTime: true,
			},
		},
		{
			componentType: 'Item',
			label: 'Дата окончания',
			name: 'dateFinishPlan',
			rules: [
				{
					message: 'Заполните дату окончания обхода',
					required: true,
				},
			],
			child: {
				componentType: 'DatePicker',
				format: 'DD.MM.YYYY HH:mm:ss',
				showTime: true,
			},
		},

		{
			componentType: 'Item',
			label: 'Маршрут',
			name: 'routeId',
			rules: [
				{
					message: 'Заполните маршрут',
					required: true,
				},
			],
			child: {
				componentType: 'SingleSelect',
				widthControl: 0,
				widthPopup: 350,
				heightPopup: 350,
				commandPanelProps: {
					systemBtnProps: {search: {}},
				},
				searchParamName: 'name',
				rowRender: 'name',
				requestLoadRows: apiGetFlatDataByConfigName('routes'),
			},
		},
	];

	// Исполнитель
	const executorFields = [
		/**
		 * тут сделал небольшую подписку на селектор внутри модалки, для красивого отображения исполнителся
		 * обхода.
		 * позже можно подписать на таблицу Исполнителей внутри модального окна
		 */
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Исполнитель',
				className: 'mt-16',
				level: 5,
				subscribe: {
					name: 'controlPointTechMap',
					path:
						'rtd.detourSchedules.executorTableChoise.executor.selected',
					onChange: ({value, setSubscribeProps}) =>
						value &&
						setSubscribeProps({
							label: `Исполнитель обхода ${value[0].positionName}`,
						}),
				},
			},
		},
		{
			componentType: 'Item',
			label: 'Доступные исполнители',
			child: {
				componentType: 'Modal',
				buttonProps: {
					label: 'Выбрать',
					icon: <ExecutorIcon />,
					type: 'default',
					// disabled: true
				},
				modalConfig: {
					type: `select`,
					title: 'Выбор исполнителя',
					width: 576,
					bodyStyle: {
						height: 496,
					},
					okText: 'Выбрать',
					form: {
						name: `${
							pageParams.id === 'new' ? 'add' : 'edit'
						}ModalForm`,
						labelCol: {span: 8},
						wrapperCol: {span: 12},
						loadInitData: (callBack, row) => {
							pageParams.id === 'new'
								? callBack(null)
								: callBack(row);
						},
						body: [...selectFields, ...executorTableFields],
					},
				},
			},
		},
		{
			componentType: 'Item',
			hidden: true,
			name: 'staffId',
			child: {
				componentType: 'Input',
				subscribe: {
					name: 'controlPointTechMap',
					path:
						'rtd.detourSchedules.executorTableChoise.executor.selected',
					onChange: ({value, setSubscribeProps}) =>
						value &&
						setSubscribeProps({
							value: value[0].id,
						}),
				},
			},
		},
	];

	const footerCheckboxLayout = {
		labelCol: {span: 22},
		wrapperCol: {span: 2},
	};
	const footerInputLayout = {
		labelCol: {span: 16},
		wrapperCol: {span: 8},
	};

	// Подвал
	const footer = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Допуски по обходу',
				className: 'mt-16',
				level: 5,
			},
		},
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 6,
					children: [
						{
							componentType: 'Item',
							label: 'Учитывать порядок обхода',
							name: 'saveOrderControlPoints',
							valuePropName: 'checked',
							...footerCheckboxLayout,
							child: {
								componentType: 'Checkbox',
							},
						},
					],
				},
			],
		},
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 6,
					children: [
						{
							componentType: 'Item',
							name: 'takeIntoAccountTimeLocation',
							label: 'Учитывать время обхода',
							valuePropName: 'checked',
							...footerCheckboxLayout,
							child: {
								componentType: 'Checkbox',
								dispatchPath:
									'detourSchedulesForm.takeIntoAccountTimeLocation',
							},
						},
					],
				},
				{
					componentType: 'Col',
					span: 10,
					children: [
						{
							componentType: 'Item',
							name: 'possibleDeviationLocationTime',
							label: 'Допустимое откл. на точке, мин',
							...footerInputLayout,
							child: {
								componentType: 'InputNumber',
								subscribe: {
									name: 'takeIntoAccountTimeLocation',
									path:
										'rtd.detourSchedulesForm.takeIntoAccountTimeLocation',
									onChange: ({value, setSubscribeProps}) => {
										setSubscribeProps({
											disabled: !value,
										});
									},
								},
							},
						},
					],
				},
			],
		},
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 6,
					children: [
						{
							componentType: 'Item',
							name: 'takeIntoAccountDateStart',
							label: 'Учитывать время начала',
							valuePropName: 'checked',
							...footerCheckboxLayout,
							child: {
								componentType: 'Checkbox',
								dispatchPath:
									'detourSchedulesForm.takeIntoAccountDateStart',
							},
						},
					],
				},
				{
					componentType: 'Col',
					span: 10,
					children: [
						{
							componentType: 'Item',
							name: 'possibleDeviationDateStart',
							label: 'Допустимое откл., мин',
							...footerInputLayout,
							child: {
								componentType: 'InputNumber',
								subscribe: {
									name: 'takeIntoAccountDateStart',
									path:
										'rtd.detourSchedulesForm.takeIntoAccountDateStart',
									onChange: ({value, setSubscribeProps}) => {
										setSubscribeProps({
											disabled: !value,
										});
									},
								},
							},
						},
					],
				},
			],
		},
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 6,
					children: [
						{
							componentType: 'Item',
							name: 'takeIntoAccountDateFinish',
							label: 'Учитывать время окончания',
							valuePropName: 'checked',
							...footerCheckboxLayout,
							child: {
								componentType: 'Checkbox',
								dispatchPath:
									'detourSchedulesForm.takeIntoAccountDateFinish',
							},
						},
					],
				},
				{
					componentType: 'Col',
					span: 10,
					children: [
						{
							componentType: 'Item',
							name: 'possibleDeviationDateFinish',
							label: 'Допустимое откл., мин',
							...footerInputLayout,
							child: {
								componentType: 'InputNumber',
								subscribe: {
									name: 'takeIntoAccountDateFinish',
									path:
										'rtd.detourSchedulesForm.takeIntoAccountDateFinish',
									onChange: ({value, setSubscribeProps}) => {
										setSubscribeProps({
											disabled: !value,
										});
									},
								},
							},
						},
					],
				},
			],
		},
	];

	//
	const formConfig = {
		name: 'DetoursConfiguratorDetourSchedulesForm',
		labelCol: {span: 10},
		wrapperCol: {span: 8},
		loadInitData: loadData,
		requestSaveForm: apiSaveByConfigName('saveDetourForm'),
		methodSaveForm: pageParams.id === 'new' ? 'POST' : 'PUT',
		onFinish: (values) =>
			history.push(paths.DETOURS_CONFIGURATOR_DETOURS.path),
		header: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					level: 4,
					label:
						pageParams.id === 'new'
							? 'Создание обхода'
							: 'Редактирование обхода',
				},
			},
		],
		body: [...headFields, ...executorFields, ...footer],
		footer: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Button',
					label: 'Закрыть',
					className: 'mr-8',
					onClick: () => {
						history.goBack();
					},
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
}
