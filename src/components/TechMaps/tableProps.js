import React from 'react';
import {Button, Row, Space, Checkbox, Search} from 'rt-design';
import {useHistory} from 'react-router';
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	DeleteOutlined,
	EditOutlined,
	FolderOutlined,
	PlusOutlined,
	ReloadOutlined,
} from '@ant-design/icons';
import {paths} from '../../constants/paths';
import {
	AddCustomGroupOnServer,
	EditCustomGroupOnServer,
} from '../Base/Modals/CustomGroupOnServer';
import {CustomObjectView} from '../Base/Modals/CustomObjectView';
import {CustomGroupView} from '../Base/Modals/CustomGroupView';
import {codeNormalizer} from '../Base/Functions/TextUtils';
import {code, duration, position} from '../Base/customColumnProps';
import {
	AddTechOperationButton,
	EditTechOperationButton,
} from './Form/Modals/TechOperSaveObject';
import {reloadFilterFields} from '../Base/Functions/ReloadField';
import {Access} from 'mobile-inspections-base-ui';
import {changeStorePath} from '../Base/Functions/ChangeStorePath';

/**
 *
 * @param mainWay name of server configuration
 * @param catalogName name of server configuration
 * @param unique phrase on Russian
 * @returns {JSX.object}
 * @desc Function choice table header in main registry buttons(action modals) and view modals
 */
export const TechMapsTableHeader = ({mainWay, catalogName, unique}) => {
	let history = useHistory();

	const AddObjectButton = () => {
		return (
			<Button
				className={['ant-btn-icon-only', 'mr-8']}
				onClick={() => {
					history.push(
						paths.DETOURS_CONFIGURATOR_TECH_MAPS_FORM_ADD.path
					);
				}}
			>
				<PlusOutlined />
			</Button>
		);
	};

	const EditObjectButton = () => {
		let sValueId = null;
		return (
			<Button
				className={['ant-btn-icon-only']}
				disabled={true}
				subscribe={[
					{
						name: 'selected',
						path: `rtd.${changeStorePath(
							mainWay,
							catalogName
						)}.selected`,
						onChange: ({value, setSubscribeProps}) => {
							if (value && !value.isGroup) {
								sValueId = value.id;
								setSubscribeProps({
									hidden: false,
									disabled: false,
								});
							} else {
								setSubscribeProps({hidden: true});
								sValueId = null;
							}
						},
					},
				]}
				onClick={() => {
					history.push(
						paths.DETOURS_CONFIGURATOR_TECH_MAPS.path +
							'/' +
							sValueId
					);
				}}
			>
				<EditOutlined />
			</Button>
		);
	};

	return (
		<Space style={{justifyContent: 'space-between'}} className={'p-8'}>
			<Row>
				<Access
					roles={[
						'ROLE_ADMIN',
						'ROLE_MI_ADMIN',
						'ROLE_MI_SHIFT_SUPERVISOR',
						'ROLE_MI_DETOURS_CREATOR',
					]}
				>
					<AddObjectButton />
					<AddCustomGroupOnServer
						mainWay={mainWay}
						catalogName={catalogName}
						unique={unique}
					/>
					<EditObjectButton />
					<EditCustomGroupOnServer
						mainWay={mainWay}
						catalogName={catalogName}
						unique={unique}
					/>
				</Access>
				<Button
					icon={<ReloadOutlined />}
					hidden={true}
					type={'primary'}
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
					catalogName={catalogName}
					unique={unique}
					mainWay={mainWay}
				/>
				<CustomGroupView catalogName={catalogName} mainWay={mainWay} />
			</Row>
			<Search
				itemProps={{name: 'onSearch'}}
				placeholder={'Введите наименование'}
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
 * @desc Header by TechMap.js table
 * */
export const TechOperTableHeader = () => {
	return (
		<Space className={'p-8'}>
			<AddTechOperationButton />
			<EditTechOperationButton />
			<Button
				itemProps={{name: 'btnDelete'}}
				icon={<DeleteOutlined />}
				type={'default'}
				disabled={true}
				dispatch={{
					path: 'techMaps.form.techOperationsTable.events.onDelete',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'onTechMapsTechOperationsSelect',
						path: 'rtd.techMaps.form.techOperationsTable.selected',
						onChange: ({value, setSubscribeProps}) => {
							value
								? setSubscribeProps({
										disabled: false,
								  })
								: setSubscribeProps({
										disabled: true,
								  });
						},
					},
				]}
			/>
			<Button
				icon={<ArrowUpOutlined />}
				disabled={true}
				dispatch={{
					path: 'techMaps.form.techOperationsTable.events.onClickMoveUp',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'btnUp',
						path: 'rtd.techMaps.form.techOperationsTable.selected',
						onChange: ({value, setSubscribeProps}) => {
							value && setSubscribeProps
								? setSubscribeProps({
										disabled: !value,
								  })
								: setSubscribeProps({
										disabled: true,
								  });
						},
					},
				]}
			/>
			<Button
				icon={<ArrowDownOutlined />}
				disabled={true}
				dispatch={{
					path: 'techMaps.form.techOperationsTable.events.onClickMoveDown',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'btnUp',
						path: 'rtd.techMaps.form.techOperationsTable.selected',
						onChange: ({value, setSubscribeProps}) => {
							value && setSubscribeProps
								? setSubscribeProps({
										disabled: !value,
								  })
								: setSubscribeProps({
										disabled: true,
								  });
						},
					},
				]}
			/>
		</Space>
	);
};

/**
 * Custom column props by main table TechMaps.js
 * */
export const mainCustomColumnProps = [
	{
		name: 'code',
		cellRenderer: ({rowData}) => {
			return rowData.isGroup ? (
				<span>
					<FolderOutlined className={'mr-8'} />
					{codeNormalizer(rowData.code)}
				</span>
			) : (
				<span>{codeNormalizer(rowData.code)}</span>
			);
		},
	},
	{
		name: 'techMapsStatusName',
		cellRenderer: ({cellData}) => <div>{cellData ? cellData : ' '}</div>,
	},
];
/**
 * Custom column props by tech operations table TechMap.js
 * */
export const formCustomColumnProps = [
	{...code},
	{...position, width: '50px', align: 'center'},
	{...duration},
	{
		name: 'needInputData',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />,
	},
	{
		name: 'equipmentStop',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />,
	},
	{
		name: 'increasedDanger',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />,
	},
];
