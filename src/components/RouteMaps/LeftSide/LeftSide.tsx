import React from 'react';
import {Form, FormBody, Layout, Table, Title} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';
import Switcher from './Tables/Switcher';
import {useHistory} from 'react-router';
import {paths} from '../../../constants/paths';
import {routesCustomColumnProps} from '../tableProps';

const processBeforeSaveForm = (rawValues: any) => {
	return {
		controlPointsCoordinate: rawValues.controlPointsTable,
	};
};

const LeftSide = ({routeId}: {routeId: string}) => {
	const history = useHistory();
	const onRouteSelect = ({rowData}: any) =>
		history.push(
			`${paths.DETOURS_CONFIGURATOR_ROUTE_MAPS.path}/${rowData.id}`
		);

	const loadData = (callBack: (params: any) => void) => {
		// console.log('loadData', routeId ? {routeSelect: routeId} : null)
		return callBack(routeId ? {routeSelect: routeId} : null);
		// return callBack({});
	};

	const content = routeId ? (
		<Switcher routeId={routeId} />
	) : (
		<React.Fragment>
			<Title level={5} style={{margin: '12px 0'}}>
				Выберите маршрут
			</Title>
			<Layout>
				<Table
					itemProps={{name: 'routeSelect'}}
					// dispatch={{ path: 'routeMaps.mainForm.events.onSelectRoute' }}
					customColumnProps={routesCustomColumnProps}
					requestLoadConfig={apiGetConfigByName('routes')}
					requestLoadRows={apiGetFlatDataByConfigName('routes')}
					onRowClick={onRouteSelect}
				/>
			</Layout>
		</React.Fragment>
	);

	return (
		<Form
			name={'configForm'}
			loadInitData={loadData}
			processBeforeSaveForm={processBeforeSaveForm}
			requestSaveForm={({data, params}) =>
				apiSaveByConfigName('controlPointsCoordinateSave')({
					method: 'POST',
					data,
					params,
				})
			}
		>
			<FormBody
				scrollable={false}
				noPadding={true}
				style={{padding: '0 24px 24px 24px'}}
			>
				{content}
			</FormBody>
		</Form>
	);
};

export default LeftSide;
