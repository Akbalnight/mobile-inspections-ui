import {itemsInfo} from '../../../constants/dictionary';
import {
	apiGetDataFlatConfigManagement,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
import {disabledEndDate, disabledStartDate} from './DateLimits';
import {
	CalendarOutlined,
	CompassOutlined,
	ContactsOutlined,
	DeleteOutlined,
	MedicineBoxOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import {
	Input,
	InputNumber,
	DatePicker,
	Select,
	TreeSelect,
	FormList,
	Divider,
	Space,
	Button,
	Text,
	Tabs,
	TabPane,
	List,
	Layout,
	DateText,
	Row,
} from 'rt-design';
import React from 'react';
import {changeStorePath} from './ChangeStorePath';

/**
 *
 * @param catalogName catalogName name of server configuration<string>
 * @returns {null|*}
 * @desc Choise function by DefaultObjectOnServer.js
 */
export const objectOnServer = (mainWay, catalogName) => {
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
							path: `${changeStorePath(
								mainWay,
								catalogName
							)}.data.dateScheduleStart`,
						}}
						subscribe={[
							{
								name: `${catalogName}ModalStartDatePicker`,
								path: `rtd.${changeStorePath(
									mainWay,
									catalogName
								)}.data.dateScheduleFinish`,
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
							path: `${changeStorePath(
								mainWay,
								catalogName
							)}.data.dateScheduleFinish`,
						}}
						subscribe={[
							{
								name: `${catalogName}ModalFinishDatePicker`,
								path: `rtd.${changeStorePath(
									mainWay,
									catalogName
								)}.data.dateScheduleStart`,
								onChange: ({value, setSubscribeProps}) => {
									setSubscribeProps({
										disabledDate: (endValue) =>
											disabledEndDate(value, endValue),
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
										path: `${changeStorePath(
											mainWay,
											catalogName
										)}.data.userId`,
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
											path: `rtd.${changeStorePath(
												mainWay,
												catalogName
											)}.data.userId`,
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
															value: res.data[0]
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
												fields.map((field, index) => (
													<Space
														className={'p-8'}
														key={index}
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
																	label: 'с',
																	labelCol: {
																		span: 4,
																	},
																	wrapperCol:
																		{
																			span: 18,
																		},
																	rules: [
																		{
																			required: true,
																			message:
																				'Заполните дату начала',
																		},
																	],
																}}
																showTime={true}
																format={
																	'DD.MM.YYYY HH:mm'
																}
																dispatch={{
																	path: `${changeStorePath(
																		mainWay,
																		catalogName
																	)}.data.${index}-dateScheduleStart`,
																}}
																subscribe={[
																	{
																		name: `${catalogName}ModalStartDatePicker`,
																		path: `rtd.${changeStorePath(
																			mainWay,
																			catalogName
																		)}.data.${index}-dateScheduleFinish`,
																		onChange:
																			({
																				value,
																				setSubscribeProps,
																			}) => {
																				setSubscribeProps(
																					{
																						disabledDate:
																							(
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
																	label: 'по',
																	labelCol: {
																		span: 4,
																	},
																	wrapperCol:
																		{
																			span: 18,
																		},
																	rules: [
																		{
																			required: true,
																			message:
																				'Заполните дату окончания',
																		},
																	],
																}}
																showTime={true}
																format={
																	'DD.MM.YYYY HH:mm'
																}
																dispatch={{
																	path: `${changeStorePath(
																		mainWay,
																		catalogName
																	)}.data.${index}-dateScheduleFinish`,
																}}
																subscribe={[
																	{
																		name: `${catalogName}ModalFinishDatePicker`,
																		path: `rtd.${changeStorePath(
																			mainWay,
																			catalogName
																		)}.data.${index}-dateScheduleStart`,
																		onChange:
																			({
																				value,
																				setSubscribeProps,
																			}) => {
																				setSubscribeProps(
																					{
																						disabledDate:
																							(
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
													<Space
														style={{
															display: 'flex',
															alignItems:
																'flex-start',
														}}
													>
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
																rules: [
																	{
																		required: true,
																		message:
																			'Заполните дату начала',
																	},
																],
															}}
															format={
																'DD.MM.YYYY'
															}
															dispatch={{
																path: `${changeStorePath(
																	mainWay,
																	catalogName
																)}.data.${index}-dateStartSickLeaves`,
															}}
															subscribe={[
																{
																	name: `${catalogName}ModalStartDatePicker`,
																	path: `rtd.${changeStorePath(
																		mainWay,
																		catalogName
																	)}.data.${index}-dateFinishSickLeaves`,
																	onChange: ({
																		value,
																		setSubscribeProps,
																	}) => {
																		setSubscribeProps(
																			{
																				disabledDate:
																					(
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
																rules: [
																	{
																		required: true,
																		message:
																			'Заполните дату окончания',
																	},
																],
															}}
															format={
																'DD.MM.YYYY'
															}
															dispatch={{
																path: `${changeStorePath(
																	mainWay,
																	catalogName
																)}.data.${index}-dateFinishSickLeaves`,
															}}
															subscribe={[
																{
																	name: `${catalogName}ModalFinishDatePicker`,
																	path: `rtd.${changeStorePath(
																		mainWay,
																		catalogName
																	)}.data.${index}-dateStartSickLeaves`,
																	onChange: ({
																		value,
																		setSubscribeProps,
																	}) => {
																		setSubscribeProps(
																			{
																				disabledDate:
																					(
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
																type={'text'}
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
													<Space
														style={{
															display: 'flex',
															alignItems:
																'flex-start',
														}}
													>
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
																rules: [
																	{
																		required: true,
																		message:
																			'Заполните дату начала',
																	},
																],
															}}
															format={
																'DD.MM.YYYY'
															}
															dispatch={{
																path: `${changeStorePath(
																	mainWay,
																	catalogName
																)}.data.${index}-dateStartVacation`,
															}}
															subscribe={[
																{
																	name: `${catalogName}ModalStartDatePicker`,
																	path: `rtd.${changeStorePath(
																		mainWay,
																		catalogName
																	)}.data.${index}-dateFinishVacation`,
																	onChange: ({
																		value,
																		setSubscribeProps,
																	}) => {
																		setSubscribeProps(
																			{
																				disabledDate:
																					(
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
																rules: [
																	{
																		required: true,
																		message:
																			'Заполните дату окончания',
																	},
																],
															}}
															format={
																'DD.MM.YYYY'
															}
															dispatch={{
																path: `${changeStorePath(
																	mainWay,
																	catalogName
																)}.data.${index}-dateFinishVacation`,
															}}
															subscribe={[
																{
																	name: `${catalogName}ModalFinishDatePicker`,
																	path: `rtd.${changeStorePath(
																		mainWay,
																		catalogName
																	)}.data.${index}-dateStartVacation`,
																	onChange: ({
																		value,
																		setSubscribeProps,
																	}) => {
																		setSubscribeProps(
																			{
																				disabledDate:
																					(
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
																type={'text'}
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

/**
 *
 * @param catalogName name of server configuration<string>
 * @returns {null|JSX.object}
 * @desc Choise function by DefaultObjectView.js
 */
export const objectView = (catalogName) => {
	switch (catalogName) {
		case 'departments':
			return (
				<Text
					itemProps={{...itemsInfo.parentName, label: 'Родитель'}}
				/>
			);
		case 'panelProblemsPriorities':
			return (
				<>
					<Text itemProps={{...itemsInfo.direction}} />
					<Text itemProps={{...itemsInfo.priority}} />
				</>
			);
		case 'staff':
			return (
				<>
					<Tabs type={'card'} size={'medium'}>
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
								<Text itemProps={{...itemsInfo.code}} />
								<Text itemProps={{...itemsInfo.username}} />
								<Text itemProps={{...itemsInfo.positionName}} />
								<Text
									itemProps={{
										...itemsInfo.departmentName,
									}}
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
								<List
									itemProps={{
										valuePropName: 'dataSource',
										name: 'workSchedules',
									}}
									renderItem={(item, index) => (
										<Row
											style={{
												justifyContent: 'center',
											}}
										>
											<DateText
												value={
													item[
														`${index}-StartWorkSchedules`
													]
												}
												itemProps={{
													label: 'с',
													labelCol: {span: 5},
													wrapperCol: {span: 19},
													className: 'mb-8 mr-8',
													style: {width: '150px'},
													rules: [
														{
															required: true,
															message:
																'Заполните точку измерения',
														},
													],
												}}
												format={'DD.MM.YYYY HH:mm'}
											/>
											<DateText
												value={
													item[
														`${index}-FinishWorkSchedules`
													]
												}
												itemProps={{
													label: 'по',
													labelCol: {span: 6},
													wrapperCol: {span: 18},
													className: 'mb-8 ',
													style: {width: '150px'},
													rules: [
														{
															required: true,
															message:
																'Заполните точку измерения',
														},
													],
												}}
												format={'DD.MM.YYYY HH:mm'}
											/>
										</Row>
									)}
									itemLayout={'vertical'}
									className={'mt-16'}
									style={{}}
								/>
							</Layout>
						</TabPane>
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
								<List
									itemProps={{
										valuePropName: 'dataSource',
										name: 'sickLeaves',
									}}
									renderItem={(item, index) => (
										<Row
											style={{
												justifyContent: 'center',
											}}
										>
											<DateText
												value={
													item[
														`${index}-StartSickLeaves`
													]
												}
												itemProps={{
													label: 'с',
													labelCol: {span: 5},
													wrapperCol: {span: 19},
													className: 'mb-8 mr-8',
													style: {width: '150px'},
												}}
												format={'DD.MM.YYYY'}
											/>
											<DateText
												value={
													item[
														`${index}-FinishSickLeaves`
													]
												}
												itemProps={{
													label: 'по',
													labelCol: {span: 6},
													wrapperCol: {span: 18},
													className: 'mb-8 ',
													style: {width: '150px'},
												}}
												format={'DD.MM.YYYY'}
											/>
										</Row>
									)}
									itemLayout={'vertical'}
									className={'mt-16'}
									style={{}}
								/>
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
								<List
									itemProps={{
										valuePropName: 'dataSource',
										name: 'vacation',
									}}
									renderItem={(item, index) => (
										<Row
											style={{
												justifyContent: 'center',
											}}
										>
											<DateText
												value={
													item[
														`${index}-StartVacation`
													]
												}
												itemProps={{
													label: 'с',
													labelCol: {span: 5},
													wrapperCol: {span: 19},
													className: 'mb-8 mr-8',
													style: {width: '150px'},
												}}
												format={'DD.MM.YYYY'}
											/>
											<DateText
												value={
													item[
														`${index}-FinishVacation`
													]
												}
												itemProps={{
													label: 'по',
													labelCol: {span: 6},
													wrapperCol: {span: 18},
													className: 'mb-8 ',
													style: {width: '150px'},
												}}
												format={'DD.MM.YYYY'}
											/>
										</Row>
									)}
									itemLayout={'vertical'}
									className={'mt-16'}
									style={{}}
								/>
							</Layout>
						</TabPane>
					</Tabs>
				</>
			);
		default:
			return null;
	}
};
