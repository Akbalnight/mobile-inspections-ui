import {BasePage} from 'mobile-inspections-base-ui';
import React, {useState} from 'react';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {detourViewModal} from './Modals/detourViewModal';
import {useHistory} from 'react-router';
import {CalendarOutlined, TableOutlined} from '@ant-design/icons';

import {customColumnProps} from '../Registry/tableProps';
import DetoursCalendar from '../Registry/DetoursCalendar';
import {addDetourForm, editDetourForm} from './Modals/detourEdit';

/**
 * Основной компонент раздела, вынесены настройки таблицы в fdgsd.js, модальные окна вынесены в отдельную папку
 */
export default function Detours() {
	const [pageView, setPageView] = useState(true);
	let history = useHistory();

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
								add: {actionType: 'modal'},
								edit: {actionType: ['modal', 'modal']},
								delete: {},
							},
						},
						dispatchPath: 'detourSchedules.mainTable.detours',
						requestLoadRows: apiGetFlatDataByConfigName('detours'),
						requestLoadConfig: apiGetConfigByName('detours'),
						modals: [
							detourViewModal(),
							addDetourForm(),
							editDetourForm(),
						],
					},
				},
			],
		},
	];
	/**
     * возможно придется вренуть все в состояние в котором было до рефакторинга.
     * Мое предположение связано с тем что в концепции
     * render: ({onChange, defaultValue, value}) => {
					return <DetoursCalendar />;
				},
     * нам может понадобиться активировать аргументы функции
     */
	const calendarFields = [
		{
			componentType: 'Item',
			name: 'calendarDetours',
			child: {
				componentType: 'Custom',
				render: ({onChange, defaultValue, value}) => {
					return <DetoursCalendar />;
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
