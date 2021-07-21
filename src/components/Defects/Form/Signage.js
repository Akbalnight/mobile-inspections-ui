import React, {useEffect, useState} from 'react';
import {Form, FormBody, Layout, Table, Space, Text} from 'rt-design';
import {customColumnProps} from '../tableProps';
import {
	apiGetUnAuthConfigByName,
	apiGetUnAuthData,
} from '../../../apis/catalog.api';
import logoSignage from '../../../imgs/logo-signage.png';
import '../Registry/Defects.less';
import {Spin} from 'antd';
import {Pie} from 'react-chartjs-2';

export const Signage = () => {
	const [defectsCounter, setDefectsCounter] = useState({
		detected: 0,
		eliminate: 0,
		expired: 0,
		atWork: 0,
		newDetect: 0,
		validInfo: 0,
	});
	const [tableVar, setTableVar] = useState({
		pageSize: 8,
		countPages: 0,
		rows: [],
	});

	const memoDataByChart = {
		datasets: [
			{
				data: [
					defectsCounter.eliminate,
					defectsCounter.expired,
					defectsCounter.atWork,
					defectsCounter.newDetect,
				],
				backgroundColor: ['#024B6C', '#EC6546', '#0475A7', '#FAB610'],
			},
		],
	};

	useEffect(() => {
		/** Request data count by defects */
		apiGetUnAuthData(
			'defectsSignage',
			'count'
		)({
			data: {
				viewOnPanel: true,
			},
			params: {},
		})
			.then((resp) =>
				setDefectsCounter((state) => ({...state, detected: resp.data}))
			)
			.catch((err) => console.error());

		/** Request data count by defects */
		apiGetUnAuthData(
			'defectsSignage',
			'count'
		)({
			data: {
				statusIds: [
					'04d98b77-f4c7-46ed-be25-b01b035027fd',
					'ce4e57eb-ae8f-4648-98ec-410808da380e',
					'e07a6417-840e-4743-a4f0-45da6570743f',
				],
			},
			params: {},
		})
			.then((resp) =>
				setDefectsCounter((state) => ({...state, validInfo: resp.data}))
			)
			.catch((err) => console.error());

		/** Request data count by defect status 'Устранен'*/
		apiGetUnAuthData(
			'defectsSignage',
			'count'
		)({
			data: {
				statusId: '418406b1-8f78-4448-96e1-8caa022fe242',
			},
			params: {},
		})
			.then((resp) =>
				setDefectsCounter((state) => ({...state, eliminate: resp.data}))
			)
			.catch((err) => console.error());

		/** Request data count by defect status 'Просрочен'*/
		apiGetUnAuthData(
			'defectsSignage',
			'count'
		)({
			data: {
				statusId: '04d98b77-f4c7-46ed-be25-b01b035027fd',
			},
			params: {},
		})
			.then((resp) =>
				setDefectsCounter((state) => ({...state, expired: resp.data}))
			)
			.catch((err) => console.error());

		/** Request data count by defect status 'В работе'*/
		apiGetUnAuthData(
			'defectsSignage',
			'count'
		)({
			data: {
				statusId: 'ce4e57eb-ae8f-4648-98ec-410808da380e',
			},
			params: {},
		})
			.then((resp) =>
				setDefectsCounter((state) => ({...state, atWork: resp.data}))
			)
			.catch((err) => console.error());

		/** Request data count by defect status 'Новый'*/
		apiGetUnAuthData(
			'defectsSignage',
			'count'
		)({
			data: {
				statusId: 'e07a6417-840e-4743-a4f0-45da6570743f',
			},
			params: {},
		})
			.then((resp) =>
				setDefectsCounter((state) => ({...state, newDetect: resp.data}))
			)
			.catch((err) => console.error());
	}, []);

	useEffect(() => {
		const currentTimeout = 5000;
		if (tableVar.countPages < defectsCounter.validInfo) {
			setTimeout(() => {
				return apiGetUnAuthData(
					'defectsSignage',
					'flat'
				)({
					data: {
						statusIds: [
							'04d98b77-f4c7-46ed-be25-b01b035027fd',
							'ce4e57eb-ae8f-4648-98ec-410808da380e',
							'e07a6417-840e-4743-a4f0-45da6570743f',
						],
						viewOnPanel: true,
					},
					params: {
						page:
							tableVar.countPages !== 0
								? tableVar.countPages / tableVar.pageSize
								: tableVar.countPages,
						size: tableVar.pageSize,
					},
				})
					.then((resp) =>
						setTableVar((state) => ({
							...state,
							rows: [...resp.data],
							countPages:
								state.countPages + state.pageSize <
								defectsCounter.validInfo
									? state.countPages + state.pageSize
									: defectsCounter.validInfo,
						}))
					)
					.catch((err) => console.error());
			}, currentTimeout);
		} else if (
			tableVar.countPages === defectsCounter.validInfo &&
			tableVar.countPages > tableVar.pageSize
		) {
			setTimeout(() => {
				apiGetUnAuthData(
					'defectsSignage',
					'flat'
				)({
					data: {
						statusIds: [
							'04d98b77-f4c7-46ed-be25-b01b035027fd',
							'ce4e57eb-ae8f-4648-98ec-410808da380e',
							'e07a6417-840e-4743-a4f0-45da6570743f',
						],
						viewOnPanel: true,
					},
					params: {
						page: 0,
						size: tableVar.pageSize,
					},
				})
					.then((resp) =>
						setTableVar((state) => ({
							...state,
							rows: [...resp.data],
							countPages: tableVar.pageSize,
						}))
					)
					.catch((err) => console.error());
				// setTableVar((state) => ({...state, rows: [], countPages: 10}));
			}, currentTimeout);
		}
	}, [tableVar.countPages, tableVar.pageSize, defectsCounter.validInfo]);

	return (
		<Form>
			<FormBody noPadding={true}>
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
								label={defectsCounter.newDetect}
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
								label={
									defectsCounter.atWork
										? defectsCounter.atWork
										: '0'
								}
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
								label={
									defectsCounter.expired
										? defectsCounter.expired
										: '0'
								}
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
								label={
									defectsCounter.eliminate
										? defectsCounter.eliminate
										: '0'
								}
							/>
						</Space>
						<Space direction={'vertical'}>
							<Text label={'Всего'} />
							<Text
								itemProps={{name: 'detectCount'}}
								className={'detectCount'}
								dispatch={{
									path: 'defects.defectsSignageTable.reload',
								}}
								label={
									defectsCounter.detected
										? defectsCounter.detected
										: '0'
								}
							/>
						</Space>
						<Space className={'chartPie'}>
							<Pie
								data={memoDataByChart}
								options={{
									animation: {
										duration: 0,
									},
								}}
								width={120}
								height={120}
							/>
						</Space>
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
						headerHeight={70}
						rowHeight={70}
						// defaultSortBy={{
						// 	key: 'dateDetectDefect',
						// 	order: 'desc',
						// }}
						empty={
							<div
								className={'BaseTable__overlay custom__overlay'}
							>
								<Spin
									tip='Обновляем данные...'
									size={'large'}
									className={'no__bg'}
									style={{background: 'none'}}
								/>
							</div>
						}
						zebraStyle={true}
						dispatch={{path: 'defects.defectsSignageTable.table'}}
						customColumnProps={customColumnProps}
						rows={tableVar.rows}
						requestLoadConfig={apiGetUnAuthConfigByName(
							'defectsSignage'
						)}
						// subscribe={[
						// 	/** This situation we make force reload in table. You change timeout which you need*/
						// 	{
						// 		name: 'forceReload',
						// 		path: 'rtd.defects.defectsSignageTable.reload',
						// 		onChange: ({reloadTable}) => {
						// 			setTimeout(
						// 				() =>
						// 					reloadTable({
						// 						sortBy: {
						// 							key: 'dateDetectDefect',
						// 							order: 'desc',
						// 						},
						// 					}),
						// 				//600000
						// 				10000
						// 			);
						// 		},
						// 	},
						// ]}
					/>
				</Layout>
			</FormBody>
		</Form>
	);
};
