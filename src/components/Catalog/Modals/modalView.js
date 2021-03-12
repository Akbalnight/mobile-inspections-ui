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
	Title,
	Col,
	Space,
	Layout,
	Checkbox,
	DateText,
	UploadFile,
	Table,
	Divider,
	Search,
} = classic;

export const ModalView = ({catalogName}) => {
	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title: `Карточка оборудования`,
				width: 750,
				bodyStyle: {height: 600},
				form: {
					name: `${catalogName}ModalInfoForm`,
					loadInitData: (callBack, row) => callBack(row),
					// labelCol: {span: 12},
					// wrapperCol: {span: 6},
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
						openModal();
					},
				},
			]}
		>
			<FormBody>
				<Tabs type={'card'} size={'large'}>
					<TabPane tab={<InfoTab />} key={'infoTab'}>
						<Col>
							<Title label={'Общие сведения'} level={5} />
							<Space direction={'vertical'} className={'ml-16'}>
								<Layout>
									<Text
										itemProps={{
											...itemsInfo.typeEquipment,
											className: 'mt-0 mb-0',
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.sapId,
											className: 'mt-0 mb-0',
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.name,
											className: 'mt-0 mb-0',
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.techPlacePath,
											className: 'mt-0 mb-0',
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.techPlace,
											className: 'mt-0 mb-0',
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.constructionType,
											className: 'mt-0 mb-0',
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.material,
											className: 'mt-0 mb-0',
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.size,
											className: 'mt-0 mb-0',
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.weight,
											className: 'mt-0 mb-0',
										}}
									/>
									<Text
										itemProps={{
											...itemsInfo.manufacturer,
											className: 'mt-0 mb-0',
										}}
									/>
									<Checkbox
										itemProps={{
											...itemsInfo.deleted,
											className: 'mt-0 mb-0',
										}}
										disabled={true}
									/>
									<DateText
										itemProps={{
											...itemsInfo.dateFinish,
											className: 'mt-0 mb-0',
										}}
									/>
								</Layout>
							</Space>
						</Col>
					</TabPane>
					<TabPane
						tab={<MeasuringPointsTab />}
						key={'measuringPoints'}
					>
						<Col>
							<Title label={'Точки измерения'} level={5} />
							<Space direction={'vertical'} className={'ml-16'}>
								<Layout>
									<Text
										itemProps={{
											...itemsInfo.measuringPoints,
											className: 'mt-0 mb-0',
										}}
									/>
								</Layout>
							</Space>
						</Col>
					</TabPane>
					<TabPane tab={<WarrantyTab />} key={'warranty'}>
						<Layout>
							<Title label={'Гарантии'} level={5} />
							<Space
								direction={'vertical'}
								className={'ml-16'}
								align={'center'}
							>
								<Layout>
									<Text
										itemProps={{
											...itemsInfo.manufacturer,
											className: 'mt-0 mb-0',
										}}
									/>
									<DateText
										itemProps={{
											...itemsInfo.dateWarrantyStart,
											className: 'mt-0 mb-0',
										}}
									/>
									<DateText
										itemProps={{
											...itemsInfo.dateWarrantyFinish,
											className: 'mt-0 mb-0',
										}}
									/>
								</Layout>
							</Space>
							<Divider className={'mt-8 mb-0'} />
							<Space className={'p-8'}>
								<UploadFile
									itemProps={{name: 'uploadWarranty'}}
									requestUploadFile={apiSaveFileByConfigName(
										'routeMapFileSave'
									)}
									dataObject={{
										routeMap: {
											id: null,
											routeId:
												'ad524bdf-d42d-4dea-82ca-dee022dbcaeb',
											fileId: null,
											position: 3,
										},
									}}
									dispatch={{
										path: `catalog.${catalogName}Table.modal.warrantyUpload`,
									}}
								/>
							</Space>
							<Divider className={'mt-0 mb-8'} />
							<Table
								itemProps={{name: 'warrantyTableFiles'}}
								requestLoadRows={apiGetFlatDataByConfigName(
									'routeMaps'
								)}
								requestLoadConfig={apiGetConfigByName(
									'routeMaps'
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
							<Divider className={'mt-8 mb-0'} />
							<Space
								className={'p-8'}
								style={{justifyContent: 'space-between'}}
							>
								<UploadFile
									itemProps={{name: 'uploadAttachments'}}
									requestUploadFile={apiSaveFileByConfigName(
										'routeMapFileSave'
									)}
									dataObject={{
										routeMap: {
											id: null,
											routeId:
												'ad524bdf-d42d-4dea-82ca-dee022dbcaeb',
											fileId: null,
											position: 3,
										},
									}}
									dispatch={{
										path: `catalog.${catalogName}Table.modal.attachmentsUpload`,
									}}
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
									'routeMaps'
								)}
								requestLoadConfig={apiGetConfigByName(
									'routeMaps'
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
