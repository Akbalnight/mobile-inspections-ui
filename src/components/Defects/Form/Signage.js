import React, {useEffect, useState} from 'react';
import {Form, FormBody, Layout, Table, Space, Text} from 'rt-design';
import {setDateStore} from 'rt-design/lib/redux/rtd.actions';
import {customColumnProps} from '../tableProps';
import {
	apiGetUnAuthConfigByName,
	apiGetUnAuthData,
} from '../../../apis/catalog.api';
import logoSignage from '../../../imgs/logo-signage.png';
import '../Registry/Defects.less';
// import {Pie} from 'react-chartjs-2';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import moment from 'moment';

const version = process && process.env && process.env.REACT_APP_VERSION;

const DATA_TABLE = {
	viewOnPanel: true,
	statusIds: [
		'e07a6417-840e-4743-a4f0-45da6570743f', // newDetect
		'ce4e57eb-ae8f-4648-98ec-410808da380e', // atWork
		'04d98b77-f4c7-46ed-be25-b01b035027fd', // expired
	],
};
const DATA_COUNTERS = {
	newDetect: {
		viewOnPanel: true,
		statusId: 'e07a6417-840e-4743-a4f0-45da6570743f',
	},
	atWork: {
		viewOnPanel: true,
		statusId: 'ce4e57eb-ae8f-4648-98ec-410808da380e',
	},
	expired: {
		viewOnPanel: true,
		statusId: '04d98b77-f4c7-46ed-be25-b01b035027fd',
	},
	eliminate: {
		viewOnPanel: true,
		statusId: '418406b1-8f78-4448-96e1-8caa022fe242',
	},
	detected: {viewOnPanel: true},
	validInfo: DATA_TABLE,
};

