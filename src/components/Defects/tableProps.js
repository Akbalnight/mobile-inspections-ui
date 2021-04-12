import React from 'react';
import {Rate, Tooltip} from 'antd';
import {
	CheckOutlined,
	MailOutlined,
	SettingOutlined,
	ThunderboltOutlined,
	QuestionOutlined,
	CaretRightOutlined,
	FieldTimeOutlined,
} from '@ant-design/icons';
import {checkBox, code, dateTime} from '../Base/customColumnProps';
import {ReactComponent as One} from '../../imgs/defects/priority/one.svg';
import {ReactComponent as Two} from '../../imgs/defects/priority/two.svg';
import {ReactComponent as Three} from '../../imgs/defects/priority/three.svg';
import {ReactComponent as Four} from '../../imgs/defects/priority/four.svg';
import {apiGetFlatDataByConfigName} from '../../apis/catalog.api';
import {btnFilterSettings} from '../Base/Block/btnFilterSettings';
import {paths} from '../../constants/paths';
import {
	buttonCloseWithNote,
	buttonSendToPanel,
	buttonSendToSap,
} from './Modals/modalButtonDefects';
import {classic} from 'rt-design';

import {editDefectCard} from './Modals/defectEdit';

import {disabledEndDate, disabledStartDate} from '../Base/Functions/DateLimits';
import {useHistory} from 'react-router';
import {reloadFilterFields} from '../Base/Functions/ReloadField';

const {Space, Text, DatePicker, Select, Button} = classic;
/**
 * в этом файле находятся конфигурации для главной таблицы в Defects.js
 *
 * statusesConfig любые изменеия для обработки нужно вносить сюда.
 *
 * customColumnProps изменеие отображения входных данных
 *
 * configFilterPanel общий вид панели для двух разделов, отображение меняется при помощи history
 */

export const statusesConfig = [
	{
		// новый
		priorityId: 'f6a672f7-f2b5-4178-af24-a1f4a75da273',
		priorityIcon: <One />,
		statusProcessId: '1864073a-bf8d-4df2-b02d-8e5afa63c4d0',
		statusIcon: <ThunderboltOutlined />,
		statusIconF: ThunderboltOutlined,
		statusPanelId: 'e07a6417-840e-4743-a4f0-45da6570743f',
		color: '#FF4040',
	},
	{
		// в работе
		priorityId: '985949ba-558f-4c14-836d-a609bcfa1ed7',
		priorityIcon: <Two />,
		statusProcessId: '879f0adf-0d96-449e-bcee-800f81c4e58d',
		statusIcon: <SettingOutlined />,
		statusIconF: SettingOutlined,
		statusPanelId: 'ce4e57eb-ae8f-4648-98ec-410808da380e',
		color: '#F2C94C',
	},
	{
		// просрочен
		priorityId: '10eb0af7-4551-44f2-9ef6-d038d7875d06',
		priorityIcon: <Three />,
		statusProcessId: 'df7d1216-6eb7-4a00-93a4-940047e8b9c0',
		statusIcon: <FieldTimeOutlined />,
		statusIconF: FieldTimeOutlined,
		statusPanelId: '04d98b77-f4c7-46ed-be25-b01b035027fd',
		color: '#e07c04',
	},
	{
		// устранен
		priorityId: '1f06e13f-b300-4d9e-93db-0e54e2370d5c',
		priorityIcon: <Four />,
		statusProcessId: '16f09a44-11fc-4f82-b7b5-1eb2e812d8fa',
		statusIcon: <MailOutlined />,
		statusIconF: MailOutlined,
		statusPanelId: '418406b1-8f78-4448-96e1-8caa022fe242',
		color: '#98B8E3',
	},
	{
		// подтвержден
		priorityId: '',
		// priorityIcon: <Four />,
		statusProcessId: '83b4bbf8-e1da-43d4-8e0d-a973a136eeaa',
		statusIcon: <CheckOutlined />,
		statusIconF: CheckOutlined,
		statusPanelId: '',
		color: '#686868',
	},
	{
		// возобновлен
		priorityId: '',
		// priorityIcon: <Four />,
		statusProcessId: '086d775e-f41b-4af6-86c8-31f340344f47',
		statusIcon: <CaretRightOutlined />,
		statusIconF: CaretRightOutlined,
		statusPanelId: '', // сюда вставить ID четвертого статуса, как он появится
		color: '#98B8E3',
	},
	{
		// на расммотрении
		priorityId: '',
		// priorityIcon: <Four />,
		statusProcessId: '',
		statusIcon: <QuestionOutlined />,
		statusIconF: QuestionOutlined,
		statusPanelId: '3252ec53-44a7-4cfd-ac24-650d85236bd2', // сюда вставить ID четвертого статуса, как он появится
		color: '#686868',
	},
];
/**
 * отображает иконку состояния для дефектов и проблем */
