import React from 'react';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../../apis/catalog.api';
import {classic} from 'rt-design';

const {
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
} = classic;

/** checkValue задается при первом вызове функции
 * value и setSubscribeProps прилетают при срабатывании subscribe
 */
const onChangeRepeaterType = (checkValue) => ({value, setSubscribeProps}) => {
	const disabled = value.value !== checkValue;
	setSubscribeProps({disabled: disabled});
};

const prefixCls = 'detours-schedules-registry-modal';

export const AddDetourButton = () => EditModal('add');
export const EditDetourButton = () => EditModal('edit');

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

const EditModal = (type) => {
	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type === 'add' ? false : true,
			}}
			toolTipProps={{
				title: type === 'add' ? 'Создать' : 'Редактировать',
			}}
			modalConfig={{
				type: 'editOnServer',
				title: `Создание расписания обхода`,
				requestSaveRow: apiSaveByConfigName(`repeaterDataSave`),
				width: 610,
				bodyStyle: {height: 580},
				form: {
					name: 'detours.schedules.registry.editModal',
					className: prefixCls,
					labelCol: {span: 8},
					wrapperCol: {span: 16},
					processBeforeSaveForm: processBeforeSaveForm,
					loadInitData: (callBack, row) => {
						console.log('row', row);
						let newData = {...row};

						callBack(type === 'add' ? null : newData);
					},
				},
			}}
			dispatch={{
				path: 'detours.schedules.registry.events.onEditModal',
				type: 'event',
			}}
			subscribe={[
				{
					name: 'tableCloseInfo',
					path: 'rtd.detours.schedules.registry.selected',
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
				<div className={'mb-16 mt-16'}>
					<h3>Создание обхода</h3>
				</div>

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
					// format={'HH:mm'}
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

					// dispatch={{ path: 'example.form.table.filter.statusProcessId' }}
				/>
				<Select
					itemProps={{
						name: ['data', 'staffId'],
						className: 'mb-12',
						label: 'Исполнитель:',
						rules: [{required: true}],
					}}
					// widthControl={'250px'}
					requestLoadRows={apiGetFlatDataByConfigName('staffAuto')}
					optionConverter={(option) => ({
						label: <span>{option.username}</span>,
						value: option.id,
					})}
					dispatch={{
						path: 'example.form.table.filter.statusProcessId',
					}}
				/>
				<div className={'mb-16 mt-16'}>
					<h3>Допуски по обходу</h3>
				</div>
				<Row>
					<Col>
						<Row className={`${prefixCls}-colOneThreeSettings`}>
							<Text>Учитывать порядок обхода</Text>
						</Row>
						<Row className={`${prefixCls}-colOneThreeSettings`}>
							<Text>Учитывать время обхода</Text>
						</Row>
						<Row className={`${prefixCls}-colOneThreeSettings`}>
							<Text>Учитывать время начала</Text>
						</Row>
						<Row className={`${prefixCls}-colOneThreeSettings`}>
							<Text>Учитывать время окончания</Text>
						</Row>
					</Col>
					<Col>
						<Row className={`${prefixCls}-colTwoSettings`}>
							<Checkbox
								itemProps={{
									valuePropName: 'checked',
									name: ['data', 'saveOrderControlPoints'],
								}}
							/>
						</Row>
						<Row className={`${prefixCls}-colTwoSettings`}>
							<Checkbox
								itemProps={{
									valuePropName: 'checked',
									name: [
										'data',
										'takeIntoAccountTimeLocation',
									],
								}}
							/>
						</Row>
						<Row className={`${prefixCls}-colTwoSettings`}>
							<Checkbox
								itemProps={{
									valuePropName: 'checked',
									name: ['data', 'takeIntoAccountDateStart'],
								}}
							/>
						</Row>
						<Row className={`${prefixCls}-colTwoSettings`}>
							<Checkbox
								itemProps={{
									valuePropName: 'checked',
									name: ['data', 'takeIntoAccountDateFinish'],
								}}
							/>
						</Row>
					</Col>
					<Col>
						<Row className={`${prefixCls}-rowAfterEmpty`}>
							<Text>Допустимое откл. на точке, мин.</Text>
						</Row>
						<Row className={`${prefixCls}-colOneThreeSettings`}>
							<Text>Допустимое откл., мин.</Text>
						</Row>
						<Row className={`${prefixCls}-colOneThreeSettings`}>
							<Text>Допустимое откл., мин.</Text>
						</Row>
					</Col>
					<Col className={`${prefixCls}-col4settings`}>
						<Row
							className={`${prefixCls}-colFourAfterEmptySettings`}
						>
							<InputNumber
								itemProps={{
									name: [
										'data',
										'possibleDeviationLocationTime',
									],
								}}
								// disabled={true}
							/>
						</Row>
						<Row className={`${prefixCls}-colFourSettings`}>
							<InputNumber
								itemProps={{
									name: [
										'data',
										'possibleDeviationDateStart',
									],
								}}
								// disabled={true}
							/>
						</Row>
						<Row className={`${prefixCls}-colFourSettings`}>
							<InputNumber
								itemProps={{
									name: [
										'data',
										'possibleDeviationDateFinish',
									],
								}}
								// disabled={true}
							/>
						</Row>
					</Col>
				</Row>
				<div className={'mb-16 mt-16'}>
					<h3>Параметры расписания</h3>
				</div>
				<Select
					itemProps={{
						label: 'Повторение',
						name: 'periodName',
						// Поле обязательнок заполнению
						rules: [{required: true}],
					}}
					// widthControl={200}
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
								path:
									'detours.schedules.registry.editModal.repeaterType',
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
									name: 'repeaterType',
									path:
										'rtd.detours.schedules.registry.editModal.repeaterType',
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
										name: 'repeaterType',
										path:
											'rtd.detours.schedules.registry.editModal.repeaterType',
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

export default EditModal;
