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
import {classic} from 'rt-design';
import {useHistory} from 'react-router';
import {reloadFilterFields} from '../Base/Functions/ReloadField';
import {
	AddControlPointToRoute,
	EditControlPointToRoute,
} from './Form/Modals/SaveObjectModal';
import {DeleteControlPointToRoute} from './Form/Modals/DeleteObjectModal';
import {ViewControlPointModal} from './Form/Modals/ViewControlPointModal';

const {Space, Button, Search} = classic;
export const customColumnProps = [
	{...code},
	{...position, width: '50px', align: 'center'},
	{...duration},
];

export const MainTableHeader = () => {
	let sValueId = null;
	const history = useHistory();
	return (
		<Space className={'p-8'} style={{justifyContent: 'space-between'}}>
			<Space>
				<Button
					icon={<PlusOutlined />}
					onClick={() => {
						history.push(
							paths.DETOURS_CONFIGURATOR_ROUTES_DATA_NEW.path
						);
					}}
				/>
				<Button
					icon={<EditOutlined />}
					disabled={true}
					subscribe={[
						{
							name: 'editRouteForm',
							path: 'rtd.routes.mainForm.table.selected',
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
				<Button
					icon={<ReloadOutlined />}
					hidden={true}
					subscribe={[
						/** Action search activate btn*/
						{
							name: 'onSearchPush',
							path: 'rtd.routes.mainForm.table.events.onSearch',
							onChange: ({value, setSubscribeProps}) => {
								value &&
									setSubscribeProps &&
									setSubscribeProps({hidden: !value});
							},
						},
						/** Action reload in mainForm.table deactivate btn*/
						{
							name: 'onReloadPush',
							path: 'rtd.routes.mainForm.table.rows',
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
						path: 'routes.mainForm.table.events.onReload',
					}}
				/>
				<RouteViewModal />
			</Space>
			<Space>
				<Search
					itemProps={{name: 'onSearch'}}
					placeholder={'Введите наименование'}
					dispatch={{
						path: 'routes.mainForm.table.events.onSearch',
					}}
					subscribe={[
						/** Reload Search value field, clear STORE*/
						reloadFilterFields(
							'routes.mainForm.table.events.onReload'
						),
					]}
				/>
			</Space>
		</Space>
	);
};

export const ControlPointTableHeader = () => {
	return (
		<Space className={'p-8'}>
			<AddControlPointToRoute />
			<EditControlPointToRoute />
			<DeleteControlPointToRoute />
			<Button
				icon={<ArrowUpOutlined />}
				disabled={true}
				dispatch={{
					path:
						'routes.routeForm.controlPointsTable.table.actions.onClickMoveUp',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'btnUp',
						path:
							'rtd.routes.routeForm.controlPointsTable.table.selected',
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
					path:
						'routes.routeForm.controlPointsTable.table.actions.onClickMoveDown',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'btnUp',
						path:
							'rtd.routes.routeForm.controlPointsTable.table.selected',
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
			<ViewControlPointModal />
		</Space>
	);
};
