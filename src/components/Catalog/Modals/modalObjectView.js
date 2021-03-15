import {classic} from 'rt-design';
import {ReactComponent as InfoTab} from '../../../imgs/tabPane/equipmentsViewModal/infoTab.svg';
import {ReactComponent as MeasuringPointsTab} from '../../../imgs/tabPane/equipmentsViewModal/measuringPointsTab.svg';
import {ReactComponent as WarrantyTab} from '../../../imgs/tabPane/equipmentsViewModal/warrantyTab.svg';
import {ReactComponent as AttachmentsTab} from '../../../imgs/tabPane/equipmentsViewModal/attachmentsTab.svg';
import {itemsInfo} from '../tableProps';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiSaveFileByConfigName,
} from '../../../apis/catalog.api';
import React from 'react';

const {
	Modal,
	FormBody,
	Text,
	Tabs,
	TabPane,
	Space,
	Layout,
	Checkbox,
	DateText,
	UploadFile,
	Table,
	Divider,
	Search,
} = classic;

export const ModalObjectView = ({catalogName}) => {
	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title: `Карточка оборудования`,
				width: 750,
				bodyStyle: {height: 650},
				form: {
					name: `${catalogName}ModalInfoForm`,
					loadInitData: (callBack, row) => callBack(row),
					labelCol: {span: 12},
					wrapperCol: {span: 6},
				},
			}}
			subscribe={[
				{
					name: `${catalogName}ModalInfo`,
					path: `rtd.catalog.${catalogName}Table.table.events.onRowDoubleClick`,
					onChange: ({value, setModalData, openModal}) => {
						console.log(value.value);
						value &&
							setModalData &&
							setModalData({
								...value.value,
							});
						value && !value.value.isGroup && openModal();
					},
				},
			]}
		>
			<FormBody>
				<Tabs type={'card'} size={'large'}>
					<TabPane
						tab={<InfoTab />}
						key={'infoTab'}
						style={{overflow: 'auto'}}
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
									...itemsInfo.techPlace,
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
								}}
								disabled={true}
							/>
							<DateText
								itemProps={{
									...itemsInfo.dateFinish,
								}}
							/>
						</Layout>
					</TabPane>
					<TabPane
						tab={<MeasuringPointsTab />}
						key={'measuringPoints'}
					>
						<Layout>
							<Text
								itemProps={{
									...itemsInfo.measuringPoints,
								}}
							/>
						</Layout>
					</TabPane>
					<TabPane tab={<WarrantyTab />} key={'warranty'}>
						<Layout>
							<Space
								// className={'ml-16'}
								style={{justifyContent: 'space-between'}}
							>
								<DateText
									itemProps={{
										...itemsInfo.dateWarrantyStart,
										className: 'mt-0 mb-0 mr-0',
										labelCol: {span: 22},
										// wrapperCol: {span: 2},
									}}
								/>
								<DateText
									itemProps={{
										...itemsInfo.dateWarrantyFinish,
										className: 'mt-0 mb-0',
										labelCol: {span: 22},
										// wrapperCol: {span: 2},
									}}
								/>

								<UploadFile
									itemProps={{name: 'uploadWarranty'}}
									requestUploadFile={apiSaveFileByConfigName(
										`${catalogName}FilesCatalogSave`
									)}
									// dataObject={{
									//     equipmentFiles: {
									//         // id: null,
									//         equipmentId:
									//             '8935c92d-67a9-4df5-9f8b-d43ea013190e',
									//         // fileId: null,
									//         type:'warranty'
									//
									//     },
									// }}
									dispatch={{
										path: `catalog.${catalogName}Table.modal.warrantyUpload`,
									}}
									subscribe={[
										{
											name: `${catalogName}ModalInfo`,
											path: `rtd.catalog.${catalogName}Table.table.events.onRowDoubleClick`,
											onChange: ({
												value,
												setSubscribeProps,
											}) => {
												console.log(value.value);
												value &&
													setSubscribeProps &&
													setSubscribeProps({
														dataObject: {
															equipmentFiles: {
																// id: null,
																equipmentId:
																	value.value
																		.id,
																// fileId: null,
																type:
																	'warranty',
															},
														},
													});
											},
										},
									]}
								/>
							</Space>
							<Divider className={'mt-8 mb-0'} />

							<Table
								itemProps={{name: 'warrantyTableFiles'}}
								// filter={{type: 'warranty'}}
								requestLoadRows={apiGetFlatDataByConfigName(
									'equipmentFiles'
								)}
								requestLoadConfig={apiGetConfigByName(
									'equipmentFiles'
								)} //
								subscribe={[
									{
										name: 'warrantyUploadFile',
										path: `rtd.catalog.${catalogName}Table.modal.warrantyUpload`,
										onChange: ({reloadTable}) => {
											reloadTable({});
										},
									},
								]}
							/>
						</Layout>
					</TabPane>
					<TabPane tab={<AttachmentsTab />} key={'attachments'}>
						<Layout>
							<Space
								className={'p-8'}
								style={{justifyContent: 'space-between'}}
							>
								<UploadFile
									itemProps={{name: 'uploadAttachments'}}
									requestUploadFile={apiSaveFileByConfigName(
										`${catalogName}FilesCatalogSave`
									)}
									// dataObject={{
									//     routeMap: {
									//         id: null,
									//         routeId:
									//             'ad524bdf-d42d-4dea-82ca-dee022dbcaeb',
									//         fileId: null,
									//         position: 3,
									//     },
									// }}
									dispatch={{
										path: `catalog.${catalogName}Table.modal.attachmentsUpload`,
									}}
									subscribe={[
										{
											name: `${catalogName}ModalInfo`,
											path: `rtd.catalog.${catalogName}Table.table.events.onRowDoubleClick`,
											onChange: ({
												value,
												setSubscribeProps,
											}) => {
												console.log(value.value);
												// value &&
												// setSubscribeProps &&
												setSubscribeProps({
													dataObject: {
														equipmentFiles: {
															// id: null,
															equipmentId:
																value.value.id,
															// fileId: null,
															type: 'attachment',
														},
													},
												});
												// setSubscribeProps({ dataObject: {...value.value} })
											},
										},
									]}
								/>
								<Search
									itemProps={{name: 'searchAttachments'}}
									dispatch={{
										path: `catalog.${catalogName}Table.modal.attachmentsSearch`,
									}}
								/>
							</Space>
							<Divider className={'mt-0 mb-8'} />
							<Table
								itemProps={{name: 'warrantyTableFiles'}}
								searchParamName={'name'}
								requestLoadRows={apiGetFlatDataByConfigName(
									'equipmentFiles'
								)}
								requestLoadConfig={apiGetConfigByName(
									'equipmentFiles'
								)} //
								subscribe={[
									{
										name: 'warrantyUploadFile',
										path: `rtd.catalog.${catalogName}Table.modal.attachmentsUpload`,
										onChange: ({reloadTable}) => {
											reloadTable({});
										},
									},
									/** Поиск по таблице*/
									{
										name: 'warrantyUploadFile',
										path: `rtd.catalog.${catalogName}Table.modal.attachmentsSearch`,
										onChange: ({value, reloadTable}) => {
											console.log(value);
											reloadTable({searchValue: value});
										},
									},
								]}
							/>
						</Layout>
					</TabPane>
				</Tabs>
			</FormBody>
		</Modal>
	);
};
