import React from 'react';
import {EditOutlined} from '@ant-design/icons';
import {apiSaveByConfigName} from '../../../../apis/catalog.api';
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
} = classic;

/** checkValue задается при первом вызове функции
 * value и setSubscribeProps прилетают при срабатывании subscribe
 */
const onChangeRepeaterType = (checkValue) => ({value, setSubscribeProps}) => {
	const disabled = value.value !== checkValue;
	// console.log("onChangeRepeaterType", checkValue, disabled)
	setSubscribeProps({disabled: disabled});
};

const prefixCls = 'detours-schedules-registry-modal';

const EditModal = () => {
	return (
		<Modal
			//не нашел на https://ant.design/components/tooltip/
			toolTipProps={{title: 'Изменить расписание'}}
			buttonProps={{
				type: 'default',
				icon: <EditOutlined />,
				label: 'Edit',
				disabled: true,
			}}
			modalConfig={{
				type: 'editOnServer',
				title: `Изменить расписание`,
				requestSaveRow: apiSaveByConfigName(`repeaterDataSave`),
				width: 610,
				bodyStyle: {height: 320},
				form: {
					// processBeforeSaveForm: processBeforeSaveForm,
					name: 'detours.schedules.registry.editModal',
					className: prefixCls,
					labelCol: {span: 8},
					wrapperCol: {span: 16},
					loadInitData: (callBack, row) => {
						let newData = {...row};
						if (newData.dateFinish) {
							newData.repeaterType = '02';
							// console.log("Set repeaterType 02");
						} else if (
							newData.finalCount &&
							newData.finalCount !== 0
						) {
							newData.repeaterType = '03';
							// console.log("Set repeaterType 03");
						} else {
							newData.repeaterType = '01';
							// console.log("Set repeaterType 01");
						}
						// console.log("newData", newData);
						callBack(newData);
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
			<FormBody noPadding={false} scrollable={false}>
				<Select
					itemProps={{
						label: 'Повторение',
						name: 'periodName',
						// Поле обязательнок заполнению
						rules: [{required: true}],
					}}
					widthControl={200}
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
						// Поле обязательнок заполнению
						rules: [{required: true}],
					}}
					className={`${prefixCls}-interval`}
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
