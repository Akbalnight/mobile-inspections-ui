import React from 'react';
import {customColumnProps} from '../../tableProps';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../../apis/catalog.api';
import {Button, Table, TablesSubscribeOnChangeOptions} from 'rt-design';

const ControlPointsTable = ({routeId}: {routeId: string}) => {
	const onSelectRoute = (params: TablesSubscribeOnChangeOptions) => {
		const {value, reloadTable} = params;
		value && reloadTable && reloadTable({filter: {routeId: value.value}});
	};

	const onSelectedControlPoint = (params: TablesSubscribeOnChangeOptions) => {
		const {value, extraData, editRow} = params;
		const row = value.value; //.value.rowData;
		if (row && extraData && row.routeMapId === null) {
			// Add new point
			// console.log('controlPointsTable - onSelectedControlPoint => Add new point')
			const _row = {
				...row,
				routeMapId: extraData.id,
				routeMapName: extraData.name,
			};
			editRow(_row);
		} else if (row && extraData && row.routeMapId !== extraData.id) {
			// move point
			// console.log('controlPointsTable - onSelectedControlPoint => move point from', row.routeMapId)
			const _row = {
				...row,
				routeMapId: extraData.id,
				routeMapName: extraData.name,
			};
			editRow(_row);
		}
	};

	const onChangeRouteMapPoints = ({
		value,
		editRow,
	}: TablesSubscribeOnChangeOptions) => {
		value && editRow(value);
	};

	return (
		<Table
			itemProps={{name: 'controlPointsTable'}}
			pageSize={1}
			customColumnProps={customColumnProps}
			fixWidthColumn={true}
			// editMode={true}
			defaultFilter={{
				routeId: routeId ? routeId : null,
			}}
			requestLoadRows={apiGetFlatDataByConfigName(
				'routeControlPointsDebug'
			)}
			requestLoadConfig={apiGetConfigByName('routeControlPointsDebug')}
			dispatch={{
				path: 'routeMaps.mainForm.controlPointsTable',
			}}
			subscribe={[
				/** Action reload table after select Route in Select*/
				{
					name: 'controlPointTable',
					withMount: true,
					path: 'rtd.routeMaps.mainForm.events.onSelectRoute',
					onChange: onSelectRoute,
				},
				/** Action change table state by click on table*/
				{
					// Изменить таблицу с точками по клику на таблицу с точками
					name: 'onSelectedControlPoint',
					path: 'rtd.routeMaps.mainForm.controlPointsTable.events.onRowClick',
					extraData: 'rtd.routeMaps.mainForm.routeMapsTable.selected',
					onChange: onSelectedControlPoint,
				},
				/** Action change table rows value*/
				{
					// Изменить таблицу с точками по изменению на карте (картинке)
					name: 'onChangeRouteMapPoints',
					path: 'rtd.routeMaps.mainForm.routeMapPoints.onChange',
					onChange: onChangeRouteMapPoints,
				},
			]}
			footerProps={{
				height: 50,
				rightCustomSideElement: () => (
					<>
						<Button type={'primary'} htmlType={'submit'}>
							Сохранить
						</Button>
					</>
				),
			}}
		/>
	);
};

export default ControlPointsTable;
