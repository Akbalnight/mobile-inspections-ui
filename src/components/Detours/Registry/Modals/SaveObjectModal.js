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
} = classic;
const operationOnServer = (type) => {
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
				type: `${type}OnServer`,
				title: `${
					type === 'add' ? 'Создание' : 'Редактирование'
				} обхода`,
				width: 700,
				bodyStyle: {height: type === 'add' ? 630 : 670},
				requestSaveRow: apiSaveByConfigName('saveDetourForm'),
				form: {
					name: `${type}ModalForm`,
					loadInitData: (callBack, row) => {
						callBack(type === 'add' ? null : row);
					},
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
								...value[value.length - 1],
							});
						type !== 'add' &&
							value &&
							setButtonProps &&
							setButtonProps({disabled: !(value.length === 1)});
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
					subscribe={[
						{
							name: 'finishDate',
							path:
								'rtd.detours.mainForm.modal.events.finishDate',
							onChange: ({value, setSubscribeProps}) => {
								setSubscribeProps({
									disabledDate: (startValue) =>
										disabledStartDate(startValue, value),
								});
							},
						},
					]}
				/>
				<DatePicker
					itemProps={{...itemsInfo.dateFinishPlan}}
					format={'DD.MM.YYYY HH:mm:ss'}
					showTime={true}
					dispatch={{
						path: 'detours.mainForm.modal.events.finishDate',
					}}
					subscribe={[
						{
							name: 'startDate',
							path: 'rtd.detours.mainForm.modal.events.startDate',
							onChange: ({value, setSubscribeProps}) => {
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
					infinityMode={true}
					requestLoadRows={apiGetFlatDataByConfigName('routes')}
					optionConverter={(option) => ({
						value: option.id,
						label: option.name,
					})}
				/>
				<Select
					itemProps={{...itemsInfo.detourStatusId}}
					placeholder={'Выберите ствтус'}
					mode={'single'}
					allowClear={true}
					infinityMode={true}
					requestLoadRows={apiGetFlatDataByConfigName(
						'detoursStatuses'
					)}
					optionConverter={(option) => ({
						value: option.id,
						label: option.name,
					})}
				/>
				<Title label={'Исполнитель'} level={5} />
				<Select
					itemProps={{...itemsInfo.executorId}}
					placeholder={'Выберите исполнителя'}
					mode={'single'}
					allowClear={true}
					infinityMode={true}
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
									onChange: ({value, setSubscribeProps}) => {
										console.log(value);
										value &&
											setSubscribeProps &&
											setSubscribeProps({
												disabled: !value,
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
									onChange: ({value, setSubscribeProps}) => {
										console.log(value);
										value &&
											setSubscribeProps &&
											setSubscribeProps({
												disabled: !value,
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
									onChange: ({value, setSubscribeProps}) => {
										console.log(value);
										value &&
											setSubscribeProps &&
											setSubscribeProps({
												disabled: !value,
											});
									},
								},
							]}
						/>
					</Col>
				</Space>
			</FormBody>
		</Modal>
	);
};
