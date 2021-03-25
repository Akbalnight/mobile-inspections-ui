import React, {useState} from 'react';
import {classic} from 'rt-design';
import {BasePage} from 'mobile-inspections-base-ui';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../apis/catalog.api';

import {EditOutlined} from '@ant-design/icons';
import {Form as AntForm} from 'antd';

const {
	Form,
	Select,
	RadioGroup,
	Table,
	FormBody,
	Divider,
	Title,
	Modal,
	InputNumber,
	Space,
	Col,
	DatePicker,
	Row,
	Text,
} = classic;

export default function DetoureSchedulesTable() {
	const [form] = AntForm.useForm();

	const radioProps = {
		buttonStyle: 'radioStyle',
		options: [
			{
				label: 'Никогда',
				value: 0,
			},
			{
				label: 'Повторять до:',
				value: 1,
			},
			{
				label: 'После',
				value: 2,
			},
		],
	};

	const selectProps = {
		autoClearSearchValue: true,
		showSearch: true,
		searchParamName: 'name',
		showArrow: true,
		filterOption: false,
		widthControl: '330px',
		dropdownMatchSelectWidth: 400,
		allowClear: true,
		infinityMode: true,
		dispatch: {
			path: 'debug.form.table.events.onDetoursScheduleSelect',
			type: 'event',
		},
	};

	const [inputDisabled, setInputDisabled] = useState(true);
	const [datePickerDisabled, setDatePickerDisabled] = useState(true);

	const RGHandler = ({value, setSubscribeProps}) => {
		console.log('RGHandler');
		// form.resetFields()
		let pps = {};
		if (value === 1) {
			pps.disabled = false;
		} else {
			pps.disabled = true;
			form.setFieldsValue({nextExecution: null});
		}
		setSubscribeProps({...pps});
	};

	const InputHandler = ({value, setSubscribeProps}) => {
		// console.log('form', )
		let pps = {};
		if (value === 2) {
			pps.disabled = false;
		} else {
			pps.disabled = true;
			form.setFieldsValue({finalCount: null});
		}
		setSubscribeProps({...pps});
	};

	return (
		<BasePage>
			<Form labelCol={{span: 2}} wrapperCol={{span: 22}}>
				<FormBody noPadding={false} scrollable={false}>
					<Space>
						<Modal
							//не нашел на https://ant.design/components/tooltip/
							toolTipProps={{title: 'ddw'}}
							buttonProps={{
								type: 'default',
								label: (
									<span>
										{' '}
										<EditOutlined /> Edit{' '}
									</span>
								),
								// className: 'ml-4 mr-8',
								disabled: true,
							}}
							modalConfig={{
								type: 'editOnServer',
								title: `Изменить элемент`,
								requestSaveRow: apiSaveByConfigName(
									`repeaterDataSave`
								),
								width: 650,
								bodyStyle: {height: 400},
								form: {
									// processBeforeSaveForm: processBeforeSaveForm,
									name: 'detourScheduleModel',
									form: form,
									labelCol: {span: 30},
									wrapperCol: {span: 35},
									loadInitData: (callBack, row) => {
										console.log('loadInitData', row);

										const newData = {
											...row,
											mode: 0,
										};
										console.log(newData);
										setDatePickerDisabled(true);
										setInputDisabled(true);

										if (newData.nextExecution) {
											console.log(
												'newData.finalCount nextExecution',
												newData.finalCount
											);
											newData.mode = 1;
											setDatePickerDisabled(false);
											setInputDisabled(true);
										} else if (
											newData.finalCount &&
											newData.finalCount !== 0
										) {
											console.log(
												'newData.finalCount finalCount',
												newData.finalCount
											);
											newData.mode = 2;
											setDatePickerDisabled(true);
											setInputDisabled(false);
										}

										console.log(
											'newData',
											newData,
											inputDisabled,
											datePickerDisabled
										);
										callBack(newData);
									},
								},
							}}
							dispatch={{
								path:
									'detourSchedulesTable.form.table.events.onEditModal',
								type: 'event',
							}}
							subscribe={[
								{
									name: 'tableCloseInfo',
									path:
										'rtd.detourSchedulesTable.form.table.selected',
									onChange: ({
										value,
										setModalData,
										setButtonProps,
									}) => {
										console.log(
											'Modal dispatch',
											value,
											setModalData,
											setButtonProps
										);
										// console.log('buttonCloseWithNote value => ', value);
										// ??boolean
										value &&
											setModalData &&
											setModalData(value);
										setButtonProps &&
											setButtonProps({disabled: !value});
									},
								},
							]}
						>
							<FormBody noPadding={false} scrollable={false}>
								<div style={{paddingBottom: '15px'}}>
									<Title className={'mb-0'} level={5}>
										Повторение
									</Title>
								</div>
								<div style={{paddingLeft: '60px'}}>
									<Select
										{...selectProps}
										itemProps={{
											label: 'Повторение',
											name: 'periodName',
										}}
										dispatch={{
											path: 'detourSchedules.form.select',
										}}
										options={[
											{label: 'День', value: 'day'},
											{label: 'Неделя', value: 'week'},
											{label: 'Месяц', value: 'month'},
										]}
									/>
								</div>
								<div style={{paddingLeft: '44px'}}>
									<InputNumber
										itemProps={{
											label: 'Интервал, дней',
											name: 'interval',
										}}
										dispatch={{
											path:
												'detourSchedules.form.inputNumber',
										}}
									/>
								</div>
								<Row
									gutter={10}
									itemProps={{label: 'Завершить повторение'}}
								>
									<Col span={3}>
										<RadioGroup
											itemProps={{name: 'mode'}}
											{...radioProps}
											className={
												'detours-schedules-radio-group-mode'
											}
											dispatch={{
												path:
													'detourSchedules.form.mode',
											}}
										/>
									</Col>
									<Col
										span={14}
										style={{
											paddingTop: '42px',
											paddingLeft: '60px',
										}}
									>
										<DatePicker
											itemProps={{name: 'nextExecution'}}
											format={'DD.MM.YYYY'}
											className={'mb-8'}
											disabled={datePickerDisabled}
											subscribe={[
												{
													name: 'radioGroupMode',
													path:
														'rtd.detourSchedules.form.mode',
													onChange: RGHandler,
												},
											]}
										/>
										<Space>
											<InputNumber
												itemProps={{name: 'finalCount'}}
												style={{
													width: '130px',
													className: 'mb-8',
												}}
												disabled={inputDisabled}
												subscribe={[
													{
														name: 'inputNumberMode',
														path:
															'rtd.detourSchedules.form.mode',
														onChange: InputHandler,
													},
												]}
											/>
											<Text>повторений</Text>
										</Space>
									</Col>
								</Row>
							</FormBody>
						</Modal>
					</Space>
					<Divider />
					<Table
						//?Разница onSelectedRowsChange и onRowClick
						itemProps={{name: 'table'}}
						requestLoadRows={apiGetFlatDataByConfigName(
							'repeaters'
						)}
						requestLoadConfig={apiGetConfigByName('repeaters')} //
						zebraStyle={true}
						dispatchPath={'detourSchedulesTable.form.table'}
						subscribe={[
							{
								name: 'onEditModal',
								path:
									'rtd.detourSchedulesTable.form.table.events.onEditModal',
								onChange: ({reloadTable}) => {
									reloadTable({filter: {}});
								},
							},
						]}
					/>
				</FormBody>
			</Form>
		</BasePage>
	);
}
