import {Rate, Radio} from 'antd';
import {
	CheckOutlined,
	MailOutlined,
	SettingOutlined,
	ThunderboltOutlined,
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
import {editDefectCard} from './Modals/defectEdit';
import {defectCardInfoModal} from './Modals/defectCardInfo';
import {
	disabledEndDate,
	disabledStartDate,
	reloadFilterFields,
} from '../Base/baseFunctions';

/**
 * в этом файле находятся конфигурации для главной таблицы в Defects.js
 *
 * statusesConfig любые изменеия для обработки нужно вносить сюда.
 *
 * customColumnProps изменеие отображения входных данных
 *
 * configFilterPanel общий вид панели для двух разделов, отображение меняется при помощи history
 */

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
					color: '#525254',
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
							historyChange ? 'defects' : 'panelProblems'
						),
						buttonCloseWithNote(),
						...(historyChange
							? buttonSendToPanel
							: buttonSendToSap),
						defectCardInfoModal(),
					],
				},
				{
					componentType: 'Space',
					children: [
						historyChange
							? {
									componentType: 'Item',
									child: {
										componentType: 'Button',
										label: 'Перейти в панель проблем',
										type: 'primary',
										onClick: () => {
											history.push(
												`${paths.CONTROL_DEFECTS_PANEL_PROBLEMS.path}`
											);
										},
									},
							  }
							: {
									componentType: 'Item',
									child: {
										componentType: 'Button',
										label: 'Перейти в журнал дефектов',
										type: 'primary',
										onClick: () => {
											history.push(
												`${paths.CONTROL_DEFECTS_DEFECTS.path}`
											);
										},
									},
							  },
						{
							componentType: 'Item',
							name: 'searchInput',
							child: {
								componentType: 'Search',
								placeholder: 'Введите наименование',
								dispatch: {
									path: 'defects.defectTable.events.onSearch',
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
			componentType: 'Item',
			child: {
				className: 'mt-8 mb-0',
				componentType: 'Divider',
			},
		},
		{
			componentType: 'Space',
			style: {
				justifyContent: 'space-between',
			},
			children: [
				{
					componentType: 'Space',
					className: 'p-8',
					children: [
						{
							componentType: 'Space',
							direction: 'vertical',
							children: [
								{
									componentType: 'Item',
									child: {
										componentType: 'Text',
										label: 'Период обнаружения',
									},
								},
								{
									componentType: 'Space',
									className: 'mb-0',
									children: [
										{
											componentType: 'Item',
											name: 'dateDetectDefectStart',
											label: 'c',
											className: 'mb-0',
											child: {
												componentType: 'DatePicker',
												dispatch: {
													path:
														'defects.defectTable.filter.detectStartDate',
												},
												subscribe: [
													{
														name: 'startDate',
														path:
															'rtd.defects.defectTable.filter.detectEndDate',
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
														'defects.defectTable.events.onReload'
													),
												],
											},
										},
										{
											componentType: 'Item',
											name: 'dateDetectDefectEnd',
											label: 'по',
											className: 'mb-0',
											child: {
												componentType: 'DatePicker',
												dispatch: {
													path:
														'defects.defectTable.filter.detectEndDate',
												},
												subscribe: [
													{
														name: 'endDate',
														path:
															'rtd.defects.defectTable.filter.detectStartDate',
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
														'defects.defectTable.events.onReload'
													),
												],
											},
										},
									],
								},
							],
						},
						{
							componentType: 'Space',
							direction: 'vertical',
							className: 'ml-8',
							children: [
								{
									componentType: 'Item',
									child: {
										componentType: 'Text',
										label: 'Период устранения',
									},
								},
								{
									componentType: 'Space',
									className: 'mb-0',
									children: [
										{
											componentType: 'Item',
											label: 'c',
											className: 'mb-0',
											name: 'dateEliminationPlan',
											child: {
												componentType: 'DatePicker',
												dispatch: {
													path:
														'defects.defectTable.filter.eliminateStartDate',
												},
												subscribe: [
													{
														name: 'startDate',
														path:
															'rtd.defects.defectTable.filter.eliminateEndDate',
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
														'defects.defectTable.events.onReload'
													),
												],
											},
										},
										{
											componentType: 'Item',
											label: 'по',
											className: 'mb-0',
											name: 'dateEliminationFact',
											child: {
												componentType: 'DatePicker',
												dispatch: {
													path:
														'defects.defectTable.filter.eliminateEndDate',
												},
												subscribe: [
													{
														name: 'endDate',
														path:
															'rtd.defects.defectTable.filter.eliminateStartDate',
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
														'defects.defectTable.events.onReload'
													),
												],
											},
										},
									],
								},
							],
						},
						{
							componentType: 'Space',
							direction: 'vertical',
							children: [
								{
									componentType: 'Item',
									child: {
										componentType: 'Text',
										label: 'Статус обработки',
									},
								},
								{
									componentType: 'Item',
									name: 'selectId',
									child: {
										componentType: 'Select',
										autoClearSearchValue: true,
										showSearch: true,
										searchParamName: 'name',
										showArrow: true,
										filterOption: false,
										widthControl: 230,
										dropdownMatchSelectWidth: 200,
										mode: 'single',
										allowClear: true,
										infinityMode: true,
										requestLoadRows: apiGetFlatDataByConfigName(
											historyChange
												? 'defectStatusesProcess'
												: 'panelProblemsStatuses'
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
													? 'statusProcessId'
													: 'statusPanelId'
											}`,
										},
										subscribe: [
											reloadFilterFields(
												'defects.defectTable.events.onReload'
											),
										],
									},
								},
							],
						},
						historyChange
							? {}
							: {
									componentType: 'Space',
									direction: 'vertical',
									children: [
										{
											componentType: 'Item',
											child: {
												componentType: 'Text',
												label: 'Приоритет',
											},
										},
										{
											componentType: 'Item',
											name: 'panelProblemPriority',
											child: {
												componentType: 'Select',
												autoClearSearchValue: true,
												showSearch: true,
												searchParamName: 'name',
												showArrow: true,
												filterOption: false,
												widthControl: 230,
												dropdownMatchSelectWidth: 200,
												mode: 'single', //'multiple'
												allowClear: true,
												infinityMode: true,
												placeholder:
													'Выберите приоритет',
												requestLoadRows: apiGetFlatDataByConfigName(
													'panelProblemsPriorities'
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
														'defects.defectTable.filter.panelPrioriry',
												},
												subscribe: [
													/**
													 * не работает очищение при 'multiple', надо будет продумать.
													 */
													reloadFilterFields(
														'defects.defectTable.events.onReload'
													),
												],
											},
										},
									],
							  },
					],
				},

				{
					componentType: 'Space',
					className: 'mt-8',
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Button',
								className: 'mt-16',
								label: 'Применить',
								type: 'primary',
								dispatch: {
									path:
										'defects.defectTable.events.onApplyFilter',
									extraData: 'rtd.defects.defectTable.filter',
									type: 'event',
								},
							},
						},
						{
							componentType: 'Item',
							child: {
								componentType: 'Button',
								className: 'mt-16 mr-16',
								label: 'Сбросить',
								dispatch: {
									path: 'defects.defectTable.events.onReload',
									type: 'event',
								},
							},
						},
					],
				},
			],
		},
		{
			componentType: 'Item',
			child: {
				className: 'mt-0 mb-8',
				componentType: 'Divider',
			},
		},
	];
};
