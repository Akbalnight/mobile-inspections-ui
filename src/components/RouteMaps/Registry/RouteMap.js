import React from 'react';
import {Custom} from 'rt-design';
import {Rnd} from 'react-rnd';
import {Result} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

const PointsOnMap = (props) => {
	const {existPoints = [], onChange} = props;
	if (existPoints)
		return existPoints.map((point, index) => (
			/**
			 * https://www.npmjs.com/package/react-rnd -  документация по пакету.
			 */
			<Rnd
				key={`${index}-${point.id}`}
				bounds={'.routeMapImage'}
				size={{width: 32, height: 32}}
				style={{
					background: '#39839D',
					textAlign: 'center',
					color: 'white',
					clipPath:
						'polygon(50% 0%, 83% 5%, 99% 29%, 78% 65%, 51% 100%, 53% 100%, 25% 66%, 0 29%, 15% 7%)',
				}}
				onDragStop={(e, d) => {
					// сохранение новых координат
					const savePoint = {...point};
					savePoint.xLocation = d.x;
					savePoint.yLocation = d.y;
					onChange(savePoint);
				}}
				default={{x: point.xLocation, y: point.yLocation}}
				scale={1}
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
							value && setSubscribeProps({src: value.fileUrl});
						},
					},
				]}
				render={({src}) => (
					<>
						{src ? (
							<img
								className={'routeMapImage'}
								src={src}
								alt={`Маршрутная карта`}
							/>
						) : (
							<Result
								title='Выберите маршрутную карту'
								extra={<ArrowLeftOutlined />}
							/>
						)}
					</>
				)}
			/>
			<Custom
				itemProps={{name: 'routeMapPoints'}}
				dispatch={{path: 'routeMaps.mainForm.routeMapPoints.onChange'}}
				subscribe={[
					{
						/** Action change controlPoints in routeMap*/
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
								setSubscribeProps({existPoints: points});
							}
						},
					},
					{
						/** Action change controlPoints coordinate in table*/
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
