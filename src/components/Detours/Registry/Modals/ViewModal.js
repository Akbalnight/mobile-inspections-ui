import {
	Modal,
	FormBody,
	Tabs,
	TabPane,
	Text,
	Table,
	List,
	Checkbox,
	DateText,
	Layout,
	Title,
	Row,
	Col,
} from 'rt-design';
import React from 'react';
import {ReactComponent as InfoTab} from '../../../../imgs/tabPane/catalogTabs/equipmentTabs/infoTab.svg';
import {ReactComponent as DetourCompositionTab} from '../../../../imgs/tabPane/catalogTabs/equipmentTabs/detourCompositionTab.svg';
import {ReactComponent as DefectsTab} from '../../../../imgs/tabPane/catalogTabs/equipmentTabs/defectTab.svg';
import {itemsInfo} from '../../../../constants/dictionary';
import {Collapse} from 'antd';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../../apis/catalog.api';
import {customColumnProps} from '../../tableProps';
import {Access} from 'mobile-inspections-base-ui';
import moment from 'moment';

const {Panel} = Collapse;

export const ViewDetour = () => {
	let sRow;
	const loadData = (callBack, row) => {
		sRow = row;
		callBack({
			...row,
			routesData: row.route !== null ? row.route.routesData : [],
		});
		return sRow;
	};

	return (
		<Modal
			modalConfig={{
				type: 'view',
				title: `Информация об обходе`,
				width: 850,
				bodyStyle: {
					height: 680,
				},
				form: {
					name: 'detourDataView',
					loadInitData: loadData,
					labelCol: {span: 12},
					wrapperCol: {span: 12},
				},
			}}
			subscribe={[
				{
					name: `detourModalInfo`,
					path: `rtd.detours.table.events.onRowDoubleClick`,
					onChange: ({value, setModalData, openModal}) => {
						value &&
							setModalData &&
							setModalData({
								...value.value,
							});
						openModal();
					},
				},
			]}
		>
			<FormBody noPadding={true}>
				<Tabs type={'card'} size={'large'}>
					<TabPane
						tab={<InfoTab />}
						key={'infoTab'}
						style={{padding: '16px'}}
					>
						<Layout>
							<Row
								style={{justifyContent: 'space-around'}}
								className={'mt-16'}
							>
								<Col span={10}>
									<DateText
										itemProps={{
											...itemsInfo.dateStartPlan,
											rules: [],
										}}
										format={'DD.MM.YYYY HH:mm'}
									/>
									<DateText
										itemProps={{
											...itemsInfo.dateFinishPlan,
											rules: [],
										}}
										format={'DD.MM.YYYY HH:mm'}
									/>
									<Text
										itemProps={{
											label: 'Продолжительность план',
										}}
										subscribe={[
											{
												name: 'planDuration',
												withMount: true,
												path: 'rtd.detours.table.events.onRowDoubleClick',
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													let startTime = moment(
														value.value
															.dateStartPlan
													);
													let endTime = moment(
														value.value
															.dateFinishPlan
													);
													const diffTime =
														endTime.diff(
															startTime,
															'minutes'
														);

													value &&
														setSubscribeProps &&
														setSubscribeProps({
															value: `${
																diffTime
																	? diffTime
																	: '0'
															} мин.`,
														});
												},
											},
										]}
									/>
								</Col>
								<Col span={10}>
									<DateText
										itemProps={{
											...itemsInfo.dateStartFact,
											rules: [],
										}}
										format={'DD.MM.YYYY HH:mm'}
									/>
									<DateText
										itemProps={{
											...itemsInfo.dateFinishFact,
											rules: [],
										}}
										format={'DD.MM.YYYY HH:mm'}
									/>
									<Text
										itemProps={{
											label: 'Продолжительность факт',
										}}
										subscribe={[
											{
												name: 'factDuration',
												withMount: true,
												path: 'rtd.detours.table.events.onRowDoubleClick',
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													let startTime = moment(
														value.value
															.dateStartFact
													);
													let endTime = moment(
														value.value
															.dateFinishFact
													);
													const diffTime =
														endTime.diff(
															startTime,
															'minutes'
														);

													value &&
														setSubscribeProps &&
														setSubscribeProps({
															value: `${
																diffTime
																	? diffTime
																	: '0'
															} мин.`,
														});
												},
											},
										]}
									/>
								</Col>
							</Row>
							<Text itemProps={{...itemsInfo.name, rules: []}} />
							<Access roles={['ROLE_ADMIN']}>
								<Text
									itemProps={{...itemsInfo.routeName}}
									subscribe={[
										{
											name: `detourModalInfo`,
											withMount: true,
											path: `auth`,
											onChange: ({value}) => {
												console.log(
													'DateText onRowDoubleClick => ',
													value
												);
											},
										},
									]}
								/>
							</Access>
							<Text itemProps={{...itemsInfo.executorName}} />

							<Checkbox
								itemProps={{
									...itemsInfo.saveOrderControlPoints,
								}}
								disabled={true}
							/>
							<Checkbox
								itemProps={{
									...itemsInfo.takeIntoAccountTimeLocation,
								}}
								disabled={true}
							/>
							<Text
								itemProps={{
									...itemsInfo.possibleDeviationLocationTime,
								}}
							/>
							<Checkbox
								itemProps={{
									...itemsInfo.takeIntoAccountDateStart,
								}}
								disabled={true}
							/>
							<Text
								itemProps={{
									...itemsInfo.possibleDeviationDateStart,
								}}
							/>
							<Checkbox
								itemProps={{
									...itemsInfo.takeIntoAccountDateFinish,
								}}
								disabled={true}
							/>
							<Text
								itemProps={{
									...itemsInfo.possibleDeviationDateFinish,
								}}
							/>
						</Layout>
					</TabPane>
					<TabPane
						tab={<DetourCompositionTab />}
						key={'compositionTab'}
						scrollable={true}
						style={{padding: '16px'}}
					>
						<Layout>
							<List
								itemProps={{
									valuePropName: 'dataSource',
									name: 'routesData',
								}}
								renderItem={(item, index) => (
									<>
										<Collapse>
											<Panel
												key={item.id}
												header={item.controlPointName}
											>
												<Title
													label={'Оборудование'}
													level={5}
												/>
												<Layout
													style={{
														height: '150px',
													}}
													className={'mb-16'}
												>
													<Table
														itemProps={{
															name: [
																'route',
																'routesData',
																index,
																'equipments',
															],
														}}
														requestLoadConfig={apiGetConfigByName(
															'controlPointsEquipments'
														)}
													/>
												</Layout>
												<Title
													label={`Технологическая карта: ${item.techMap.name}`}
													level={5}
													className={'mt-16'}
												/>
												<Layout
													style={{
														height: '150px',
													}}
												>
													<Table
														customColumnProps={
															customColumnProps
														}
														itemProps={{
															name: [
																'route',
																'routesData',
																index,
																'techMap',
																'techOperations',
															],
														}}
														requestLoadConfig={apiGetConfigByName(
															'techOperationsByDetours'
														)}
													/>
												</Layout>
											</Panel>
										</Collapse>
									</>
								)}
								itemLayout={'vertical'}
							/>
						</Layout>
					</TabPane>
					<TabPane
						tab={<DefectsTab />}
						key={'defectsTab'}
						scrollable={true}
						style={{padding: '16px'}}
					>
						<Layout>
							<Layout>
								<Title
									label={'Обнаруженные дефекты'}
									level={5}
								/>
								<Table
									customColumnProps={customColumnProps}
									requestLoadRows={({data, params}) =>
										apiGetFlatDataByConfigName('defects')({
											data: {
												...data,
												detourId: sRow.id,
											},
											params,
										})
									}
									requestLoadConfig={apiGetConfigByName(
										'defects'
									)}
								/>
							</Layout>
							<Layout>
								<Title
									label={'Устраненные дефекты'}
									level={5}
									style={{marginTop: '16px'}}
								/>
								<Table
									requestLoadRows={({data, params}) =>
										apiGetFlatDataByConfigName(
											'defectExtraData'
										)({
											data: {
												...data,
												detourId: sRow.id,
											},
											params,
										})
									}
									requestLoadConfig={apiGetConfigByName(
										'defectExtraData'
									)}
								/>
							</Layout>
						</Layout>
					</TabPane>
				</Tabs>
			</FormBody>
		</Modal>
	);
};
