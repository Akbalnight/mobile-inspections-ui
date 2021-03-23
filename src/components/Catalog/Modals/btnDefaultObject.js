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
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';
import React from 'react';
import {disabledEndDate, disabledStartDate} from '../../Base/baseFunctions';

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
	Checkbox,
	Select,
	Tabs,
	TabPane,
	Layout,
	TreeSelect,
	FormList,
	Divider,
	Space,
	Button,
} = classic;
const operationOnServer = (type, catalogName, unique) => {
	const loadData = (callBack, row) => {
		console.log('row>>>', row);
		callBack(type === 'add' ? null : row);
	};
	const modalHieght = (catalogName) => {
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
								path: `catalog.${catalogName}Table.modal.dateScheduleStart`,
							}}
							subscribe={[
								{
									name: `${catalogName}ModalStartDatePicker`,
									path: `rtd.catalog.${catalogName}Table.modal.dateScheduleFinish`,
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
								path: `catalog.${catalogName}Table.modal.dateScheduleFinish`,
							}}
							subscribe={[
								{
									name: `${catalogName}ModalFinishDatePicker`,
									path: `rtd.catalog.${catalogName}Table.modal.dateScheduleStart`,
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
			case 'defectTypical':
				return (
					<>
						<Select
							itemProps={{
								...itemsInfo.parentId,
								label: 'Родитель',
							}}
							mode={'single'}
							requestLoadRows={apiGetHierarchicalDataByConfigName(
								catalogName
							)}
							optionConverter={(option) => ({
								label: option.name,
								value: option.id,
							})}
						/>
						<Checkbox itemProps={{...itemsInfo.isGroupTypical}} />
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
										requestLoadRows={apiGetFlatDataByConfigName(
											'staff'
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
																			path: `catalog.${catalogName}Table.modal.${index}-dateScheduleStart`,
																		}}
																		subscribe={[
																			{
																				name: `${catalogName}ModalStartDatePicker`,
																				path: `rtd.catalog.${catalogName}Table.modal.${index}-dateScheduleFinish`,
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
																			// name: `${index}FinishWorkSchedules`,
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
																			path: `catalog.${catalogName}Table.modal.${index}-dateScheduleFinish`,
																		}}
																		subscribe={[
																			{
																				name: `${catalogName}ModalFinishDatePicker`,
																				path: `rtd.catalog.${catalogName}Table.modal.${index}-dateScheduleStart`,
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
																	// name: `${index}StartSickLeaves`,
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
																	path: `catalog.${catalogName}Table.modal.${index}-dateStartSickLeaves`,
																}}
																subscribe={[
																	{
																		name: `${catalogName}ModalStartDatePicker`,
																		path: `rtd.catalog.${catalogName}Table.modal.${index}-dateFinishSickLeaves`,
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
																	// name: `${index}FinishSickLeaves`,
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
																	path: `catalog.${catalogName}Table.modal.${index}-dateFinishSickLeaves`,
																}}
																subscribe={[
																	{
																		name: `${catalogName}ModalFinishDatePicker`,
																		path: `rtd.catalog.${catalogName}Table.modal.${index}-dateStartSickLeaves`,
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
																	// name: `${index}StartSickLeaves`,
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
																	path: `catalog.${catalogName}Table.modal.${index}-dateStartVacation`,
																}}
																subscribe={[
																	{
																		name: `${catalogName}ModalStartDatePicker`,
																		path: `rtd.catalog.${catalogName}Table.modal.${index}-dateFinishVacation`,
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
																	// name: `${index}FinishSickLeaves`,
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
																	path: `catalog.${catalogName}Table.modal.${index}-dateFinishVacation`,
																}}
																subscribe={[
																	{
																		name: `${catalogName}ModalFinishDatePicker`,
																		path: `rtd.catalog.${catalogName}Table.modal.${index}-dateStartVacation`,
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
				disabled: type === 'add' ? false : true,
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
					height: modalHieght(catalogName),
				},
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
