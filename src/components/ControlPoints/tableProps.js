/**
 *
 * файл со всеми customFields, поля и валидация в объекты таблицы
 */
import React from 'react';
import {Button, Row, Space, Search, notificationError} from 'rt-design';
import {useHistory} from 'react-router';
import {
	EditOutlined,
	FolderOutlined,
	PlusOutlined,
	ReloadOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import {paths} from '../../constants/paths';
import {
	AddCustomGroupOnServer,
	EditCustomGroupOnServer,
} from '../Base/Modals/CustomGroupOnServer';
import {CustomObjectView} from '../Base/Modals/CustomObjectView';
import {CustomGroupView} from '../Base/Modals/CustomGroupView';
import {reloadFilterFields} from '../Base/Functions/ReloadField';
import {codeNormalizer} from '../Base/Functions/TextUtils';
import {Access} from 'mobile-inspections-base-ui';
import {RfidIcon} from '../../imgs/controlPoints/icons';
import {notification, Tooltip} from 'antd';
import {apiSaveByConfigName} from '../../apis/application.api';
import {useDispatch} from 'react-redux';
import {setDataStore} from 'rt-design/lib/redux/rtd.actions';
import moment from 'moment';
import {changeStorePath} from '../Base/Functions/ChangeStorePath';
import {systemEvents} from '../../constants/systemEvents';

/**
 *
 * @param catalogName name of server configuration
 * @param mainWay name of server configuration
 * @returns {JSX.object}
 * @desc Function choice table header buttons(action modals) and view modals
 */
export const ControlPointsTableHeader = ({mainWay, catalogName}) => {
	let history = useHistory();

	const AddObjectButton = () => {
		return (
			<Button
				className={['ant-btn-icon-only', 'mr-8']}
				onClick={() => {
					history.push(
						paths.DETOURS_CONFIGURATOR_CONTROL_POINTS_NEW.path
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
						name: 'btnActive',
						path: `rtd.${changeStorePath(
							mainWay,
							catalogName
						)}.selected`,
						onChange: ({value, setSubscribeProps}) => {
							if (value && !value.isGroup) {
								sValueId = value.id;
								setSubscribeProps({
									hidden: !value,
									disabled: !value,
								});
							} else if (value) {
								setSubscribeProps({hidden: value});
								sValueId = null;
							}
						},
					},
				]}
				onClick={() => {
					history.push(
						paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.path +
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
				{/** Show modals for this roles*/}
				<Access roles={['ROLE_ADMIN', 'ROLE_MI_ADMIN']}>
					<AddObjectButton />
					<AddCustomGroupOnServer
						mainWay={mainWay}
						catalogName={catalogName}
					/>
					<EditObjectButton />
					<EditCustomGroupOnServer
						mainWay={mainWay}
						catalogName={catalogName}
					/>
				</Access>
				<Button
					icon={<ReloadOutlined />}
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
									value.length >= 10 &&
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
				<CustomObjectView mainWay={mainWay} catalogName={catalogName} />
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

const RfidCode = ({rowData, cellData}) => {
	const dispatch = useDispatch();

	const onClickDeleteRfid = () => {
		apiSaveByConfigName(
			`mobileControlPointsSave`,
			systemEvents.CONTROL_POINTS_CREATION_SUCCESS
		)({
			method: 'PUT',
			data: {
				id: rowData.id,
				rfidCode: null,
				name: rowData.name,
				parentId: rowData.parentId,
			},
			params: {},
		})
			.then((res) => {
				notification.success({message: 'Метка успешно удалена'});
				dispatch(
					setDataStore(`controlPoints.table.events.onReload`, {
						timestamp: moment(),
					})
				);
			})
			.catch(notificationError);
	};

	return (
		<Space style={{lineHeight: 1, paddingTop: '2px'}}>
			<RfidIcon />
			<div>{cellData}</div>
			<Tooltip title='Удалить RFID метку'>
				<Button
					className={'remove-rfid-btn'}
					shape='circle'
					size={'small'}
					type={'text'}
					icon={<DeleteOutlined />}
					onClick={onClickDeleteRfid}
				/>
			</Tooltip>
		</Space>
	);
};

export const customColumnProps = [
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
		name: 'rfidCode', //mobileControlPointsSave
		className: 'rfid-cell',
		cellRenderer: ({rowData, cellData}) =>
			cellData ? (
				<RfidCode rowData={rowData} cellData={cellData} />
			) : (
				'---'
			),
	},
];
export const equipmentTableCustom = (controlPointId) => {
	return [
		{
			name: 'equipmentId',
			value: (row) => row.id,
			validate: (row, rows) => {
				// console.log('row eq selected:', row)
				return !row.isGroup
					? !rows.map((row) => row.equipmentId).includes(row.id)
					: false;
			},
		},
		{
			name: 'id',
			value: () => null,
		},
		{
			name: 'controlPointId',
			value: () => controlPointId,
		},
		{
			name: 'equipmentName',
			value: (row) => row.name,
		},
	];
};
export const techMapsTableCustom = (controlPointId) => {
	return [
		{
			name: 'techMapId',
			value: (row) => row.id,
			validate: (row, rows) => {
				return !row.isGroup
					? !rows.map((row) => row.techMapId).includes(row.id)
					: false;
			},
		},
		{
			name: 'id',
			value: () => null,
		},
		{
			name: 'controlPointId',
			value: () => controlPointId,
		},
	];
};
