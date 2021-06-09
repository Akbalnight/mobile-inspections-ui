import React, {useEffect, useState} from 'react';
import {classic} from 'rt-design';
import {customColumnProps} from '../tableProps';
import {
	apiGetUnAuthConfigByName,
	apiGetUnAuthFlatData,
	apiGetDataCountByConfigName,
} from '../../../apis/catalog.api';
import {ReactComponent as MainLogo} from '../../../imgs/logo-signage.svg';
import '../Registry/Defects.less';

import {Spin} from 'antd';

const {Form, FormBody, Layout, Table, Space, Text, Divider} = classic;
export const Signage = () => {
	const [defectsCounter, setDefectsCounter] = useState({
		detected: 0,
		eliminate: 0,
		sendToPanel: 0,
		validInfo: 0,
	});
	const [tableVar, setTableVar] = useState({
		pageSize: 10,
		countPages: 0,
		rows: [],
	});

	useEffect(() => {
		/** Request data count by defects */
		apiGetDataCountByConfigName('defectsSignage')({
			data: {},
			params: {},
		})
			.then((resp) =>
				setDefectsCounter((state) => ({...state, detected: resp.data}))
			)
			.catch((err) => console.error());

		/** Request data count by defects */
		apiGetDataCountByConfigName('defectsSignage')({
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
		apiGetDataCountByConfigName('defectsSignage')({
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
		apiGetDataCountByConfigName('defectsSignage')({
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
				return apiGetUnAuthFlatData('defectsSignage')({
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
				apiGetUnAuthFlatData('defectsSignage')({
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
				<Space
					style={{
						justifyContent: 'space-between',
						marginRight: '300px',
					}}
				>
					<Space>
						<MainLogo />
					</Space>
					<Space className={'defect-info mt-16'}>
						<Text
							itemProps={{name: 'detectCount'}}
							className={'detectCount'}
							dispatch={{
								path: 'defects.defectsSignageTable.reload',
							}}
							label={
								<span
									style={{
										textAlign: 'center',
									}}
								>
									<div className={'regularColor'}>
										Обнаружено
									</div>
									<div>{defectsCounter.detected}</div>
								</span>
							}
						/>
						<Divider type={'vertical'} />
						<Text
							itemProps={{name: 'sendPanelCount'}}
							className={'sendPanelCount'}
							label={
								<span
									style={{
										textAlign: 'center',
									}}
								>
									<div className={'regularColor'}>
										Передано в ПП
									</div>
									<div>{defectsCounter.sendToPanel}</div>
								</span>
							}
						/>
						<Divider type={'vertical'} />
						<Text
							itemProps={{name: 'eliminateCount'}}
							className={'eliminateCount'}
							label={
								<span
									style={{
										textAlign: 'center',
									}}
								>
									<div className={'regularColor'}>
										Устранено
									</div>
									<div>{defectsCounter.eliminate}</div>
								</span>
							}
						/>
					</Space>
				</Space>
				<Layout className={'signage'}>
					<Space
						className={'pb-8 mr-16'}
						style={{justifyContent: 'flex-end'}}
					>
						<Text
							label={`Дефектов ${tableVar.countPages}/${defectsCounter.validInfo}`}
							className={'mr-16'}
						/>
					</Space>
					<Table
						rowKey={'id'}
						type={'rt'}
						fixWidthColumn={true}
						headerHeight={52}
						rowHeight={60}
						defaultSortBy={{
							key: 'dateDetectDefect',
							order: 'desc',
						}}
						empty={
							<div
								className={'BaseTable__overlay custom__overlay'}
							>
								{' '}
								<MainLogo className={'ml-16'} />
								<Spin
									tip='Обновляем данные...'
									size={'large'}
									className={'no__bg'}
									style={{background: 'none'}}
								/>{' '}
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
