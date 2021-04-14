import {apiGetFlatDataByConfigName} from '../../../apis/catalog.api';
import {checkBox, date, dateTime} from '../../Base/customColumnProps';
import {classic} from 'rt-design';
import React from 'react';
import {AddDetour, EditDetour} from './Modals/SaveObjectModal';
import {CalendarOutlined, TableOutlined} from '@ant-design/icons';
import {
	disabledEndDate,
	disabledStartDate,
} from '../../Base/Functions/DateLimits';
import {reloadFilterFields} from '../../Base/Functions/ReloadField';
import {ViewDetour} from './Modals/ViewModal';
// import {DeleteDetour} from './Registry/Modals/DeleteObjectModal';

const {
	Space,
	Select,
	DatePicker,
	Button,
	Search,
	Divider,
	RadioGroup,
	Text,
	Switcher,
} = classic;

export const TableHeader = () => {
	return (
		<Space direction={'vertical'} className={'p-8'}>
			<Space style={{justifyContent: 'space-between', width: '100%'}}>
				<Space>
					<AddDetour />
					<EditDetour />
					{/*<DeleteDetour catalogName={'detours'} unique={'обхода'} />*/}
					<ViewDetour />
				</Space>
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
							path: 'detours.mainForm.table.events.viewMode',
						}}
					/>
					<Search
						itemProps={{name: 'searchInput'}}
						placeholder={'Введите наименование'}
						dispatch={{
							path: 'detours.mainForm.table.events.onSearch',
							// type: 'event',
						}}
						subscribe={[
							reloadFilterFields(
								'detours.mainForm.filter.events.onReload'
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
							infinityMode={true}
							widthControl={200}
							requestLoadRows={apiGetFlatDataByConfigName(
								'routes'
							)}
							optionConverter={(option) => ({
								value: option.id,
								label: option.name,
							})}
							dispatch={{
								path: 'detours.mainForm.filter.events.routeId',
							}}
							subscribe={[
								reloadFilterFields(
									'detours.mainForm.filter.events.onReload'
								),
								/** Action clear value*/
								reloadFilterFields(
									'detours.mainForm.table.events.viewMode'
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
							infinityMode={true}
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
								path: 'detours.mainForm.filter.events.staffId',
							}}
							subscribe={[
								reloadFilterFields(
									'detours.mainForm.filter.events.onReload'
								),
								/** Action clear value*/
								reloadFilterFields(
									'detours.mainForm.table.events.viewMode'
								),
							]}
						/>
					</Space>
					<Switcher
						subscribe={[
							{
								name: 'detourMainForm',
								path:
									'rtd.detours.mainForm.table.events.viewMode',
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
									format={'DD-MM-YYYY HH:mm:ss'}
									dispatch={{
										path:
											'detours.mainForm.filter.events.startDate',
									}}
									subscribe={[
										{
											name: 'finishDate',
											path:
												'rtd.detours.mainForm.filter.events.finishDate',
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
											'detours.mainForm.filter.events.onReload'
										),
									]}
								/>
								<DatePicker
									itemProps={{
										name: 'finishDate',
										label: 'по',
										className: 'mb-0',
									}}
									format={'DD-MM-YYYY HH:mm:ss'}
									dispatch={{
										path:
											'detours.mainForm.filter.events.finishDate',
									}}
									subscribe={[
										{
											name: 'startDate',
											path:
												'rtd.detours.mainForm.filter.events.startDate',
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
											'detours.mainForm.filter.events.onReload'
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
									path:
										'detours.mainForm.filter.events.month',
								}}
								subscribe={[
									{
										name: 'detourMainForm',
										path: 'rtd.detours.mainForm.calendar',
										onChange: ({
											value,
											setSubscribeProps,
										}) => {
											setSubscribeProps({value: value});
										},
									},
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
								path: 'detours.mainForm.table.onApplyFilter',
								extraData: 'rtd.detours.mainForm.filter.events',
								type: 'event',
							}}
						>
							Применить
						</Button>
						<Button
							dispatch={{
								path: 'detours.mainForm.filter.events.onReload',
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
