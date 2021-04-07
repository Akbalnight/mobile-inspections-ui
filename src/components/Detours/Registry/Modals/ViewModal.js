import {classic} from 'rt-design';
import React from 'react';
import {ReactComponent as InfoTab} from '../../../../imgs/tabPane/catalogTabs/equipmentTabs/infoTab.svg';
import {ReactComponent as DetourCompositionTab} from '../../../../imgs/tabPane/catalogTabs/equipmentTabs/detourCompositionTab.svg';
import {itemsInfo} from '../../../../constants/dictionary';
import {Collapse} from 'antd';
import {apiGetConfigByName} from '../../../../apis/catalog.api';
import {customColumnProps} from '../../tableProps';

const {Panel} = Collapse;

const {
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
} = classic;
export const ViewDetour = () => {
	const loadData = (callBack, row) => {
		callBack({...row, routesData: row.route.routesData});
	};
	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title: `Информация об обходе`,
				width: 850,
				bodyStyle: {
					height: 650,
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
					path: `rtd.detours.mainForm.table.events.onRowDoubleClick`,
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
			<FormBody>
				<Tabs type={'card'} size={'large'}>
					<TabPane tab={<InfoTab />} key={'infoTab'}>
						<Layout>
							<Text itemProps={{...itemsInfo.name, rules: []}} />
							<Text itemProps={{...itemsInfo.routeName}} />
							<DateText
								itemProps={{
									...itemsInfo.dateStartPlan,
									rules: [],
								}}
								format={'LLLL'}
							/>
							<DateText
								itemProps={{
									...itemsInfo.dateFinishPlan,
									rules: [],
								}}
								format={'LLLL'}
							/>
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
					>
						<Layout>
							<List
								itemProps={{
									valuePropName: 'dataSource',
									name: 'routesData',
								}}
								renderItem={(item, index) => {
									// console.log(item, '>>>>', index)
									return (
										<>
											<Collapse>
												<Panel
													key={item.controlPointId}
													header={
														item.controlPointName
													}
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
																'techOperations'
															)}
														/>
													</Layout>
												</Panel>
											</Collapse>
										</>
									);
								}}
								itemLayout={'vertical'}
							/>
						</Layout>
					</TabPane>
				</Tabs>
			</FormBody>
		</Modal>
	);
};
