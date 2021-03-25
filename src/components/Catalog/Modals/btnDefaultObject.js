import {classic} from 'rt-design';
import {itemsInfo} from '../tableProps';
import {
	CalendarOutlined,
	CompassOutlined,
	ContactsOutlined,
	DeleteOutlined,
	EditOutlined,
	MedicineBoxOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import {
	apiGetDataFlatConfigManagement,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';
import React from 'react';
import {disabledEndDate, disabledStartDate} from '../../Base/baseFunctions';

/**
 *
 * @param catalogName name of server configuration
 * @param unique phrase on Russian
 * @returns {JSX.object}
 */
export const AddDefaultButton = ({catalogName, unique}) =>
	operationOnServer('add', catalogName, unique);
export const EditDefaultButton = ({catalogName, unique}) =>
	operationOnServer('edit', catalogName, unique);

const {
	Modal,
	FormBody,
	Input,
	InputNumber,
	DatePicker,
	Select,
	Tabs,
	TabPane,
	Layout,
	TreeSelect,
	FormList,
	Divider,
	Space,
	Button,
	Text,
} = classic;

/**
 *
 * @param type modal type<string>
 * @param catalogName name of server configuration<string>
 * @param unique phrase on Russian<string>
 * @returns {JSX.object}
 * @desc Modal work only object in row
 */
const operationOnServer = (type, catalogName, unique) => {
	/**
	 *
	 * @param callBack function change state (row)
	 * @param row info object from table
	 */
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};

	/**
	 *
	 * @param rawValues
	 * @desc Function return few changes in save object
	 */
	const processBeforeSaveForm = (rawValues) => {
		if (catalogName === 'staff') {
			const values = {...rawValues};
			return {
				...values,
				id: values.userId,
			};
		} else return rawValues;
	};

	/**
	 *
	 * @param catalogName name of server configuration<string>
	 * @returns {number}
	 * @desc Func choice height number by catalogName
	 */
	const modalHeight = (catalogName) => {
		switch (catalogName) {
			case 'staff':
				return 350;
			case 'departments':
				return 250;
			case 'panelProblemsPriorities':
			case 'staffWorkSchedules':
			case 'defectTypical':
				return 210;
			default:
				return 150;
		}
	};

	/**
	 *
	 * @param catalogName name of server configuration<string>
	 * @returns {null|JSX.object}
	 */
	const catalogOption = (catalogName) => {
		switch (catalogName) {
			case 'departments':
				return (
					<>
						<Select
							itemProps={{
								...itemsInfo.parentId,
								label: 'Родитель',
							}}
							autoClearSearchValue={true}
							showSearch={true}
							mode={'single'}
							searchValueName={'name'}
							infinityMode={true}
							requestLoadRows={apiGetFlatDataByConfigName(
								catalogName
							)}
							optionConverter={(option) => ({
								label: option.name,
								value: option.id,
							})}
						/>
					</>
				);
			case 'panelProblemsPriorities':
				return (
					<>
						<Input itemProps={{...itemsInfo.direction}} />
						<InputNumber
							itemProps={{...itemsInfo.priority}}
							min={1}
							max={4}
							style={{
								width: '100%',
							}}
						/>
					</>
				);
			case 'staffWorkSchedules':
				return (
					<>
						<DatePicker
							itemProps={{
								...itemsInfo.dateStartSchedule,
							}}
							showTime={true}
							format={'DD.MM.YYYY HH:mm'}
							dispatch={{
								path: `catalog.${catalogName}Table.modal.datePicker.dateScheduleStart`,
							}}
							subscribe={[
								{
									name: `${catalogName}ModalStartDatePicker`,
									path: `rtd.catalog.${catalogName}Table.modal.datePicker.dateScheduleFinish`,
									onChange: ({value, setSubscribeProps}) => {
										setSubscribeProps({
											disabledDate: (startValue) =>
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
								...itemsInfo.dateFinishSchedule,
							}}
							showTime={true}
							format={'DD.MM.YYYY HH:mm'}
							dispatch={{
								path: `catalog.${catalogName}Table.modal.datePicker.dateScheduleFinish`,
							}}
							subscribe={[
								{
									name: `${catalogName}ModalFinishDatePicker`,
									path: `rtd.catalog.${catalogName}Table.modal.datePicker.dateScheduleStart`,
									onChange: ({value, setSubscribeProps}) => {
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
					</>
				);
			case 'staff':
				return (
					<>
						<Tabs type={'card'} size={'medium'} className={'p-0'}>
							<TabPane
								key={'infoTab'}
								tab={
									<span>
										<ContactsOutlined />
										Общие сведения
									</span>
								}
								scrollable={true}
							>
								<Layout>
									<Select
										itemProps={{...itemsInfo.userId}}
										mode={'single'}
										dispatch={{
											path: `catalog.${catalogName}Table.modal.userId`,
										}}
										requestLoadRows={apiGetDataFlatConfigManagement(
											'users'
										)}
										optionConverter={(option) => ({
											label: option.username,
											value: option.id,
										})}
									/>
									<Select
										itemProps={{...itemsInfo.positionId}}
										mode={'single'}
										requestLoadRows={apiGetFlatDataByConfigName(
											'staffPositions'
										)}
										optionConverter={(option) => ({
											label: option.name,
											value: option.id,
										})}
									/>
									<TreeSelect
										itemProps={{...itemsInfo.departmentId}}
										mode={'single'}
										treeDefaultExpandAll={true}
										requestLoadRows={apiGetHierarchicalDataByConfigName(
											'departments'
										)}
										optionConverter={(option) => ({
											label: option.name,
											value: option.id,
											children: option.children,
										})}
									/>
									<Text
										itemProps={{
											...itemsInfo.username,
											hidden: true,
										}}
										subscribe={[
											{
												name: 'userId',
												path: `rtd.catalog.${catalogName}Table.modal.userId`,
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													// console.log('username')
													apiGetDataFlatConfigManagement(
														'users'
													)({data: {id: value}})
														.then((res) =>
															setSubscribeProps({
																value:
																	res.data[0]
																		.username,
															})
														)
														.catch((err) =>
															console.log(err)
														);
												},
											},
										]}
									/>
								</Layout>
							</TabPane>
							<TabPane
								key={'schedulesTab'}
								tab={
									<span>
										<CalendarOutlined />
										Рабочие графики
									</span>
								}
								scrollable={true}
							>
								<Layout>
									<FormList name={'workSchedules'}>
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
																key={index}
																style={{
																	width:
																		'100%',
																	justifyContent:
																		'center',
																}}
															>
																<Space>
																	<DatePicker
																		itemProps={{
																			className:
																				'mb-0',
																			name: [
																				field.name,
																				`${index}-StartWorkSchedules`,
																			],
																			fieldKey: [
																				field.fieldKey,
																				`${index}-StartWorkSchedules`,
																			],
																			label:
																				'с',
																			labelCol: {
																				span: 4,
																			},
																			wrapperCol: {
																				span: 18,
																			},
																		}}
																		showTime={
																			true
																		}
																		format={
																			'DD.MM.YYYY HH:mm'
																		}
																		dispatch={{
																			path: `catalog.${catalogName}Table.modal.datePicker.${index}-dateScheduleStart`,
																		}}
																		subscribe={[
																			{
																				name: `${catalogName}ModalStartDatePicker`,
																				path: `rtd.catalog.${catalogName}Table.modal.datePicker.${index}-dateScheduleFinish`,
																				onChange: ({
																					value,
																					setSubscribeProps,
																				}) => {
																					setSubscribeProps(
																						{
																							disabledDate: (
																								startValue
																							) =>
																								disabledStartDate(
																									startValue,
																									value
																								),
																						}
																					);
																				},
																			},
																		]}
																	/>
																	<DatePicker
																		itemProps={{
																			className:
																				'mb-0',
																			name: [
																				field.name,
																				`${index}-FinishWorkSchedules`,
																			],
																			fieldKey: [
																				field.fieldKey,
																				`${index}-FinishWorkSchedules`,
																			],
																			label:
																				'по',
																			labelCol: {
																				span: 4,
																			},
																			wrapperCol: {
																				span: 18,
																			},
																		}}
																		showTime={
																			true
																		}
																		format={
																			'DD.MM.YYYY HH:mm'
																		}
																		dispatch={{
																			path: `catalog.${catalogName}Table.modal.datePicker.${index}-dateScheduleFinish`,
																		}}
																		subscribe={[
																			{
																				name: `${catalogName}ModalFinishDatePicker`,
																				path: `rtd.catalog.${catalogName}Table.modal.datePicker.${index}-dateScheduleStart`,
																				onChange: ({
																					value,
																					setSubscribeProps,
																				}) => {
																					setSubscribeProps(
																						{
																							disabledDate: (
																								endValue
																							) =>
																								disabledEndDate(
																									value,
																									endValue
																								),
																						}
																					);
																				},
																			},
																		]}
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
							</TabPane>{' '}
							<TabPane
								key={'sickLeavesTab'}
								tab={
									<span>
										<MedicineBoxOutlined />
										Больничные
									</span>
								}
								scrollable={true}
							>
								<Layout>
									<FormList name={'sickLeaves'}>
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
												{fields.map((field, index) => (
													<Space
														className={'p-8'}
														key={field.key}
														style={{
															width: '100%',
															justifyContent:
																'center',
														}}
													>
														<Space>
															<DatePicker
																itemProps={{
																	className:
																		'mb-0',
																	name: [
																		field.name,
																		`${index}-StartSickLeaves`,
																	],
																	fieldKey: [
																		field.fieldKey,
																		`${index}-StartSickLeaves`,
																	],
																	label: 'с',
																	labelCol: {
																		span: 4,
																	},
																	wrapperCol: {
																		span: 18,
																	},
																}}
																format={
																	'DD.MM.YYYY'
																}
																dispatch={{
																	path: `catalog.${catalogName}Table.modal.datePicker.${index}-dateStartSickLeaves`,
																}}
																subscribe={[
																	{
																		name: `${catalogName}ModalStartDatePicker`,
																		path: `rtd.catalog.${catalogName}Table.modal.datePicker.${index}-dateFinishSickLeaves`,
																		onChange: ({
																			value,
																			setSubscribeProps,
																		}) => {
																			setSubscribeProps(
																				{
																					disabledDate: (
																						startValue
																					) =>
																						disabledStartDate(
																							startValue,
																							value
																						),
																				}
																			);
																		},
																	},
																]}
															/>
															<DatePicker
																itemProps={{
																	className:
																		'mb-0',
																	name: [
																		field.name,
																		`${index}-FinishSickLeaves`,
																	],
																	fieldKey: [
																		field.fieldKey,
																		`${index}-FinishSickLeaves`,
																	],
																	label: 'по',
																	labelCol: {
																		span: 4,
																	},
																	wrapperCol: {
																		span: 18,
																	},
																}}
																format={
																	'DD.MM.YYYY'
																}
																dispatch={{
																	path: `catalog.${catalogName}Table.modal.datePicker.${index}-dateFinishSickLeaves`,
																}}
																subscribe={[
																	{
																		name: `${catalogName}ModalFinishDatePicker`,
																		path: `rtd.catalog.${catalogName}Table.modal.datePicker.${index}-dateStartSickLeaves`,
																		onChange: ({
																			value,
																			setSubscribeProps,
																		}) => {
																			setSubscribeProps(
																				{
																					disabledDate: (
																						endValue
																					) =>
																						disabledEndDate(
																							value,
																							endValue
																						),
																				}
																			);
																		},
																	},
																]}
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
							<TabPane
								key={'vacationTab'}
								tab={
									<span>
										<CompassOutlined />
										Отпуска
									</span>
								}
								scrollable={true}
							>
								<Layout>
									<FormList name={'vacation'}>
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
												{fields.map((field, index) => (
													<Space
														className={'p-8'}
														key={field.key}
														style={{
															width: '100%',
															justifyContent:
																'center',
														}}
													>
														<Space>
															<DatePicker
																itemProps={{
																	className:
																		'mb-0',
																	name: [
																		field.name,
																		`${index}-StartVacation`,
																	],
																	fieldKey: [
																		field.fieldKey,
																		`${index}-StartVacation`,
																	],
																	label: 'с',
																	labelCol: {
																		span: 4,
																	},
																	wrapperCol: {
																		span: 18,
																	},
																}}
																format={
																	'DD.MM.YYYY'
																}
																dispatch={{
																	path: `catalog.${catalogName}Table.modal.datePicker.${index}-dateStartVacation`,
																}}
																subscribe={[
																	{
																		name: `${catalogName}ModalStartDatePicker`,
																		path: `rtd.catalog.${catalogName}Table.modal.datePicker.${index}-dateFinishVacation`,
																		onChange: ({
																			value,
																			setSubscribeProps,
																		}) => {
																			setSubscribeProps(
																				{
																					disabledDate: (
																						startValue
																					) =>
																						disabledStartDate(
																							startValue,
																							value
																						),
																				}
																			);
																		},
																	},
																]}
															/>
															<DatePicker
																itemProps={{
																	className:
																		'mb-0',
																	name: [
																		field.name,
																		`${index}-FinishVacation`,
																	],
																	fieldKey: [
																		field.fieldKey,
																		`${index}-FinishVacation`,
																	],
																	label: 'по',
																	labelCol: {
																		span: 4,
																	},
																	wrapperCol: {
																		span: 18,
																	},
																}}
																format={
																	'DD.MM.YYYY'
																}
																dispatch={{
																	path: `catalog.${catalogName}Table.modal.datePicker.${index}-dateFinishVacation`,
																}}
																subscribe={[
																	{
																		name: `${catalogName}ModalFinishDatePicker`,
																		path: `rtd.catalog.${catalogName}Table.modal.datePicker.${index}-dateStartVacation`,
																		onChange: ({
																			value,
																			setSubscribeProps,
																		}) => {
																			setSubscribeProps(
																				{
																					disabledDate: (
																						endValue
																					) =>
																						disabledEndDate(
																							value,
																							endValue
																						),
																				}
																			);
																		},
																	},
																]}
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
				return null;
		}
	};
	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type !== 'add',
				className: 'mr-8',
			}}
			toolTipProps={{
				title: type === 'add' ? 'Создать' : 'Редактировать',
			}}
			modalConfig={{
				type: `${type}OnServer`,
				title: `${
					type === 'add' ? 'Создание' : 'Редактирование'
				} ${unique}`,
				width: catalogName !== 'staff' ? 450 : 650,
				bodyStyle: {
					height: modalHeight(catalogName),
				},
				requestSaveRow: apiSaveByConfigName(
					`${catalogName}CatalogSave`
				),
				form: {
					name: `${type}ModalForm`,
					loadInitData: loadData,
					processBeforeSaveForm: processBeforeSaveForm,
					methodSaveForm: type === 'add' ? 'POST' : 'PUT',
					onFinish: (values) => {
						console.log('values', values);
					},
					labelCol: {span: 10},
					wrapperCol: {span: 12},
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
						type !== 'add' &&
							setButtonProps &&
							setButtonProps({
								disabled: !value,
							});
					},
				},
			]}
		>
			<FormBody>
				{catalogName !== 'staff' ? (
					<Input itemProps={{...itemsInfo.name}} />
				) : null}
				{catalogOption(catalogName)}
			</FormBody>
		</Modal>
	);
};
