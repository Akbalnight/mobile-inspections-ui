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
import {Radio, Rate} from 'antd';
import {
	CheckOutlined,
	MailOutlined,
	SettingOutlined,
	ThunderboltOutlined,
} from '@ant-design/icons';
import {defectDetection} from '../Base/Block/DefectDetection';
import {checkBox, code, dateTime} from '../Base/customColumnProps';
import {ReactComponent as SendToSap} from '../../imgs/defects/send-to-sap-btn.svg';
import {ReactComponent as CloseWithNote} from '../../imgs/defects/close-with-note-btn.svg';
import {ReactComponent as SendToPanel} from '../../imgs/defects/send-to-panel-btn.svg';
import {ReactComponent as One} from '../../imgs/defects/priority/one.svg';
import {ReactComponent as Two} from '../../imgs/defects/priority/two.svg';
import {ReactComponent as Three} from '../../imgs/defects/priority/three.svg';
import {ReactComponent as Four} from '../../imgs/defects/priority/four.svg';

export default function Defects() {
	const history = useHistory();
	const [tableRef, setTableRef] = useState({});
	const _setTableRef = (ref) => setTableRef(ref);

	const statusesConfig = [
		{
			priorityId: 'f6a672f7-f2b5-4178-af24-a1f4a75da273',
			priorityIcon: <One />,
			statusProcessId: '1864073a-bf8d-4df2-b02d-8e5afa63c4d0',
			statusProcessIcon: <ThunderboltOutlined />,
			statusPanelId: 'e07a6417-840e-4743-a4f0-45da6570743f',
			color: '#FF4040',
		},
		{
			priorityId: '985949ba-558f-4c14-836d-a609bcfa1ed7',
			priorityIcon: <Two />,
			statusProcessId: '879f0adf-0d96-449e-bcee-800f81c4e58d',
			statusProcessIcon: <SettingOutlined />,
			statusPanelId: 'ce4e57eb-ae8f-4648-98ec-410808da380e',
			color: '#F2C94C',
		},
		{
			priorityId: '10eb0af7-4551-44f2-9ef6-d038d7875d06',
			priorityIcon: <Three />,
			statusProcessId: 'df7d1216-6eb7-4a00-93a4-940047e8b9c0',
			statusProcessIcon: <CheckOutlined />,
			statusPanelId: '04d98b77-f4c7-46ed-be25-b01b035027fd',
			color: '#9DCE5B',
		},
		{
			priorityId: '1f06e13f-b300-4d9e-93db-0e54e2370d5c',
			priorityIcon: <Four />,
			statusProcessId: '16f09a44-11fc-4f82-b7b5-1eb2e812d8fa',
			statusProcessIcon: <MailOutlined />,
			statusPanelId: 'e07a6417-840e-4743-a4f0-45da65707432', // сюда вставить ID четвертого статуса, как он появится
			color: '#98B8E3',
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
		{...code},
		{...dateTime('dateDetectDefect')},
		{...dateTime('dateEliminationPlan')},
		{...dateTime('dateEliminationFact')},
		{...checkBox('sendedToSap')},
		{...checkBox('viewOnPanel')},
		{...checkBox('kpi')},
		{
			name: 'statusProcessName',
			cellRenderer: ({rowData}) => (
				<Radio.Group
					defaultValue={rowData.statusProcessId}
					size={'small'}
					disabled
				>
					{statusesConfig &&
						statusesConfig.map((el) => (
							<Radio.Button
								key={el.statusProcessId}
								value={el.statusProcessId}
							>
								{el.statusProcessIcon}
							</Radio.Button>
						))}
				</Radio.Group>
			),
		},
		{
			name: 'priorityPanelIdCode',
			cellRenderer: ({cellData}) => (
				<Rate
					defaultValue={cellData}
					count={4}
					disabled
					style={{
						color: 'grey',
						padding: '10px',
						boxSizing: 'padding-box',
					}}
				/>
			),
		},
		{
			name: 'statusPanelId',
			cellRenderer: ({cellData}) => {
				let statusIndicator = statusesConfig.find(
					(el) => el.statusPanelId === cellData
				);
				return statusIndicator ? (
					<div
						style={{
							width: 10,
							height: 10,
							background: `${statusIndicator.color}`,
							borderRadius: '50%',
						}}
					></div>
				) : (
					<div>Без статуса</div>
				);
			},
		},
	];

	const configFilterPanel = [
		{
			componentType: 'DateRange',
			title: 'Период обнаружения',
			nameStart: 'dateDetectDefectStart',
			nameEnd: 'dateDetectDefectEnd',
			dateFormat: 'DD-MM-YYYY HH:mm:ss',
			showTime: true,
			className: 'mr-16',
		},
		{
			componentType: 'DateRange',
			title: 'Период устранения',
			nameStart: 'dateEliminationPlan',
			nameEnd: 'dateEliminationFact',
			dateFormat: 'DD-MM-YYYY HH:mm:ss',
			showTime: true,
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
		history.location.pathname === '/control-defects/defects'
			? {}
			: {
					componentType: 'Custom',
					name: 'code',
					render: ({onChange, defaultValue, value}) => {
						return (
							<div
								style={{width: 200, marginLeft: 16}}
								className={'mr-0'}
							>
								<div style={{marginBottom: '5px'}}>
									Приоритет
								</div>
								<Radio.Group
									onChange={(e) => {
										onChange('code', e.target.value);
									}}
									value={value}
									size={'small'}
								>
									{statusesConfig &&
										statusesConfig.map((el) => (
											<Radio.Button
												key={el.priorityId}
												value={el.priorityId}
												style={{
													margin: 2,
													paddingTop: 2,
												}}
											>
												{el.priorityIcon}
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
					icon: <CloseWithNote />,
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
					icon: <SendToPanel />,
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
					},
				},
			},
		},
	];
	const buttonSendToSap = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Modal',
				buttonProps: {
					type: 'default',
					icon: <SendToSap />,
					disabled: true,
				},
				modalConfig: {
					type: 'editOnServer',
					title: `Передать в SAP`,
					width: 350,
					bodyStyle: {height: 200},
					okText: 'Передать',
					form: {
						name: 'defectCloseData',
						noPadding: false,
						labelCol: {span: 12},
						wrapperCol: {span: 6},
						loadInitData: (callBack, row) => {
							callBack(row);
						},
						body: [
							{
								componentType: 'Item',
								child: {
									componentType: 'Title',
									className: 'mt-0',
									label:
										'Выдействительно хотите передать в SAP выбранные дефекты?',
									level: 5,
								},
							},
							{
								componentType: 'Item',
								label: 'Выбрано дефектов',
								className: 'mb-0',
								name: 'length',
								child: {
									componentType: 'Text',
									strong: true,
								},
							},
						],
					},
				},
				dispatchPath: 'defects.defectModalSendToSap.modal',
				subscribe: {
					name: 'sendToSap',
					path: 'rtd.defects.defectTable.table.selected',
					onChange: ({value, setModalData, setButtonProps}) => {
						value &&
							setModalData &&
							setModalData({
								defectsSendToSap: value,
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
						fixWidthColumn: true,
						history: history,
						headerHeight: 35,
						dispatchPath: 'defects.defectTable.table',
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'page'},
								edit: {actionType: ['modal', 'modal']},
								delete: {},
							},
							leftCustomSideElement: [
								...buttonCloseWithNote,
								...(history.location.pathname ===
								'/control-defects/defects'
									? buttonSendToPanel
									: buttonSendToSap),
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
						},
						customColumnProps: customColumnProps,

						requestLoadRows: apiGetFlatDataByConfigName(
							history.location.pathname ===
								'/control-defects/defects'
								? 'defects'
								: 'panelProblems'
						),
						requestLoadConfig: apiGetConfigByName(
							history.location.pathname ===
								'/control-defects/defects'
								? 'defects'
								: 'panelProblems'
						),
						modals: [
							editDefectCard(
								history.location.pathname ===
									'/control-defects/defects'
									? 'defects'
									: 'panelProblems'
							),
							defectCardInfoModal(history),
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
