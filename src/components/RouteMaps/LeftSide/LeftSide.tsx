import React from 'react';
import {
	Button,
	executeRequest,
	Form,
	FormBody,
	Layout,
	Select,
	Table,
	Title,
} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';
import {ArrowUpOutlined, ExclamationCircleTwoTone} from '@ant-design/icons';
import {customColumnProps, RouteMapsTableHeader} from '../tableProps';
import Switcher from './Tables/Switcher';

const processBeforeSaveForm = (rawValues: any) => {
	return {
		controlPointsCoordinate: rawValues.controlPointsTable,
	};
};

const LeftSide = ({routeId}: {routeId: string}) => {
	const loadData = (callBack: (params: any) => void) => {
		return callBack(routeId ? {routeSelect: routeId} : null);
	};

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
			<FormBody scrollable={false} noPadding={false}>
				<Title level={4}>Маршрут</Title>
				<Select
					itemProps={{name: 'routeSelect'}}
					autoClearSearchValue={true}
					filterOption={false}
					showArrow={true}
					showSearch={true}
					searchParamName={'name'}
					// mode={'single'}
					requestLoadRows={apiGetFlatDataByConfigName('routes')}
					dispatch={{
						path: 'routeMaps.mainForm.events.onSelectRoute',
						type: 'event',
					}}
				/>
				<Switcher routeId={routeId} />
			</FormBody>
		</Form>
	);
};

LeftSide.propTypes = {};

export default LeftSide;
