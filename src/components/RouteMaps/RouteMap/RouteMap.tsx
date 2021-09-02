import React, {useState} from 'react';
import {MapContainer} from 'react-leaflet';
import L from 'leaflet';
import {Space, Title, withStore} from 'rt-design';
import {LeftOutlined} from '@ant-design/icons';
import {ImageLayer} from './ImageLayer';
import {MarkersLayer} from './MarkersLayer';

const RouteMap = withStore((props) => {
	const {src, existPoints} = props;

	const ZERO_POINT = {lat: 0.0, lng: 0.0};
	const [bounds, setBounds] = useState(
		new L.LatLngBounds(ZERO_POINT, ZERO_POINT)
	);

	if (src)
		return (
			<MapContainer
				crs={L.CRS.Simple}
				style={{width: '100%', height: '100%'}}
				center={ZERO_POINT}
				zoom={13}
			>
				<ImageLayer src={src} bounds={bounds} setBounds={setBounds} />
				<MarkersLayer
					itemProps={{name: 'routeMapPoints'}}
					dispatch={{
						path: 'routeMaps.data.routeMapPoints',
					}}
					points={existPoints}
					bounds={bounds}
				/>
			</MapContainer>
		);
	else
		return (
			<Space style={{margin: 'auto'}}>
				<LeftOutlined style={{fontSize: '32px', color: '#1890ff'}} />
				<Title
					level={2}
					style={{marginBottom: '2px', color: '#1890ff'}}
				>
					Выберите маршрутную карту
				</Title>
			</Space>
		);
});

export default RouteMap;
