import React from 'react';
import {customColumnProps} from '../../tableProps';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../../apis/catalog.api';
import {executeRequest, Table, TablesSubscribeOnChangeOptions} from 'rt-design';

const RouteMapsTable = ({routeId}: {routeId: string}) => {
	const onRouteChoiceFilter = (params: TablesSubscribeOnChangeOptions) => {
		const {value, reloadTable} = params;
		value && reloadTable && reloadTable({filter: {routeId: value.value}});
	};

	const onRouteMapUpload = (params: TablesSubscribeOnChangeOptions) => {
		const {reloadTable, extraData} = params;
		extraData &&
			reloadTable &&
			reloadTable({filter: {routeId: extraData.value}});
	};

	const onMoveUpRow = ({value}: TablesSubscribeOnChangeOptions) =>
		executeRequest(apiSaveByConfigName('routeMapPositionSave'))({
			data: {routeMaps: value.value},
			method: 'POST',
		});

	const onMoveDownRow = ({value}: TablesSubscribeOnChangeOptions) =>
		executeRequest(apiSaveByConfigName('routeMapPositionSave'))({
			data: {routeMaps: value.value},
			method: 'POST',
		});

	const onEditFileName = ({
		value,
		reloadTable,
	}: TablesSubscribeOnChangeOptions) =>
		value &&
		reloadTable &&
		reloadTable({filter: {routeId: value.value.routeId}});

	return (
		<Table
			itemProps={{name: 'routeMapsTable'}}
			defaultFilter={{
				routeId: routeId ? routeId : null,
			}}
			customColumnProps={customColumnProps}
			requestLoadRows={apiGetFlatDataByConfigName('routeMaps')}
			requestLoadConfig={apiGetConfigByName('routeMaps')}
			dispatch={{
				path: 'routeMaps.mainForm.routeMapsTable',
			}}
			subscribe={[
				/** Action reload table after select Route in Select*/
				{
					name: 'routeChoiceFilter',
					withMount: true,
					path: 'rtd.routeMaps.mainForm.events.onSelectRoute',
					onChange: onRouteChoiceFilter,
				},
				/** Action reload table after upload file */
				{
					name: 'routeMapUpload',
					path: `rtd.routeMaps.mainForm.routeMapsTable.routeMapUpload`,
					extraData: 'rtd.routeMaps.mainForm.events.onSelectRoute',
					onChange: onRouteMapUpload,
				},
				/** Action change state after push on Button */
				{
					name: 'onClickMoveUp',
					path: 'rtd.routeMaps.mainForm.routeMapsTable.actions.onClickMoveUp',
					onChange: ({moveUpRow}) => moveUpRow(),
				},
				/** Action change state after push on Button */
				{
					name: 'onClickMoveDown',
					path: 'rtd.routeMaps.mainForm.routeMapsTable.actions.onClickMoveDown',
					onChange: ({moveDownRow}) => moveDownRow(),
				},

				/** Action change row position in table */
				{
					name: 'onMoveUpRow',
					path: 'rtd.routeMaps.mainForm.routeMapsTable.events.onMoveUpRow',
					onChange: onMoveUpRow,
				},
				/** Action change row position in table */
				{
					name: 'onMoveDownRow',
					path: 'rtd.routeMaps.mainForm.routeMapsTable.events.onMoveDownRow',
					onChange: onMoveDownRow,
				},
				/** Action change row position in table */
				{
					name: 'editFileName',
					path: 'rtd.routeMaps.mainForm.routeMapsTable.modal.editFileName',
					onChange: onEditFileName,
				},
			]}
		/>
	);
};

export default RouteMapsTable;
