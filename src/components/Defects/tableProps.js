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
	SearchOutlined,
} from '@ant-design/icons';
import {checkBox, code, dateTime} from '../Base/customColumnProps';
import {ReactComponent as One} from '../../imgs/defects/priority/one.svg';
import {ReactComponent as Two} from '../../imgs/defects/priority/two.svg';
import {ReactComponent as Three} from '../../imgs/defects/priority/three.svg';
import {ReactComponent as Four} from '../../imgs/defects/priority/four.svg';
import {apiGetFlatDataByConfigName} from '../../apis/catalog.api';
import {paths} from '../../constants/paths';
import {
	Space,
	Text,
	DatePicker,
	Select,
	Button,
	Input,
	Divider,
} from 'rt-design';
import {disabledEndDate, disabledStartDate} from '../Base/Functions/DateLimits';
import {useHistory} from 'react-router';
import {reloadFilterFields} from '../Base/Functions/ReloadField';
import {EditDefectCard} from './Registry/Modals/SaveObjectModal';
import {ButtonSendToSap} from './Registry/Modals/ActionButtons';
import {DefectCardInfoModal} from './Registry/Modals/ViewModal';
import {Access} from 'mobile-inspections-base-ui';

/**
 * в этом файле находятся конфигурации для главной таблицы в Defects.js
 *
 * statusesConfig любые изменеия для обработки нужно вносить сюда.
 *
 * customColumnProps изменеие отображения входных данных
 *
 * configFilterPanel общий вид панели для двух разделов, отображение меняется при помощи history
 */

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

/** не очень элегантно */
export const GetCurrentMode = () => {
	const history = useHistory();
	return history.location.pathname === paths.CONTROL_DEFECTS_DEFECTS.path
		? 'defects'
		: 'panelProblems';
};

