import React from 'react';
import {
	Space,
	Search,
	Button,
	Text,
	DatePicker,
	Divider,
	Tooltip,
	notificationError,
} from 'rt-design';
import {FileExcelOutlined, ReloadOutlined} from '@ant-design/icons';
import {reloadFilterFields} from '../Base/Functions/ReloadField';
import {disabledEndDate, disabledStartDate} from '../Base/Functions/DateLimits';
import {dateTimeExcludeSecond} from '../Base/customColumnProps';
import {genericDownloadRequest} from '../../apis/network';

export const TemplatesTableHeader = () => {
	return (
		<Search
			itemProps={{
				name: 'onSearch',
			}}
			style={{width: '100%'}}
			placeholder={'Введите наименование'}
			className={'py-8'}
			dispatch={{
				path: 'analytics.templatesTable.events.onSearch',
			}}
		/>
	);
};

export const HistoryTableHeader = () => {
	return (
		<>
			<Space className={'p-8'} direction={'vertical'}>
				<Space style={{width: '100%', justifyContent: 'flex-end'}}>
					<Button
						icon={<ReloadOutlined />}
						hidden={true}
						subscribe={[
							/** Action search activate btn*/
							{
								name: 'onSearchPush',
								path: `rtd.analytics.historyTable.events.onSearch`,
								onChange: ({value, setSubscribeProps}) => {
									value &&
										setSubscribeProps &&
										setSubscribeProps({hidden: !value});
								},
							},
							/** Action reload in mainForm.table deactivate btn*/
							{
								name: 'onReloadPush',
								path: `rtd.analytics.historyTable.rows`,
								onChange: ({value, setSubscribeProps}) => {
									/** We might thinking about ${path}.rows array length*/

									value &&
										value.length >=10 &&
										setSubscribeProps &&
										setSubscribeProps({hidden: value});
								},
							},
						]}
						dispatch={{
							path: `analytics.historyTable.events.onReload`,
						}}
					/>
					<Search
						itemProps={{
							name: 'onSearchAnalytics',
						}}
						placeholder={'Введите наименование'}
						dispatch={{
							path: 'analytics.historyTable.events.onSearch',
						}}
						subscribe={[
							/** Reload Search value field, clear STORE*/
							reloadFilterFields(
								'analytics.historyTable.events.onReload'
							),
						]}
					/>
				</Space>
				<Divider className={'mb-0 mt-0'} />
				<Space style={{width: '100%', justifyContent: 'space-between'}}>
					<Space direction={'vertical'} className={'mr-8'}>
						<Text className={'mb-0'}>Период дат</Text>
						<Space>
							<DatePicker
								itemProps={{
									name: 'dateStartHistory',
									label: 'c',
									className: 'mb-0',
								}}
								format={'DD.MM.YYYY'}
								onChange={(date, dateString) =>
									date?.startOf('day')
								}
								dispatch={{
									path: 'analytics.historyTable.data.dateStart',
								}}
								subscribe={[
									{
										name: 'startDate',
										path: 'rtd.analytics.historyTable.data.dateFinish',
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
										`analytics.historyTable.events.onReload`
									),
								]}
							/>

							<DatePicker
								itemProps={{
									name: 'dateFinishHistory',
									label: 'по',
									className: 'mb-0',
								}}
								format={'DD.MM.YYYY'}
								onChange={(date, dateString) =>
									date?.endOf('day')
								}
								dispatch={{
									path: `analytics.historyTable.data.dateFinish`,
								}}
								subscribe={[
									{
										name: 'endDate',
										path: `rtd.analytics.historyTable.data.dateStart`,
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
										`analytics.historyTable.events.onReload`
									),
								]}
							/>
						</Space>
					</Space>
					<Space
						className={'mt-16'}
						style={{
							justifyContent: 'space-between',
						}}
					>
						<Button
							itemProps={{name: 'btnFilterApply'}}
							type={'primary'}
							dispatch={{
								path: `analytics.historyTable.events.onApplyFilter`,
								extraData: `rtd.analytics.historyTable.data`,
								type: 'event',
							}}
						>
							Применить
						</Button>
						<Button
							itemProps={{name: 'btnFilterClear'}}
							dispatch={{
								path: `analytics.historyTable.events.onReload`,
								type: 'event',
							}}
						>
							Сбросить
						</Button>
					</Space>
				</Space>
			</Space>
		</>
	);
};

export const customColumnProps = [
	dateTimeExcludeSecond('ts'),
	{
		name: 'files',
		cellRenderer: ({rowData}) => {
			const onClickLoadFile = () => {
				genericDownloadRequest({
					url: `/api/dynamicdq/data/file/mobileFiles/${rowData.files?.excelId}`,
					method: 'GET',
				})
					.then((r) => console.log('onClickLoadFile', r))
					.catch((error) =>
						notificationError(error, 'Ошибка при получении')
					);
			};
			return (
				<>
					Данный отчет вы можете скачать тут:{' '}
					<Tooltip title={'Скачать'}>
						{' '}
						<Button
							onClick={onClickLoadFile}
							icon={<FileExcelOutlined />}
							type={'text'}
						/>
					</Tooltip>
				</>
			);
		},
	},
];
