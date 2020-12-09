import React, {useState} from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../apis/catalog.api';
import {defectCardInfoModal} from './Modals/defectCardInfo';
import {useHistory} from 'react-router';
import {editDefectCard} from './Modals/defectEdit';
import {paths} from '../../constants/paths';
import {Checkbox} from 'antd';
import {MessageOutlined, RollbackOutlined} from '@ant-design/icons';
import {defectDetection} from '../Base/Block/DefectDetection';

export default function Defects() {
	const history = useHistory();
	const [tableRef, setTableRef] = useState({});
	const _setTableRef = (ref) => setTableRef(ref);

	const processBeforeSaveForm = (rawValues) => {
		const values = {...rawValues};
		const resultData = values.defectsWithNote.map((el) => {
			return {
				id: el.id,
				dateEliminationFact: values.dateEliminationFact,
				note: values.note,
			};
		});
		return {defectsWithNote: resultData};
	};
	const customColumnProps = [
		// на данный момент оставлю так, если будет потребность в другом формате исправим

		{
			name: 'code',
			cellRenderer: ({rowData}) => String(rowData.code).padStart(8, '0'),
			// cellRenderer: ({rowData}) => console.log(rowData),
		},
		{
			name: 'dateEliminationPlan',
			cellRenderer: ({rowData}) =>
				new Date(rowData.dateEliminationPlan).toLocaleTimeString(
					'ru-RU',
					{
						hour12: false,
						day: 'numeric',
						month: 'numeric',
						year: 'numeric',
					}
				),
		},
		{
			name: 'dateEliminationFact',
			cellRenderer: ({rowData}) =>
				new Date(rowData.dateEliminationFact).toLocaleTimeString(
					'ru-RU',
					{
						hour12: false,
						day: 'numeric',
						month: 'numeric',
						year: 'numeric',
					}
				),
		},
		{
			name: 'sendedToSap',
			cellRenderer: ({cellData}) => (
				<Checkbox checked={cellData} disabled />
			),
		},
		{
			name: 'viewOnPanel',
			cellRenderer: ({cellData}) => (
				<Checkbox checked={cellData} disabled />
			),
		},
	];
	const configFilterPanel = [
		// тут чуть-чуть деревянно получилось
		{
			componentType: 'DateRange',
			title: 'Период обнаружения',
			nameStart: 'dateDetectDefectStart',
			nameEnd: 'dateDetectDefectEnd',
			dateFormat: 'DD-MM-YYYY HH:mm',
			className: 'mr-16',
		},
		{
			componentType: 'DateRange',
			title: 'Период устранения',
			nameStart: 'dateEliminationPlan',
			nameEnd: 'dateEliminationFact',
			dateFormat: 'DD-MM-YYYY HH:mm',
			className: 'mr-16',
		},
		{
			componentType: 'SingleSelect',
			name: 'statusProcessId',
			rowRender: 'name',
			title: 'Статус обработки',
			widthControl: 120,
			widthPopup: 250,

			//эксперимент
			requestLoadRows: apiGetFlatDataByConfigName(
				history.location.pathname === '/control-defects/defects'
					? 'defectStatusesProcess'
					: 'panelProblemsStatuses'
			),
			requestLoadConfig: apiGetConfigByName(
				history.location.pathname === '/control-defects/defects'
					? 'defectStatusesProcess'
					: 'panelProblemsStatuses'
			),
		},
		// {
		// 	componentType: 'Custom',
		// 	name: 'input',
		// 	title: 'Период устранения',

		// 	render: ({onChange, defaultValue, value}) => {
		// 		return (
		// 			<div style={{width: 200}} className={'mr-0'}>
		// 				<div style={{marginBottom: '17px'}}>Приоритет</div>
		// 				{/* <Input
		// 					onChange={(e) => onChange('input', e.target.value)}
		// 					defaultValue={defaultValue}
		// 					value={value}
		// 					allowClear={true}
		// 				/> */}
		// 				<Radio.Group
		// 					onChange={(e) => onChange('input', e.target.value)}
		// 					defaultValue={defaultValue}
		// 					value={value}
		// 					optionType='button'
		// 				>
		// 					<Radio.Button value={1}>1</Radio.Button>
		// 					<Radio.Button value={2}>2</Radio.Button>
		// 					<Radio.Button value={3}>3</Radio.Button>
		// 					<Radio.Button value={4}>4</Radio.Button>
		// 				</Radio.Group>
		// 			</div>
		// 		);
		// 	},
		// },
	];

	/**
	 * в массиве buttonCloseWithNote, есть сущность Modal
	 * она производит сохранение данных в выделенных в таблице дефектов.
	 * Важные аспекты для правильно передачи информации воспользовались hidden -MultiSelect, в него мы поместили больную информацию о выделенных дефектах
	 * послед этого в функции processBeforeSaveForm мы представили полученные данные в форме подходящей для нашего сервера.
	 * получившийся объект мы переадали в requestSaveRow(свойство Modal), приэтом можем передать requestSaveForm (свойство Form).
	 * Изменения на сервер произошли и мы обновили таблицу при мопомщи конструкции onFinish: (values) => tableRef && tableRef.reloadData({}),
	 */
	const buttonCloseWithNote = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Modal',
				buttonProps: {
					type: 'default',
					icon: <MessageOutlined />,
					className: 'mr-8',
					style: {
						marginLeft: 6,
					},
					// disabled: true
				},
				modalConfig: {
					type: 'select',
					title: `Закрыть с примечанием`,
					width: 600,
					bodyStyle: {height: 320},
					okText: 'Передать',
					onFinish: (values) => tableRef && tableRef.reloadData({}),
					requestSaveRow: apiSaveByConfigName('saveDefectsWithNote'),
					form: {
						name: 'defectCloseData',
						noPadding: true,
						labelCol: {span: 10},
						wrapperCol: {span: 12},
						loadInitData: (callBack, row) => {
							callBack(row);
						},
						// requestSaveForm: apiSaveByConfigName(
						// 	'saveDefectsWithNote'
						// ), //Один и вариантов сохранения данных
						processBeforeSaveForm: processBeforeSaveForm,
						methodSaveForm: 'PUT',
						body: [
							{
								componentType: 'Col',
								className: 'mt-16',
								children: [
									{
										componentType: 'Item',
										label: 'Выбрано дефектов',
										name: 'length',
										child: {
											componentType: 'Text',
										},
									},
									{
										componentType: 'Item',
										label: 'Дата фактического устранения',
										name: 'dateEliminationFact',
										child: {
											componentType: 'DatePicker',
											showTime: true,
										},
									},
									{
										componentType: 'Item',
										label: `Примечание
										по устранению`,
										name: 'note',
										child: {
											componentType: 'TextArea',
										},
									},
									{
										componentType: 'Item',
										hidden: true,
										name: 'defectsWithNote',
										child: {
											componentType: 'MultiSelect',
											rowRender: 'name',
										},
									},
								],
							},
						],
					},
				},

				dispatchPath: 'defects.defectModalSendPanel.modal',
				subscribe: {
					name: 'tableRowsInfo',
					path: 'rtd.defects.defectTable.table.selected',
					onChange: ({value, setModalData}) => {
						value &&
							setModalData &&
							setModalData({
								defectsWithNote: value,
								length: value.length,
							});
					},
				},
			},
		},
	];

	const buttonSendToPanel = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Modal',
				buttonProps: {
					type: 'default',
					icon: <RollbackOutlined rotate={90} />,
				},
				modalConfig: {
					type: 'select',
					title: `Закрыть с примечанием`,
					width: 600,
					bodyStyle: {height: 420},
					okText: 'Передать',
					form: {
						name: 'defectSendData',
						noPadding: true,
						labelCol: {span: 10},
						wrapperCol: {span: 12},
						style: {
							paddingTop: 30,
						},
						// loadInitData: (callBack, row) => {
						// 	callBack(row);
						// },
						body: [
							{...defectDetection},
							{
								componentType: 'Item',
								label: 'Передать в SAP',
								name: 'sendedToSap',
								valuePropName: 'checked',
								rules: [
									{
										type: 'boolean',
									},
								],
								className: 'mb-0',
								child: {
									componentType: 'Checkbox',
								},
							},
						],
					},
				},

				dispatchPath: 'defects.defectModalSendPanel.modal',
				subscribe: {
					name: 'tableRowsInfo',
					path: 'rtd.defects.defectTable.table.selected',
					onChange: ({value, setModalData}) => {
						value &&
							setModalData &&
							setModalData({
								...value[value.length - 1],
							});
						/**
						 * костыль setModalData
						 */
					},
				},
			},
		},
	];

	const tableFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'ServerTable', // 'InfinityTable' ?
						selectable: true,
						ref: _setTableRef,
						// fixWidthColumn:true,
						dispatchPath: 'defects.defectTable.table',
						commandPanelProps: {
							systemBtnProps: {
								edit: {actionType: ['modal', 'modal']},
								delete: {},
								//эксперимент
								// up: {
								// 	tooltip: 'Отправить в Панель проблем',
								// 	render: ({disabled, onClick}) => (
								// 		<Button icon={<MessageOutlined />} />
								// 	),
								// },
							},
							leftCustomSideElement: [
								...buttonCloseWithNote,
								...buttonSendToPanel,
							],
							rightCustomSideElement: [
								history.location.pathname ===
								'/control-defects/defects'
									? {
											componentType: 'Item',
											child: {
												componentType: 'Button',
												label:
													'Перейти в панель проблем',
												type: 'primary',
												onClick: () => {
													history.push(
														`${paths.CONTROL_DEFECTS_PANEL_PROBLEMS.path}`
													);
												}, //заглушка
											},
									  }
									: {
											componentType: 'Item',
											child: {
												componentType: 'Button',
												label:
													'Перейти в журнал дефектов',
												type: 'primary',
												onClick: () => {
													history.push(
														`${paths.CONTROL_DEFECTS_DEFECTS.path}`
													);
												}, //заглушка
											},
									  },
							],
						},
						filterPanelProps: {
							configFilter: [...configFilterPanel],
							defaultFilter: {statusProcessId: null},
							// onApplyFilter: (value) => console.log(value),
							onChangeFilter: (value) => console.log(value),
						},
						customColumnProps: customColumnProps,

						requestLoadRows: apiGetFlatDataByConfigName('defects'),
						requestLoadConfig: apiGetConfigByName('defects'),
						modals: [
							editDefectCard('defects'),
							defectCardInfoModal(history), // прокинул тут для кнопки Редактирвать, история тут ни к чему.
							// defectSendPanel(),
						],
					},
				},
			],
		},
	];

	const formConfig = {
		noPadding: true,
		name: 'defectsLogForm',
		body: [...tableFields],
	};
	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
}

//эксперимент
// {
// 	componentType: 'Item',
// 	label: 'Приоритет',
// 	name: 'priorityField',
// 	className: 'mb-0',
// 	child: {
// 		componentType: 'RadioGroup',
// 		optionType: 'button',
// 		size: 'small',
// 		options: [
// 			{
// 				label: '1',
// 				value: '1',
// 				style: {
// 					color: 'white',
// 					backgroundColor: '#FF4040',
// 				},
// 			},
// 			{
// 				label: '2',
// 				value: '2',
// 				style: {
// 					color: 'white',
// 					backgroundColor: '#F2C94C',
// 				},
// 			},
// 			{
// 				label: '3',
// 				value: '3',
// 				style: {
// 					color: 'white',
// 					backgroundColor: '#9DCE5B',
// 				},
// 			},
// 			{
// 				label: '4',
// 				value: '4',
// 				style: {
// 					color: 'white',
// 					backgroundColor: '#98B8E3',
// 				},
// 			},
// 		],
// 	},
// },
