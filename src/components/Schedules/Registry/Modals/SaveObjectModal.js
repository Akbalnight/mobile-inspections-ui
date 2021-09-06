import React from 'react';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../../apis/application.api';
import {
	Select,
	RadioGroup,
	FormBody,
	Modal,
	InputNumber,
	Space,
	Col,
	DatePicker,
	Row,
	Text,
	Checkbox,
	Input,
	TimePicker,
	Title,
} from 'rt-design';
import {itemsInfo} from '../../../../constants/dictionary';

/** checkValue задается при первом вызове функции
 * value и setSubscribeProps прилетают при срабатывании subscribe
 */
const onChangeRepeaterType =
	(checkValue) =>
	({value, setSubscribeProps}) => {
		const disabled = value.value !== checkValue;
		setSubscribeProps({disabled: disabled});
	};

const prefixCls = 'detours-schedules-registry-modal';

export const AddDetourButton = () => operaionOnServer('add');
export const EditDetourButton = () => operaionOnServer('edit');

const operaionOnServer = (type) => {
	const processBeforeSaveForm = (rawValues) => {
		const values = {...rawValues};

		//Доступен ли repeater для выполнения
		values.isAvailable = true;
		//По умолчанию все конфиги для обходов
		values.configName = 'detours';

		rawValues.data.detourBeginTime = rawValues.data.detourBeginTime.format(
			'YYYY-MM-DDTHH:mm:ss.SSSSZ'
		);

		rawValues.data.detourEndTime = rawValues.data.detourEndTime.format(
			'YYYY-MM-DDTHH:mm:ss.SSSSZ'
		);

		if (values.repeaterType === '02') {
			values.finalCount = null;
		} else if (values.repeaterType === '03') {
			values.dateFinish = null;
		} else {
			values.finalCount = null;
			values.dateFinish = null;
		}

		return values;
	};

	const footerCheckboxLayout = {
		labelCol: {span: 23},
		wrapperCol: {span: 1},
	};
	const footerInputLayout = {
		labelCol: {span: 18},
		wrapperCol: {span: 6},
	};
	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type !== 'add',
			}}
			toolTipProps={{
				title: type === 'add' ? 'Создать' : 'Редактировать',
			}}
			modalConfig={{
				type: 'save',
				title: `${
					type === 'add' ? 'Создание' : 'Изменение'
				} расписания обхода`,
				methodSaveForm: type === 'add' ? 'POST' : 'PUT',
				requestSaveForm: apiSaveByConfigName(`repeaterDataSave`),
				width: 700,
				bodyStyle: {height: 580},
				form: {
					name: 'schedulesEditModal',
					className: prefixCls,
					labelCol: {span: 8},
					wrapperCol: {span: 16},
					processBeforeSaveForm: processBeforeSaveForm,
					loadInitData: (callBack, row) => {
						let newData = {...row};
						callBack(type === 'add' ? null : newData);
					},
				},
			}}
			dispatch={{
				path: `schedules.table.events.${type}OnModal`,
				type: 'event',
			}}
			subscribe={[
				{
					name: 'tableCloseInfo',
					path: 'rtd.schedules.table.selected',
					onChange: ({value, setModalData, setButtonProps}) => {
						// Задать значение модальному окну по событию "Выбор строки в таблице"
						value && setModalData && setModalData(value);

						// Задать disabled кнопке по событию "Выбор строки в таблице"
						setButtonProps && setButtonProps({disabled: !value});
					},
				},
			]}
		>
			<FormBody noPadding={false} scrollable={true}>
				<Input
					itemProps={{
						name: ['data', 'name'],
						className: 'mb-12',
						label: 'Наименование обхода:',
						rules: [{required: true}],
					}}
				/>
				<TimePicker
					itemProps={{
						name: ['data', 'detourBeginTime'],
						label: 'Время начала',
						rules: [{required: true}],
						disabled: false,
					}}
				/>
				<TimePicker
					itemProps={{
						name: ['data', 'detourEndTime'],
						label: 'Время окончания',
						rules: [{required: true}],
						disabled: false,
					}}
				/>
				<Select
					itemProps={{
						name: ['data', 'routeId'],
						className: 'mb-12',
						label: 'Маршрут:',
						rules: [{required: true}],
					}}
					requestLoadRows={apiGetFlatDataByConfigName('routes')}
					optionConverter={(option) => ({
						label: <span>{option.name}</span>,
						value: option.id,
					})}
				/>
				<Select
					itemProps={{
						name: ['data', 'staffId'],
						className: 'mb-12',
						label: 'Исполнитель:',
						rules: [{required: true}],
					}}
					requestLoadRows={apiGetFlatDataByConfigName('staffAuto')}
					optionConverter={(option) => ({
						label: <span>{option.username}</span>,
						value: option.id,
					})}
				/>

				<Title
					level={5}
					label={'Допуски по обходу'}
					className={'my-16'}
				/>
				<Space style={{justifyContent: 'flex-start'}}>
					<Checkbox
						itemProps={{
							...itemsInfo.saveOrderControlPoints,
							name: ['data', 'saveOrderControlPoints'],
							...footerCheckboxLayout,
							style: {
								marginLeft: '48px',
							},
						}}
					/>
				</Space>
				<Space style={{justifyContent: 'space-around'}}>
					<Col>
						<Checkbox
							itemProps={{
								...itemsInfo.takeIntoAccountTimeLocation,
								name: ['data', 'takeIntoAccountTimeLocation'],
								...footerCheckboxLayout,
							}}
							dispatch={{
								path: 'schedules.form.data.takeIntoAccountTimeLocation',
							}}
						/>
						<Checkbox
							itemProps={{
								...itemsInfo.takeIntoAccountDateStart,
								name: ['data', 'takeIntoAccountDateStart'],
								...footerCheckboxLayout,
							}}
							dispatch={{
								path: 'schedules.form.data.takeIntoAccountDateStart',
							}}
						/>
						<Checkbox
							itemProps={{
								...itemsInfo.takeIntoAccountDateFinish,
								name: ['data', 'takeIntoAccountDateFinish'],
								...footerCheckboxLayout,
							}}
							dispatch={{
								path: 'schedules.form.data.takeIntoAccountDateFinish',
							}}
						/>
					</Col>
					<Col>
						<InputNumber
							itemProps={{
								...itemsInfo.possibleDeviationLocationTime,
								name: ['data', 'possibleDeviationLocationTime'],
								...footerInputLayout,
							}}
							min={0}
							disabled={true}
							subscribe={[
								{
									name: 'takeIntoAccountTimeLocation',
									withMount: true,
									path: 'rtd.schedules.form.data.takeIntoAccountTimeLocation',
									onChange: ({value, setSubscribeProps}) => {
										value
											? setSubscribeProps({
													disabled: !value,
											  })
											: setSubscribeProps({
													disabled: true,
													value: undefined,
											  });
									},
								},
							]}
						/>
						<InputNumber
							itemProps={{
								...itemsInfo.possibleDeviationDateStart,
								name: ['data', 'possibleDeviationDateStart'],
								...footerInputLayout,
							}}
							min={0}
							disabled={true}
							subscribe={[
								{
									name: 'takeIntoAccountTimeLocation',
									withMount: true,
									path: 'rtd.schedules.form.data.takeIntoAccountDateStart',
									onChange: ({value, setSubscribeProps}) => {
										value
											? setSubscribeProps({
													disabled: !value,
											  })
											: setSubscribeProps({
													disabled: true,
													value: undefined,
											  });
									},
								},
							]}
						/>
						<InputNumber
							itemProps={{
								...itemsInfo.possibleDeviationDateFinish,
								name: ['data', 'possibleDeviationDateFinish'],
								...footerInputLayout,
							}}
							min={0}
							disabled={true}
							subscribe={[
								{
									name: 'takeIntoAccountTimeLocation',
									withMount: true,
									path: 'rtd.schedules.form.data.takeIntoAccountDateFinish',
									onChange: ({value, setSubscribeProps}) => {
										value
											? setSubscribeProps({
													disabled: !value,
											  })
											: setSubscribeProps({
													disabled: true,
													value: undefined,
											  });
									},
								},
							]}
						/>
					</Col>
				</Space>
				<Title
					level={5}
					label={'Параметры расписания'}
					className={'my-16'}
				/>
				<Select
					itemProps={{
						label: 'Повторение',
						name: 'periodName',
						// Поле обязательнок заполнению
						rules: [{required: true}],
					}}
					optionConverter={(option) => ({
						label: option.label,
						value: option.value,
					})}
					options={[
						{label: 'День', value: 'day'},
						{label: 'Неделя', value: 'week'},
						{label: 'Месяц', value: 'month'},
					]}
				/>
				<InputNumber
					itemProps={{
						label: 'Интервал, дней',
						name: 'interval',
						rules: [{required: true}],
					}}
					className={`${prefixCls}-interval`}
				/>
				<DatePicker
					itemProps={{
						name: 'dateStart',
						label: 'Начать повторение с:',
						rules: [{required: true}],
						disabled: false,
					}}
					format={'LLLL'}
				/>
				<DatePicker
					itemProps={{
						name: 'nextExecution',
						label: 'Дата след. выполнения:',
						rules: [{required: true}],
						disabled: false,
					}}
					format={'LLLL'}
					className={'mb-8'}
				/>
				<Row itemProps={{label: 'Завершить повторение'}}>
					<Col span={8}>
						<RadioGroup
							itemProps={{name: 'repeaterType'}}
							options={[
								{label: 'Никогда', value: '01'},
								{label: 'Повторять до:', value: '02'},
								{label: 'После', value: '03'},
							]}
							className={`${prefixCls}-repeater-type`}
							dispatch={{
								path: 'schedules.form.data.repeaterType',
								type: 'event',
							}}
						/>
					</Col>
					<Col span={16} className={`${prefixCls}-inputs`}>
						<DatePicker
							itemProps={{name: 'dateFinish'}}
							format={'DD.MM.YYYY'}
							className={'mb-8'}
							disabled={true}
							subscribe={[
								{
									name: 'repeaterTypeDatePicker',
									path: 'rtd.schedules.form.data.repeaterType',
									onChange: onChangeRepeaterType('02'),
								},
							]}
						/>
						<Space>
							<InputNumber
								itemProps={{name: 'finalCount'}}
								className={`${prefixCls}-finalCount`}
								disabled={true}
								subscribe={[
									{
										name: 'repeaterTypeInput',
										path: 'rtd.schedules.form.data.repeaterType',
										onChange: onChangeRepeaterType('03'),
									},
								]}
							/>
							<Text>повторений</Text>
						</Space>
					</Col>
				</Row>
			</FormBody>
		</Modal>
	);
};
