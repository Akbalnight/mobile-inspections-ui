import {
	AddCustomObjectOnServer,
	EditCustomObjectOnServer,
} from './Modals/CustomObjectOnServer';
import {
	AddCustomGroupOnServer,
	EditCustomGroupOnServer,
} from './Modals/CustomGroupOnServer';
import {DeleteOnServer} from './Modals/DeleteOnServer';
import {CustomObjectView} from './Modals/CustomObjectView';
import {CustomGroupView} from './Modals/CustomGroupView';
import {
	AddDefaultObjectOnServer,
	EditDefaultObjectOnServer,
} from './Modals/DefaultObjectOnServer';
import {DefaultObjectView} from './Modals/DefaultObjectView';
import React from 'react';
import {Row, Search, Space, Button} from 'rt-design';
import {Access} from 'mobile-inspections-base-ui';
import {ReloadOutlined} from '@ant-design/icons';
import {reloadFilterFields} from './Functions/ReloadField';

/**
 *
 * @param mainWay name of server configuration
 * @param catalogName name of server configuration
 * @param unique phrase on Russian
 * @returns {JSX.object}
 * @desc Function choice table header buttons(action modals) and view modals
 */

export const TableHeader = ({mainWay, catalogName, unique}) => {
	const configCatalogName = (catalogName) => {
		switch (catalogName) {
			case 'equipments':
			case 'defectTypical':
				return (
					<>
						{/** Show modals for this roles*/}
						<Access
							roles={[
								'ROLE_ADMIN',
								'ROLE_MI_ADMIN',
								'ROLE_MI_SHIFT_SUPERVISOR',
								'ROLE_MI_DETOURS_CREATOR',
							]}
						>
							<AddCustomObjectOnServer
								mainWay={mainWay}
								catalogName={catalogName}
								unique={unique}
							/>
							<AddCustomGroupOnServer
								mainWay={mainWay}
								catalogName={catalogName}
								unique={unique}
							/>
							<EditCustomObjectOnServer
								mainWay={mainWay}
								catalogName={catalogName}
								unique={unique}
							/>
							<EditCustomGroupOnServer
								mainWay={mainWay}
								catalogName={catalogName}
								unique={unique}
							/>
							<DeleteOnServer
								mainWay={mainWay}
								catalogName={catalogName}
								unique={unique}
							/>
						</Access>
						<Button
							icon={<ReloadOutlined />}
							type={'primary'}
							hidden={true}
							subscribe={[
								/** Action search activate btn*/
								{
									name: 'onSearchPush',
									path: `rtd.${mainWay}.${catalogName}Table.table.events.onSearch`,
									onChange: ({value, setSubscribeProps}) => {
										value &&
											setSubscribeProps &&
											setSubscribeProps({hidden: !value});
									},
								},
								/** Action reload in mainForm.table deactivate btn*/
								{
									name: 'onReloadPush',
									path: `rtd.${mainWay}.${catalogName}Table.table.rows`,
									onChange: ({value, setSubscribeProps}) => {
										/** We might thinking about ${path}.rows array length*/

										value &&
											value.length >= 4 &&
											setSubscribeProps &&
											setSubscribeProps({hidden: value});
									},
								},
							]}
							dispatch={{
								path: `${mainWay}.${catalogName}Table.table.events.onReload`,
							}}
						/>
						<CustomObjectView
							mainWay={mainWay}
							catalogName={catalogName}
							unique={unique}
						/>
						<CustomGroupView
							catalogName={catalogName}
							mainWay={mainWay}
						/>
					</>
				);
			default:
				return (
					<>
						<Access
							roles={[
								'ROLE_ADMIN',
								'ROLE_MI_SHIFT_SUPERVISOR',
								'ROLE_MI_DETOURS_CREATOR',
							]}
						>
							<AddDefaultObjectOnServer
								mainWay={mainWay}
								catalogName={catalogName}
								unique={unique}
							/>
							<EditDefaultObjectOnServer
								mainWay={mainWay}
								catalogName={catalogName}
								unique={unique}
							/>
						</Access>
						<Button
							icon={<ReloadOutlined />}
							type={'primary'}
							hidden={true}
							subscribe={[
								/** Action search activate btn*/
								{
									name: 'onSearchPush',
									path: `rtd.${mainWay}.${catalogName}Table.table.events.onSearch`,
									onChange: ({value, setSubscribeProps}) => {
										value &&
											setSubscribeProps &&
											setSubscribeProps({hidden: !value});
									},
								},
								/** Action reload in mainForm.table deactivate btn*/
								{
									name: 'onReloadPush',
									path: `rtd.${mainWay}.${catalogName}Table.table.rows`,
									onChange: ({value, setSubscribeProps}) => {
										/** We might thinking about ${path}.rows array length*/
										/**
										 * This subscribe now work, but not well. If DB have add more object in departments,departments, staffWorkSchedules configs, might change value.length >= 2
										 * */
										value &&
											value.length >= 2 &&
											setSubscribeProps &&
											setSubscribeProps({hidden: value});
									},
								},
							]}
							dispatch={{
								path: `${mainWay}.${catalogName}Table.table.events.onReload`,
							}}
						/>
						<DefaultObjectView
							mainWay={mainWay}
							catalogName={catalogName}
							unique={unique}
						/>
					</>
				);
		}
	};
	return (
		<Space style={{justifyContent: 'space-between'}} className={'mr-8'}>
			<Row className={'p-8'}>{configCatalogName(catalogName)}</Row>
			<Search
				itemProps={{name: 'onSearch'}}
				placeholder={
					catalogName !== 'staff'
						? 'Введите наименование'
						: 'Введите сотрудника'
				}
				dispatch={{
					path: `${mainWay}.${catalogName}Table.table.events.onSearch`,
				}}
				subscribe={[
					/** Reload Search value field, clear STORE*/
					reloadFilterFields(
						`${mainWay}.${catalogName}Table.table.events.onReload`
					),
				]}
			/>
		</Space>
	);
};
