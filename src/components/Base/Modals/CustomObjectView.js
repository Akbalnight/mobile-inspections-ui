import {classic} from 'rt-design';
import {ReactComponent as InfoTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/infoTab.svg';
import {ReactComponent as MeasuringPointsTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/measuringPointsTab.svg';
import {ReactComponent as WarrantyTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/warrantyTab.svg';
import {ReactComponent as AttachmentsTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/attachmentsTab.svg';
import {itemsInfo} from '../../../constants/dictionary';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	// apiGetHierarchicalDataByConfigName,
	apiSaveFileByConfigName,
} from '../../../apis/catalog.api';
import React from 'react';
import {paths} from '../../../constants/paths';
import {useHistory} from 'react-router';

const {
	Modal,
	FormBody,
	Text,
	Title,
	Tabs,
	TabPane,
	Button,
	Space,
	Row,
	Col,
	Layout,
	Checkbox,
	DateText,
	UploadFile,
	Table,
	Divider,
	List,
} = classic;
/**
 *
 * @param catalogName name of server configuration
 * @param unique phrase on Russian
 * @returns {JSX.Element}
 * @desc This is view modal by server information there we have is_group props
 *
 */
export const CustomObjectView = ({catalogName, unique}) => {
	let sRow;
	let history = useHistory();

	/**
	 *
	 * @param callBack function change state (row)
	 * @param row info object from table
	 * @desc It's difficult func because many actions with current state
	 */
	const loadInitData = (callBack, row) => {
		sRow = row;
		// console.log('sRow',sRow)
		const dataObjectWarranty = {
			equipmentFiles: {
				equipmentId: row.id,
				type: 'warranty',
			},
		};
		const dataObjectAttachment = {
			equipmentFiles: {
				equipmentId: row.id,
				type: 'attachment',
			},
		};
		callBack({
			// controlPointId:sRow.id,
			...row,
			warrantyUploadObject: dataObjectWarranty,
			attachmentUploadObject: dataObjectAttachment,
			measuringPoints: row.measuringPoints ? row.measuringPoints : [], //очень некрасивое решение
		});
	};

	const BtnEdit = (props) => {
		if (sRow) {
			return (
				<Button
					size={'small'}
					onClick={() => {
						history.push(props.historyPath + '/' + sRow.id);
					}}
				>
					Редактировать
				</Button>
			);
		} else return null;
	};
	/**
	 *
	 * @param catalogName name of server configuration
	 * @returns {JSX.Element}
	 * @desc Choice function.
	 */
	const configCatalog = (catalogName) => {
		let historyPath = null;
		// sRow && console.log('sRow conf Catalog', sRow)

		switch (catalogName) {
			case 'equipments':
				return (
					<>
						<Tabs type={'card'} size={'large'}>
							<TabPane
								tab={<InfoTab />}
								key={'infoTab'}
								scrollable={true}
							>
								<Layout>
									<Text
										itemProps={{
											...itemsInfo.typeEquipment,
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.sapId,
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.name,
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.techPlacePath,
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.parentName,
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.constructionType,
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.material,
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.size,
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.weight,
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.manufacturer,
										}}
									/>
									<Checkbox
										itemProps={{
											...itemsInfo.deleted,
											valuePropName: 'checked',
										}}
										disabled={true}
									/>
									<DateText
										itemProps={{
											...itemsInfo.dateFinish,
										}}
										format={'DD.MM.YYYY'}
									/>
								</Layout>
							</TabPane>
							<TabPane
								tab={<MeasuringPointsTab />}
								key={'measuringPoints'}
							>
								<Layout>
									<List
										itemProps={{
											valuePropName: 'dataSource',
											name: 'measuringPoints',
										}}
										renderItem={(item) => (
											<Text
												value={item}
												itemProps={{
													label: 'Точки измерений',
													labelCol: {span: 10},
													wrapperCol: {span: 12},
													className: 'mb-8',
												}}
											/>
										)}
										itemLayout={'vertical'}
										className={'mt-16'}
									/>
								</Layout>
							</TabPane>
							<TabPane tab={<WarrantyTab />} key={'warranty'}>
								<Layout>
									<Space
										style={{
											justifyContent: 'space-between',
										}}
									>
										<DateText
											itemProps={{
												...itemsInfo.dateWarrantyStart,
												className: 'mt-0 mb-0',
												labelCol: {span: 14},
												wrapperCol: {span: 10},
											}}
											format={'DD.MM.YYYY'}
										/>
										<DateText
											itemProps={{
												...itemsInfo.dateWarrantyFinish,
												className: 'mt-0 mb-0',
												labelCol: {span: 15},
												wrapperCol: {span: 9},
											}}
											format={'DD.MM.YYYY'}
										/>

										<UploadFile
											itemProps={{
												name: 'warrantyUploadObject',
												valuePropName: 'dataObject',
											}}
											requestUploadFile={apiSaveFileByConfigName(
												`${catalogName}FilesCatalogSave`
											)}
											dispatch={{
												path: `catalog.${catalogName}Table.modal.warrantyUpload`,
												type: 'event',
											}}
										/>
									</Space>
									<Divider className={'mt-8 mb-0'} />
									<Table
										itemProps={{name: 'warrantyTableFiles'}}
										defaultFilter={{
											type: 'warranty',
										}}
										infinityMode={true}
										requestLoadRows={({data, params}) =>
											apiGetFlatDataByConfigName(
												'equipmentFiles'
											)({
												data: {
													...data,
													equipmentId: sRow.id,
												},
												params,
											})
										}
										requestLoadConfig={apiGetConfigByName(
											'equipmentFiles'
										)} //
										subscribe={[
											{
												name: 'warrantyUploadFile',
												path: `rtd.catalog.${catalogName}Table.modal.warrantyUpload`,
												onChange: ({reloadTable}) => {
													reloadTable({
														filter: {
															type: 'warranty',
														},
													});
												},
											},
										]}
									/>
								</Layout>
							</TabPane>
							<TabPane
								tab={<AttachmentsTab />}
								key={'attachments'}
							>
								<Layout>
									<Space
										className={'p-8'}
										style={{justifyContent: 'flex-end'}}
									>
										<UploadFile
											itemProps={{
												name: 'attachmentUploadObject',
												valuePropName: 'dataObject',
											}}
											requestUploadFile={apiSaveFileByConfigName(
												`${catalogName}FilesCatalogSave`
											)}
											dispatch={{
												path: `catalog.${catalogName}Table.modal.attachmentUpload`,
												type: 'event',
											}}
										/>
									</Space>
									<Table
										itemProps={{
											name: 'attachmentTableFiles',
										}}
										defaultFilter={{type: 'attachment'}}
										searchParamName={'name'}
										infinityMode={true}
										requestLoadRows={({data, params}) =>
											apiGetFlatDataByConfigName(
												'equipmentFiles'
											)({
												data: {
													...data,
													equipmentId: sRow.id,
												},
												params,
											})
										}
										requestLoadConfig={apiGetConfigByName(
											'equipmentFiles'
										)} //
										subscribe={[
											{
												name: 'attachmentUploadFile',
												path: `rtd.catalog.${catalogName}Table.modal.attachmentUpload`,
												onChange: ({reloadTable}) => {
													reloadTable({
														filter: {
															type: 'attachment',
														},
													});
												},
											},
											/** Поиск по таблице*/
											{
												name: 'warrantyUploadFile',
												path: `rtd.catalog.${catalogName}Table.modal.attachmentSearch`,
												onChange: ({
													value,
													reloadTable,
												}) => {
													console.log(value);
													reloadTable({
														searchValue: value,
													});
												},
											},
										]}
									/>
								</Layout>
							</TabPane>
						</Tabs>
					</>
				);
			case 'controlPoints':
				historyPath = paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.path;
				console.log('srow:', sRow);
				return (
					<>
						<Row>
							<Col span={20}>
								<Title level={5}>Описание</Title>
							</Col>
							<Col span={4} align={'right'}>
								<BtnEdit historyPath={historyPath} />
							</Col>
						</Row>
						<Row>
							<Col span={6}>
								<Text
									itemProps={{
										...itemsInfo.code,
										wrapperCol: {span: 12},
									}}
								/>
							</Col>
							<Col span={10}>
								<Text
									itemProps={{
										...itemsInfo.name,
										wrapperCol: {span: 12},
									}}
								/>
							</Col>
							<Col span={8}>
								<Text
									itemProps={{
										...itemsInfo.parentName,
										label: 'Группа',
										wrapperCol: {span: 12},
									}}
								/>
							</Col>
						</Row>
						<Title level={5}>Оборудование контрольных точек</Title>
						<Table
							requestLoadRows={({data, params}) =>
								apiGetFlatDataByConfigName(
									'controlPointsEquipments'
								)({
									data: {...data, controlPointsId: sRow.id},
									params,
								})
							}
							requestLoadConfig={apiGetConfigByName(
								'controlPointsEquipments'
							)}
							// dispatchPath={'debug'}
						/>
						<Title level={5}>Технологические карты</Title>
						<Table
							// requestLoadRows={apiGetFlatDataByConfigName(
							//     'controlPointsTechMaps'
							// )}
							requestLoadRows={({data, params}) =>
								apiGetFlatDataByConfigName(
									'controlPointsTechMaps'
								)({
									data: {...data, controlPointsId: sRow.id},
									params,
								})
							}
							requestLoadConfig={apiGetConfigByName(
								'controlPointsTechMaps'
							)}
						/>
					</>
				);

			default:
				return (
					<>
						<Text
							itemProps={{
								...itemsInfo.name,
								wrapperCol: {span: 12},
							}}
						/>
						<Text
							itemProps={{
								...itemsInfo.parentName,
								wrapperCol: {span: 12},
							}}
						/>
					</>
				);
		}
	};

	const getModalSize = (catalogName) => {
		switch (catalogName) {
			case 'equipments':
				return {width: 750, bodyStyle: {height: 650}};

			case 'controlPoints':
				return {width: 1000, bodyStyle: {height: 650}};

			default:
				return {width: 500, bodyStyle: {height: 200}};
		}
	};

	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title: `Карточка ${unique}`,
				...getModalSize(catalogName),
				form: {
					name: `${catalogName}ModalObjectInfoForm`,
					loadInitData: loadInitData,
					labelCol: {span: 12},
					wrapperCol: {span: 6},
				},
			}}
			subscribe={[
				{
					name: `${catalogName}ModalInfo`,
					path: `rtd.catalog.${catalogName}Table.table.events.onRowDoubleClick`,
					onChange: ({value, setModalData, openModal}) => {
						value &&
							setModalData &&
							setModalData({
								...value.value,
							});
						value && !value.value.isGroup && openModal();
						// sRow={...value.value}
						// console.log()
					},
				},
			]}
		>
			<FormBody>{configCatalog(catalogName)}</FormBody>
		</Modal>
	);
};
