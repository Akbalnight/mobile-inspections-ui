import {apiGetFlatDataByConfigName} from '../../apis/catalog.api';
import {checkBox, code, date} from '../Base/customColumnProps';
import {classic} from 'rt-design';
import React from 'react';
import {AddDetour, EditDetour} from './Registry/Modals/SaveObjectModal';
import {CalendarOutlined, TableOutlined} from '@ant-design/icons';
import {disabledEndDate, disabledStartDate} from '../Base/Functions/DateLimits';
import {reloadFilterFields} from '../Base/Functions/ReloadField';
import {ViewDetour} from './Registry/Modals/ViewModal';

const {
	Space,
	Select,
	DatePicker,
	Button,
	Search,
	Divider,
	RadioGroup,
	Text,
} = classic;

export const TableHeader = () => {
	return (
		<Space direction={'vertical'} className={'p-8'}>
			<Space style={{justifyContent: 'space-between', width: '100%'}}>
				<Space>
					<AddDetour />
					<EditDetour />
					<ViewDetour />
				</Space>
				<Space className={'mr-8'}>
					<RadioGroup
						itemProps={{name: 'viewMode'}}
						optionType={'button'}
						size={'middle'}
						defaultValue={0}
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
							type: 'event',
						}}
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
									'detour.mainForm.filter.events.onReload'
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
									'detour.mainForm.filter.events.onReload'
								),
							]}
						/>
					</Space>
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
												disabledDate: (startValue) =>
													disabledStartDate(
														startValue,
														value
													),
											});
										},
									},
									reloadFilterFields(
										'detour.mainForm.filter.events.onReload'
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
										'detour.mainForm.filter.events.onReload'
									),
								]}
							/>
						</Space>
					</Space>
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
								path: 'detours.mainForm.filter.onApplyFilter',
								extraData: 'rtd.detours.mainForm.filter.events',
								type: 'event',
							}}
						>
							Применить
						</Button>
						<Button
							dispatch={{
								path: 'detour.mainForm.filter.events.onReload',
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
	{...code},
	{...date('dateStartPlan')},
	{...checkBox('saveOrderControlPoints')},
	{...checkBox('equipmentStop')},
	{...checkBox('needInputData')},
	{...checkBox('increasedDanger')},
];
