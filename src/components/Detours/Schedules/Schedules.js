import React from 'react';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {Access, BasePage} from 'mobile-inspections-base-ui';
import {Form, Table, FormBody, Space, Search, Button} from 'rt-design';
import {AddDetourButton, EditDetourButton} from './Modals/EditModal';
import {DetourSchedulesView} from './Modals/ViewModal';
import {ReloadOutlined} from '@ant-design/icons';
import {reloadFilterFields} from '../../Base/Functions/ReloadField';
import {schedulesCustomColumn} from '../tableProps';

/***
 *
 * @returns {JSX.object}
 * @desc This is component to show repeat of detours by time.
 */
const Schedules = () => {
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
						customColumnProps={schedulesCustomColumn}
						dispatch={{path: 'detours.schedulesTable.table'}}
						subscribe={[
							/** Action add new event*/
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

export default Schedules;
