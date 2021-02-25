import {PlusCircleOutlined} from '@ant-design/icons';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
// import {customColumnProps} from '../tableProps';
import {ReactComponent as ExecutorIcon} from '../../../imgs/detour/executor-btn.svg';
import {addDetourForm} from './detourEdit';

// при необходимости в модальное окно можно передать history
export const buttonCreateDetour = [
	{
		componentType: 'Item',
		child: {
			componentType: 'Modal',
			buttonProps: {
				icon: <PlusCircleOutlined />,
				className: 'mr-8',
				type: 'default',
				label: 'Добавить обход',
			},
			modalConfig: addDetourForm(),
			//{
			// 			type: `addOnServer`,
			// 			title: `Актуальная дата из календаря`,
			// 			width: 760,
			// 			bodyStyle: {
			// 				height: 478,
			// 			},
			// 			form: {
			// 				name: 'detourAddForm',
			// 				loadInitData: (callBack, row) => callBack(null),
			// 				body: [
			// 					{
			// 						componentType: 'Layout',
			// 						children: [
			// 							{
			// 								componentType: 'Item',
			// 								child: {
			// 									componentType: 'ServerTable',
			// 									selectable: true,
			// 									fixWidthColumn: true,
			// 									customColumnProps: customColumnProps,
			// 									style: {height: '350px'},
			// 									commandPanelProps: {
			// 										systemBtnProps: {
			// 											add: {actionType: 'page'},
			// 											edit: {
			// 												actionType: [
			// 													'page',
			// 													'modal',
			// 												],
			// 											},
			// 											delete: {},
			// 										},
			// 									},
			// 									requestLoadRows: apiGetFlatDataByConfigName(
			// 										'detours'
			// 									),
			// 									requestLoadConfig: apiGetConfigByName(
			// 										'detours'
			// 									),
			// 								},
			// 							},
			// 						],
			// 					},
			// 				],
			// 			},
			// 		},
		},
	},
];

export const buttonExecutorDetour = (params) => {
	return {
		componentType: 'Item',
		label: 'Доступные исполнители',
		child: {
			componentType: 'Modal',
			buttonProps: {
				label: 'Выбрать',
				icon: <ExecutorIcon />,
				type: 'default',
				// disabled: true
			},
			modalConfig: {
				type: `select`,
				title: 'Выбор исполнителя',
				width: 576,
				bodyStyle: {
					height: 496,
				},
				okText: 'Выбрать',
				form: {
					name: `${params ? 'edit' : 'add'}ModalForm`,
					labelCol: {span: 8},
					wrapperCol: {span: 12},
					loadInitData: (callBack, row) => {
						params ? callBack(row) : callBack(null);
					},
					body: [
						{
							componentType: 'Item',
							name: 'structuralUnits', // ввел это понятие, прокинул по модалке дальше
							label: 'Структурное подразделение',
							rules: [
								{
									message: 'Заполните вариант подразделения',
									required: true,
								},
							],
							child: {
								componentType: 'SingleSelect',
								expandColumnKey: 'id',
								rowRender: 'name',
								widthControl: 0,
								widthPopup: 300,
								heightPopup: 200,
								dispatchPath:
									'detourSchedules.selectEmployeModal.structuralUnits',
								requestLoadRows: apiGetHierarchicalDataByConfigName(
									'departments'
								),
								requestLoadDefault: apiGetFlatDataByConfigName(
									'departments'
								),
							},
						},
						{
							componentType: 'Item',
							name: 'workShift', // ввел это понятие, прокинул по модалке дальше
							label: 'Рабочая смена',
							rules: [
								{
									message: 'Заполните вариант смены',
									required: true,
								},
							],
							child: {
								componentType: 'SingleSelect',
								expandColumnKey: 'id',
								rowRender: 'positionName',
								widthControl: 0,
								widthPopup: 300,
								heightPopup: 200,
								defaultFilter: {departmentName: null},
								dispatchPath:
									'detourSchedules.selectEmployeModal.workShift',
								subscribe: {
									name: 'schedulesWorkShift',
									path:
										'rtd.detourSchedules.selectEmployeModal.structuralUnits.selected',
									onChange: ({value, setReloadTable}) =>
										value &&
										setReloadTable &&
										setReloadTable({
											filter: {
												departmentName: value.name,
											}, // настроить фильтрацио по сменам
										}),
								},
								requestLoadRows: apiGetFlatDataByConfigName(
									'staff'
								), // поставить правильный запрос
								requestLoadDefault: apiGetFlatDataByConfigName(
									'staff'
								), // поставить правильный запрос
							},
						},
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Исполнитель:',
								level: 5,
							},
						},
						{
							componentType: 'Layout',
							children: [
								{
									componentType: 'Item',
									name: 'executorTable',
									child: {
										componentType: 'ServerTable',
										style: {height: '240px'},
										defaultFilter: {positionId: null},
										selectable: true,
										filterPanelProps: {
											configFilter: [
												{
													componentType:
														'SingleSelect',
													name: 'id',
													className: 'mr-16',
													rowRender: 'positionName',
													title: 'Сотрудник',
													widthControl: 150,
													widthPopup: 300,
													heightPopup: 200,
													requestLoadRows: apiGetFlatDataByConfigName(
														'staff'
													),
													requestLoadConfig: apiGetConfigByName(
														'staff'
													),
												},
											],
										},
										requestLoadRows: apiGetFlatDataByConfigName(
											'staffAuto'
										),
										requestLoadConfig: apiGetConfigByName(
											'staffAuto'
										),
										dispatchPath:
											'detourSchedules.executorTableChoise.executor',
										subscribe: {
											name: 'executor',
											path:
												'rtd.detourSchedules.selectEmployeModal.workShift.selected',
											onChange: ({
												value,
												setReloadTable,
											}) =>
												value &&
												setReloadTable &&
												setReloadTable({
													filter: {
														positionId:
															value.positionId,
													},
												}),
										},
									},
								},
							],
						},
					],
				},
			},
		},
	};
};
