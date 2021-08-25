import React from 'react';
import {
	Button,
	executeRequest,
	Layout,
	Table,
	Title,
	Switcher as RtSwitcher,
} from 'rt-design';
import {ArrowUpOutlined, ExclamationCircleTwoTone} from '@ant-design/icons';
import {customColumnProps, RouteMapsTableHeader} from '../../tableProps';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../../apis/catalog.api';
import RouteMapsTable from './RouteMapsTable';
import ControlPointsTable from './ControlPointsTable';

const Switcher = ({routeId}: {routeId: string}) => {
	return (
		<RtSwitcher
			itemProps={{initialValue: 0}}
			// dispatch={{ path: 'routeMaps.mainForm.Switcher' }}
			subscribe={[
				{
					name: 'choiceSwitcher',
					path: 'rtd.routeMaps.mainForm.events.onSelectRoute',
					onChange: ({value, setSubscribeProps}) => {
						value &&
							value.value &&
							setSubscribeProps &&
							setSubscribeProps({value: 1});
					},
				},
			]}
		>
			<Title level={2}>
				<span
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						textAlign: 'center',
						marginTop: '300px',
					}}
				>
					<ArrowUpOutlined />
					Выберите маршрут
					<ExclamationCircleTwoTone />
				</span>
			</Title>
			<Layout className={'py-16 mb-16'}>
				<Title level={5} className={'pt-8'}>
					Маршрутные карты
				</Title>
				<Layout style={{border: '1px solid #DFDFDF'}}>
					<RouteMapsTableHeader />
					<RouteMapsTable routeId={routeId} />
				</Layout>
				<Title level={5} className={'pt-16'}>
					Контрольные точки
				</Title>
				<Layout>
					<ControlPointsTable routeId={routeId} />
				</Layout>
			</Layout>
		</RtSwitcher>
	);
};

Switcher.propTypes = {};

export default Switcher;
