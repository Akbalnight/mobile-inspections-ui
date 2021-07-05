import React from 'react';
import SplitPane from 'react-split-pane';
import {Link, useLocation} from 'react-router-dom';
import {Analytics} from '../Registry/Analytics';
import {BasePage} from 'mobile-inspections-base-ui';
import {analyticConfigs} from '../Registry/analyticConfigs';
import {paths} from '../../../constants/paths';

const ANALYTICS_DATA_PATH = {
	title: 'Аналитика и отчетность',
	path: '/catalog/:name',
	component: Analytics,
};

export const Analytic = () => {
	let {pathname} = useLocation();
	return (
		<BasePage path={pathname} extraPaths={analyticConfigs(paths)}>
			<SplitPane
				className={'analytics'}
				split='vertical'
				minSize={200}
				maxSize={500}
				defaultSize={300}
			>
				<div className={'analyticList'}>
					<List
						dataSource={analyticConfigs(paths)}
						itemLayout={'vertical'}
						// renderItem={}
					/>
				</div>
				<div className={'analyticData'}>2</div>
			</SplitPane>
		</BasePage>
	);
};
