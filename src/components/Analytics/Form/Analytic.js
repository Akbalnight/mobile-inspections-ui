import React from 'react';
import SplitPane from 'react-split-pane';
import {Link, useLocation} from 'react-router-dom';
import {Analytics} from '../Registry/Analytics';
import {BasePage} from 'mobile-inspections-base-ui';
import {analyticConfigs} from '../Registry/analyticConfigs';
import {paths} from '../../../constants/paths';
import {List} from 'rt-design';
import {Route, Switch} from 'react-router';
import {Result} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

const ANALYTICS_DATA_PATH = {
	title: 'Аналитика и отчетность',
	path: '/analytics/:name',
	component: Analytics,
};

export const Analytic = () => {
	let {pathname} = useLocation();
	return (
		<BasePage path={pathname} extraPaths={analyticConfigs(paths)}>
			<SplitPane
				className={'analytic'}
				split='vertical'
				minSize={250}
				maxSize={500}
				defaultSize={250}
			>
				<div className={'analyticList'}>
					<List
						dataSource={analyticConfigs(paths)}
						itemLayout={'vertical'}
						renderItem={(item) => (
							<li
								className={
									pathname === item.path ? 'activeReport' : ''
								}
							>
								<Link to={item.path} className={'analyticLink'}>
									{item.title}
								</Link>
							</li>
						)}
					/>
				</div>
				<div className={'AnalyticData'}>
					<Switch>
						{analyticConfigs(paths).map((item, index) => {
							const Component = ANALYTICS_DATA_PATH.component;
							return (
								<Route
									exact
									key={index}
									path={item.path}
									name={item.name}
									render={() => (
										<Component
											mainWay={'analytic'}
											analyticName={item.name}
										/>
									)}
								/>
							);
						})}

						<Route>
							<Result
								title='Выберите отчет'
								extra={<ArrowLeftOutlined />}
							/>
						</Route>
					</Switch>
				</div>
			</SplitPane>
		</BasePage>
	);
};