export const MainTableHeader = () => {
	const history = useHistory();
	const currentMode = GetCurrentMode();
	return (
		<>
			<Access
				roles={[
					'ROLE_MI_DETOURS_RESP',
					'ROLE_MI_DETOURS_APPROVER',
					'ROLE_MI_DETOUR_SCHEDULES_APPROVER',
					'ROLE_MI_DETOUR_SCHEDULES_RESP',
					'ROLE_MI_DETOUR_SCHEDULES_APPROVER',
				]}
			>
				<Space
					style={{justifyContent: 'space-between'}}
					className={'p-8'}
				>
					{currentMode === 'defects' ? (
						<Button
							label={'Перейти в панель проблем'}
							type={'primary'}
							onClick={() => {
								history.push(
									`${paths.CONTROL_DEFECTS_PANEL_PROBLEMS.path}`
								);
							}}
						/>
					) : (
						<Button
							label={'Перейти в журнал дефектов'}
							type={'primary'}
							onClick={() => {
								history.push(
									`${paths.CONTROL_DEFECTS_DEFECTS.path}`
								);
							}}
						/>
					)}
					<div className={'asSearch'}>
						<Input
							style={{marginRight: 0}}
							// т.к. есть кнопка submit ниже - обработка enter не требуется
							// будет срабатывать событие отправки формы = клик на кнопку
							// но, вероятно, отправка будет производиться по enter в любом текстовом поле - проверить
							// onKeyPress={(e) => {
							//
							//     if (e.keyCode === 13) {
							//         searchBtn.current.click();
							//     }
							// }}
							itemProps={{name: 'defectsSearchInput'}}
							placeholder={'Поиск по оборудованию'}
							subscribe={[
								reloadFilterFields(
									'defects.defectTable.events.onReload'
								),
							]}
							dispatch={{
								path: 'defects.defectTable.events.searchValue',
							}}
						/>
						<Button
							itemProps={{
								name: 'defectsSearchButton',
							}}
							icon={<SearchOutlined />}
							type={'default'}
							htmlType={'submit'}
							dispatch={{
								path: 'defects.defectTable.events.onBtnSearch',
							}}
						/>
					</div>
				</Space>
			</Access>
			<Access
				roles={[
					'ROLE_MI_SHIFT_SUPERVISOR',
					'ROLE_ADMIN',
					'ROLE_MI_ADMIN',
				]}
			>
				<Space
					className={'p-8'}
					style={{
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					<Space>
						<EditDefectCard catalogName={currentMode} />
						{currentMode === 'defects' ? <ButtonSendToSap /> : null}
						<DefectCardInfoModal />
					</Space>
					<Space style={{justifyContent: 'flex-end'}}>
						{currentMode === 'defects' ? (
							<Button
								label={'Перейти в панель проблем'}
								type={'primary'}
								onClick={() => {
									history.push(
										`${paths.CONTROL_DEFECTS_PANEL_PROBLEMS.path}`
									);
								}}
								dispatch={{
									path: 'defects.defectTable.events.onReload',
									type: 'event',
								}}
							/>
						) : (
							<Button
								label={'Перейти в журнал дефектов'}
								type={'primary'}
								onClick={() => {
									history.push(
										`${paths.CONTROL_DEFECTS_DEFECTS.path}`
									);
								}}
								dispatch={{
									path: 'defects.defectTable.events.onReload',
									type: 'event',
								}}
							/>
						)}
						<div className={'asSearch'}>
							<Input
								style={{marginRight: 0}}
								// т.к. есть кнопка submit ниже - обработка enter не требуется
								// будет срабатывать событие отправки формы = клик на кнопку
								// но, вероятно, отправка будет производиться по enter в любом текстовом поле - проверить
								// onKeyPress={(e) => {
								//
								//     if (e.keyCode === 13) {
								//         searchBtn.current.click();
								//     }
								// }}
								itemProps={{name: 'defectsSearchInput'}}
								placeholder={'Поиск по оборудованию'}
								subscribe={[
									reloadFilterFields(
										'defects.defectTable.events.onReload'
									),
								]}
								dispatch={{
									path: 'defects.defectTable.events.searchValue',
								}}
							/>
							<Button
								// ref={searchBtn}
								itemProps={{
									name: 'defectsSearchButton',
								}}
								icon={<SearchOutlined />}
								type={'default'}
								htmlType={'submit'}
								// event?
								dispatch={{
									path: 'defects.defectTable.events.onBtnSearch',
								}}
							/>
						</div>
					</Space>
				</Space>
			</Access>
			<Divider className={'mt-0 mb-0'} />
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
								onChange={(date, dateString) =>
									date?.startOf('day')
								}
								dispatch={{
									path: 'defects.defectTable.filter.detectStartDate',
								}}
								subscribe={[
									{
										name: 'startDate',
										path: 'rtd.defects.defectTable.filter.detectEndDate',
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
									name: 'dateDetectDefectEnd',
									label: 'по',
									className: 'mb-0',
								}}
								onChange={(date, dateString) =>
									date?.endOf('day')
								}
								dispatch={{
									path: 'defects.defectTable.filter.detectEndDate',
								}}
								subscribe={[
									{
										name: 'endDate',
										path: 'rtd.defects.defectTable.filter.detectStartDate',
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
					<Space direction={'vertical'} className={'mr-8'}>
						<Text className={'mb-0'}>Период устранения</Text>
						<Space>
							<DatePicker
								itemProps={{
									name: 'dateEliminationPlan',
									label: 'c',
									className: 'mb-0',
								}}
								onChange={(date, dateString) =>
									date?.startOf('day')
								}
								dispatch={{
									path: 'defects.defectTable.filter.eliminateStartDate',
								}}
								subscribe={[
									{
										name: 'startDate',
										path: 'rtd.defects.defectTable.filter.eliminateEndDate',
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
								onChange={(date, dateString) =>
									date?.endOf('day')
								}
								dispatch={{
									path: 'defects.defectTable.filter.eliminateEndDate',
								}}
								subscribe={[
									{
										name: 'endDate',
										path: 'rtd.defects.defectTable.filter.eliminateStartDate',
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
							requestLoadRows={apiGetFlatDataByConfigName(
								currentMode === 'defects'
									? 'defectStatusesProcess'
									: 'panelProblemsStatuses'
							)}
							optionConverter={(option) => ({
								label: (
									<>
										<StatusIcon
											statusId={option.id}
											keyToFind={
												currentMode === 'defects'
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
							})}
							dispatch={{
								path: `defects.defectTable.filter.${
									currentMode === 'defects'
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
					{currentMode === 'defects' ? null : (
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
								placeholder={'Выберите приоритет'}
								requestLoadRows={apiGetFlatDataByConfigName(
									'panelProblemsPriorities'
								)}
								optionConverter={(option) => ({
									label: <span>{option.name}</span>,
									value: option.id,
								})}
								dispatch={{
									path: 'defects.defectTable.filter.panelPriority',
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

export const customColumnProps = [
	// на данный момент оставлю так, если будет потребность в другом формате исправим
	{...code},
	{...dateTime('dateDetectDefect')},
	{...dateTime('dateEliminationPlan')},
	{...dateTime('dateEliminationFact')},
	{...dateTime('ts')}, // специально для истории изменений дефектов (в конфиге custom SQL)
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
					statusId={rowData.statusProcessId}
					title={rowData.statusProcessName}
				/>
				<span>{rowData.statusProcessName}</span>
			</>
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
];

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
