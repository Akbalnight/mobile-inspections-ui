/**
 *
 * файл со всеми customFields, поля и валидация в объекты таблицы
 */
import React from 'react';
import {classic} from 'rt-design';
import {useHistory} from 'react-router';
import {
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
import {code} from '../Base/customColumnProps';
import {reloadFilterFields} from '../Base/Functions/ReloadField';
import {codeNormalizer} from '../Base/Functions/TextUtils';

const {Button, Row, Space, Search, Checkbox} = classic;

/**
 *
 * @param catalogName name of server configuration
 * @param mainWay name of server configuration
 * @param unique phrase on Russian
 * @returns {JSX.object}
 * @desc Function choice table header buttons(action modals) and view modals
 */
export const ControlPointsTableHeader = ({mainWay, catalogName, unique}) => {
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
				dispatch={{
					path: `${mainWay}.${catalogName}Table.events.onClickEdit`,
				}}
				disabled={true}
				subscribe={[
					{
						name: 'btnActive',
						path: `rtd.${mainWay}.${catalogName}Table.table.selected`,
						onChange: ({value, setSubscribeProps}) => {
							if (value && !value.isGroup) {
								sValueId = value.id;
								setSubscribeProps({
									hidden: !value,
									disabled: !value,
								});
							} else {
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
				<Button
					icon={<ReloadOutlined />}
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
									value.length >= 10 &&
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
				<CustomGroupView catalogName={catalogName} mainWay={mainWay} />
			</Row>
			<Search
				itemProps={{name: 'onSearch'}}
				placeholder={'Введите наименование'}
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
		name: 'rfidCode',
		cellRenderer: ({cellData}) =>
			cellData ? (
				<Checkbox checked={!cellData} disabled={!cellData} />
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
				// console.log('row tech maps selected:', row)
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
