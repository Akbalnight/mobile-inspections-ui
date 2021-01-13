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

const {RangePicker} = DatePicker;

export default function WorkSchedules() {
	/**
	 * модалку buttonMoveSchedule сделал прямо по макету, достаточно громоздко получилось
	 */
	const buttonMoveSchedule = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Modal',
				buttonProps: {
					type: 'default',
					className: 'ml-4 mr-8',
					icon: <MoveSchedules />,
				},
				modalConfig: {
					type: 'editOnServer', //'editOnServer'
					title: `Перемещение графиков`,
					width: 580,
					bodyStyle: {height: 300},
					okText: 'Переместить',
					form: {
						noPadding: true,
						name: 'moveScheduleForm',
						labelCol: {span: 8},
						wrapperCol: {span: 10},
						loadInitData: (callBack, row) => {
							callBack(row);
						},
						body: [
							{
								componentType: 'Item',
								label: 'Сотрудник',
								className: 'mt-16',
								name: 'executor',
								child: {
									componentType: 'SingleSelect',
									name: 'staffId',
									rowRender: 'positionName',
									widthControl: 0,
									widthPopup: 300,
									heightPopup: 100,
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
								label: 'Перемещения',
								child: {
									componentType: 'Custom',
									render: ({
										onChange,
										defaultValue,
										value,
									}) => {
										return (
											<RangePicker
												format={'DD.MM.YYYY'}
												onChange={(dates) =>
													console.log(dates)
												}
												placeholder={[
													'с даты',
													'на дату',
												]}
											/>
										);
									},
								},
							},
							// {
							// 	componentType: 'Row',
							// 	children: [
							// 		{
							// 			componentType: 'Col',
							// 			span: 3,
							// 			children: [
							// 				{
							// 					componentType: 'Item',
							// 					hidden: true,
							// 					child: {
							// 						componentType: 'Text',
							// 						label: 'hidden',
							// 					},
							// 				},
							// 			],
							// 		},
							// 		{
							// 			componentType: 'Col',
							// 			span: 5,
							// 			className: 'mr-8',
							// 			children: [
							// 				{
							// 					componentType: 'Item',
							// 					style: {
							// 						textAlign: 'center',
							// 					},
							// 					child: {
							// 						componentType: 'Text',
							// 						label:
							// 							'Даты перемещения c:',
							// 						style: {
							// 							lineHeight: '30px',
							// 						},
							// 					},
							// 				},
							// 			],
							// 		},
							// 		{
							// 			componentType: 'Col',
							// 			span: 4,
							// 			className: 'ml-4',
							// 			children: [
							// 				{
							// 					componentType: 'Item',
							// 					noStyle: true,
							// 					name: 'currentDate',
							// 					child: {
							// 						componentType: 'DatePicker',
							// 						format: 'DD.MM.YYYY',
							// 					},
							// 				},
							// 			],
							// 		},
							// 		{
							// 			componentType: 'Col',
							// 			span: 3,
							// 			children: [
							// 				{
							// 					componentType: 'Item',
							// 					style: {
							// 						textAlign: 'center',
							// 					},
							// 					child: {
							// 						componentType: 'Text',
							// 						label: 'на:',
							// 						level: 6,
							// 						style: {
							// 							lineHeight: '30px',
							// 							marginLeft: '25px',
							// 						},
							// 					},
							// 				},
							// 			],
							// 		},
							// 		{
							// 			componentType: 'Col',
							// 			span: 4,
							// 			children: [
							// 				{
							// 					componentType: 'Item',
							// 					noStyle: true,
							// 					name: 'newDate',
							// 					child: {
							// 						componentType: 'DatePicker',
							// 						format: 'DD.MM.YYYY',
							// 					},
							// 				},
							// 			],
							// 		},
							// 	],
							// },
							{
								componentType: 'Row',
								className: 'mt-16',
								children: [
									{
										componentType: 'Col',
										span: 9,
										children: [
											{
												componentType: 'Item',
												hidden: true,
												child: {
													componentType: 'Text',
													label: 'hidden',
												},
											},
										],
									},
									{
										componentType: 'Col',
										span: 7,
										children: [
											{
												componentType: 'Item',
												child: {
													componentType: 'Text',
													label:
														'Вырезать для перемещения:',
													level: 6,
												},
											},
										],
									},
									{
										componentType: 'Col',
										span: 2,
										children: [
											{
												componentType: 'Item',
												name: 'embedToMove',
												valuePropName: 'checked',
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
								className: 'mt-16',
								children: [
									{
										componentType: 'Col',
										span: 6,
										children: [
											{
												componentType: 'Item',
												hidden: true,
												child: {
													componentType: 'Text',
													label: 'hidden',
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
												child: {
													componentType: 'Text',
													label:
														'Перезаписать график на выбранную дату:',
													level: 6,
												},
											},
										],
									},
									{
										componentType: 'Col',
										span: 2,
										children: [
											{
												componentType: 'Item',
												name: 'overwriteSchedule',
												valuePropName: 'checked',
												child: {
													componentType: 'Checkbox',
												},
											},
										],
									},
								],
							},
						],
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
				},
				modalConfig: {
					type: 'editOnServer', //'editOnServer'
					title: `Копирование графиков`,
					width: 580,
					bodyStyle: {height: 300},
					okText: 'Переместить',
					form: {
						noPadding: true,
						name: 'moveScheduleForm',
						labelCol: {span: 8},
						wrapperCol: {span: 12},
						loadInitData: (callBack, row) => {
							callBack(row);
						},
						body: [
							{
								componentType: 'Item',
								label: 'Сотрудник',
								className: 'mt-16',
								name: 'currentExecutor',
								child: {
									componentType: 'SingleSelect',
									name: 'staffId',
									rowRender: 'positionName',
									widthControl: 0,
									widthPopup: 300,
									heightPopup: 100,
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
												format={'DD.MM.YYYY'}
												onChange={(dates) =>
													console.log(dates)
												}
											/>
										);
									},
								},
							},
							{
								componentType: 'Item',
								label: 'Назначить',

								name: 'newExecutor',
								child: {
									componentType: 'SingleSelect',
									name: 'staffId',
									rowRender: 'positionName',
									widthControl: 0,
									widthPopup: 300,
									heightPopup: 100,
									requestLoadRows: apiGetFlatDataByConfigName(
										'staff'
									),
									requestLoadConfig: apiGetConfigByName(
										'staff'
									),
								},
							},
							{
								componentType: 'Row',
								className: 'mt-16',
								children: [
									{
										componentType: 'Col',
										span: 9,
										children: [
											{
												componentType: 'Item',
												hidden: true,
												child: {
													componentType: 'Text',
													label: 'hidden',
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
												child: {
													componentType: 'Text',
													label:
														'Перезаписывать существующие графики:',
													level: 6,
												},
											},
										],
									},
									{
										componentType: 'Col',
										span: 2,
										children: [
											{
												componentType: 'Item',
												name: 'rewriteSchedule',
												valuePropName: 'checked',
												child: {
													componentType: 'Checkbox',
												},
											},
										],
									},
								],
							},
						],
					},
				},
			},
		},
	];
	const workSchedulesFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'ServerTable',
						commandPanelProps: {
							systemBtnProps: {
								edit: {actionType: ['modal', 'modal']},
								delete: {},
							},
							leftCustomSideElement: [
								...buttonMoveSchedule,
								...buttonCopySchedule,
							],
						},
						requestLoadRows: apiGetFlatDataByConfigName(
							'defects' //'workSchedules'
						),
						requestLoadConfig: apiGetConfigByName(
							'defects' //'workSchedules'
						),
					},
				},
			],
		},
	];
	const workShiftsFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Title',
				level: 5,
			},
		},
	];
	const workSchedulesTemplatesFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Title',
				level: 5,
			},
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