export const StatusIcon = ({keyToFind, statusId, title = ''}) => {
	const foundStatus =
		statusesConfig &&
		statusesConfig.find((status) => status[keyToFind] === statusId);

	if (foundStatus) {
		const StatusVariant = foundStatus.statusIconF;
		return (
			<Tooltip title={title}>
				<StatusVariant
					className={'statusIcon'}
					style={{color: foundStatus.color, cursor: 'help'}}
				/>
			</Tooltip>
		);
	} else return null;
};

export const customColumnProps = [
	// на данный момент оставлю так, если будет потребность в другом формате исправим
	{...code},
	{...dateTime('dateDetectDefect')},
	{...dateTime('dateEliminationPlan')},
	{...dateTime('dateEliminationFact')},
	{...checkBox('sendedToSap')},
	{...checkBox('viewOnPanel')},
	{...checkBox('kpi')},
	{
		name: 'statusProcessId',
		cellRenderer: ({rowData}) => (
			<StatusIcon
				keyToFind={'statusProcessId'}
				statusId={rowData.statusProcessId}
				title={rowData.statusProcessName}
			/>
		),
	},
	{
		name: 'statusPanelId',
		cellRenderer: ({rowData}) => (
			<StatusIcon
				keyToFind={'statusPanelId'}
				statusId={rowData.statusPanelId}
				title={rowData.statusPanelName}
			/>
		),
	},
	{
		//  в этой колонке истории использован custom SQL
		name: 'statusProcessName',
		cellRenderer: ({rowData}) => (
			<>
				<StatusIcon
					keyToFind={'statusProcessId'}
					statusId={rowData.status_process_id}
					title={rowData.statusProcessName}
				/>
				<span>{rowData.statusProcessName}</span>
			</>
			// <Radio.Group
			// 	defaultValue={rowData.statusProcessId}
			// 	size={'small'}
			// 	disabled
			// >
			// 	{statusesConfig &&
			// 		statusesConfig.map((el) => (
			// 			<Radio.Button
			// 				key={el.statusProcessId}
			// 				value={el.statusProcessId}
			// 			>
			// 				{el.statusIcon}
			// 			</Radio.Button>
			// 		))}
			// </Radio.Group>
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
					color: '#525254',
					padding: '10px',
					boxSizing: 'padding-box',
				}}
			/>
		),
	},
	// {
	//     name: 'statusPanelId',
	//     cellRenderer: ({cellData}) => {
	//         let statusIndicator = statusesConfig.find(
	//             (el) => el.statusPanelId === cellData
	//         );
	//         return statusIndicator ? (
	//             <div
	//                 style={{
	//                     width: 10,
	//                     height: 10,
	//                     background: `${statusIndicator.color}`,
	//                     borderRadius: '50%',
	//                 }}
	//             ></div>
	//         ) : (
	//             <div>Без статуса</div>
	//         );
	//     },
	// },
];
export const FilterPanel = () => {
	const history = useHistory();

	let historyChange = history
		? // history.location.pathname === '/control-defects/defects';
		  history.location.pathname === paths.CONTROL_DEFECTS_DEFECTS.path
		: null;

	return (
		<>
			<Space
				className={'p-8'}
				style={{
					justifyContent: 'space-between',
					alignItems: 'flex-end',
				}}
			>
				<Space
					style={{
						alignItems: 'flex-end',
					}}
				>
					<Space direction={'vertical'} className={'mr-8'}>
						<Text className={'mb-0'}>Период обнаружения</Text>
						<Space>
							<DatePicker
								itemProps={{
									name: 'dateDetectDefectStart',
									label: 'c',
									className: 'mb-0',
								}}
								dispatch={{
									path:
										'defects.defectTable.filter.detectStartDate',
								}}
								subscribe={[
									reloadFilterFields(
										'defects.defectTable.events.onReload'
									),
								]}
							/>
							<DatePicker
								itemProps={{
									name: 'dateDetectDefectEnd',
									label: 'по',
									className: 'mb-0',
								}}
								dispatch={{
									path:
										'defects.defectTable.filter.detectEndDate',
								}}
								subscribe={[
									reloadFilterFields(
										'defects.defectTable.events.onReload'
									),
								]}
							/>
						</Space>
					</Space>
					<Space direction={'vertical'} className={'mr-8'}>
						<Text className={'mb-0'}>Период устранения</Text>
						<Space>
							<DatePicker
								itemProps={{
									name: 'dateEliminationPlan',
									label: 'c',
									className: 'mb-0',
								}}
								dispatch={{
									path:
										'defects.defectTable.filter.eliminateStartDate',
								}}
								subscribe={[
									{
										name: 'startDate',
										path:
											'rtd.defects.defectTable.filter.eliminateEndDate',
										onChange: ({
											value,
											setSubscribeProps,
										}) => {
											setSubscribeProps({
												disabledDate: (startValue) =>
													disabledStartDate(
														startValue,
														value
													),
											});
										},
									},
									reloadFilterFields(
										'defects.defectTable.events.onReload'
									),
								]}
							/>
							<DatePicker
								itemProps={{
									name: 'dateEliminationFact',
									label: 'по',
									className: 'mb-0',
								}}
								dispatch={{
									path:
										'defects.defectTable.filter.eliminateEndDate',
								}}
								subscribe={[
									{
										name: 'endDate',
										path:
											'rtd.defects.defectTable.filter.eliminateStartDate',
										onChange: ({
											value,
											setSubscribeProps,
										}) => {
											setSubscribeProps({
												disabledDate: (endValue) =>
													disabledEndDate(
														value,
														endValue
													),
											});
										},
									},
									reloadFilterFields(
										'defects.defectTable.events.onReload'
									),
								]}
							/>
						</Space>
					</Space>
					<Space direction={'vertical'}>
						<Text className={'mb-0'}>Статус обработки</Text>
						<Select
							itemProps={{name: 'selectId'}}
							autoClearSearchValue={true}
							showSearch={true}
							searchParamName={'name'}
							showArrow={true}
							filterOption={false}
							widthControl={170}
							dropdownMatchSelectWidth={200}
							mode={'single'}
							allowClear={true}
							infinityMode={true}
							requestLoadRows={apiGetFlatDataByConfigName(
								historyChange
									? 'defectStatusesProcess'
									: 'panelProblemsStatuses'
							)}
							optionConverter={(option) => ({
								label: (
									<>
										<StatusIcon
											statusId={option.id}
											keyToFind={
												historyChange
													? 'statusProcessId'
													: 'statusPanelId'
											}
										/>{' '}
										<span className={'ml-8'}>
											{option.name}
										</span>
									</>
								),
								value: option.id,
								className: '',
								disabled: undefined,
							})}
							dispatch={{
								path: `defects.defectTable.filter.${
									historyChange
										? 'statusProcessId'
										: 'statusPanelId'
								}`,
							}}
							subscribe={[
								reloadFilterFields(
									'defects.defectTable.events.onReload'
								),
							]}
						/>
					</Space>
					{historyChange ? null : (
						<Space direction={'vertical'}>
							<Text>Приоритет</Text>
							<Select
								itemProps={{name: 'panelProblemPriority'}}
								autoClearSearchValue={true}
								showSearch={true}
								searchParamName={'name'}
								showArrow={true}
								filterOption={false}
								widthControl={170}
								dropdownMatchSelectWidth={200}
								mode={'single'}
								allowClear={true}
								infinityMode={true}
								placeholder={'Выберите приоритет'}
								requestLoadRows={apiGetFlatDataByConfigName(
									'panelProblemsPriorities'
								)}
								optionConverter={(option) => ({
									label: <span>{option.name}</span>,
									value: option.id,
									className: '',
									disabled: undefined,
								})}
								dispatch={{
									path:
										'defects.defectTable.filter.panelPriority',
								}}
								subscribe={[
									/**
									 * не работает очищение при 'multiple', надо будет продумать.
									 */
									reloadFilterFields(
										'defects.defectTable.events.onReload'
									),
								]}
							/>
						</Space>
					)}
				</Space>
				<Space
					style={{
						justifyContent: 'space-between',
					}}
				>
					<Button
						itemProps={{name: 'btnDefectFilterApply'}}
						type={'primary'}
						dispatch={{
							path: 'defects.defectTable.events.onApplyFilter',
							extraData: 'rtd.defects.defectTable.filter',
							type: 'event',
						}}
					>
						Применить
					</Button>
					<Button
						itemProps={{name: 'btnDefectFilterClear'}}
						dispatch={{
							path: 'defects.defectTable.events.onReload',
							type: 'event',
						}}
					>
						Сбросить
					</Button>
				</Space>
			</Space>
		</>
	);
};
/**
 * filterPanel, при изменении этого компонента не забыть сохранить names иначе не будет работать панель фильтрации
 *
 */
