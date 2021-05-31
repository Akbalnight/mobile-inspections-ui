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
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

const {
	Form,
	FormBody,
	Layout,
	Table,
	Space,
	Text,
	Divider,
	InputNumber,
	Button,
} = classic;
export const Signage = () => {
	const [defectsCounter, setDefectsCounter] = useState({
		detected: 0,
		eliminate: 0,
		sendToPanel: 0,
	});
	const [tableVar, setTableVar] = useState({
		rowHeight: 15,
		pageSize: 15,
		countPages: 15,
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
		setTimeout();
		apiGetUnAuthFlatData('defectsSignage')({
			data: {
				statusIds: [
					'1864073a-bf8d-4df2-b02d-8e5afa63c4d0',
					'879f0adf-0d96-449e-bcee-800f81c4e58d',
					'df7d1216-6eb7-4a00-93a4-940047e8b9c0',
				],
			},
			params: {size: tableVar.pageSize},
		})
			.then((resp) =>
				setTableVar((state) => ({...state, rows: [...resp.data]}))
			)
			.catch((err) => console.error());
	}, [tableVar.pageSize]);

	const handleChange = (count, type) => {
		switch (type) {
			case 'next':
				apiGetUnAuthFlatData('defectsSignage')({
					data: {
						statusIds: [
							'1864073a-bf8d-4df2-b02d-8e5afa63c4d0',
							'879f0adf-0d96-449e-bcee-800f81c4e58d',
							'df7d1216-6eb7-4a00-93a4-940047e8b9c0',
						],
					},
					params: {size: tableVar.countPages + count},
				})
					.then((resp) =>
						setTableVar((state) => ({
							...state,
							rows: [
								...resp.data.splice(tableVar.countPages, count),
							],
							countPages: tableVar.countPages + count,
						}))
					)
					.catch((err) => console.error());
				return 1;
			default:
				apiGetUnAuthFlatData('defectsSignage')({
					data: {
						statusIds: [
							'1864073a-bf8d-4df2-b02d-8e5afa63c4d0',
							'879f0adf-0d96-449e-bcee-800f81c4e58d',
							'df7d1216-6eb7-4a00-93a4-940047e8b9c0',
						],
					},
					params: {size: tableVar.countPages - count},
				})
					.then((resp) =>
						setTableVar((state) => ({
							...state,
							rows: [
								...resp.data.splice(
									resp.data.length - tableVar.countPages,
									count
								),
							],
							countPages: tableVar.countPages - count,
						}))
					)
					.catch((err) => console.error());
				return 0;
		}
	};
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
						<Space>
							<InputNumber
								itemProps={{
									name: 'pageSizeCount',
									label: 'строк в таблице',
								}}
								defaultValue={tableVar.pageSize}
								onChange={(value) => {
									setTableVar((state) => ({
										...state,
										pageSize: value,
										countPages: value,
									}));
								}}
								min={0}
							/>
							<InputNumber
								itemProps={{
									name: 'rowHeightCount',
									label: 'высота в таблице',
								}}
								defaultValue={tableVar.rowHeight}
								onChange={(value) => {
									setTableVar((state) => ({
										...state,
										rowHeight: value,
									}));
								}}
								min={0}
							/>
						</Space>
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
									<div
										style={{
											color: 'black',
											fontSize: '20px',
										}}
									>
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
									<div
										style={{
											color: 'black',
											fontSize: '20px',
										}}
									>
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
									<div
										style={{
											color: 'black',
											fontSize: '20px',
										}}
									>
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
						className={'p-8'}
						style={{justifyContent: 'flex-end'}}
					>
						<Button
							icon={<LeftOutlined />}
							onClick={() =>
								handleChange(tableVar.pageSize, 'last')
							}
						/>
						<Text
							label={`Дефектов ${tableVar.countPages}/${defectsCounter.detected}`}
						/>
						<Button
							icon={<RightOutlined />}
							onClick={() =>
								handleChange(tableVar.pageSize, 'next')
							}
						/>
					</Space>
					<Table
						rowHeight={tableVar.rowHeight}
						rowKey={'id'}
						type={'rt'}
						fixWidthColumn={true}
						headerHeight={45}
						defaultSortBy={{
							key: 'dateDetectDefect',
							order: 'desc',
						}}
						// infinityMode={true}
						zebraStyle={true}
						dispatch={{path: 'defects.defectsSignageTable.table'}}
						customColumnProps={customColumnProps}
						rows={tableVar.rows}
						// requestLoadRows={({data, params}) =>
						//     apiGetUnAuthFlatData('defectsSignage')({
						//         data: {
						//             ...data,
						//             statusIds: [
						//                 '1864073a-bf8d-4df2-b02d-8e5afa63c4d0',
						//                 '879f0adf-0d96-449e-bcee-800f81c4e58d',
						//                 'df7d1216-6eb7-4a00-93a4-940047e8b9c0',
						//             ],
						//         },
						//         params: {...params, page: 1, size: tableVar.pageSize}
						//     })
						// }
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
							// {
							//
							//     name: 'forceReload',
							//     path: 'rtd.defects.defectsSignageTable.reload',
							//     onChange: ({setSubscribeProps}) => {
							//         setSubscribeProps({
							//             requestLoadRows: ({data, params}) =>
							//                 apiGetUnAuthFlatData('defectsSignage')({
							//                     data: {
							//                         ...data,
							//                         statusIds: [
							//                             '1864073a-bf8d-4df2-b02d-8e5afa63c4d0',
							//                             '879f0adf-0d96-449e-bcee-800f81c4e58d',
							//                             'df7d1216-6eb7-4a00-93a4-940047e8b9c0',
							//                         ],
							//                     },
							//                     params: {...params, size: tableVar.pageSize}
							//                 })
							//
							//         })
							//
							//     }
							// }
						]}
					/>
				</Layout>
			</FormBody>
		</Form>
	);
};
