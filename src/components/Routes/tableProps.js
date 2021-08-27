import {code, duration, position} from '../Base/customColumnProps';
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	EditOutlined,
	PlusOutlined,
	ReloadOutlined,
} from '@ant-design/icons';
import {paths} from '../../constants/paths';
import {RouteViewModal} from './Registry/Modals/ViewModal';
import React from 'react';
import {Space, Button, Search} from 'rt-design';
import {useHistory} from 'react-router';
import {reloadFilterFields} from '../Base/Functions/ReloadField';
import {
	AddControlPointToRoute,
	EditControlPointToRoute,
} from './Form/Modals/SaveObjectModal';
import {DeleteControlPointToRoute} from './Form/Modals/DeleteObjectModal';
import {ViewModal} from './Form/Modals/ViewModal';
import {Access} from 'mobile-inspections-base-ui';
import {generateUUID} from 'rt-design/lib/components/utils/baseUtils';

export const customColumnProps = [
	{...code},
	{...position, width: '50px', align: 'center'},
	{...duration},
	{
		name: 'hybridId',
		hidden: true,
	},
];

export const customFields = [
	/**
	 * This validate work like that. Our 'hybridId' have some VALUE, this VALUE goes to validate.
	 * If in validate all right and return true, our VALUE goes to value and transform.
	 */
	{
		name: 'hybridId',
		value: (row) => `${row.controlPointId}-${row.techMapId}`,
		validate: (row, rows) => {
			const tmp = `${row.controlPointId}-${row.techMapId}`;
			row.id = generateUUID();
			return rows
				? !rows.map((row) => row.hybridId).includes(tmp)
				: false;
		},
	},
];

export const MainTableHeader = () => {
	let sValueId = null;
	const history = useHistory();
	return (
		<Space className={'p-8'} style={{justifyContent: 'space-between'}}>
			<Space>
				{/** Show modals for this roles*/}
				<Access
					roles={[
						'ROLE_ADMIN',
						'ROLE_MI_ADMIN',
						'ROLE_MI_DETOURS_CREATOR',
					]}
				>
					<Space>
						<Button
							icon={<PlusOutlined />}
							onClick={() => {
								history.push(
									paths.DETOURS_CONFIGURATOR_ROUTES_DATA_NEW
										.path
								);
							}}
						/>
						<Button
							icon={<EditOutlined />}
							disabled={true}
							subscribe={[
								{
									name: 'editRouteForm',
									path: 'rtd.routes.table.selected',
									onChange: ({value, setSubscribeProps}) => {
										if (value) {
											sValueId = value.id;
											setSubscribeProps({
												disabled: !value,
											});
										} else {
											sValueId = null;
										}
									},
								},
							]}
							onClick={() =>
								history.push(
									paths.DETOURS_CONFIGURATOR_ROUTES.path +
										'/' +
										sValueId
								)
							}
						/>
					</Space>
				</Access>
				<Button
					icon={<ReloadOutlined />}
					hidden={true}
					type={'primary'}
					subscribe={[
						/** Action search activate btn*/
						{
							name: 'onSearchPush',
							path: 'rtd.routes.table.events.onSearch',
							onChange: ({value, setSubscribeProps}) => {
								value &&
									setSubscribeProps &&
									setSubscribeProps({hidden: !value});
							},
						},
						/** Action reload in mainForm.table deactivate btn*/
						{
							name: 'onReloadPush',
							path: 'rtd.routes.table.rows',
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
						path: 'routes.table.events.onReload',
					}}
				/>
				<RouteViewModal />
			</Space>
			<Space>
				<Search
					itemProps={{name: 'onSearch'}}
					placeholder={'Введите наименование'}
					dispatch={{
						path: 'routes.table.events.onSearch',
					}}
					subscribe={[
						/** Reload Search value field, clear STORE*/
						reloadFilterFields('routes.table.events.onReload'),
					]}
				/>
			</Space>
		</Space>
	);
};

export const ControlPointsHeader = () => {
	return (
		<Space className={'p-8'}>
			<AddControlPointToRoute />
			<EditControlPointToRoute />
			<DeleteControlPointToRoute />
			<Button
				icon={<ArrowUpOutlined />}
				disabled={true}
				dispatch={{
					path: 'routes.form.controlPointsTable.events.onClickMoveUp',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'btnUp',
						path: 'rtd.routes.form.controlPointsTable.selected',
						onChange: ({value, setSubscribeProps}) => {
							value &&
								setSubscribeProps &&
								setSubscribeProps({
									disabled: !value,
								});
						},
					},
				]}
			/>
			<Button
				icon={<ArrowDownOutlined />}
				disabled={true}
				dispatch={{
					path: 'routes.form.controlPointsTable.events.onClickMoveDown',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'btnDown',
						path: 'rtd.routes.form.controlPointsTable.selected',
						onChange: ({value, setSubscribeProps}) => {
							value &&
								setSubscribeProps &&
								setSubscribeProps({
									disabled: !value,
								});
						},
					},
				]}
			/>
			<ViewModal />
		</Space>
	);
};
