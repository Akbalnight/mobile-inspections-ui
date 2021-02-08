import {ReactComponent as MoveSchedules} from '../../../imgs/workSchedules/buttonMoveSchedule.svg';
import {ReactComponent as CopySchedule} from '../../../imgs/workSchedules/buttonCopySchedule.svg';
import {DatePicker} from 'antd';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';

const {RangePicker} = DatePicker;

/**
 * модалки во вкладке РАБОЧИЕ ГРАФИКИ, сделал разными намеренно. Надо обсудить
 * В этом файле находятся мобальные окна запускаемые из Tabs workSchedules
 */

export const buttonMoveSchedule = [
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
								requestLoadConfig: apiGetConfigByName('staff'),
							},
						},
						{
							componentType: 'Item',
							className: 'ml-16',
							name: 'rangePeriod',
							label: 'Перемещение',
							child: {
								componentType: 'Custom',
								render: ({onChange, defaultValue, value}) => {
									return (
										<RangePicker
											// format={'DD.MM.YYYY'}
											// value={defaultValue}
											onChange={(dates, dateString) => {
												onChange(dates);
											}}
											placeholder={['с даты', 'на дату']}
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
								label: 'Перезаписать график на выбранную дату',
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

export const buttonCopySchedule = [
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
								requestLoadConfig: apiGetConfigByName('staff'),
							},
						},

						{
							componentType: 'Item',
							name: 'rangePeriod',
							className: 'ml-16',
							label: 'Период',
							child: {
								componentType: 'Custom',
								render: ({onChange, defaultValue, value}) => {
									return (
										<RangePicker
											// format={'DD.MM.YYYY'}
											// value={defaultValue}
											onChange={(dates, dateString) => {
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
								requestLoadConfig: apiGetConfigByName('staff'),
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
