import {classic} from 'rt-design';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import React from 'react';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../../apis/catalog.api';
import {itemsInfo} from '../../../../constants/dictionary';
import {
	disabledEndDate,
	disabledStartDate,
} from '../../../Base/Functions/DateLimits';
import {ReactComponent as WarningDetour} from '../../../../imgs/detour/warningDetour.svg';

export const AddDetour = () => operationOnServer('add');
export const EditDetour = () => operationOnServer('edit');

const {
	Modal,
	FormBody,
	Title,
	Input,
	DatePicker,
	Select,
	Space,
	Checkbox,
	InputNumber,
	Col,
	Text,
	Switcher,
} = classic;
const operationOnServer = (type) => {
	const statusesInfo = {
		stopEdit: [
			'a0299bf4-de93-40ab-9950-37392e3fd0a5',
			'7381f248-825b-4734-a45c-02603b0e8a25',
		],
		addNew: '23782817-aa16-447a-ad65-bf3bf47ac3b7',
	};
	const processBeforeSaveForm = (rawValues) => {
		return type === 'add'
			? {...rawValues, statusId: statusesInfo.addNew}
			: {...rawValues};
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
		<Switcher
			itemProps={{initialValue: 1}}
			subscribe={[
				/** Role model in portal necessary stay where*/
				{
					name: `mainTableChange`,
					path: `rtd.detours.mainForm.table.selected`,
					extraData: 'auth.roles', // .username
					onChange: ({value, setSubscribeProps, extraData}) => {
						console.log('switcher', extraData);
						value &&
							type !== 'add' &&
							setSubscribeProps({
								value: statusesInfo.stopEdit.includes(
									value.statusId
								)
									? 1
									: 0,
							});
					},
				},
			]}
		>
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
					type: `${type}OnServer`,
					title: `${
						type === 'add' ? 'Создание' : 'Редактирование'
					} обхода`,
					width: 700,
					bodyStyle: {height: type === 'add' ? 630 : 670},
					requestSaveRow: apiSaveByConfigName('saveDetourForm'),
					form: {
						name: `${type}ModalForm`,
						dispatch: {
							path: `detours.mainForm.table.events.${type}ModalFormData`,
						},
						loadInitData: (callBack, row) => {
							callBack(type === 'add' ? null : row);
						},
						processBeforeSaveForm,
						methodSaveForm: type === 'add' ? 'POST' : 'PUT',
						onFinish: (values) => {
							console.log('values', values);
						},
						labelCol: {span: 10},
						wrapperCol: {span: 12},
					},
				}}
				dispatch={{
					path: `detours.mainForm.table.events.${type}OnModal`,
					type: 'event',
				}}
				subscribe={[
					{
						name: `mainTableChange`,
						path: `rtd.detours.mainForm.table.selected`,
						onChange: ({value, setModalData, setButtonProps}) => {
							value &&
								setModalData &&
								setModalData({
									...value,
								});
							type !== 'add' &&
								value &&
								setButtonProps &&
								setButtonProps({disabled: !value});
						},
					},
				]}
			>
				<FormBody>
					<Title label={'Описание'} level={5} />
					<Input itemProps={{...itemsInfo.name}} maxLength={100} />
					<DatePicker
						itemProps={{...itemsInfo.dateStartPlan}}
						format={'DD.MM.YYYY HH:mm:ss'}
						showTime={true}
						dispatch={{
							path: 'detours.mainForm.modal.events.startDate',
						}}
						showNow={false}
						subscribe={[
							{
								name: 'finishDate',
								path:
									'rtd.detours.mainForm.modal.events.finishDate',
								onChange: ({value, setSubscribeProps}) => {
									console.log('startDate', value);
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
						itemProps={{...itemsInfo.dateFinishPlan}}
						format={'DD.MM.YYYY HH:mm:ss'}
						showTime={true}
						showNow={false}
						dispatch={{
							path: 'detours.mainForm.modal.events.finishDate',
						}}
						subscribe={[
							{
								name: 'startDate',
								path:
									'rtd.detours.mainForm.modal.events.startDate',
								onChange: ({value, setSubscribeProps}) => {
									console.log('endDate', value);
									setSubscribeProps({
										disabledDate: (endValue) =>
											disabledEndDate(value, endValue),
									});
								},
							},
						]}
					/>
					<Select
						itemProps={{...itemsInfo.routeId}}
						placeholder={'Выберите маршрут'}
						mode={'single'}
						allowClear={true}
						showSearch={true}
						filterOption={false}
						searchParamName={'name'}
						requestLoadRows={apiGetFlatDataByConfigName('routes')}
						optionConverter={(option) => ({
							value: option.id,
							label: option.name,
						})}
					/>
					{type !== 'add' ? (
						<Select
							itemProps={{...itemsInfo.detourStatusId}}
							placeholder={'Выберите статус'}
							mode={'single'}
							allowClear={true}
							requestLoadRows={apiGetFlatDataByConfigName(
								'detoursStatuses'
							)}
							optionConverter={(option) => ({
								value: option.id,
								label: option.name,
							})}
						/>
					) : null}
					<Title label={'Исполнитель'} level={5} />
					<Select
						itemProps={{...itemsInfo.executorId}}
						placeholder={'Выберите исполнителя'}
						mode={'single'}
						allowClear={true}
						showSearch={true}
						filterOption={false}
						searchParamName={'username'}
						requestLoadRows={apiGetFlatDataByConfigName('staff')}
						optionConverter={(option) => ({
							value: option.id,
							label: option.username,
						})}
					/>
					<Title label={'Допуски к обходу'} level={5} />
					<Space style={{justifyContent: 'flex-start'}}>
						<Checkbox
							itemProps={{
								...itemsInfo.saveOrderControlPoints,
								...footerCheckboxLayout,
								style: {
									marginLeft: '52px',
								},
							}}
						/>
					</Space>
					<Space style={{justifyContent: 'space-around'}}>
						<Col>
							<Checkbox
								itemProps={{
									...itemsInfo.takeIntoAccountTimeLocation,
									...footerCheckboxLayout,
								}}
								dispatch={{
									path:
										'detours.mainForm.modal.events.takeIntoAccountTimeLocation',
								}}
							/>
							<Checkbox
								itemProps={{
									...itemsInfo.takeIntoAccountDateStart,
									...footerCheckboxLayout,
								}}
								dispatch={{
									path:
										'detours.mainForm.modal.events.takeIntoAccountDateStart',
								}}
							/>
							<Checkbox
								itemProps={{
									...itemsInfo.takeIntoAccountDateFinish,
									...footerCheckboxLayout,
								}}
								dispatch={{
									path:
										'detours.mainForm.modal.events.takeIntoAccountDateFinish',
								}}
							/>
						</Col>
						<Col>
							<InputNumber
								itemProps={{
									...itemsInfo.possibleDeviationLocationTime,
									...footerInputLayout,
								}}
								min={0}
								disabled={true}
								subscribe={[
									{
										name: 'takeIntoAccountTimeLocation',
										path:
											'rtd.detours.mainForm.modal.events.takeIntoAccountTimeLocation',
										onChange: ({
											value,
											setSubscribeProps,
										}) => {
											value
												? setSubscribeProps({
														disabled: !value,
												  })
												: setSubscribeProps({
														disabled: true,
												  });
										},
									},
								]}
							/>
							<InputNumber
								itemProps={{
									...itemsInfo.possibleDeviationDateStart,
									...footerInputLayout,
								}}
								min={0}
								disabled={true}
								subscribe={[
									{
										name: 'takeIntoAccountTimeLocation',
										path:
											'rtd.detours.mainForm.modal.events.takeIntoAccountDateStart',
										onChange: ({
											value,
											setSubscribeProps,
										}) => {
											value
												? setSubscribeProps({
														disabled: !value,
												  })
												: setSubscribeProps({
														disabled: true,
												  });
										},
									},
								]}
							/>
							<InputNumber
								itemProps={{
									...itemsInfo.possibleDeviationDateFinish,
									...footerInputLayout,
								}}
								min={0}
								disabled={true}
								subscribe={[
									{
										name: 'takeIntoAccountTimeLocation',
										path:
											'rtd.detours.mainForm.modal.events.takeIntoAccountDateFinish',
										onChange: ({
											value,
											setSubscribeProps,
										}) => {
											value
												? setSubscribeProps({
														disabled: !value,
												  })
												: setSubscribeProps({
														disabled: true,
												  });
										},
									},
								]}
							/>
						</Col>
					</Space>
				</FormBody>
			</Modal>
			<Modal
				buttonProps={{
					type: 'default',
					icon: <EditOutlined />,
					disabled: type !== 'add',
				}}
				toolTipProps={{
					title: 'Редактировать',
				}}
				modalConfig={{
					type: `viewObject`,
					title: <WarningDetour />,
					width: 430,
					bodyStyle: {height: 150},
					form: {
						name: `viewObjectModalForm`,
						onFinish: (values) => {
							console.log('values', values);
						},
						labelCol: {span: 10},
						wrapperCol: {span: 12},
					},
				}}
				subscribe={[
					{
						name: `mainTableChange`,
						path: `rtd.detours.mainForm.table.selected`,
						onChange: ({value, setModalData, openModal}) => {
							value &&
								setModalData &&
								setModalData({
									...value,
								});
							value &&
								statusesInfo.stopEdit.includes(
									value.statusId
								) &&
								openModal();
						},
					},
				]}
			>
				<FormBody>
					<Text
						label={
							'Обход находится в стататусе Завершен/Завершен(досрочно).'
						}
					/>
					<Text
						label={
							'Выберите другой обход для редактирование из реестра.'
						}
					/>
				</FormBody>
			</Modal>
		</Switcher>
	);
};
