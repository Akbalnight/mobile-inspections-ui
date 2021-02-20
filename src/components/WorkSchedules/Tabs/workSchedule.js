import {apiGetFlatDataByConfigName} from '../../../apis/catalog.api';
import {TimePicker} from 'antd';
import TimelineScheduler from '../TimelineScheduler';
import {tableTabHeader} from './tableProps';

const {RangePicker} = TimePicker;

/**
 *
 * Основные настройки TimelineScheduler в TimelineScheduler.js
 * Основной вопрос, взаимодействие данных с сервера и фильтров  на данной стаблице
 */
export const workScheduleFields = () => {
	return [
		{
			componentType: 'Space',
			direction: 'vertical',
			children: [
				...tableTabHeader('schedule'),
				{
					componentType: 'Space',
					wrap: true,
					direction: 'vertical',
					children: [
						{
							componentType: 'Space',
							className: 'px-8',
							children: [
								{
									componentType: 'Item',
									label: 'Сотрудники',
									name: 'selectStaff',
									child: {
										componentType: 'Select',
										autoClearSearchValue: true,
										showSearch: true,
										searchParamName: 'positionName',
										showArrow: true,
										filterOption: false,
										widthControl: 250,
										dropdownMatchSelectWidth: 200,
										mode: 'multiple',
										allowClear: true,
										infinityMode: true,
										requestLoadRows: apiGetFlatDataByConfigName(
											'staff'
										),
										optionConverter: (option) => ({
											label: (
												<span>
													{option.positionName}
												</span>
											),
											value: option.id,
											className: '',
											disabled: undefined,
										}),
										dispatch: {
											path:
												'workSchedules.workScheduleTab.page.select',
											type: 'event',
										},
									},
								},
								{
									componentType: 'Item',
									label: 'Период',
									child: {
										componentType: 'Custom',
										render: ({
											onChange,
											defaultValue,
											value,
										}) => {
											return <RangePicker />;
										},
										dispatch: {
											path:
												'workSchedules.workScheduleTab.page.rangePicker',
											type: 'event',
										},
									},
								},
							],
						},
						{
							componentType: 'Item',

							child: {
								componentType: 'Divider',
								className: 'mt-0 mb-0',
							},
						},
						/**
						 * надо продумать взаимодействие входных данных в Timeline с фильтрами на данной странице
						 */
						{
							componentType: 'Layout',
							className: 'px-8 mt-0',
							children: [
								{
									componentType: 'Item',
									child: {
										componentType: 'Custom',
										render: ({
											onChange,
											defaultValue,
											value,
										}) => {
											return (
												<TimelineScheduler
													onClick={(e) =>
														console.log(e)
													}
												/>
											);
										},
										dispatch: {
											path:
												'workSchedules.workScheduleTab.page.timelineScheduler',
										},
										// subscribe: [
										// 	{
										// 		name: 'onSelect',
										// 		path:
										// 			'rtd.workSchedules.workScheduleTab.page.select',
										// 		extraData: 'string', // заглушка
										// 		onChange: ({
										// 			extraData,
										// 			reloadTable,
										// 		}) => {
										// 			reloadTable({filter: extraData});
										// 		},
										// 	},
										// 	{
										// 		name: 'onRange',
										// 		path:
										// 			'workSchedules.workScheduleTab.page.rangePicker',
										// 		extraData: 'string', // заглушка
										// 		onChange: ({
										// 			extraData,
										// 			reloadTable,
										// 		}) => {
										// 			reloadTable({filter: extraData});
										// 		},
										// 	},
										// ],
									},
								},
							],
						},
					],
				},
			],
		},
	];
};
