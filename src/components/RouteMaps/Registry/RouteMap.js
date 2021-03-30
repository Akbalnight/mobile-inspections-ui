import React from 'react';
import {classic} from 'rt-design';
import {Rnd} from 'react-rnd';

const {Custom} = classic;

const PointsOnMap = (props) => {
	const {existPoints = [], onChange} = props;
	if (existPoints)
		return existPoints.map((point, index) => (
			<Rnd
				key={`${index}-${point.id}`}
				bounds={'.routeMap'}
				size={{width: 32, height: 32}}
				style={{
					display: 'inline-block!important',
					margin: 20,
					background: '#b7e4c7',
					borderRadius: '0% 31% 100% 62% ',
					textAlign: 'center',
				}}
				onDragStop={(e, d) => {
					// сохранение новых координат
					const savePoint = {...point};
					savePoint.xLocation = d.x;
					savePoint.yLocation = d.y;
					onChange(savePoint);
				}}
				default={{x: point.xLocation, y: point.yLocation}}
			>
				<div>{point.position}</div>
			</Rnd>
		));
	else return null;
};

const RouteMap = () => {
	return (
		<div className={'routeMapContainer'}>
			<Custom
				itemProps={{name: 'routeMap'}}
				subscribe={[
					{
						name: 'routeMap',
						path: 'rtd.routeMaps.mainForm.routeMapsTable.selected',
						onChange: ({value, setSubscribeProps}) => {
							// console.log('Custom img =>', value)
							value && setSubscribeProps({src: value.fileUrl});
						},
					},
				]}
				render={({src}) => (
					<img
						className={'routeMap'}
						src={src}
						alt={`Маршрутная карта`}
					/>
				)}
			/>
			<Custom
				itemProps={{name: 'routeMapPoints'}}
				dispatch={{path: 'routeMaps.mainForm.routeMapPoints.onChange'}}
				subscribe={[
					{
						// Обновить точки при изменении карты (картинки)
						// extraData - точки
						name: 'onSelectedRouteMap',
						path: 'rtd.routeMaps.mainForm.routeMapsTable.selected',
						extraData:
							'rtd.routeMaps.mainForm.controlPointsTable.rows',
						onChange: ({value, extraData, setSubscribeProps}) => {
							if (value && Array.isArray(extraData)) {
								const points = extraData.filter(
									(item) => item.routeMapId === value.id
								);
								// console.log('Custom routeControlPoints =>', points.map(point => [ point.xLocation, point.yLocation] ))
								setSubscribeProps({existPoints: points});
							}
						},
					},
					{
						// Обновить точки при изменении таблицы с точками
						// extraData - выбранная карт (картинка)
						name: 'onChangeControlPoints',
						path: 'rtd.routeMaps.mainForm.controlPointsTable.rows',
						extraData:
							'rtd.routeMaps.mainForm.routeMapsTable.selected',
						onChange: ({value, extraData, setSubscribeProps}) => {
							if (extraData && Array.isArray(value)) {
								const points = value.filter(
									(item) => item.routeMapId === extraData.id
								);
								// console.log('Custom routeControlPoints =>', points.map(point => [ point.xLocation, point.yLocation] ))
								setSubscribeProps({existPoints: points});
							}
						},
					},
				]}
				render={PointsOnMap}
			/>
		</div>
	);
};

export default RouteMap;
