import React from 'react';
import {classic} from 'rt-design';
import {ReactComponent as InfoTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/infoTab.svg';
import {itemsInfo} from '../tableProps';
import {ReactComponent as MeasuringPointsTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/measuringPointsTab.svg';

import {
	apiGetHierarchicalDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';

import {
	DeleteOutlined,
	EditOutlined,
	FolderOutlined,
	PlusOutlined,
	ToolOutlined,
} from '@ant-design/icons';
import {disabledEndDate, disabledStartDate} from '../../Base/baseFunctions';
// import {paths} from "../../../constants/paths";
// import {useHistory} from "react-router";

const {
	FormBody,
	TreeSelect,
	Modal,
	Checkbox,
	Input,
	DatePicker,
	Tabs,
	TabPane,
	Layout,
	Divider,
	Space,
	Button,
	FormList,
	Title,
} = classic;

/**
 *
 * @param catalogName name of server configuration<string>
 * @param unique phrase on Russian<string>
 * @returns {JSX.object}
 *
 */
export const AddCustomObjectButton = ({catalogName, unique}) =>
	operationOnServer('add', catalogName, unique);

export const EditCustomObjectButton = ({catalogName, unique}) =>
	operationOnServer('edit', catalogName, unique);

/**
 *
 * @param type modal type<string>
 * @param catalogName name of server configuration<string>
 * @param unique phrase on Russian<string>
 * @returns {JSX.object}
 * @desc Modal work only object in row
 */
const operationOnServer = (type, catalogName, unique) => {
	let sRow;
	const loadData = (callBack, row) => {
		sRow = row;
		callBack(type === 'add' ? null : sRow);
	};

	/**
	 *
	 * @param catalogName name of server configuration<string>
	 * @returns {null|JSX.object}
	 */
	const catalogConfig = (catalogName) => {
		switch (catalogName) {
			case 'equipments':
				return (
					<>
						<Tabs type={'card'} size={'large'}>
							<TabPane
								tab={<InfoTab />}
								key={'infoTab'}
								style={{overflow: 'auto'}}
								scrollable={true}
							>
								<Layout>
									<Input
										itemProps={{
											...itemsInfo.typeEquipment,
										}}
									/>
									<Input
										itemProps={{
											...itemsInfo.sapId,
										}}
									/>
									<Input
										itemProps={{
											...itemsInfo.name,
										}}
									/>

									<TreeSelect
										itemProps={{...itemsInfo.parentId}}
										treeCheckStrictly={false}
										treeDefaultExpandAll={true}
										requestLoadRows={({data, params}) =>
											apiGetHierarchicalDataByConfigName(
												'equipments'
											)({
												data: {...data, isGroup: true},
												params,
											})
										}
										optionConverter={(option) => ({
											value: option.id, //change
											label: (
												<span>
													{option.isGroup ? (
														<FolderOutlined />
													) : (
														<ToolOutlined />
													)}{' '}
													{option.techPlacePath}
												</span>
											),
											children: option.children,
										})}
									/>
									<Input
										itemProps={{
											...itemsInfo.constructionType,
										}}
									/>
									<Input
										itemProps={{
											...itemsInfo.material,
										}}
									/>
									<Input
										itemProps={{
											...itemsInfo.size,
										}}
									/>
									<Input
										itemProps={{
											...itemsInfo.weight,
										}}
									/>
									<Input
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
									<DatePicker
										itemProps={{
											...itemsInfo.dateFinish,
										}}
										format={'DD.MM.YYYY'}
									/>
									<Title label={'Гарантии'} level={5} />
									<DatePicker
										itemProps={{
											...itemsInfo.dateWarrantyStart,
										}}
										format={'DD.MM.YYYY'}
										dispatch={{
											path: `catalog.${catalogName}Table.modal.dateWarrantyStart`,
										}}
										subscribe={[
											{
												name: `${catalogName}ModalStartDatePicker`,
												path: `rtd.catalog.${catalogName}Table.modal.dateWarrantyFinish`,
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													setSubscribeProps({
														disabledDate: (
															startValue
														) =>
															disabledStartDate(
																startValue,
																value
															),
													});
												},
											},
										]}
									/>
									<DatePicker
										itemProps={{
											...itemsInfo.dateWarrantyFinish,
										}}
										format={'DD.MM.YYYY'}
										dispatch={{
											path: `catalog.${catalogName}Table.modal.dateWarrantyFinish`,
										}}
										subscribe={[
											{
												name: `${catalogName}ModalFinishDatePicker`,
												path: `rtd.catalog.${catalogName}Table.modal.dateWarrantyStart`,
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													setSubscribeProps({
														disabledDate: (
															endValue
														) =>
															disabledEndDate(
																value,
																endValue
															),
													});
												},
											},
										]}
									/>
								</Layout>
							</TabPane>
							<TabPane
								tab={<MeasuringPointsTab />}
								key={'measuringPoints'}
							>
								<Layout>
									<FormList name={'measuringPoints'}>
										{(fields, {add, remove}) => (
											<>
												<Space className={'mb-0'}>
													<Button
														icon={<PlusOutlined />}
														onClick={() => add()}
													/>
												</Space>
												<Divider
													itemProps={{
														className: 'mb-0',
													}}
													className={'mb-8 mt-8'}
												/>
												{fields &&
													fields.map(
														(field, index) => (
															<Space
																className={
																	'p-8'
																}
																key={field.key}
																style={{
																	width:
																		'100%',
																}}
															>
																<Space
																	style={{
																		display:
																			'flex',
																	}}
																>
																	<Input
																		itemProps={{
																			className:
																				'mb-0',
																			name: `${index}`,
																			style: {
																				alignSelf:
																					'stretch',
																			},
																		}}
																		placeholder='Данные точки измерения'
																		style={{
																			width:
																				'550px',
																		}}
																	/>
																	{fields.length ? (
																		<Button
																			icon={
																				<DeleteOutlined />
																			}
																			onClick={() =>
																				remove(
																					field.name
																				)
																			}
																			type={
																				'text'
																			}
																		/>
																	) : null}
																</Space>
															</Space>
														)
													)}
											</>
										)}
									</FormList>
								</Layout>
							</TabPane>
						</Tabs>
					</>
				);
			default:
				return (
					<>
						<Input
							itemProps={{
								...itemsInfo.name,
								wrapperCol: {span: 12},
							}}
						/>

						<TreeSelect
							itemProps={{
								...itemsInfo.parentId,
								label: 'Родитель',
								wrapperCol: {span: 12},
							}}
							treeCheckStrictly={false}
							treeDefaultExpandAll={true}
							requestLoadRows={({data, params}) =>
								apiGetHierarchicalDataByConfigName(catalogName)(
									{
										data: {...data, isGroup: true},
										params,
									}
								)
							}
							optionConverter={(option) => ({
								value: option.id, //change
								label: (
									<span>
										{option.isGroup ? (
											<FolderOutlined />
										) : (
											<ToolOutlined />
										)}{' '}
										{option.name}
									</span>
								),
								children: option.children,
							})}
						/>
					</>
				);
		}
	};
	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type === 'add' ? false : true,
				className: type === 'add' ? 'mr-8' : 'mr-0',
			}}
			toolTipProps={{
				title: type === 'add' ? 'Создать' : 'Редактировать',
			}}
			modalConfig={{
				type: `${type}OnServer`,
				title: `${
					type === 'add' ? 'Создание' : 'Редактирование'
				} ${unique}`,
				width: catalogName === 'equipments' ? 650 : 500,
				bodyStyle: {height: catalogName === 'equipments' ? 700 : 200},
				requestSaveRow: apiSaveByConfigName(
					`${catalogName}CatalogSave`
				), //не забыть поставить
				form: {
					name: `${type}ModalForm`,
					loadInitData: loadData,
					onFinish: (values) => {
						console.log('values', values);
					},
					labelCol: {span: 10},
					wrapperCol: {span: 10},
				},
			}}
			dispatch={{
				path: `catalog.${catalogName}Table.modal.events.${type}OnModal`,
				type: 'event',
			}}
			subscribe={[
				{
					name: `${catalogName}TableInfo`,
					path: `rtd.catalog.${catalogName}Table.table.selected`,
					onChange: ({value, setModalData, setButtonProps}) => {
						value && setModalData && setModalData(value);
						type === 'edit' &&
							value &&
							setButtonProps &&
							setButtonProps({
								disabled: value.isGroup,
								hidden: value.isGroup,
							});
					},
				},
			]}
		>
			<FormBody>{catalogConfig(catalogName)}</FormBody>
		</Modal>
	);
};
