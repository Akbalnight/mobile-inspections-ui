import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {
	buttonCopySchedule,
	buttonMoveSchedule,
} from '../Modals/modalButtonWorkSchedules';
import {TimePicker} from 'antd';
import TimelineScheduler from '../TimelineScheduler';

const {RangePicker} = TimePicker;

/**
 * в этом файле находится один Tab Workschedules.js
 * Основные настройки TimelineScheduler в TimelineScheduler.js
 */
export const workSchedulesFields = [
	{
		componentType: 'Row',
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
				componentType: 'Layout',
				className: 'mr-16 ml-4',
				style: {
					width: '100%',
				},
				children: [
					{
						componentType: 'Item',
						child: {
							componentType: 'Custom',
							render: ({onChange, defaultValue, value}) => {
								return <TimelineScheduler />;
							},
						},
					},
				],
			},
		],
	},
];
