import {apiGetFlatDataByConfigName} from '../../../apis/catalog.api';
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
export const workSchedulesFields = () => {
	return [
		{
			componentType: 'Space',
			// className: 'p-8',
			wrap: 'wrap',
			children: [
				...buttonMoveSchedule,
				...buttonCopySchedule,
				{
					componentType: 'Item',
					label: 'Сотрудники',
					name: 'selectStaff',
					className: 'mb-8',
					child: {
						componentType: 'Select',
						autoClearSearchValue: true,
						showSearch: true,
						searchParamName: 'positionName',
						showArrow: true,
						filterOption: false,
						widthControl: '250px',
						dropdownMatchSelectWidth: 200,
						mode: 'multiple',
						allowClear: true,
						infinityMode: true,
						requestLoadRows: apiGetFlatDataByConfigName('staff'),
						optionConverter: (option) => ({
							label: <span>{option.positionName}</span>,
							value: option.id,
							className: '',
							disabled: undefined,
						}),
						dispatch: {
							path: 'workSchedules.workSchedulesTab.page.select',
							type: 'event',
						},
					},
				},
				{
					componentType: 'Item',
					label: 'Период',
					className: 'mb-8',
					child: {
						componentType: 'Custom',
						render: ({onChange, defaultValue, value}) => {
							return <RangePicker />;
						},
						dispatch: {
							path:
								'workSchedules.workSchedulesTab.page.rangePicker',
							type: 'event',
						},
					},
				},
				{
					componentType: 'Layout',
					className: 'p-8 mt-0',
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
};
