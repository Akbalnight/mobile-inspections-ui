import {Button, Checkbox, DateText, Row, Search, Space} from 'rt-design';
import React from 'react';
import {FolderOutlined, ReloadOutlined, ToolOutlined} from '@ant-design/icons';
import {dateTime} from '../Base/customColumnProps';
import {codeNormalizer} from '../Base/Functions/TextUtils';
import {Access} from 'mobile-inspections-base-ui';
import {
	AddCustomObjectOnServer,
	EditCustomObjectOnServer,
} from '../Base/Modals/CustomObjectOnServer';
import {
	AddCustomGroupOnServer,
	EditCustomGroupOnServer,
} from '../Base/Modals/CustomGroupOnServer';
import {DeleteOnServer} from '../Base/Modals/DeleteOnServer';
import {changeStorePath} from '../Base/Functions/ChangeStorePath';
import {CustomObjectView} from '../Base/Modals/CustomObjectView';
import {CustomGroupView} from '../Base/Modals/CustomGroupView';
import {
	AddDefaultObjectOnServer,
	EditDefaultObjectOnServer,
} from '../Base/Modals/DefaultObjectOnServer';
import {DefaultObjectView} from '../Base/Modals/DefaultObjectView';
import {reloadFilterFields} from '../Base/Functions/ReloadField';

/**
 *
 * @param mainWay name of server configuration
 * @param catalogName name of server configuration
 * @returns {JSX.object}
 * @desc Function choice table header buttons(action modals) and view modals
 */

export const TableHeader = ({mainWay, catalogName}) => {
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
							/>
							<AddCustomGroupOnServer
								mainWay={mainWay}
								catalogName={catalogName}
							/>
							<EditCustomObjectOnServer
								mainWay={mainWay}
								catalogName={catalogName}
							/>
							<EditCustomGroupOnServer
								mainWay={mainWay}
								catalogName={catalogName}
							/>
							<DeleteOnServer
								mainWay={mainWay}
								catalogName={catalogName}
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
									path: `rtd.${changeStorePath(
										mainWay,
										catalogName
									)}.events.onSearch`,
									onChange: ({value, setSubscribeProps}) => {
										value &&
											setSubscribeProps &&
											setSubscribeProps({hidden: !value});
									},
								},
								/** Action reload in mainForm.table deactivate btn*/
								{
									name: 'onReloadPush',
									path: `rtd.${changeStorePath(
										mainWay,
										catalogName
									)}.rows`,
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
								path: `${changeStorePath(
									mainWay,
									catalogName
								)}.events.onReload`,
							}}
						/>
						<CustomObjectView
							mainWay={mainWay}
							catalogName={catalogName}
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
							/>
							<EditDefaultObjectOnServer
								mainWay={mainWay}
								catalogName={catalogName}
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
									path: `rtd.${changeStorePath(
										mainWay,
										catalogName
									)}.events.onSearch`,
									onChange: ({value, setSubscribeProps}) => {
										value &&
											setSubscribeProps &&
											setSubscribeProps({hidden: !value});
									},
								},
								/** Action reload in mainForm.table deactivate btn*/
								{
									name: 'onReloadPush',
									path: `rtd.${changeStorePath(
										mainWay,
										catalogName
									)}.rows`,
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
								path: `${changeStorePath(
									mainWay,
									catalogName
								)}.events.onReload`,
							}}
						/>
						<DefaultObjectView
							mainWay={mainWay}
							catalogName={catalogName}
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
					path: `${changeStorePath(
						mainWay,
						catalogName
					)}.events.onSearch`,
				}}
				subscribe={[
					/** Reload Search value field, clear STORE*/
					reloadFilterFields(
						`${changeStorePath(
							mainWay,
							catalogName
						)}.events.onReload`
					),
				]}
			/>
		</Space>
	);
};

/**
 * @desc Array of table column configuration
 * @type {({cellRenderer: (function({cellData: *}): *), name: string}|{cellRenderer: (function({cellData: *}): *), name: string}|{cellRenderer: (function({rowData: *, cellData: *}): *), name: string}|{cellRenderer: function({cellData?: *}): *, name: *})[]}
 */
export const customColumnPropsEquipments = [
	{
		name: 'deleted',
		cellRenderer: ({cellData}) => {
			return <Checkbox checked={cellData} disabled />;
		},
	},
	{
		name: 'isGroup',
		cellRenderer: ({cellData}) => {
			return <Checkbox checked={cellData} disabled />;
		},
	},
	{
		name: 'techPlacePath',
		cellRenderer: ({rowData, cellData}) => {
			return (
				<span>
					{rowData.isGroup ? <FolderOutlined /> : <ToolOutlined />}{' '}
					{cellData}
				</span>
			);
		},
	},
	{...dateTime('dateStart')},
	{...dateTime('dateFinish')},
	{
		name: 'workSchedules',
		cellRenderer: ({cellData}) => (
			<span style={{display: 'flex', flexDirection: 'column'}}>
				{cellData &&
					cellData.map((cell, index) => (
						<span
							key={index}
							style={{display: 'flex', flexDirection: 'row'}}
						>
							<DateText
								value={cell[`${index}-StartWorkSchedules`]}
								format={'DD.MM.YYYY HH:mm'}
							/>
							{'  '}
							-&gt;{'  '}
							<DateText
								value={cell[`${index}-FinishWorkSchedules`]}
								format={'DD.MM.YYYY HH:mm'}
							/>
						</span>
					))}
			</span>
		),
	},
	{
		name: 'sickLeaves',
		cellRenderer: ({cellData}) => (
			<span style={{display: 'flex', flexDirection: 'column'}}>
				{cellData &&
					cellData.map((cell, index) => (
						<span
							key={index}
							style={{display: 'flex', flexDirection: 'row'}}
						>
							<DateText
								value={cell[`${index}-StartSickLeaves`]}
								format={'DD.MM.YYYY'}
							/>{' '}
							-{' '}
							<DateText
								value={cell[`${index}-FinishSickLeaves`]}
								format={'DD.MM.YYYY'}
							/>
						</span>
					))}
			</span>
		),
	},
	{
		name: 'vacation',
		cellRenderer: ({cellData}) => (
			<span style={{display: 'flex', flexDirection: 'column'}}>
				{cellData &&
					cellData.map((cell, index) => (
						<span
							key={index}
							style={{display: 'flex', flexDirection: 'row'}}
						>
							<DateText
								value={cell[`${index}-StartVacation`]}
								format={'DD.MM.YYYY'}
							/>{' '}
							-{' '}
							<DateText
								value={cell[`${index}-FinishVacation`]}
								format={'DD.MM.YYYY'}
							/>
						</span>
					))}
			</span>
		),
	},
	{
		name: 'code', //'codeHierarchical' //{(rowData.code).padStart(8, '0')}
		cellRenderer: ({rowData, cellData}) => {
			return (
				<span>
					{rowData.isGroup ? <FolderOutlined /> : null}{' '}
					{codeNormalizer(cellData)}
				</span>
			);
		},
	},
];
