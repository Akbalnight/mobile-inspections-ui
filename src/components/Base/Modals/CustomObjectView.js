import {
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
	Custom,
	notificationError,
} from 'rt-design';
import {ReactComponent as InfoTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/infoTab.svg';
import {ReactComponent as MeasuringPointsTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/measuringPointsTab.svg';
import {ReactComponent as WarrantyTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/warrantyTab.svg';
import {ReactComponent as AttachmentsTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/attachmentsTab.svg';
import {itemsInfo} from '../../../constants/dictionary';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiSaveFileByConfigName,
} from '../../../apis/application.api';
import React from 'react';
import {paths} from '../../../constants/paths';
import {useHistory} from 'react-router';
import {AttachmentsPreview} from '../Functions/MediaUtils';
import {changeStorePath} from '../Functions/ChangeStorePath';

/**
 *
 * @param catalogName name of server configuration
 * @param mainWay name of server configuration
 * @param unique phrase on Russian
 * @returns {JSX.Element}
 * @desc This is view modal by server information there we have is_group props
 *
 */
export const CustomObjectView = ({mainWay, catalogName, unique}) => {
	let sRow;
	let history = useHistory();

	const catalogRoles = [
		'ROLE_ADMIN',
		'ROLE_MI_ADMIN',
		'ROLE_MI_SHIFT_SUPERVISOR',
		'ROLE_MI_DETOURS_CREATOR',
	];

	const controlPointRoles = ['ROLE_ADMIN', 'ROLE_MI_ADMIN'];
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
			...row,
			warrantyUploadObject: {dataObject: dataObjectWarranty},
			attachmentUploadObject: {dataObject: dataObjectAttachment},
			measuringPoints: row.measuringPoints ? row.measuringPoints : [], //очень некрасивое решение
		});
	};

	const AuthSubscription = (componentName, arrOfRole) => {
		return {
			name: 'staffRoles',
			path: 'auth',
			withMount: true,
			onChange: ({value, setSubscribeProps}) => {
				const authRoles = value.roles
					.replace('[', '')
					.replace(']', '')
					.split(', ')
					.some((el) => arrOfRole.includes(el));
				value &&
					setSubscribeProps &&
					setSubscribeProps(
						componentName === 'upload'
							? {
									buttonProps: {
										disabled: !authRoles,
									},
							  }
							: {
									hidden: !authRoles,
							  }
					);
			},
		};
	};

	const BtnEdit = (props) => {
		if (sRow) {
			return (
				<Button
					size={'small'}
					onClick={() => {
						history.push(props.historyPath + '/' + sRow.id);
					}}
					subscribe={[AuthSubscription('button', controlPointRoles)]}
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

	const loadTechOperationsHandler = ({data, params}) => {
		const newData = {...data, techMapId: sRow.id};
		return apiGetFlatDataByConfigName('techOperations')({
			data: newData,
			params,
		});
	};

	const configCatalog = (catalogName) => {
		let historyPath = null;
		// sRow && console.log('sRow conf Catalogs', sRow)

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
							<TabPane
								tab={<WarrantyTab />}
								key={'warranty'}
								scrollable={true}
							>
								<Layout>
									<Space
										style={{
											justifyContent: 'space-between',
										}}
										className={'mr-8'}
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
											}}
											requestUploadFile={apiSaveFileByConfigName(
												`${catalogName}FilesCatalogSave`
											)}
											dispatch={{
												path: `${changeStorePath(
													mainWay,
													catalogName
												)}.data.warrantyUpload`,
												type: 'event',
											}}
											subscribe={[
												AuthSubscription(
													'upload',
													catalogRoles
												),
											]}
										/>
									</Space>
									<Divider className={'mt-8 mb-8'} />
									<Custom
										itemProps={{
											name: 'warrantyPreviewFiles',
										}}
										render={(props) => {
											return props.warrantyPreviewFiles ? (
												<AttachmentsPreview
													items={
														props.warrantyPreviewFiles
													}
												/>
											) : null;
										}}
										subscribe={[
											{
												name: 'warrantyUploadFile',
												path: `rtd.${changeStorePath(
													mainWay,
													catalogName
												)}.data.warrantyUpload`,
												onChange: ({
													setSubscribeProps,
												}) => {
													apiGetFlatDataByConfigName(
														'equipmentFiles'
													)({
														data: {
															equipmentId:
																sRow.id,
															type: 'warranty',
														},
													})
														.then((response) => {
															setSubscribeProps({
																warrantyPreviewFiles:
																	response.data,
															});
														})
														.catch((error) =>
															notificationError(
																error,
																'Ошибка загрузки файлов гарантии'
															)
														);
												},
											},
										]}
									/>
								</Layout>
							</TabPane>
							<TabPane
								tab={<AttachmentsTab />}
								key={'attachments'}
								scrollable={true}
							>
								<Layout>
									<Space
										style={{justifyContent: 'flex-end'}}
										className={'mr-8'}
									>
										<UploadFile
											itemProps={{
												name: 'attachmentUploadObject',
											}}
											requestUploadFile={apiSaveFileByConfigName(
												`${catalogName}FilesCatalogSave`
											)}
											toolTipProps={{
												title: 'Загрузить',
											}}
											dispatch={{
												path: `${changeStorePath(
													mainWay,
													catalogName
												)}.data.attachmentUpload`,
												type: 'event',
											}}
											subscribe={[
												AuthSubscription(
													'upload',
													catalogRoles
												),
											]}
										/>
									</Space>
									<Custom
										itemProps={{
											name: 'attachmentPreviewFiles',
										}}
										render={(props) => {
											// console.log('warranty props', props)
											return props.attachmentPreviewFiles ? (
												<AttachmentsPreview
													items={
														props.attachmentPreviewFiles
													}
												/>
											) : null;
										}}
										subscribe={[
											{
												name: 'attachmentUploadFile',
												path: `rtd.${changeStorePath(
													mainWay,
													catalogName
												)}.data.attachmentUpload`,
												onChange: ({
													setSubscribeProps,
												}) => {
													apiGetFlatDataByConfigName(
														'equipmentFiles'
													)({
														data: {
															equipmentId:
																sRow.id,
															type: 'attachment',
														},
														params: {size: 1},
													})
														.then((response) => {
															setSubscribeProps({
																attachmentPreviewFiles:
																	response.data,
															});
														})
														.catch((error) =>
															notificationError(
																error,
																'Ошибка загрузки документов'
															)
														);
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
				// console.log('srow:', sRow);
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
									data: {...data, controlPointId: sRow.id},
									params,
								})
							}
							requestLoadConfig={apiGetConfigByName(
								'controlPointsEquipments'
							)}
							footerProps={{
								showElements: ['total'],
							}}
						/>
						<Title className={'mt-8'} level={5}>
							Технологические карты
						</Title>
						<Table
							requestLoadRows={({data, params}) =>
								apiGetFlatDataByConfigName(
									'controlPointsTechMaps'
								)({
									data: {...data, controlPointId: sRow.id},
									params,
								})
							}
							requestLoadConfig={apiGetConfigByName(
								'controlPointsTechMaps'
							)}
							footerProps={{
								showElements: ['total'],
							}}
						/>
					</>
				);
			case 'techMaps':
				return (
					<>
						<Row>
							<Col span={20}>
								<Title level={5}>Описание</Title>
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
										rules: [],
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
						<Title level={5}>Технологические операции</Title>
						<Table
							requestLoadRows={loadTechOperationsHandler}
							requestLoadConfig={apiGetConfigByName(
								'techOperations'
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

			case 'techMaps':
				return {width: 1000, bodyStyle: {height: 650}};

			default:
				return {width: 500, bodyStyle: {height: 200}};
		}
	};

	return (
		<Modal
			modalConfig={{
				type: 'view',
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
					path: `rtd.${changeStorePath(
						mainWay,
						catalogName
					)}.events.onRowDoubleClick`,
					onChange: ({value, setModalData, openModal}) => {
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
			<FormBody>{configCatalog(catalogName)}</FormBody>
		</Modal>
	);
};
