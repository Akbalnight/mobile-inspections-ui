import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {
	Form,
	FormBody,
	Button,
	Select,
	Title,
	Layout,
	Table,
	Switcher,
	executeRequest,
} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../apis/catalog.api';
import SplitPane from 'react-split-pane';
import {ArrowUpOutlined, ExclamationCircleTwoTone} from '@ant-design/icons';
import RouteMap from './RouteMap/RouteMap';
import {useParams} from 'react-router';
import {customColumnProps, RouteMapsTableHeader} from './tableProps';
import LeftSide from './LeftSide/LeftSide';

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
 *
 * @returns {JSX.object}
 * @desc RouteMaps component where you select choice connect with Drag'n'Drop field(package RnD)
 *
 * @desc When you select Route, switcher change you view on two information table which current Route
 */
const RouteMaps = (props) => {
	const {routeId} = props;

	return (
		<SplitPane
			className={'routeMaps'}
			split='vertical'
			minSize={500}
			maxSize={700}
			defaultSize={500}
			pane2Style={{overflow: 'auto'}}
		>
			<div className={'routeMapsConfig'}>
				<LeftSide routeId={routeId} />
			</div>
			<div className={'routeMapsContainer'}>
				<Form>
					<RouteMap />
				</Form>
			</div>
		</SplitPane>
	);
};
