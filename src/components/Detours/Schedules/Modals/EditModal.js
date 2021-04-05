import React from 'react';
import {EditOutlined} from '@ant-design/icons';
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
			toolTipProps={{title: 'Создание расписания обхода'}}
			buttonProps={{
				type: 'default',
				icon: <EditOutlined />,
				label: 'Edit',
				disabled: true,
			}}
			modalConfig={{
				type: 'editOnServer',
				title: `Создание расписания обхода`,
				requestSaveRow: apiSaveByConfigName(`repeaterDataSave`),
				width: 610,
				bodyStyle: {height: 960},
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
				<div className={'mb-16 mt-16'}>
					<h3>Создание обхода</h3>
				</div>

				<Input
					itemProps={{
						name: 'dateBegin',
						className: 'mb-12',
						label: 'Наименование обхода:',
						rules: [{required: true}],
					}}
					placeholder='Basic usage'
				/>
				<Select
					itemProps={{
						name: 'status',
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
						name: 'status',
						className: 'mb-12',
						label: 'Исполнитель:',
						rules: [{required: true}],
					}}
					// className={`${prefixCls}-selectSettings`}
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

				{/*<Row>*/}
				{/*	<Col>*/}
				{/*		<Row  className={`${prefixCls}-colOneThreeBlockOneSettings`}>*/}
				{/*			<Text itemProps={{*/}
				{/*				rules: [{required: true}],*/}
				{/*			}}> *v</Text>*/}
				{/*		</Row>*/}
				{/*		<Row  className={`${prefixCls}-colOneThreeBlockOneSettings`}>*/}
				{/*			<Text>Маршрут</Text>*/}
				{/*		</Row>*/}
				{/*		<Row  className={`${prefixCls}-colOneThreeBlockOneSettings`}>*/}
				{/*			<Text>Исполнитель</Text>*/}
				{/*		</Row>*/}
				{/*	</Col>*/}
				{/*	<Col>*/}
				{/*		<Row className={`${prefixCls}-colTwoThreeBlockOneSettings`}>*/}
				{/*			<Input></Input>*/}
				{/*		</Row>*/}
				{/*		<Row className={`${prefixCls}-colTwoThreeBlockOneSettings`}>*/}
				{/*			<Select*/}
				{/*				itemProps={{name: 'status', className: 'mb-0'}}*/}
				{/*				// widthControl={'250px'}*/}
				{/*				requestLoadRows={apiGetFlatDataByConfigName('routes')}*/}
				{/*				optionConverter={(option) => ({ label: (<span>{option.name}</span>), value: option.id })}*/}
				{/*				// dispatch={{ path: 'example.form.table.filter.statusProcessId' }}*/}
				{/*			/>*/}
				{/*		</Row>*/}
				{/*		<Row className={`${prefixCls}-colTwoThreeBlockOneSettings`}>*/}
				{/*			<Select*/}
				{/*				itemProps={{name: 'status', className: 'mb-0'}}*/}
				{/*				// widthControl={'250px'}*/}
				{/*				requestLoadRows={apiGetFlatDataByConfigName('staffAuto')}*/}
				{/*				optionConverter={(option) => ({ label: (<span>{option.username}</span>), value: option.id })}*/}
				{/*				dispatch={{ path: 'example.form.table.filter.statusProcessId' }}*/}
				{/*			/>*/}
				{/*		</Row>*/}
				{/*	</Col>*/}
				{/*</Row>*/}
				<div className={'mb-16 mt-16'}>
					<h3>Допуски по обходу</h3>
				</div>
				<Row>
					<Col>
						<Row className={`${prefixCls}-colOneThreeSettings`}>
							<Text>Учитывать порядок обхода</Text>
						</Row>
						<Row className={`${prefixCls}-colOneThreeSettings`}>
							<Text>Учитывать время начала</Text>
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
							<Checkbox></Checkbox>
						</Row>
						<Row className={`${prefixCls}-colTwoSettings`}>
							<Checkbox></Checkbox>
						</Row>
						<Row className={`${prefixCls}-colTwoSettings`}>
							<Checkbox></Checkbox>
						</Row>
						<Row className={`${prefixCls}-colTwoSettings`}>
							<Checkbox></Checkbox>
						</Row>
					</Col>
					{/*<Col className={`${prefixCls}-newSettingsFirstRow`}*/}
					{/*>*/}
					{/*    <Row>*/}
					{/*        <InputNumber*/}
					{/*            itemProps={{*/}
					{/*                name: 'status',*/}
					{/*                label: 'Допустимое откл. на точке, мин.:',*/}
					{/*            }}*/}
					{/*            className={`${prefixCls}-interval`}*/}
					{/*        ></InputNumber>*/}
					{/*    </Row>*/}
					{/*    <Row>*/}
					{/*        <InputNumber*/}
					{/*            itemProps={{*/}
					{/*                name: 'status',*/}
					{/*                // className: 'mb-12',*/}
					{/*                label: 'Допустимое откл., мин.:',*/}
					{/*            }}*/}
					{/*            className={`${prefixCls}-interval`}*/}
					{/*        ></InputNumber>*/}
					{/*    </Row>*/}
					{/*    <Row>*/}
					{/*        <InputNumber*/}
					{/*            itemProps={{*/}
					{/*                name: 'status',*/}
					{/*                // className: 'mb-12',*/}
					{/*                label: 'Допустимое откл., мин.:',*/}
					{/*            }}*/}
					{/*            className={`${prefixCls}-interval`}*/}
					{/*        ></InputNumber>*/}
					{/*    </Row>*/}
					{/*</Col>*/}
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
							<InputNumber></InputNumber>
						</Row>
						<Row className={`${prefixCls}-colFourSettings`}>
							<InputNumber></InputNumber>
						</Row>
						<Row className={`${prefixCls}-colFourSettings`}>
							<InputNumber></InputNumber>
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
						// Поле обязательнок заполнению
						rules: [{required: true}],
					}}
					className={`${prefixCls}-interval`}
				/>
				<DatePicker
					itemProps={{
						name: 'dateBegin',
						label: 'Начать повторение с:',
						rules: [{required: true}],
					}}
					format={'LLLL'}
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
