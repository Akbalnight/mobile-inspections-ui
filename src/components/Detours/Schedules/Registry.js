import React from 'react';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {Access, BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {AddDetourButton, EditDetourButton} from './Modals/EditModal';
import {dateTime} from '../../Base/customColumnProps';
import {DetourSchedulesView} from './Modals/ViewModal';
import {ReloadOutlined} from '@ant-design/icons';
import {reloadFilterFields} from '../../Base/Functions/ReloadField';

const {Form, Table, FormBody, Space, Search, Button} = classic;

const columnProps = [
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

const Registry = () => {
	return (
		<BasePage>
			<Form>
				<FormBody noPadding={true} scrollable={false}>
					<Space
						style={{justifyContent: 'space-between'}}
						className={'p-8'}
					>
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
										path:
											'rtd.detours.schedulesTable.table.events.onSearch',
										onChange: ({
											value,
											setSubscribeProps,
										}) => {
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
										path:
											'rtd.detours.schedulesTable.table.rows',
										onChange: ({
											value,
											setSubscribeProps,
										}) => {
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
									path:
										'detours.schedulesTable.table.events.onReload',
								}}
							/>
							<Search
								itemProps={{name: 'onSearch'}}
								placeholder={'Введите наименование'}
								dispatch={{
									path:
										'detours.schedulesTable.table.events.onSearch',
								}}
								subscribe={[
									/** Reload Search value field, clear STORE*/
									reloadFilterFields(
										'detours.schedulesTable.table.events.onReload'
									),
								]}
							/>
						</Space>
					</Space>
					<Table
						infinityMode={true}
						fixWidthColumn={true}
						searchParamName={'name'}
						requestLoadRows={apiGetFlatDataByConfigName(
							'repeaters'
						)}
						requestLoadConfig={apiGetConfigByName('repeaters')}
						customColumnProps={columnProps}
						dispatch={{path: 'detours.schedulesTable.table'}}
						subscribe={[
							{
								name: 'onEditModal',
								path:
									'rtd.detours.schedulesTable.table.events.onEditModal',
								onChange: ({reloadTable}) => reloadTable({}),
							},
							/** Action search*/
							{
								name: 'onSearch',
								path:
									'rtd.detours.schedulesTable.table.events.onSearch',
								onChange: ({value, reloadTable}) => {
									reloadTable({
										searchValue: value,
									});
								},
							},
							/** Action reload*/
							{
								name: 'onReload',
								path:
									'rtd.detours.schedulesTable.table.events.onReload',
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},
						]}
					/>
				</FormBody>
			</Form>
		</BasePage>
	);
};

export default Registry;
