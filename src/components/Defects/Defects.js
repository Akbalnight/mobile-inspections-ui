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
import {Checkbox, Radio} from 'antd';
import {MessageOutlined, RollbackOutlined} from '@ant-design/icons';
import {defectDetection} from '../Base/Block/DefectDetection';

export default function Defects() {
	const history = useHistory();
	const [tableRef, setTableRef] = useState({});
	const _setTableRef = (ref) => setTableRef(ref);

	const radioButtonConfig = [
		{
			value: 1,
			color: 'white',
			backgroundColor: '#FF4040',
			code: 'f6a672f7-f2b5-4178-af24-a1f4a75da273',
		},
		{
			value: 2,
			color: 'white',
			backgroundColor: '#F2C94C',
			code: '985949ba-558f-4c14-836d-a609bcfa1ed7',
		},
		{
			value: 3,
			color: 'white',
			backgroundColor: '#9DCE5B',
			code: '10eb0af7-4551-44f2-9ef6-d038d7875d06',
		},
		{
			value: 4,
			color: 'white',
			backgroundColor: '#98B8E3',
			code: '1f06e13f-b300-4d9e-93db-0e54e2370d5c',
		},
	];

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
			name: `${
				history.location.pathname === '/control-defects/defects'
					? 'statusProcessId'
					: 'statusPanelId'
			}`,
			rowRender: 'name',
			title: 'Статус обработки',
			widthControl: 120,
			widthPopup: 250,
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
		{
			componentType: 'Custom',
			name: 'code',
			render: ({onChange, defaultValue, value}) => {
				return (
					<div
						style={{width: 200, marginLeft: 16}}
						className={'mr-0'}
					>
						<div style={{marginBottom: '5px'}}>Приоритет</div>
						<Radio.Group
							onChange={(e) => onChange('code', e.target.value)}
							// defaultValue={defaultValue}
							value={value}
							size={'small'} //medium
						>
							{radioButtonConfig &&
								radioButtonConfig.map((el) => (
									<Radio.Button
										key={el.code}
										value={el.code}
										style={{
											color: el.color,
											backgroundColor: el.backgroundColor,
											margin: 3,
										}}
									>
										{el.value}
									</Radio.Button>
								))}
						</Radio.Group>
					</div>
				);
			},
		},
	];

	/**
	 * в массиве buttonCloseWithNote, есть сущность Modal
	 * она производит сохранение данных в выделенных в таблице дефектов.
	 * Важные аспекты для правильно передачи информации воспользовались hidden -MultiSelect, в него мы поместили больную информацию о выделенных дефектах
	 * послед этого в функции processBeforeSaveForm мы представили полученные данные в форме подходящей для нашего сервера.
	 * получившийся объект мы переадали в requestSaveRow(свойство Modal, важно type: 'editOnServer'), приэтом можем передать requestSaveForm (свойство Form).
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
					className: 'ml-4 mr-8',
					disabled: true,
				},
				modalConfig: {
					type: 'editOnServer',
					title: `Закрыть с примечанием`,
					width: 600,
					bodyStyle: {height: 320},
					okText: 'Передать',
					onFinish: (values) => tableRef && tableRef.reloadData({}),
					requestSaveRow: apiSaveByConfigName('saveDefectsWithNote'), //Один и вариантов сохранения данных
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
					name: 'tableCloseInfo',
					path: 'rtd.defects.defectTable.table.selected',
					onChange: ({value, setModalData, setButtonProps}) => {
						value &&
							setModalData &&
							setModalData({
								defectsWithNote: value,
								length: value.length,
							});
						value &&
							setButtonProps &&
							setButtonProps({disabled: !(value.length > 0)});
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
					disabled: true,
				},
				modalConfig: {
					type: 'select',
					title: `Передать в панель проблем`,
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
						loadInitData: (callBack, row) => {
							callBack(row);
						},
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
					name: 'tableSend',
					path: 'rtd.defects.defectTable.table.selected',
					onChange: ({value, setModalData, setButtonProps}) => {
						value &&
							setModalData &&
							setModalData({
								...value[value.length - 1],
							});
						value &&
							setButtonProps &&
							setButtonProps({disabled: !(value.length === 1)});

						/**
						 * костыль в setModalData
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
