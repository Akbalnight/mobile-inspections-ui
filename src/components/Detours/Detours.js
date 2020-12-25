import {BasePage} from 'mobile-inspections-base-ui';
import React, {useEffect, useState} from 'react';
import {Form, notificationError} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {detourViewModal} from './Modals/detourViewModal';
import {useHistory} from 'react-router';
import {checkBox, code, date} from '../Base/customColumnProps';
import moment from 'moment';
import {
	CalendarOutlined,
	PlusCircleOutlined,
	TableOutlined,
} from '@ant-design/icons';
import {Calendar, Popover, Checkbox} from 'antd';

export default function Detours() {
	const [calendarValues, setCalendarValues] = useState([]);
	const [pageView, setPageView] = useState(true);
	let history = useHistory();

	useEffect(() => {
		apiGetFlatDataByConfigName('detours')({
			data: {},
			params: {},
		})
			.then((response) => {
				return setCalendarValues(response.data);
			})
			.catch((error) =>
				notificationError(error, 'Ошибка загрузки данных формы')
			);
	}, []);
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
			dateFormat: 'DD-MM-YYYY HH:mm:ss',
			className: 'mr-16',
		},
	];

	const customColumnProps = [
		{...code},
		{...date('dateStartPlan')},
		{...checkBox('saveOrderControlPoints')},
	];

	function dateCellRender(value) {
		const listData = calendarValues;
		return (
			<>
				{listData &&
					listData.map((item) => {
						const content = (
							<div key={item.id} className='detours'>
								<div>Название: {item.name}</div>
								<div>Маршрут: {item.routeName}</div>
								<div>Иcпольнитель: {item.staffName}</div>
								<div>
									Учитывать порядок:
									<Checkbox
										checked={item.saveOrderControlPoints}
										disabled
									></Checkbox>
								</div>
								<div>
									Начало:
									{moment(item.dateStartPlan).format(
										'DD MMM YY HH:mm:ss'
									)}
								</div>
								<div>
									Окончание:
									{moment(item.dateFinishPlan).format(
										'DD MMM YY HH:mm:ss'
									)}
								</div>
							</div>
						);
						if (
							String(value._d).slice(0, 15) ===
							String(moment(item.dateStartPlan)._d).slice(0, 15)
						) {
							// console.log(1);// тут проблема
							return (
								<Popover
									title={value.format('DD MMMM YY')}
									trigger={'hover'}
									content={content}
								>
									<div
										key={item.id}
										className='detours-short'
									>
										{item.name}
									</div>
								</Popover>
							);
						} else {
							return <div className={'special-hidden'}></div>;
						}
					})}
			</>
		);
	}

	const routesToDateFields = [
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
						style: {height: '350px'},
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'page'},
								edit: {actionType: ['page', 'modal']},
								delete: {},
							},
						},
						requestLoadRows: apiGetFlatDataByConfigName('detours'),
						requestLoadConfig: apiGetConfigByName('detours'),
					},
				},
			],
		},
	];

	const buttonChangeView = [
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'Button',
						icon: <TableOutlined />,
						className: 'mr-8',
						disabled: pageView,
						onClick: () => setPageView((state) => !state),
					},
				},
				{
					componentType: 'Item',
					child: {
						componentType: 'Button',
						icon: <CalendarOutlined />,
						className: 'mr-8',
						disabled: !pageView,
						onClick: () => setPageView((state) => !state),
					},
				},
			],
		},
	];
	const tableFormFields = [
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
						},
						filterPanelProps: {
							configFilter: [...configFilterPanel],
						},
						dispatchPath: 'detourSchedules.mainTable.detours',
						requestLoadRows: apiGetFlatDataByConfigName('detours'),
						requestLoadConfig: apiGetConfigByName('detours'),
						modals: [detourViewModal()],
					},
				},
			],
		},
	];

	const calendarFields = [
		{
			componentType: 'Row',
			className: 'calendar-title',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'Title',
						label: 'Календарь обходов',
						level: 5,
					},
				},
				{
					componentType: 'Item',
					child: {
						componentType: 'Modal',
						buttonProps: {
							icon: <PlusCircleOutlined />,
							className: 'mr-8',
							type: 'default',
							label: 'Добавить обход',
							// size: 'small',
						},
						modalConfig: {
							type: `addOnServer`,
							title: `Актуальная дата из календаря`,
							width: 760,
							bodyStyle: {
								height: 478,
							},
							form: {
								name: 'detourAddForm',
								loadInitData: (callBack, row) => callBack(null),
								body: [...routesToDateFields],
							},
						},
					},
				},
			],
		},

		{
			componentType: 'Item',
			name: 'calendarDetours',
			child: {
				componentType: 'Custom',
				render: ({onChange, defaultValue, value}) => {
					return (
						<Calendar
							headerRender={() => null}
							dateCellRender={dateCellRender}
						/>
					);
				},
			},
		},
	];

	const formConfig = {
		noPadding: pageView,
		name: 'DetourSchedulesForm',
		onFinish: (values) => {
			console.log('Values', values);
		},
		body: [...(pageView ? tableFormFields : calendarFields)],
		footer: [...buttonChangeView],
	};

	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
}
