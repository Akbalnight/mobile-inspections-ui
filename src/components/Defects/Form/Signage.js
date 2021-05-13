import React from 'react';
import {classic} from 'rt-design';
import {customColumnProps} from '../tableProps';
import {
	apiGetUnAuthConfigByName,
	apiGetUnAuthFlatData,
} from '../../../apis/catalog.api';
import {ReactComponent as MainLogo} from '../../../imgs/logo-signage.svg';

const {Form, FormBody, Layout, Table, Space, Text, Divider} = classic;
export const Signage = () => {
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
							subscribe={[
								{
									name: 'detectCount',
									path:
										'rtd.defects.defectsSignageTable.table.rows',
									onChange: ({value, setSubscribeProps}) => {
										let detectCount = value.filter(
											(elem) =>
												elem.statusProcessName ===
												'Новый'
										);
										value &&
											setSubscribeProps &&
											setSubscribeProps({
												value: (
													<span
														style={{
															textAlign: 'center',
														}}
													>
														<div
															style={{
																color: 'black',
																fontSize:
																	'20px',
															}}
														>
															Обнаружено
														</div>
														<div>
															{detectCount.length}
														</div>
													</span>
												),
											});
									},
								},
							]}
						/>
						<Divider type={'vertical'} />
						<Text
							itemProps={{name: 'sendPanelCount'}}
							className={'sendPanelCount'}
							subscribe={[
								{
									name: 'sendPanelCount',
									path:
										'rtd.defects.defectsSignageTable.table.rows',
									onChange: ({value, setSubscribeProps}) => {
										let sendPanelCount = value.filter(
											(elem) => elem.viewOnPanel === true
										);
										value &&
											setSubscribeProps &&
											setSubscribeProps({
												value: (
													<span
														style={{
															textAlign: 'center',
														}}
													>
														<div
															style={{
																color: 'black',
																fontSize:
																	'20px',
															}}
														>
															Передано в ПП
														</div>
														<div>
															{
																sendPanelCount.length
															}
														</div>
													</span>
												),
											});
									},
								},
							]}
						/>
						<Divider type={'vertical'} />
						<Text
							itemProps={{name: 'eliminateCount'}}
							className={'eliminateCount'}
							subscribe={[
								{
									name: 'eliminateCount',
									path:
										'rtd.defects.defectsSignageTable.table.rows',
									onChange: ({value, setSubscribeProps}) => {
										let eliminateCount = value.filter(
											(elem) =>
												elem.statusProcessName ===
												'Устранен'
										);
										value &&
											setSubscribeProps &&
											setSubscribeProps({
												value: (
													<span
														style={{
															textAlign: 'center',
														}}
													>
														<div
															style={{
																color: 'black',
																fontSize:
																	'20px',
															}}
														>
															Устранено
														</div>
														<div>
															{
																eliminateCount.length
															}
														</div>
													</span>
												),
											});
									},
								},
							]}
						/>
					</Space>
				</Space>
				<Layout>
					<Table
						fixWidthColumn={true}
						defaultSortBy={{
							key: 'dateDetectDefect',
							order: 'asc',
						}}
						infinityMode={true}
						dispatch={{path: 'defects.defectsSignageTable.table'}}
						customColumnProps={customColumnProps}
						requestLoadRows={({data, params}) =>
							apiGetUnAuthFlatData('defectsSignage')({
								data,
								params: {...params, size: 1000},
							})
						}
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
													order: 'asc',
												},
											}),
										600000
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
