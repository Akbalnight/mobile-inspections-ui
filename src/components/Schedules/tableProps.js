import {dateTime} from '../Base/customColumnProps';
import {Access} from 'mobile-inspections-base-ui';
import {Button, Search, Space} from 'rt-design';
import {
	AddDetourButton,
	EditDetourButton,
} from './Registry/Modals/SaveObjectModal';
import {DetourSchedulesView} from './Registry/Modals/ViewModal';
import {ReloadOutlined} from '@ant-design/icons';
import {reloadFilterFields} from '../Base/Functions/ReloadField';
import React from 'react';

export const schedulesCustomColumn = [
	{
		name: 'interval',
		cellRenderer: ({rowData, cellData}) => {
			let period =
				cellData > 1 ? rowData.periodName + 's' : rowData.periodName;

			return cellData + ' ' + period;
		},
	},
	{...dateTime('dateStart')},
	{...dateTime('nextExecution')},
	{...dateTime('dateFinish')},
];

export const SchedulesTableHeader = () => {
	return (
		<Space style={{justifyContent: 'space-between'}} className={'p-8'}>
			<Access
				roles={[
					'ROLE_ADMIN',
					'ROLE_MI_ADMIN',
					'ROLE_MI_SHIFT_SUPERVISOR',
					'ROLE_MI_DETOUR_SCHEDULES_CREATOR',
				]}
			>
				<Space>
					<Access
						roles={[
							'ROLE_ADMIN',
							'ROLE_MI_ADMIN',
							'ROLE_MI_DETOUR_SCHEDULES_CREATOR',
						]}
					>
						<AddDetourButton />
					</Access>
					<EditDetourButton />
				</Space>
			</Access>
			<DetourSchedulesView />
			<Space>
				<Button
					icon={<ReloadOutlined />}
					hidden={true}
					type={'primary'}
					subscribe={[
						/** Action search activate btn*/
						{
							name: 'onSearchPush',
							path: 'rtd.schedules.table.events.onSearch',
							onChange: ({value, setSubscribeProps}) => {
								value &&
									setSubscribeProps &&
									setSubscribeProps({
										hidden: !value,
									});
							},
						},
						/** Action reload in mainForm.table deactivate btn*/
						{
							name: 'onReloadPush',
							path: 'rtd.schedules.table.rows',
							onChange: ({value, setSubscribeProps}) => {
								/** We might thinking about ${path}.rows array length*/

								value &&
									value.length >= 4 &&
									setSubscribeProps &&
									setSubscribeProps({
										hidden: value,
									});
							},
						},
					]}
					dispatch={{
						path: 'schedules.table.events.onReload',
					}}
				/>
				<Search
					itemProps={{name: 'onSearch'}}
					placeholder={'Введите наименование'}
					dispatch={{
						path: 'schedules.table.events.onSearch',
					}}
					subscribe={[
						/** Reload Search value field, clear STORE*/
						reloadFilterFields('schedules.table.events.onReload'),
					]}
				/>
			</Space>
		</Space>
	);
};