export const headerTable = (history) => {
	let historyChange =
		history.location.pathname === '/control-defects/defects';
	return [
		{
			componentType: 'Space',
			className: 'px-8 pt-8',
			style: {
				justifyContent: 'space-between',
			},
			children: [
				{
					componentType: 'Space',
					children: [
						/**
						 * изменить все модалки на функции
						 */
						editDefectCard(
							historyChange ? ' defects' : ' panelProblems'
						),
						buttonCloseWithNote(),
						...(historyChange
							? buttonSendToPanel
							: buttonSendToSap),
						// defectCardInfoModal(),
					],
				},
				{
					componentType: ' Space',
					children: [
						historyChange
							? {
									componentType: ' Item',
									child: {
										componentType: ' Button',
										label: ' Перейти в панель проблем',
										type: ' primary',
										onClick: () => {
											history.push(
												`${paths.CONTROL_DEFECTS_PANEL_PROBLEMS.path}`
											);
										},
									},
							  }
							: {
									componentType: ' Item',
									child: {
										componentType: ' Button',
										label: ' Перейти в журнал дефектов',
										type: ' primary',
										onClick: () => {
											history.push(
												`${paths.CONTROL_DEFECTS_DEFECTS.path}`
											);
										},
									},
							  },
						{
							componentType: ' Item',
							name: ' searchInput',
							child: {
								componentType: ' Search',
								placeholder: ' Введите наименование',
								dispatch: {
									path:
										' defects.defectTable.events.onSearch',
									// type: ' event',
								},
							},
						},
						...btnFilterSettings,
					],
				},
			],
		},
		{
			componentType: ' Item',
			child: {
				className: ' mt-8 mb-0',
				componentType: ' Divider',
			},
		},
		{
			componentType: ' Space',
			style: {
				justifyContent: ' space-between',
			},
			children: [
				{
					componentType: ' Space',
					className: ' p-8',
					children: [
						{
							componentType: ' Space',
							direction: ' vertical',
							children: [
								{
									componentType: ' Item',
									child: {
										componentType: ' Text',
										label: ' Период обнаружения',
									},
								},
								{
									componentType: ' Space',
									className: ' mb-0',
									children: [
										{
											componentType: ' Item',
											name: ' dateDetectDefectStart',
											label: ' c',
											className: ' mb-0',
											child: {
												componentType: ' DatePicker',
												dispatch: {
													path:
														' defects.defectTable.filter.detectStartDate',
												},
												subscribe: [
													{
														name: ' startDate',
														path:
															' rtd.defects.defectTable.filter.detectEndDate',
														onChange: ({
															value,
															setSubscribeProps,
														}) => {
															setSubscribeProps({
																disabledDate: (
																	startValue
																) =>
																	disabledStartDate(
																		startValue,
																		value
																	),
															});
														},
													},
													reloadFilterFields(
														' defects.defectTable.events.onReload'
													),
												],
											},
										},
										{
											componentType: ' Item',
											name: ' dateDetectDefectEnd',
											label: ' по',
											className: ' mb-0',
											child: {
												componentType: ' DatePicker',
												dispatch: {
													path:
														' defects.defectTable.filter.detectEndDate',
												},
												subscribe: [
													{
														name: ' endDate',
														path:
															' rtd.defects.defectTable.filter.detectStartDate',
														onChange: ({
															value,
															setSubscribeProps,
														}) => {
															setSubscribeProps({
																disabledDate: (
																	endValue
																) =>
																	disabledEndDate(
																		value,
																		endValue
																	),
															});
														},
													},
													reloadFilterFields(
														' defects.defectTable.events.onReload'
													),
												],
											},
										},
									],
								},
							],
						},
						{
							componentType: ' Space',
							direction: ' vertical',
							className: ' ml-8',
							children: [
								{
									componentType: ' Item',
									child: {
										componentType: ' Text',
										label: ' Период устранения',
									},
								},
								{
									componentType: ' Space',
									className: ' mb-0',
									children: [
										{
											componentType: ' Item',
											label: ' c',
											className: ' mb-0',
											name: ' dateEliminationPlan',
											child: {
												componentType: ' DatePicker',
												dispatch: {
													path:
														' defects.defectTable.filter.eliminateStartDate',
												},
												subscribe: [
													{
														name: ' startDate',
														path:
															' rtd.defects.defectTable.filter.eliminateEndDate',
														onChange: ({
															value,
															setSubscribeProps,
														}) => {
															setSubscribeProps({
																disabledDate: (
																	startValue
																) =>
																	disabledStartDate(
																		startValue,
																		value
																	),
															});
														},
													},
													reloadFilterFields(
														' defects.defectTable.events.onReload'
													),
												],
											},
										},
										{
											componentType: ' Item',
											label: ' по',
											className: ' mb-0',
											name: ' dateEliminationFact',
											child: {
												componentType: ' DatePicker',
												dispatch: {
													path:
														' defects.defectTable.filter.eliminateEndDate',
												},
												subscribe: [
													{
														name: ' endDate',
														path:
															' rtd.defects.defectTable.filter.eliminateStartDate',
														onChange: ({
															value,
															setSubscribeProps,
														}) => {
															setSubscribeProps({
																disabledDate: (
																	endValue
																) =>
																	disabledEndDate(
																		value,
																		endValue
																	),
															});
														},
													},
													reloadFilterFields(
														' defects.defectTable.events.onReload'
													),
												],
											},
										},
									],
								},
							],
						},
						{
							componentType: ' Space',
							direction: ' vertical',
							children: [
								{
									componentType: ' Item',
									child: {
										componentType: ' Text',
										label: ' Статус обработки',
									},
								},
								{
									componentType: ' Item',
									name: ' selectId',
									child: {
										componentType: ' Select',
										autoClearSearchValue: true,
										showSearch: true,
										searchParamName: ' name',
										showArrow: true,
										filterOption: false,
										widthControl: 170,
										dropdownMatchSelectWidth: 200,
										mode: ' single',
										allowClear: true,
										infinityMode: true,
										requestLoadRows: apiGetFlatDataByConfigName(
											historyChange
												? ' defectStatusesProcess'
												: ' panelProblemsStatuses'
										),
										optionConverter: (option) => ({
											label: <span>{option.name}</span>,
											value: option.id,
											className: '',
											disabled: undefined,
										}),

										dispatch: {
											path: `defects.defectTable.filter.${
												historyChange
													? ' statusProcessId'
													: ' statusPanelId'
											}`,
										},
										subscribe: [
											reloadFilterFields(
												' defects.defectTable.events.onReload'
											),
										],
									},
								},
							],
						},
						historyChange
							? {}
							: {
									componentType: ' Space',
									direction: ' vertical',
									children: [
										{
											componentType: ' Item',
											child: {
												componentType: ' Text',
												label: ' Приоритет',
											},
										},
										{
											componentType: ' Item',
											name: ' panelProblemPriority',
											child: {
												componentType: ' Select',
												autoClearSearchValue: true,
												showSearch: true,
												searchParamName: ' name',
												showArrow: true,
												filterOption: false,
												widthControl: 230,
												dropdownMatchSelectWidth: 200,
												mode: ' single', //' multiple'
												allowClear: true,
												infinityMode: true,
												placeholder:
													' Выберите приоритет',
												requestLoadRows: apiGetFlatDataByConfigName(
													' panelProblemsPriorities'
												),
												optionConverter: (option) => ({
													label: (
														<span>
															{option.name}
														</span>
													),
													value: option.id,
													className: '',
													disabled: undefined,
												}),
												dispatch: {
													path:
														' defects.defectTable.filter.panelPrioriry',
												},
												subscribe: [
													/**
													 * не работает очищение при ' multiple', надо будет продумать.
													 */
													reloadFilterFields(
														' defects.defectTable.events.onReload'
													),
												],
											},
										},
									],
							  },
					],
				},

				{
					componentType: ' Space',
					className: ' mt-8',
					children: [
						{
							componentType: ' Item',
							child: {
								componentType: ' Button',
								className: ' mt-16',
								label: ' Применить',
								type: ' primary',
								dispatch: {
									path:
										' defects.defectTable.events.onApplyFilter',
									extraData:
										' rtd.defects.defectTable.filter',
									type: ' event',
								},
							},
						},
						{
							componentType: ' Item',
							child: {
								componentType: ' Button',
								className: ' mt-16 mr-16',
								label: ' Сбросить',
								dispatch: {
									path:
										' defects.defectTable.events.onReload',
									type: ' event',
								},
							},
						},
					],
				},
			],
		},
		{
			componentType: ' Item',
			child: {
				className: ' mt-0 mb-8',
				componentType: ' Divider',
			},
		},
	];
};
