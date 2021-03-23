import {classic} from 'rt-design';
import {ReactComponent as InfoTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/infoTab.svg';
import {ReactComponent as MeasuringPointsTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/measuringPointsTab.svg';
import {ReactComponent as WarrantyTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/warrantyTab.svg';
import {ReactComponent as AttachmentsTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/attachmentsTab.svg';
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
	List,
} = classic;

export const ModalObjectView = ({catalogName}) => {
	let sRow;

	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title: `Карточка оборудования`,
				width: 750,
				bodyStyle: {height: 650},
				form: {
					name: `${catalogName}ModalObjectInfoForm`,
					loadInitData: (callBack, row) => {
						sRow = row;
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
							...row,
							warrantyUploadObject: dataObjectWarranty,
							attachmentUploadObject: dataObjectAttachment,
						});
					},
					labelCol: {span: 12},
					wrapperCol: {span: 6},
				},
			}}
			subscribe={[
				{
					name: `${catalogName}ModalInfo`,
					path: `rtd.catalog.${catalogName}Table.table.events.onRowDoubleClick`,
					onChange: ({value, setModalData, openModal}) => {
						// console.log(value.value);
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
							<Space style={{justifyContent: 'space-between'}}>
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
										data: {...data, equipmentId: sRow.id},
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
					<TabPane tab={<AttachmentsTab />} key={'attachments'}>
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
								itemProps={{name: 'attachmentTableFiles'}}
								defaultFilter={{type: 'attachment'}}
								searchParamName={'name'}
								infinityMode={true}
								requestLoadRows={({data, params}) =>
									apiGetFlatDataByConfigName(
										'equipmentFiles'
									)({
										data: {...data, equipmentId: sRow.id},
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
