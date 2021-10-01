import React, {useEffect, useState} from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {useParams} from 'react-router';
import SplitPane from 'react-split-pane';
import {ConfigSide} from './ConfigSide/ConfigSide';
import {Form, notificationError, Space, Title, FormBody} from 'rt-design';
import {LeftOutlined} from '@ant-design/icons';
import {AnalyticHistory} from './AnalyticHistory/AnalyticHistory';
import {apiGetFlatDataByConfigName} from '../../apis/application.api';

export const AnalyticsMain = ({match: {title}}) => {
	return (
		<BasePage title={title}>
			<Analytics />
		</BasePage>
	);
};
export const AnalyticsById = ({match: {title}}) => {
	const pageParams = useParams();
	const [analyticById, setAnalyticById] = useState({
		title: 'Аналитика и отчетность',
	});

	useEffect(() => {
		apiGetFlatDataByConfigName('analyticReports')({
			data: {id: pageParams.id},
		})
			.then(({data}) =>
				setAnalyticById({...data[0], title: data[0].name})
			)
			.catch((error) =>
				notificationError(error, 'Ошибка загрузки данных формы')
			);
	}, [pageParams.id]);

	// console.log("AnalyticsById => ", analyticById)
	return (
		<BasePage
			goBack={true}
			title={analyticById.name}
			extraPaths={[analyticById]}
		>
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
			defaultSize={400}
			pane2Style={{overflow: 'auto'}}
		>
			<div className={'analyticsConfig'}>
				<ConfigSide analyticId={analyticId} />
			</div>
			<div className={'analyticsContainer'}>
				{analyticId ? (
					<Form>
						<FormBody scrollable={false} noPadding={true}>
							<AnalyticHistory analyticId={analyticId} />
						</FormBody>
					</Form>
				) : (
					<Space style={{margin: 'auto'}}>
						<LeftOutlined
							style={{fontSize: '32px', color: '#1890ff'}}
						/>
						<Title
							level={2}
							style={{marginBottom: '2px', color: '#1890ff'}}
						>
							Выберите отчет
						</Title>
					</Space>
				)}
			</div>
		</SplitPane>
	);
};
