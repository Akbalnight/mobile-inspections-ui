import {BasePage} from 'mobile-inspections-base-ui';
import React from 'react';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {detourViewModal} from './Modals/detourViewModal';
import {useHistory} from 'react-router';
import {checkBox, code, dateTime} from '../Base/customColumnProps';
import {
	CalendarOutlined,
	EyeInvisibleOutlined,
	TableOutlined,
} from '@ant-design/icons';

export default function DetoursSchedules() {
	let history = useHistory();

	const configFilterPanel = [
		{
			componentType: 'SingleSelect',
			name: 'routeIds',
			className: 'mr-16',
			rowRender: 'name',
			title: 'Маршрут',
			widthControl: 150,
			widthPopup: 300,
			heightPopup: 200,
			requestLoadRows: apiGetFlatDataByConfigName('routes'),
			requestLoadConfig: apiGetConfigByName('routes'),
		},
		{
			componentType: 'SingleSelect',
			name: 'staffIds',
			className: 'mr-16',
			// rowRender: ({rowData}) => (
			// 	<div>
			// 		<span>{rowData.userId}</span>{' '}
			// 		<span>{rowData.positionName}</span>
			// 	</div>
			// ),
			rowRender: 'positionName',
			title: 'Сотрудник',
			widthControl: 150,
			widthPopup: 300,
			heightPopup: 200,
			requestLoadRows: apiGetFlatDataByConfigName('staff'),
			requestLoadConfig: apiGetConfigByName('staff'),
		},
		{
			componentType: 'DateRange',
			title: 'Период',
			nameStart: 'dateBegin',
			nameEnd: 'dateEnd',
			dateFormat: 'DD-MM-YYYY',
			className: 'mr-16',
		},
	];

	const customColumnProps = [
		{...code},
		{...dateTime('dateStartPlan')},
		{...dateTime('dateFinishPlan')},
		{...dateTime('dateStartFact')},
		{...dateTime('dateFinishFact')},
		{...checkBox('saveOrderControlPoints')},
	];

	const routesToDateFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'ServerTable',
						style: {height: '300px'},
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'page'},
								edit: {actionType: ['page', 'modal']},
								delete: {},
							},
						},
						fixWidthColumn: true,
						customColumnProps: customColumnProps,
						requestLoadRows: apiGetFlatDataByConfigName('detours'),
						requestLoadConfig: apiGetConfigByName('detours'),
					},
				},
			],
		},
	];

	const buttonChangeView = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Button',
				icon: <CalendarOutlined />,
				className: 'mr-8',
				disabled: true,
				onClick: () => console.log('Calendar View'),
			},
		},
		{
			componentType: 'Item',
			child: {
				componentType: 'Button',
				icon: <TableOutlined />,
				className: 'mr-8',
				disabled: true,
				onClick: () => console.log('Table View'),
			},
		},
		{
			componentType: 'Item',
			child: {
				componentType: 'Modal',
				buttonProps: {
					icon: <EyeInvisibleOutlined />,
					className: 'mr-8',
				},
				modalConfig: {
					type: `addOnServer`,
					title: `${Date(Date.now()).toString()}`,
					width: 576,
					bodyStyle: {
						height: 400,
					},
					form: {
						name: 'detourAddForm',
						loadInitData: (callBack, row) => callBack(null),
						body: [...routesToDateFields],
					},
				},
			},
		},
	];

	const formConfig = {
		noPadding: true,
		name: 'DetourSchedulesForm',
		onFinish: (values) => {
			console.log('Values', values);
		},

		body: [
			{
				componentType: 'Layout',
				children: [
					{
						componentType: 'Item',
						child: {
							componentType: 'ServerTable',
							history,
							selectable: true,
							fixWidthColumn: true,
							customColumnProps: customColumnProps,
							commandPanelProps: {
								systemBtnProps: {
									add: {actionType: 'page'},
									edit: {actionType: ['page', 'modal']},
									delete: {},
								},
								rightCustomSideElement: [...buttonChangeView],
							},
							filterPanelProps: {
								configFilter: [...configFilterPanel],
							},
							dispatchPath: 'detourSchedules.mainTable.detours',
							requestLoadRows: apiGetFlatDataByConfigName(
								'detours'
							),
							requestLoadConfig: apiGetConfigByName('detours'),

							modals: [detourViewModal()],
							footerProps: {
								rightCustomSideElement: [
									{
										componentType: 'Item',
										name: 'tableCount',
										child: {
											componentType: 'Text',
											subscribe: {
												name:
													'tableCountDetourSchedules',
												path:
													'rtd.detourSchedules.mainTable.detours',
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													value &&
														value.selected &&
														setSubscribeProps({
															label: `Выделено: ${value.selected.length} Всего: ${value.rows.length}`,
														});
												},
											},
										},
									},
								],
							},
						},
					},
				],
			},
		],
	};

	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
}
