import React, {useState, useEffect} from 'react';
import {Custom, Space, Button, Switch} from 'rt-design';
import {Rnd} from 'react-rnd';
import {Result} from 'antd';
import {
	ArrowLeftOutlined,
	FullscreenOutlined,
	MinusOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';

// import {DebugMarsel} from '../../Debug/DebugMarsel/DebugMarsel';
// import Draggable from 'react-draggable';

const PointsOnMap = (props) => {
	const {
		existPoints = [],
		onChange,
		scale = 1,
		positionX = 0,
		positionY = 0,
		notDraggable = false,
	} = props;
	const [transformStyle, setTransformStyle] = useState(
		`translate3d(${positionX}px, ${positionY}px, 0) scale(${scale})`
	);
	useEffect(() => {
		setTransformStyle(
			`translate3d(${positionX}px, ${positionY}px, 0) scale(${scale})`
		);
		// TransformWrapperRef.current && (TransformWrapperRef.current.state = {scale, positionX, positionY})
		// eslint-disable-next-line
	}, [scale, positionX, positionY]);
	const widthIcon = 36 / scale;
	const heightIcon = 36 / scale;
	if (existPoints)
		return (
			<div style={{transformOrigin: '0% 0%', transform: transformStyle}}>
				{existPoints.map((point, index) => (
					/**
					 * https://www.npmjs.com/package/react-rnd -  документация по пакету.
					 *
					 *
					 * props position не корректный он сделан лишь для наглядности
					 */
					<Rnd
						key={`${index}-${point.id}`}
						bounds={'.routeMapImage'}
						size={{width: widthIcon, height: heightIcon}}
						disableDragging={!notDraggable}
						enableResizing={false}
						style={{
							background: '#39839D',
							textAlign: 'center',
							color: 'white',
							clipPath:
								' polygon(61% 0, 98% 37%, 46% 100%, 0 64%, 0 0)',
							padding: `${10 / scale}px 0`,
							fontSize: `${12 / scale}px`,
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
				))}
			</div>
		);
	else return null;
};

const RouteMap = () => {
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
								// 	<DebugMarsel src={src} />
								<TransformWrapper
									centerZoomedOut={true}
									maxScale={3}
									onWheel={onChange}
									onPanning={onChange}
									onPinching={onChange}
									onZoom={onChange}
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
														<Switch
															itemProps={{
																name: `switchMode`,
																valuePropName:
																	'checked',
															}}
															dispatch={{
																path: 'routeMaps.mainForm.editMode',
															}}
															subscribe={[
																{
																	name: 'onSelectedRouteMap',
																	path: 'rtd.routeMaps.mainForm.routeMapsTable.selected',
																	onChange: ({
																		value,
																		setSubscribeProps,
																	}) => {
																		console.log(
																			'trigger'
																		);
																		setSubscribeProps(
																			{
																				checked:
																					!value,
																			}
																		);
																	},
																},
															]}
														/>
														<Button
															icon={
																<PlusOutlined />
															}
															onClick={() =>
																zoomIn()
															}
															disabled={true}
														/>
														<Button
															icon={
																<MinusOutlined />
															}
															onClick={() =>
																zoomOut()
															}
															disabled={true}
														/>
														<Button
															icon={
																<FullscreenOutlined />
															}
															onClick={() =>
																resetTransform()
															}
															disabled={true}
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
				dispatch={{
					path: 'routeMaps.mainForm.routeMapPoints.onChange',
				}}
				subscribe={[
					{
						/** Action change controlPoints in routeMap*/
						// Обновить точки при изменении карты (картинки)
						// extraData - точки
						name: 'onSelectedRouteMap',
						path: 'rtd.routeMaps.mainForm.routeMapsTable.selected',
						extraData: {
							rows: 'rtd.routeMaps.mainForm.controlPointsTable.rows',
							dragging: `rtd.routeMaps.mainForm.editMode`,
						},
						onChange: ({value, extraData, setSubscribeProps}) => {
							if (value && Array.isArray(extraData.rows)) {
								const points = extraData.rows.filter(
									(item) => item.routeMapId === value.id
								);
								setSubscribeProps({
									existPoints: points,
									notDraggable: extraData.dragging,
								});
							}
						},
					},
					{
						/** Action change controlPoints coordinate in table*/
						// Обновить точки при изменении таблицы с точками
						// extraData - выбранная карт (картинка)
						name: 'onChangeControlPoints',
						path: 'rtd.routeMaps.mainForm.controlPointsTable.rows',
						extraData: {
							selected:
								'rtd.routeMaps.mainForm.routeMapsTable.selected',
							dragging: `rtd.routeMaps.mainForm.editMode`,
						},
						onChange: ({value, extraData, setSubscribeProps}) => {
							if (extraData.selected && Array.isArray(value)) {
								const points = value.filter(
									(item) =>
										item.routeMapId ===
										extraData.selected.id
								);
								setSubscribeProps({
									existPoints: points,
									notDraggable: extraData.dragging,
								});
							}
						},
					},
					{
						/** Action zoom*/
						name: 'zoomAction',
						path: 'rtd.routeMaps.mainForm.routeMapPoints.zoomSection',
						extraData: `rtd.routeMaps.mainForm.editMode`,
						onChange: ({value, setSubscribeProps, extraData}) => {
							// console.log(
							//     'zoomAction => ',
							//     value.value && value.value.state
							// );
							value &&
								value.value &&
								setSubscribeProps({
									scale: value.value.state.scale,
									positionX: value.value.state.positionX,
									positionY: value.value.state.positionY,
									notDraggable: extraData,
								});
							/**
							 * выходит ошибка(Уже неактуально)
							 * TypeError: Failed to execute 'requestAnimationFrame' on 'Window': parameter 1 is not of type 'Function'.
							 * */
						},
					},
					{
						/**Action switch draggable */
						name: 'switchDraggable',
						path: `rtd.routeMaps.mainForm.editMode`,
						extraData: {
							rows: 'rtd.routeMaps.mainForm.controlPointsTable.rows',
							selected:
								'rtd.routeMaps.mainForm.routeMapsTable.selected',
						},
						onChange: ({value, extraData, setSubscribeProps}) => {
							console.log(value);
							if (
								extraData.selected &&
								Array.isArray(extraData.rows)
							) {
								const points = extraData.rows.filter(
									(item) =>
										item.routeMapId ===
										extraData.selected.id
								);
								setSubscribeProps({
									existPoints: points,
									notDraggable: value,
								});
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
