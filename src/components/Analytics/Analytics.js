import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {useParams} from 'react-router';
import SplitPane from 'react-split-pane';
import {ConfigSide} from './LeftSide/ConfigSide';

export const AnalyticsMain = () => {
	return (
		<BasePage>
			<Analytics />
		</BasePage>
	);
};
export const AnalyticsById = () => {
	const pageParams = useParams();
	return (
		<BasePage>
			<Analytics analyticId={pageParams.id} />
		</BasePage>
	);
};

const Analytics = ({analyticId}) => {
	// maybe analyticId be configName

	return (
		<SplitPane
			className={'analytics'}
			split='vertical'
			minSize={300}
			maxSize={500}
			defaultSize={350}
			pane2Style={{overflow: 'auto'}}
		>
			<div className={'analyticsConfig'}>
				<ConfigSide analyticId={analyticId} />
			</div>
			<div className={'analyticsContainer'}>2</div>
		</SplitPane>
	);
};
