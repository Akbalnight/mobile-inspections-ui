import {BasePage} from 'mobile-inspections-base-ui';
import React from 'react';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {DatePicker} from 'antd';
import {ReactComponent as WorkSchedulesPane} from '../../imgs/tabPane/workSchedules/workSchedules.svg';
import {ReactComponent as WorkShiftPane} from '../../imgs/tabPane/workSchedules/workShift.svg';
import {ReactComponent as WorkTemplatesPane} from '../../imgs/tabPane/workSchedules/workSchedulesTemplates.svg';
import {ReactComponent as MoveSchedules} from '../../imgs/workSchedules/buttonMoveSchedule.svg';
import {ReactComponent as CopySchedule} from '../../imgs/workSchedules/buttonCopySchedule.svg';
import {useHistory} from 'react-router';
import {addShiftModal, editShiftModal} from './Modals/modalShiftTab';
import {addTemplateModal, editTemplateModal} from './Modals/modalTemplatesTab';
import TimelineScheduler from './TimelineScheduler';

const {RangePicker} = DatePicker;

export default function WorkSchedules() {
	const history = useHistory();
	/**
	 * модалки во вкладке РАБОЧИЕ ГРАФИКИ, сделал разными намеренно. Надо обсудить
	 */
	const buttonMoveSchedule = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Modal',
				buttonProps: {
					type: 'default',
					className: 'ml-8 mr-8',
					icon: <MoveSchedules />,
					disabled: true,
				},
				modalConfig: {
					type: 'editOnServer', //'editOnServer'
					title: `Перемещение графиков`,
					width: 480,
					bodyStyle: {height: 300},
					okText: 'Переместить',
					form: {
						noPadding: true,
						name: 'moveScheduleForm',
						labelCol: {span: 8},
						wrapperCol: {span: 12},
						loadInitData: (callBack, row) => {
							console.log(row);
							callBack(row);
						},
						body: [
							{
								componentType: 'Item',
								label: 'Сотрудник',
								className: 'mt-16 ml-16',
								name: 'executor',
								child: {
									componentType: 'SingleSelect',
									name: 'staffId',
									rowRender: 'positionName',
									widthControl: 0,
									widthPopup: 250,
									heightPopup: 150,
									requestLoadRows: apiGetFlatDataByConfigName(
										'staff'
									),
									requestLoadConfig: apiGetConfigByName(
										'staff'
									),
								},
							},
							{
								componentType: 'Item',
								className: 'ml-16',
								name: 'rangePeriod',
								label: 'Перемещение',
								child: {
									componentType: 'Custom',
									render: ({
										onChange,
										defaultValue,
										value,
									}) => {
										return (
											<RangePicker
												// format={'DD.MM.YYYY'}
												// value={defaultValue}
												onChange={(
													dates,
													dateString
												) => {
													onChange(dates);
												}}
												placeholder={[
													'с даты',
													'на дату',
												]}
											/>
										);
									},
								},
							},

							{
								componentType: 'Item',
								className: 'ml-16',
								name: 'embedToMove',
								valuePropName: 'checked',

								child: {
									componentType: 'Checkbox',
									label: 'Вырезать для перемещения',
									style: {
										paddingLeft: 170,
									},
								},
							},
							{
								componentType: 'Item',
								name: 'overwriteSchedule',
								valuePropName: 'checked',
								child: {
									componentType: 'Checkbox',
									className: 'mt-16',
									label:
										'Перезаписать график на выбранную дату',
									style: {
										paddingLeft: 162,
									},
								},
							},
						],
					},
				},
				dispatchPath: 'workSchedules.workSchedulesTable.moveButton',
				subscribe: {
					name: 'moveScheduleModal',
					path: 'rtd.workSchedules.workSchedulesTable.table.selected',
					onChange: ({value, setModalData, setButtonProps}) => {
						value &&
							setModalData &&
							setModalData({
								length: value.length,
								/**
								 * возможно нужны будут допДанные их лучше прокинуть тут
								 */
							});
						value &&
							setButtonProps &&
							setButtonProps({disabled: !(value.length > 0)});
					},
				},
			},
		},
	];

	const buttonCopySchedule = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Modal',
				buttonProps: {
					type: 'default',
					icon: <CopySchedule />,
					disabled: true,
				},
				modalConfig: {
					type: 'editOnServer', //'editOnServer'
					title: `Копирование графиков`,
					width: 580,
					bodyStyle: {height: 300},
					okText: 'Копировать',
					form: {
						noPadding: true,
						name: 'copyScheduleForm',
						labelCol: {span: 10},
						wrapperCol: {span: 10},
						loadInitData: (callBack, row) => {
							callBack(row);
						},
						body: [
							{
								componentType: 'Item',
								label: 'Сотрудник',
								className: 'mt-16 ml-16',

								name: 'currentExecutor',
								child: {
									componentType: 'SingleSelect',
									name: 'staffId',
									rowRender: 'positionName',
									widthControl: 0,
									widthPopup: 250,
									heightPopup: 150,
									requestLoadRows: apiGetFlatDataByConfigName(
										'staff'
									),
									requestLoadConfig: apiGetConfigByName(
										'staff'
									),
								},
							},

							{
								componentType: 'Item',
								name: 'rangePeriod',
								className: 'ml-16',
								label: 'Период',
								child: {
									componentType: 'Custom',
									render: ({
										onChange,
										defaultValue,
										value,
									}) => {
										return (
											<RangePicker
												// format={'DD.MM.YYYY'}
												// value={defaultValue}
												onChange={(
													dates,
													dateString
												) => {
													onChange(dates);
												}}
											/>
										);
									},
								},
							},
							{
								componentType: 'Item',
								label: 'Назначить',
								className: 'ml-16',
								name: 'newExecutor',
								child: {
									componentType: 'SingleSelect',
									name: 'staffId',
									rowRender: 'positionName',
									widthControl: 0,
									widthPopup: 250,
									heightPopup: 80, // надо обдумать
									requestLoadRows: apiGetFlatDataByConfigName(
										'staff'
									),
									requestLoadConfig: apiGetConfigByName(
										'staff'
									),
								},
							},
							{
								componentType: 'Item',
								className: 'ml-16',
								name: 'rewriteSchedule',
								valuePropName: 'checked',
								label: 'Перезаписывать существующие графики:',

								child: {
									componentType: 'Checkbox',
									style: {
										marginLeft: 5,
									},
								},
							},
						],
					},
				},
				dispatchPath: 'workSchedules.workSchedulesTable.copyButton',
				subscribe: {
					name: 'moveScheduleModal',
					path: 'rtd.workSchedules.workSchedulesTable.table.selected',
					onChange: ({value, setModalData, setButtonProps}) => {
						value &&
							setModalData &&
							setModalData({
								length: value.length,
								/**
								 * возможно нужны будут допДанные их лучше прокинуть тут
								 */
							});
						value &&
							setButtonProps &&
							setButtonProps({disabled: !(value.length > 0)});
					},
				},
			},
		},
	];
	// const configFilterPanel = [
	// 	{
	// 		componentType: 'SingleSelect',
	// 		name: '1',
	// 		className: 'mr-16',
	// 		rowRender: 'positionName',
	// 		title: 'Сотрудники',
	// 		widthControl: 120,
	// 		widthPopup: 250,
	// 		requestLoadRows: apiGetFlatDataByConfigName('staff'),
	// 		requestLoadConfig: apiGetConfigByName('staff'),
	// 	},
	// 	{
	// 		componentType: 'DateRange',
	// 		title: 'Период',
	// 		nameStart: 'dateStart',
	// 		nameEnd: 'dateFinish',
	// 		dateFormat: 'DD-MM-YYYY',
	// 		className: 'ml-16',
	// 	},
	// ];

	const workSchedulesFields = [
		{
			componentType: 'Row',
			style: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
			},
			className: 'mb-0',
			children: [
				{
					componentType: 'Col',
					children: [...buttonMoveSchedule, ...buttonCopySchedule],
				},
				{
					componentType: 'Col',
					style: {
						display: 'flex',
						flexDirection: 'row',
					},
					children: [
						{
							componentType: 'Item',
							label: 'Сотрудники',
							className: 'ml-8 mb-0',
							child: {
								componentType: 'SingleSelect',
								name: 'executorId',
								className: 'ml-0 mr-16',
								rowRender: 'positionName',
								widthControl: 120,
								widthPopup: 250,
								requestLoadRows: apiGetFlatDataByConfigName(
									'staff'
								),
								requestLoadConfig: apiGetConfigByName('staff'),
							},
						},
						{
							componentType: 'Item',
							label: 'Период',
							className: 'ml-8 mb-0',
							child: {
								componentType: 'Custom',
								render: ({onChange, defaultValue, value}) => {
									return <RangePicker />;
								},
							},
						},
					],
				},
				{
					componentType: 'Item',
					child: {
						componentType: 'Custom',

						className: 'mr-16',
						render: ({onChange, defaultValue, value}) => {
							return (
								<div style={{display: 'flex'}}>
									<TimelineScheduler />
								</div>
							);
						},
					},
				},
			],
		},
	];
	const workShiftsFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'ServerTable',
						dispatchPath: 'workSchedules.workShiftTable.table',
						// selectable: true,
						history,
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								edit: {actionType: ['modal', 'modal']},
								delete: {},
							},
						},
						requestLoadRows: apiGetFlatDataByConfigName(
							'defects' //'workSchedules'
						),
						requestLoadConfig: apiGetConfigByName(
							'defects' //'workSchedules'
						),
						modals: [addShiftModal(), editShiftModal()],
					},
				},
			],
		},
	];
	const workSchedulesTemplatesFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'ServerTable',
						dispatchPath: 'workSchedules.workShiftTable.table',
						// selectable: true,
						history,
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								edit: {actionType: ['modal', 'modal']},
								delete: {},
							},
						},
						requestLoadRows: apiGetFlatDataByConfigName(
							'defects' //'workSchedules'
						),
						requestLoadConfig: apiGetConfigByName(
							'defects' //'workSchedules'
						),
						modals: [addTemplateModal(), editTemplateModal()],
					},
				},
			],
		},
	];
	const mainPageConfig = [
		{
			componentType: 'Tabs',
			type: 'card',
			size: 'medium',
			className: 'mt-8 ml-4',
			children: [
				{
					componentType: 'TabPane',
					tab: <WorkSchedulesPane />,
					key: 'workSchedules',
					// style: {
					// 	height: '200px',
					// },
					children: [...workSchedulesFields],
				},
				{
					componentType: 'TabPane',
					tab: <WorkShiftPane />,
					key: 'workShifts',
					children: [...workShiftsFields],
				},
				{
					componentType: 'TabPane',
					tab: <WorkTemplatesPane />,
					key: 'workSchedulesTemplates',
					children: [...workSchedulesTemplatesFields],
				},
			],
		},
	];

	const formConfig = {
		noPadding: true,
		name: 'workSchedulesMain',
		body: [...mainPageConfig],
	};
	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
}
