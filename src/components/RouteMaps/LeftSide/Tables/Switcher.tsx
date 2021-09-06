import React, {useEffect, useState} from 'react';
import {Layout, Title, Space, notificationError} from 'rt-design';
import {LeftOutlined} from '@ant-design/icons';
import {RouteMapsTableHeader} from '../../tableProps';
import RouteMapsTable from './RouteMapsTable';
import ControlPointsTable from './ControlPointsTable';
import {paths} from '../../../../constants/paths';
import {useHistory} from 'react-router';
import {apiGetFlatDataByConfigName} from '../../../../apis/application.api';

const Switcher = ({routeId}: {routeId: string}) => {
	const history = useHistory();
	const [routeData, setRouteData] = useState({name: '---'});

	useEffect(() => {
		apiGetFlatDataByConfigName('routes')({data: {id: routeId}, params: {}})
			.then((response) => setRouteData(response.data[0]))
			.catch((error) =>
				notificationError(error, 'Ошибка загрузки маршрута')
			);
	}, []);

	const onBackPage = () =>
		history.push(`${paths.DETOURS_CONFIGURATOR_ROUTE_MAPS.path}`);
	//
	return (
		<Layout style={{paddingBottom: '0px'}}>
			<div style={{display: 'flex', margin: '12px 0'}}>
				<Space
					style={{position: 'absolute', cursor: 'pointer'}}
					className={'ant-typography ant-typography-secondary'}
					onClick={onBackPage}
				>
					<LeftOutlined style={{fontSize: '16px'}} />
					<Title
						level={5}
						type='secondary'
						style={{marginBottom: '2px'}}
					>
						Назад
					</Title>
				</Space>
				<Title level={5} style={{margin: 'auto'}}>
					{routeData.name}
				</Title>
			</div>
			<Title level={5} style={{marginTop: 0}}>
				Маршрутные карты
			</Title>
			<Layout style={{border: '1px solid #DFDFDF'}}>
				<RouteMapsTableHeader routeId={routeId} />
				<RouteMapsTable routeId={routeId} />
			</Layout>
			<Title level={5} className={'pt-16'}>
				Контрольные точки
			</Title>
			<Layout>
				<ControlPointsTable routeId={routeId} />
			</Layout>
		</Layout>
	);
};

export default Switcher;
