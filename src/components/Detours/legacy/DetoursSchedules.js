import {BasePage} from 'mobile-inspections-base-ui';
import React from 'react';
import {classic} from 'rt-design';
import {apiSaveByConfigName} from '../../../apis/catalog.api';

const {
	Form,
	Select,
	Button,
	RadioGroup,
	FormHeader,
	FormBody,
	FormFooter,
	Title,
	Text,
	InputNumber,
	Space,
	Row,
	Col,
	DatePicker,
} = classic;

export default function DetoursSchedules() {
	const radioProps = {
		defaultValue: 0,
		buttonStyle: 'radioStyle',
		// dispatch: {
		//     path: 'debug.form.mode.onChange',
		// },
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
		widthControl: '390px',
		dropdownMatchSelectWidth: 400,
		mode: 'multiple',
		allowClear: true,
		infinityMode: true,
		// requestLoadRows: apiGetFlatDataByConfigName('routes'),
		// optionConverter: (option) => ({
		//     label: (
		//         <span>
		// 			{option.name}
		// 		</span>
		//     ),
		//     value: option.id,
		//     className: '',
		//     disabled: undefined,
		// }),
		dispatch: {
			path: 'debug.form.table.events.onDetoursScheduleSelect',
			type: 'event',
		},
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const processBeforeSaveForm = (rawValues) => {
		let repeater = {};

		repeater.configName = 'detours';

		repeater.periodName = 'day';
		repeater.interval = rawValues.code;
		repeater.dateFinish = rawValues.datePicker.format();
		repeater.finalCount = rawValues.InputNumber;
		repeater.currentCount = 0;
		repeater.isAvailable = true;

		let date = new Date();
		date.setDate(date.getDate() + repeater.interval);
		repeater.nextExecution = date;

		console.log('repeater', repeater);

		return repeater;
	};

	return (
		<BasePage>
			<Form
				labelCol={{span: 4}}
				wrapperCol={{span: 14}}
				className={'detours-schedules'}
				methodSaveForm={'POST'}
				processBeforeSaveForm={processBeforeSaveForm}
				requestSaveForm={apiSaveByConfigName('repeaterDataSave')}
				// onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<FormHeader>
					<Title className={'mb-0'} level={3}>
						Создание обхода
					</Title>
				</FormHeader>
				<FormBody noPadding={false} scrollable={false}>
					<Title className={'mb-0'} level={5}>
						Повторение
					</Title>
					<Select
						{...selectProps}
						itemProps={{label: 'Повторение', name: 'select2'}}
						dispatch={{path: 'detourSchedules.form.select'}}
						options={[
							{label: 'День', value: 'day'},
							{label: 'Неделя', value: 'week'},
							{label: 'Месяц', value: 'month'},
						]}
					/>
					<InputNumber
						itemProps={{label: 'Интервал, дней', name: 'code'}}
						dispatch={{path: 'detourSchedules.form.inputNumber'}}
					/>
					<Row
						gutter={10}
						itemProps={{label: 'Завершить повторение'}}
					>
						<Col span={3}>
							<RadioGroup
								itemProps={{name: 'mode'}}
								{...radioProps}
								className={'detours-schedules-radio-group-mode'}
								dispatch={{path: 'detourSchedules.form.mode'}}
							/>
						</Col>
						<Col span={6} style={{paddingTop: '42px'}}>
							<DatePicker
								itemProps={{name: 'nextExecution'}}
								format={'DD.MM.YYYY'}
								className={'mb-8'}
								disabled={true}
								subscribe={[
									{
										name: 'radioGroupMode',
										path: 'rtd.detourSchedules.form.mode',
										onChange: ({
											value,
											setSubscribeProps,
										}) => {
											setSubscribeProps({
												disabled: !(value === 1),
											});
										},
									},
								]}
							/>
							<Space>
								<InputNumber
									itemProps={{name: 'finalCount'}}
									style={{width: '150px', className: 'mb-8'}}
									disabled={true}
									subscribe={[
										{
											name: 'inputNumberMode',
											path:
												'rtd.detourSchedules.form.mode',
											onChange: ({
												value,
												setSubscribeProps,
											}) => {
												const inputProps = {};
												if (value === 2)
													inputProps.disabled = false;
												else {
													inputProps.disabled = true;
													inputProps.value = null;
												}
												setSubscribeProps(inputProps);
											},
										},
									]}
								/>
								<Text>повторений</Text>
							</Space>
						</Col>
					</Row>
				</FormBody>
				<FormFooter>
					<Button className={'mr-8'} onClick={console.log()}>
						Закрыть
					</Button>
					<Button
						className={'mr-8'}
						type={'primary'}
						htmlType={'submit'}
					>
						Сохранить
					</Button>
				</FormFooter>
			</Form>
		</BasePage>
	);
}
