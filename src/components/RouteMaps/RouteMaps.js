import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import SplitPane from 'react-split-pane';
import {useParams} from 'react-router';
import LeftSide from './LeftSide/LeftSide';
import RouteMap from './RouteMap/RouteMap';

export const AddRouteMaps = () => {
	return (
		<BasePage>
			<RouteMaps />
		</BasePage>
	);
};

export const EditRouteMaps = () => {
	const pageParams = useParams();
	return (
		<BasePage>
			<RouteMaps routeId={pageParams.id} />
		</BasePage>
	);
};

/**
 * @returns {JSX.object}
 * @desc RouteMaps component where you select choice connect with Drag'n'Drop field(package RnD)
 * @desc When you select Route, switcher change you view on two information table which current Route
 */
const RouteMaps = (props) => {
	const {routeId} = props;

	const onSelectRouteMap = ({value, extraData, setSubscribeProps}) => {
		if (value && Array.isArray(extraData)) {
			const points = extraData.filter(
				(item) => item.routeMapId === value.id
			);
			// console.log('onSelectRouteMap => ', points.length);
			setSubscribeProps({src: value.fileUrl, existPoints: points});
		}
	};

	const onChangeTablePoints = ({value, extraData, setSubscribeProps}) => {
		if (extraData && Array.isArray(value)) {
			const points = value.filter(
				(item) => item.routeMapId === extraData.id
			);
			// console.log('onSelectRouteMap => ', {src: value.fileUrl, existPoints: points})
			setSubscribeProps({existPoints: points});
		}
	};

	return (
		<SplitPane
			className={'routeMaps'}
			split='vertical'
			minSize={500}
			maxSize={700}
			defaultSize={500}
			// defaultSize={250}
			pane2Style={{overflow: 'auto'}}
		>
			<div className={'routeMapsConfig'}>
				<LeftSide routeId={routeId} />
			</div>
			<div className={'routeMapsContainer'}>
				{routeId && (
					<Form>
						<RouteMap
							subscribe={[
								{
									/** Action change controlPoints in routeMap*/
									// Обновить точки при изменении карты (картинки)
									// extraData - точки
									name: 'routeMap',
									path: 'rtd.routeMaps.routeMapsTable.selected',
									extraData:
										'rtd.routeMaps.controlPointsTable.rows',
									onChange: onSelectRouteMap,
								},
								{
									/** Action change controlPoints coordinate in table*/
									// Обновить точки при изменении таблицы с точками
									// extraData - выбранная карт (картинка)
									name: 'onChangeControlPoints',
									path: 'rtd.routeMaps.controlPointsTable.rows',
									extraData:
										'rtd.routeMaps.routeMapsTable.selected',
									onChange: onChangeTablePoints,
								},
							]}
						/>
					</Form>
				)}
			</div>
		</SplitPane>
	);
};
