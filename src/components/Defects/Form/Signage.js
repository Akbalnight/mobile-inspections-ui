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

export const Signage = () => {
	const [defectsCounter, setDefectsCounter] = useState({
		detected: 0,
		eliminate: 0,
		sendToPanel: 0,
		validInfo: 0,
	});
	const [tableVar, setTableVar] = useState({
		pageSize: 8,
		countPages: 0,
		rows: [],
	});

	useEffect(() => {
		/** Request data count by defects */
		apiGetUnAuthData(
			'defectsSignage',
			'count'
		)({
			data: {},
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
					'1864073a-bf8d-4df2-b02d-8e5afa63c4d0',
					'879f0adf-0d96-449e-bcee-800f81c4e58d',
					'df7d1216-6eb7-4a00-93a4-940047e8b9c0',
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
				statusId: '16f09a44-11fc-4f82-b7b5-1eb2e812d8fa',
			},
			params: {},
		})
			.then((resp) =>
				setDefectsCounter((state) => ({...state, eliminate: resp.data}))
			)
			.catch((err) => console.error());

		/** Request data count by defect viewOnPanel */
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
				setDefectsCounter((state) => ({
					...state,
					sendToPanel: resp.data,
				}))
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
							'1864073a-bf8d-4df2-b02d-8e5afa63c4d0',
							'879f0adf-0d96-449e-bcee-800f81c4e58d',
							'df7d1216-6eb7-4a00-93a4-940047e8b9c0',
						],
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
							'1864073a-bf8d-4df2-b02d-8e5afa63c4d0',
							'879f0adf-0d96-449e-bcee-800f81c4e58d',
							'df7d1216-6eb7-4a00-93a4-940047e8b9c0',
						],
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
					<img src={logoSignage} style={{height: '100px'}} />
					<Space className={'defect-info'} size={32}>
						<Space
							direction={'vertical'}
							className={'counter-container'}
						>
							<Text label={'Обнаружено'} />
							<Text
								itemProps={{name: 'detectCount'}}
								className={'detectCount'}
								dispatch={{
									path: 'defects.defectsSignageTable.reload',
								}}
								label={defectsCounter.detected}
							/>
						</Space>
						<Space
							direction={'vertical'}
							className={'counter-container'}
						>
							<Text label={'Передано в ПП'} />
							<Text
								itemProps={{name: 'sendPanelCount'}}
								className={'sendPanelCount'}
								label={defectsCounter.sendToPanel}
							/>
						</Space>
						<Space direction={'vertical'}>
							<Text label={'Устранено'} />
							<Text
								itemProps={{name: 'eliminateCount'}}
								className={'eliminateCount'}
								label={defectsCounter.eliminate}
							/>
						</Space>
					</Space>
					<Text
						className={'pager'}
						label={`Дефектов ${tableVar.countPages}/${defectsCounter.validInfo}`}
					/>
				</Space>
				<Layout className={'signage'}>
					<Table
						rowKey={'id'}
						type={'rt'}
						// fixWidthColumn={true}
						headerHeight={70}
						rowHeight={70}
						defaultSortBy={{
							key: 'dateDetectDefect',
							order: 'desc',
						}}
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
						subscribe={[
							/** This situation we make force reload in table. You change timeout which you need*/
							{
								name: 'forceReload',
								path: 'rtd.defects.defectsSignageTable.reload',
								onChange: ({reloadTable}) => {
									setTimeout(
										() =>
											reloadTable({
												sortBy: {
													key: 'dateDetectDefect',
													order: 'desc',
												},
											}),
										//600000
										10000
									);
								},
							},
						]}
					/>
				</Layout>
			</FormBody>
		</Form>
	);
};
