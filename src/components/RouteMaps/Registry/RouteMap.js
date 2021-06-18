import React, {useEffect} from 'react';
import {classic} from 'rt-design';
import {Rnd} from 'react-rnd';
import {Result} from 'antd';
import {
	ArrowLeftOutlined,
	FullscreenOutlined,
	MinusOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';

const {Custom, Space, Button} = classic;

// let scale
const PointsOnMap = (props) => {
	const {
		existPoints = [],
		onChange,
		scale = 1,
		positionX = 0,
		positionY = 0,
	} = props;
	useEffect(() => {
		// onChange && onChange(scale);
		console.log({scale, positionX, positionY});
		// eslint-disable-next-line
	}, [scale]);
	if (existPoints)
		return existPoints.map((point, index) => (
			/**
			 * https://www.npmjs.com/package/react-rnd -  документация по пакету.
			 *
			 *
			 * props position не корректный он сделан лишь для наглядности
			 */
			<Rnd
				key={`${index}-${point.id}`}
				bounds={'.routeMapImage'}
				size={{width: 32, height: 32}}
				position={{
					x: (point.xLocation + positionX) * scale,
					y: (point.yLocation + positionY) * scale,
				}}
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
				scale={scale}
			>
				<div>{point.position}</div>
			</Rnd>
		));
	else return null;
};

const RouteMap = () => {
	/**
	 * Я дошел до вот такой статьи https://habr.com/ru/company/yandex/blog/559442/
	 *
	 * В изначально, были проблемы с сущностью https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
	 *
	 *
	 *
	 * */
	return (
		<div className={'routeMapContainer'}>
			<Custom
				itemProps={{name: 'routeMap'}}
				dispatch={{
					path: 'routeMaps.mainForm.routeMapPoints.zoomSection',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'routeMap',
						path: 'rtd.routeMaps.mainForm.routeMapsTable.selected',
						onChange: ({value, setSubscribeProps}) => {
							value && setSubscribeProps({src: value.fileUrl});
						},
					},
				]}
				render={({src, onChange}) => {
					return (
						<>
							{src ? (
								<TransformWrapper
									// wheel={{
									// 	disabled: true,
									// }}
									onZoomStop={onChange}
								>
									{({
										zoomIn,
										zoomOut,
										resetTransform,
										...rest
									}) => {
										return (
											<>
												<Space
													style={{
														width: '95%',
														justifyContent:
															'flex-end',
													}}
													className={'px-8'}
												>
													<Space
														direction={'vertical'}
														className={
															'buttonBlock'
														}
													>
														<Button
															icon={
																<PlusOutlined />
															}
															onClick={() =>
																zoomIn()
															}
														/>
														<Button
															icon={
																<MinusOutlined />
															}
															onClick={() =>
																zoomOut()
															}
														/>
														<Button
															icon={
																<FullscreenOutlined />
															}
															onClick={() =>
																resetTransform()
															}
														/>
													</Space>
												</Space>
												<TransformComponent>
													<img
														className={
															'routeMapImage'
														}
														src={src}
														alt={`Маршрутная карта`}
													/>
												</TransformComponent>
											</>
										);
									}}
								</TransformWrapper>
							) : (
								<Result
									title='Выберите маршрутную карту'
									extra={<ArrowLeftOutlined />}
								/>
							)}
						</>
					);
				}}
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
					{
						name: 'zoomAction',
						path: 'rtd.routeMaps.mainForm.routeMapPoints.zoomSection',
						onChange: ({value, setSubscribeProps}) => {
							console.log({value});
							value &&
								value.value &&
								setSubscribeProps({
									scale: value.value.state.scale,
									positionX: value.value.state.positionX,
									positionY: value.value.state.positionY,
								});
							/**
							 * выходит ошибка(Уже неактуально)
							 * TypeError: Failed to execute 'requestAnimationFrame' on 'Window': parameter 1 is not of type 'Function'.
							 * */
						},
					},
				]}
				render={PointsOnMap}
			/>
		</div>
	);
};

export default RouteMap;