export const Signage = () => {
	const dispatch = useDispatch();
	const [signageParams, setSignageParams] = useState({
		timeoutUpdate: 5000,
		pageSize: 8,
		fixWidthColumn: false,
		headerHeight: 70,
		rowHeight: 70,
		counterReload: 1,
	});
	const [defectsCounter, setDefectsCounter] = useState({
		newDetect: 0,
		atWork: 0,
		expired: 0,
		eliminate: 0,
		detected: 0,
		validInfo: 0,
	});
	const [pageNum, setPageNum] = useState(0);
	const [statistics, setStatistics] = useState({
		timeOfWorkToday: 0,
		timeOfWorkAfterLastReload: 0,
		counter: 0,
	});

	// const memoDataByChart = {
	// 	datasets: [
	// 		{
	// 			data: [
	// 				defectsCounter.eliminate,
	// 				defectsCounter.expired,
	// 				defectsCounter.atWork,
	// 				defectsCounter.newDetect,
	// 			],
	// 			backgroundColor: ['#024B6C', '#EC6546', '#0475A7', '#FAB610'],
	// 		},
	// 	],
	// };

	useEffect(() => {
		loadConfig();
		loadCounters();
		setInterval(() => {
			dispatch(
				setDateStore('defects.defectsSignage.events.onReload', {
					timestamp: moment(),
				})
			);
		}, signageParams.timeoutUpdate);
		// eslint-disable-next-line
	}, []); // tableVar.rows

	const loadConfig = () => {
		axios
			.get('/SignageParams.json')
			.then((res) => setSignageParams(res.data));
	};
	const loadCounters = () => {
		for (const key in DATA_COUNTERS) {
			// console.log("DATA_COUNTERS key => ", key);
			apiGetUnAuthData({
				configName: 'defectsSignage',
				mode: 'count',
				data: DATA_COUNTERS[key],
				params: {},
			})
				.then((resp) =>
					setDefectsCounter((state) => ({...state, [key]: resp.data}))
				)
				.catch((err) => console.log(err));
		}
	};

	const requestLoadRowsHandler = () => {
		const tableCount = pageNum * signageParams.pageSize;
		const serverCount = defectsCounter.validInfo;
		const _pageNum = tableCount < serverCount ? pageNum : 0;
		// console.log("_pageNum => ", statistics.counter, signageParams.counterReload, statistics.counter >= signageParams.counterReload, _pageNum)
		if (
			statistics.counter >= signageParams.counterReload &&
			_pageNum === 0
		) {
			window.location.reload(true);
		}
		setPageNum(_pageNum + 1);
		setStatistics((state) => ({...state, counter: state.counter + 1}));
		// console.log(`Page num: [${pageNum}] Table count: [${tableCount}], Server count: [${serverCount}] `)
		// console.log(navigator.userAgent)
		return apiGetUnAuthData({
			configName: 'defectsSignage',
			mode: 'flat',
			data: DATA_TABLE,
			params: {
				page: _pageNum,
				size: signageParams.pageSize,
			},
		})
			.then((resp) => {
				// console.log("Successfully load rows");
				loadCounters();
				return new Promise((resolve) => resolve(resp));
			})
			.catch((err) => {
				console.log('Failed load rows');
				return new Promise((resolve, reject) => reject(err));
			});
	};

	return (
		<Form>
			<FormBody noPadding={true}>
				<Space style={{position: 'absolute', top: 25, left: 86}}>
					<div>Счетчик: {statistics.counter}</div>
					{/*<div>Циклы: {parseInt(tableVar.seconds / 60)}:{tableVar.seconds % 60}</div>*/}
					<div>Версия: {version}</div>
				</Space>
				<Space className={'signage-header'}>
					<img
						src={logoSignage}
						style={{height: '100px'}}
						alt={'logo'}
					/>
					<Space className={'defect-info'} size={32}>
						<Space
							direction={'vertical'}
							className={'counter-container'}
						>
							<Text label={'Новый'} />
							<Text
								itemProps={{name: 'newDetectCount'}}
								className={'newDetectCount'}
								label={defectsCounter.newDetect || '0'}
							/>
						</Space>
						<Space
							direction={'vertical'}
							className={'counter-container'}
						>
							<Text label={'В работе'} />
							<Text
								itemProps={{name: 'atWorkCount'}}
								className={'atWorkCount'}
								label={defectsCounter.atWork || '0'}
							/>
						</Space>
						<Space
							direction={'vertical'}
							className={'counter-container'}
						>
							<Text label={'Просрочен'} />
							<Text
								itemProps={{name: 'expiredCount'}}
								className={'expiredCount'}
								label={defectsCounter.expired || '0'}
							/>
						</Space>
						<Space
							direction={'vertical'}
							className={'counter-container'}
						>
							<Text label={'Устранен'} />
							<Text
								itemProps={{name: 'eliminateCount'}}
								className={'eliminateCount'}
								label={defectsCounter.eliminate || '0'}
							/>
						</Space>
						<Space direction={'vertical'}>
							<Text label={'Всего'} />
							<Text
								itemProps={{name: 'detectCount'}}
								className={'detectCount'}
								// dispatch={{
								// 	path: 'defects.defectsSignageTable.reload',
								// }}
								label={defectsCounter.detected || '0'}
							/>
						</Space>
						{/*<Pie*/}
						{/*	className={'chartPie'}*/}
						{/*	data={memoDataByChart}*/}
						{/*	options={{*/}
						{/*		plugins: {legend: {display: false}},*/}
						{/*		animation: {duration: 0},*/}
						{/*	}}*/}
						{/*/>*/}
					</Space>
					{/*<Text*/}
					{/*	className={'pager'}*/}
					{/*	label={`Дефектов ${tableVar.countPages}/${defectsCounter.validInfo}`}*/}
					{/*/>*/}
				</Space>
				<Layout className={'signage'}>
					<Table
						rowKey={'id'}
						type={'rt'}
						// fixWidthColumn={true}
						fixWidthColumn={signageParams.fixWidthColumn}
						headerHeight={signageParams.headerHeight}
						rowHeight={signageParams.rowHeight}
						// empty={
						// 	<div
						// 		className={'BaseTable__overlay custom__overlay'}
						// 	>
						// 		<Spin
						// 			tip='Обновляем данные...'
						// 			size={'large'}
						// 			className={'no__bg'}
						// 			style={{background: 'none'}}
						// 		/>
						// 	</div>
						// }
						zebraStyle={true}
						// dispatch={{path: 'defects.defectsSignageTable.table'}}
						customColumnProps={customColumnProps}
						// rows={tableVar.rows}
						requestLoadConfig={apiGetUnAuthConfigByName(
							'defectsSignage'
						)}
						requestLoadRows={requestLoadRowsHandler}
						subscribe={[
							{
								name: 'onSearch',
								path: 'rtd.defects.defectsSignage.events.onReload',
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},
						]}
						// dispatch={{path: 'defects.defectTable.table'}}
						// req={}
					/>
				</Layout>
			</FormBody>
		</Form>
	);
};
