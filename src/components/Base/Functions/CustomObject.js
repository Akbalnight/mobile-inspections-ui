import {ReactComponent as InfoTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/infoTab.svg';
import {itemsInfo} from '../../../constants/dictionary';
import {apiGetHierarchicalDataByConfigName} from '../../../apis/catalog.api';
import {
	DeleteOutlined,
	FolderOutlined,
	PlusOutlined,
	ToolOutlined,
} from '@ant-design/icons';
import {disabledEndDate, disabledStartDate} from './DateLimits';
import {ReactComponent as MeasuringPointsTab} from '../../../imgs/tabPane/catalogTabs/equipmentTabs/measuringPointsTab.svg';
import React from 'react';
import {
	TreeSelect,
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
} from 'rt-design';

/**
 *
 * @param catalogName name of server configuration<string>
 * @returns {JSX.object}
 * @desc objectOnServer - func choice JSX by catalogName in CustomObjectOnServer.js
 */

export const objectOnServer = (catalogName) => {
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
													disabledDate: (endValue) =>
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
													justifyContent:
														'space-between',
												}}
												className={'mb-8 mt-8'}
											/>
											{fields &&
												fields.map((field, index) => (
													<Space
														className={'p-8'}
														key={field.key}
														style={{
															width: '100%',
															justifyContent:
																'center',
														}}
													>
														<Space
															style={{
																display: 'flex',
																alignItems:
																	'flex-start',
															}}
														>
															<Input
																itemProps={{
																	className:
																		'mb-0',
																	name: `${index}`,
																	rules: [
																		{
																			required: true,
																			message:
																				'Заполните точку измерения',
																		},
																	],
																	label:
																		'Точка измерений',
																	labelCol: {
																		span: 10,
																	},
																	wrapperCol: {
																		span: 14,
																	},
																}}
																placeholder='Данные точки измерения'
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
												))}
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
							apiGetHierarchicalDataByConfigName('defectTypical')(
								{
									data: {...data, isGroup: true},
									params,
								}
							)
						}
						optionConverter={(option) => ({
							value: option.id,
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
