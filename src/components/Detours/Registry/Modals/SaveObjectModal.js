import {
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
} from 'rt-design';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import React from 'react';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../../apis/application.api';
import {itemsInfo} from '../../../../constants/dictionary';
import {disabledStartDate} from '../../../Base/Functions/DateLimits';
import {ReactComponent as WarningDetour} from '../../../../imgs/detour/warningDetour.svg';
import {setDataStore} from 'rt-design/lib/redux/rtd.actions';
import {useDispatch} from 'react-redux';
import moment from 'moment';

export const AddDetour = () => OperationOnServer('add');
export const EditDetour = () => OperationOnServer('edit');

const OperationOnServer = (type) => {
	const dispatch = useDispatch();

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
					path: `rtd.detours.table.selected`,
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
					type: `save`,
					title: `${
						type === 'add' ? 'Создание' : 'Редактирование'
					} обхода`,
					width: 700,
					bodyStyle: {height: type === 'add' ? 630 : 670},
					methodSaveForm: type === 'add' ? 'POST' : 'PUT',
					requestSaveForm: apiSaveByConfigName('saveDetourForm'),
					form: {
						name: `${type}ModalForm`,
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
					path: `detours.table.events.${type}OnModal`,
					type: 'event',
				}}
				subscribe={[
					{
						name: `mainTableChange`,
						path: `rtd.detours.table.selected`,
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
							className: option?.duration,
						})}
						onSelect={(_, option) => {
							dispatch(
								setDataStore(`detours.form.data.routeId`, {
									duration: Number(option.className),
								})
							);
						}}
					/>
					<DatePicker
						itemProps={{...itemsInfo.dateStartPlan}}
						format={'DD.MM.YYYY HH:mm'}
						showTime={true}
						dispatch={{
							path: 'detours.form.data.startDate',
						}}
						showNow={false}
						subscribe={[
							{
								name: 'finishDate',
								path: 'rtd.detours.form.data.finishDate',
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
						itemProps={{...itemsInfo.dateFinishPlan}}
						format={'DD.MM.YYYY HH:mm'}
						showTime={true}
						showNow={false}
						dispatch={{
							path: 'detours.form.data.finishDate',
						}}
						subscribe={[
							{
								name: 'solutionByStartDate',
								path: 'rtd.detours.form.data.startDate',
								extraData: 'rtd.detours.form.data.routeId',
								onChange: ({
									value,
									extraData,
									setSubscribeProps,
								}) => {
									const endTime = moment(value).add(
										extraData && extraData?.duration,
										'minutes'
									);

									setSubscribeProps({
										value: endTime,
									});
								},
							},
						]}
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
									path: 'detours.form.data.takeIntoAccountTimeLocation',
								}}
							/>
							<Checkbox
								itemProps={{
									...itemsInfo.takeIntoAccountDateStart,
									...footerCheckboxLayout,
								}}
								dispatch={{
									path: 'detours.form.data.takeIntoAccountDateStart',
								}}
							/>
							<Checkbox
								itemProps={{
									...itemsInfo.takeIntoAccountDateFinish,
									...footerCheckboxLayout,
								}}
								dispatch={{
									path: 'detours.form.data.takeIntoAccountDateFinish',
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
										withMount: true,
										path: 'rtd.detours.form.data.takeIntoAccountTimeLocation',
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
														value: undefined,
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
										withMount: true,
										path: 'rtd.detours.form.data.takeIntoAccountDateStart',
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
														value: undefined,
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
										withMount: true,
										path: 'rtd.detours.form.data.takeIntoAccountDateFinish',
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
														value: undefined,
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
					type: `view`,
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
						path: `rtd.detours.table.selected`,
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
