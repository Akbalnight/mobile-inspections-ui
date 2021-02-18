import {apiGetFlatDataByConfigName} from '../../../apis/catalog.api';
import {
	buttonCopySchedule,
	buttonMoveSchedule,
} from '../Modals/modalButtonWorkSchedule';
import {TimePicker} from 'antd';
import TimelineScheduler from '../TimelineScheduler';
import {deleteButton} from '../Modals/modalButtonDelete';
import {btnFilterSettings} from '../../Base/Block/btnFilterSettings';

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
				{
					componentType: 'Space',
					className: 'px-8',
					style: {
						width: '100%',
						justifyContent: 'space-between',
					},
					children: [
						{
							componentType: 'Space',
							children: [
								...buttonMoveSchedule,
								...buttonCopySchedule,
								deleteButton('schedule'),
							],
						},
						{
							componentType: 'Space',
							children: [
								{
									componentType: 'Item',
									name: 'searchInput',
									child: {
										componentType: 'Search',
										placeholder: 'Введите наименование',
										dispatch: {
											path:
												'workSchedules.workShiftTab.modal.events.onSearch',
											type: 'event',
										},
									},
								},
								...btnFilterSettings,
							],
						},
					],
				},
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
							componentType: 'Layout',
							className: 'p-8 mt-0',
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

				/**
				 * надо продумать взаимодействие входных данных в Timeline с фильтрами на данной странице
				 */
			],
		},
	];
};
