import React, {useEffect, useState} from 'react';
// @ts-ignore
import {BasePage} from 'mobile-inspections-base-ui';
// @ts-ignore
import RGL, {WidthProvider} from 'react-grid-layout';

import {Layout, Space} from 'rt-design';
import {withSize} from 'react-sizeme';
import {useHistory, useParams} from 'react-router';
import {apiRequestByMode} from '../../../apis/application.api';
import {LeftOutlined} from '@ant-design/icons';
import {paths} from '../../../constants/paths';
import Logs from './Panels/Logs';

const ReactGridLayout = WidthProvider(RGL);
const startGridWidth = 1200;

interface DashboardPanelProps {
	title?: string;
	type: string;
	params: object | undefined;
	gridPos?: {x: number; y: number; w: number; h: number};
}

interface DashboardGridProps {
	size?: any;
	panels: DashboardPanelProps[] | undefined;
}

interface DashboardProps {
	title: string;
	panels: DashboardPanelProps[] | undefined;
}

const contents = {
	logs: Logs,
};

const DashboardPanel = ({title, type, params}: DashboardPanelProps) => {
	// @ts-ignore
	const Content: any = contents[type];
	return (
		<div className={'dashboard-panel'}>
			<div className={'dashboard-panel-header'}>{title}</div>
			<div className={'dashboard-panel-content'}>
				<Content {...params} />
			</div>
		</div>
	);
};

const DashboardGrid = withSize()(({size, panels}: DashboardGridProps) => {
	const width = size.width > 0 ? size.width : startGridWidth;
	// console.log('Grid dashboard', panels)
	const renderPanels =
		panels &&
		panels.map(({gridPos, ...panel}, index) => (
			<div key={index} data-grid={gridPos}>
				<DashboardPanel {...panel} />
			</div>
		));
	return (
		<ReactGridLayout
			className='layout'
			rowHeight={30}
			cols={12}
			width={width}
			draggableHandle={'.dashboard-panel-header'}
		>
			{renderPanels}
		</ReactGridLayout>
	);
});

const Dashboard = () => {
	const history = useHistory();
	const params = useParams<{id: string}>();
	const [dashboard, setDashboard] = useState<DashboardProps>({
		title: '',
		panels: [],
	});

	useEffect(() => {
		apiRequestByMode('object')('dashboards')({
			data: {id: params.id},
			params: {},
		}).then((res) => setDashboard(JSON.parse(res.data.dashboard)));
		// .catch(notificationError);
	}, [params.id]);

	const onBackPage = () =>
		history.push(`${paths.MANAGEMENT_DASHBOARDS.path}`);

	console.log('dashboard => ', dashboard);
	return (
		<BasePage className={'dashboard'}>
			<Layout style={{width: '100%'}}>
				<Layout style={{padding: '8px'}}>
					<Space
						style={{
							position: 'absolute',
							cursor: 'pointer',
							color: 'rgba(0, 0, 0, 0.45)',
							lineHeight: 1,
							marginTop: '2px',
						}}
						onClick={onBackPage}
					>
						<LeftOutlined style={{fontSize: '16px'}} />
						<div style={{fontSize: '14px', fontWeight: 600}}>
							Назад
						</div>
					</Space>
					<div
						style={{
							margin: 'auto',
							fontSize: '14px',
							fontWeight: 600,
						}}
					>
						{dashboard.title}
					</div>
				</Layout>
				<div
					style={{
						backgroundColor: '#f0f2f5',
						width: '100%',
						height: '100%',
						overflow: 'auto',
					}}
				>
					<DashboardGrid panels={dashboard.panels} />
				</div>
			</Layout>
		</BasePage>
	);
};

export default Dashboard;
