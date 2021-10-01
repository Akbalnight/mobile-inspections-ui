import React from 'react';
import PropTypes from 'prop-types';
import LeftSide from '../../RouteMaps/LeftSide/LeftSide';
import SplitPane from 'react-split-pane';
import {LeftOutlined} from '@ant-design/icons';
import {Layout, Space, Table, Title} from 'rt-design';
// @ts-ignore
import {BasePage} from 'mobile-inspections-base-ui';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/application.api';
import {useHistory} from 'react-router';
import {paths} from '../../../constants/paths';

const Dashboards = ({match: {title}, history}: any) => {
	const onRouteSelect = ({rowData}: any) =>
		history.push(`${paths.MANAGEMENT_DASHBOARDS.path}/${rowData.id}`);

	return (
		<BasePage title={title}>
			<SplitPane
				className={'routeMaps'}
				split='vertical'
				minSize={500}
				maxSize={500}
				defaultSize={500}
				// defaultSize={250}
				pane2Style={{overflow: 'auto'}}
			>
				<Layout className={'dashboards'}>
					<Table
						requestLoadConfig={apiGetConfigByName('dashboards')}
						requestLoadRows={apiGetFlatDataByConfigName(
							'dashboards'
						)}
						onRowClick={onRouteSelect}
					/>
				</Layout>
				<Space style={{margin: 'auto'}}>
					<LeftOutlined
						style={{fontSize: '32px', color: '#1890ff'}}
					/>
					<Title
						level={2}
						style={{marginBottom: '2px', color: '#1890ff'}}
					>
						Выберите dashboard
					</Title>
				</Space>
			</SplitPane>
		</BasePage>
	);
};

Dashboards.propTypes = {};

export default Dashboards;
