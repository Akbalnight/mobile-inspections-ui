import {apiGetFlatDataByConfigName} from '../../apis/catalog.api';
import {checkBox, date, dateTime} from '../Base/customColumnProps';
import {
	Space,
	Select,
	DatePicker,
	Button,
	Search,
	Divider,
	RadioGroup,
	Text,
	Switcher,
} from 'rt-design';
import React from 'react';
import {AddDetour, EditDetour} from './Registry/Modals/SaveObjectModal';
import {CalendarOutlined, TableOutlined} from '@ant-design/icons';
import {disabledEndDate, disabledStartDate} from '../Base/Functions/DateLimits';
import {reloadFilterFields} from '../Base/Functions/ReloadField';
import {ViewDetour} from './Registry/Modals/ViewModal';
import {Access} from 'mobile-inspections-base-ui';

export const DetoursMainTableHeader = () => {
	return (
		<Space direction={'vertical'} className={'p-8'}>
			<Space style={{justifyContent: 'space-between', width: '100%'}}>
				{/** Show modals for this roles*/}
				<Access
					roles={[
						'ROLE_ADMIN',
						'ROLE_MI_ADMIN',
						'ROLE_MI_SHIFT_SUPERVISOR',
					]}
				>
					<Space>
						<AddDetour />
						<EditDetour />
					</Space>
				</Access>
				<ViewDetour />
				<Space className={'mr-8'}>
					<RadioGroup
						itemProps={{name: 'viewMode', initialValue: 0}}
						optionType={'button'}
						size={'middle'}
						options={[
							{
								label: <TableOutlined />,
								value: 0,
							},
							{
								label: <CalendarOutlined />,
								value: 1,
							},
						]}
						dispatch={{
							path: 'detours.table.events.viewMode',
						}}
					/>
					<Search
						itemProps={{name: 'searchInput'}}
						placeholder={'Введите наименование'}
						dispatch={{
							path: 'detours.table.events.onSearch',
						}}
						subscribe={[
							reloadFilterFields(
								'detours.table.events.onReload',
								'reset'
							),
						]}
					/>
				</Space>
			</Space>
			<Divider className={'my-0'} />
			<Space style={{justifyContent: 'space-between', width: '100%'}}>
				<Space>
					<Space direction={'vertical'} className={'ml-8'}>
						<Text label={'Маршрут:'} />
						<Select
							itemProps={{name: 'routeId'}}
							placeholder={'Выберите маршрут'}
							mode={'single'}
							allowClear={true}
							showSearch={true}
							filterOption={false}
							searchParamName={'name'}
							widthControl={200}
							requestLoadRows={apiGetFlatDataByConfigName(
								'routes'
							)}
							optionConverter={(option) => ({
								value: option.id,
								label: option.name,
							})}
							dispatch={{
								path: 'detours.table.data.routeId',
							}}
							subscribe={[
								reloadFilterFields(
									'detours.table.events.onReload'
								),
								/** Action clear value*/
								reloadFilterFields(
									'detours.table.events.viewMode',
									'calendar'
								),
							]}
						/>
					</Space>
					<Space direction={'vertical'} className={'ml-8'}>
						<Text label={'Исполнитель:'} />
						<Select
							itemProps={{name: 'staffId'}}
							placeholder={'Выберите исполнителя'}
							mode={'single'}
							allowClear={true}
							showSearch={true}
							filterOption={false}
							widthControl={200}
							searchParamName={'username'}
							requestLoadRows={apiGetFlatDataByConfigName(
								'staff'
							)}
							optionConverter={(option) => ({
								value: option.id,
								label: option.username,
							})}
							dispatch={{
								path: 'detours.table.data.staffId',
							}}
							subscribe={[
								/** Action clear value*/
								reloadFilterFields(
									'detours.table.events.viewMode',
									'calendar'
								),
								reloadFilterFields(
									'detours.table.events.onReload'
								),
							]}
						/>
					</Space>
					<Switcher
						subscribe={[
							{
								name: 'detourMainForm',
								path: 'rtd.detours.table.events.viewMode',
								onChange: ({value, setSubscribeProps}) => {
									setSubscribeProps({value: value});
								},
							},
						]}
					>
						<Space direction={'vertical'}>
							<Text label={'Период:'} className={'ml-16'} />
							<Space className={'ml-8'}>
								<DatePicker
									itemProps={{
										name: 'startDate',
										label: 'с',
										className: 'mb-0',
									}}
									format={'DD.MM.YYYY'}
									onChange={(date, dateString) =>
										date?.startOf('day')
									}
									dispatch={{
										path: 'detours.table.data.startDate',
									}}
									subscribe={[
										{
											name: 'finishDate',
											path: 'rtd.detours.table.data.finishDate',
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
											'detours.table.events.onReload'
										),
										reloadFilterFields(
											'detours.table.events.viewMode',
											'calendar'
										),
									]}
								/>
								<DatePicker
									itemProps={{
										name: 'finishDate',
										label: 'по',
										className: 'mb-0',
									}}
									format={'DD.MM.YYYY'}
									onChange={(date, dateString) =>
										date?.endOf('day')
									}
									dispatch={{
										path: 'detours.table.data.finishDate',
									}}
									subscribe={[
										{
											name: 'startDate',
											path: 'rtd.detours.table.data.startDate',
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
											'detours.table.events.onReload'
										),
										reloadFilterFields(
											'detours.table.events.viewMode',
											'calendar'
										),
									]}
								/>
							</Space>
						</Space>
						<Space direction={'vertical'}>
							<Text label={'Месяц:'} />
							<DatePicker
								itemProps={{name: 'month'}}
								format={'MMM YYYY'}
								picker='month'
								dispatch={{
									path: 'detours.table.data.month',
								}}
								subscribe={[
									{
										name: 'detourMainForm',
										path: 'rtd.detours.calendar',
										onChange: ({
											value,
											setSubscribeProps,
										}) => {
											setSubscribeProps({value: value});
										},
									},
									reloadFilterFields(
										'detours.table.events.onReload'
									),
									reloadFilterFields(
										'detours.table.events.viewMode',
										'calendar'
									),
								]}
							/>
						</Space>
					</Switcher>
				</Space>
				<Space
					direction={'vertical'}
					style={{justifyContent: 'space-between'}}
					className={'mr-8'}
				>
					<Text
						label={'Период:'}
						itemProps={{hidden: true}}
						hidden={true}
					/>
					<Space>
						<Button
							className={'mt-4'}
							type={'primary'}
							dispatch={{
								path: 'detours.table.events.onApplyFilter',
								extraData: 'rtd.table.data',
								type: 'event',
							}}
						>
							Применить
						</Button>
						<Button
							dispatch={{
								path: 'detours.table.events.onReload',
								type: 'event',
							}}
						>
							Сбросить
						</Button>
					</Space>
				</Space>
			</Space>
		</Space>
	);
};

export const customColumnProps = [
	{...date('dateStartPlan')},
	{...date('dateFinishPlan')},
	{...date('dateDetectDefect')},
	{...date('dateEliminationPlan')},
	{...dateTime('dateDetectDefect')},
	{...checkBox('saveOrderControlPoints')},
	{...checkBox('equipmentStop')},
	{...checkBox('needInputData')},
	{...checkBox('increasedDanger')},
	{...checkBox('viewOnPanel')},
	{...checkBox('kpi')},
	{
		name: 'description',
		hidden: true,
	},
	{
		name: 'sendedToSap',
		hidden: true,
	},
	{
		name: 'code',
		hidden: true,
	},
	{
		name: 'sapStatusCode',
		hidden: true,
	},
	{
		name: 'staffEliminationName',
		hidden: true,
	},
	{
		name: 'note',
		hidden: true,
	},
	{
		name: 'dateEliminationFact',
		hidden: true,
	},
	{
		name: 'equipmentName',
		hidden: true,
	},
	{
		name: 'actionDescription',
		hidden: true,
	},
	{
		name: 'actionPlan',
		hidden: true,
	},
	{
		name: 'descriptionCauses',
		hidden: true,
	},
];
