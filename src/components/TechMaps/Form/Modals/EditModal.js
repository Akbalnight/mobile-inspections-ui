import React from 'react';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {
	FormBody,
	Modal,
	InputNumber,
	Checkbox,
	Input,
	Space,
	Text,
} from 'rt-design';

export const AddTechOperationButton = () => EditModal('add');
export const EditTechOperationButton = () => EditModal('edit');

const EditModal = (type) => {
	const footerCheckboxLayout = {
		labelCol: {span: 8},
		wrapperCol: {span: 10},
	};
	const footerInputLayout = {
		labelCol: {span: 8},
		wrapperCol: {span: 10},
	};

	const toCapitalize = type[0].toUpperCase() + type.substring(1);

	const processBeforeSaveForm = (rawValues) => {
		let values;
		let hours = rawValues.hours ? rawValues.hours : 0;
		let minutes = rawValues.minutes ? rawValues.minutes : 0;

		let duration = hours * 60 + minutes;

		values = {
			...rawValues,
			duration: duration,
		};

		return values;
	};

	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type !== 'add',
			}}
			toolTipProps={{
				title: type === 'add' ? 'Добавить' : 'Изменить',
			}}
			modalConfig={{
				type: 'save',
				width: 580,
				bodyStyle: {height: 350},
				title: `${
					type === 'add' ? 'Добавить' : 'Изменить'
				} технологическую операцию`,
				form: {
					name: 'techMaps.techOperations.editModal',
					labelCol: {span: 10},
					wrapperCol: {span: 12},
					processBeforeSaveForm,
					loadInitData: (callBack, row) => {
						const newData = {
							...row,
							hours: row
								? row.duration && parseInt(row.duration / 60)
								: 0,
							minutes: row
								? row.duration && row.duration % 60
								: 0,
						};
						callBack(type === 'add' ? null : newData);
					},
				},
			}}
			dispatch={{
				path: `techMaps.techOperations.table.modal.events.on${toCapitalize}Row`,
				type: 'event',
			}}
			subscribe={[
				{
					name: `LocalTableChange`,
					path: `rtd.techMaps.techOperations.table.selected`,
					onChange: ({value, setModalData, setButtonProps}) => {
						value &&
							setModalData &&
							setModalData({
								...value,
							});
						type !== 'add' &&
							setButtonProps &&
							setButtonProps({disabled: value ? !value : true});
					},
				},
			]}
		>
			<FormBody>
				<Input
					itemProps={{
						name: 'name',
						label: 'Наименование',
						className: 'mb-8',
						rules: [
							{
								required: true,
								message: 'Заполните наименование',
							},
						],
						...footerInputLayout,
					}}
					maxLength={100}
					placeholder={'Введите наименование'}
				/>
				<Checkbox
					itemProps={{
						name: 'needInputData',
						label: 'Ввод данных',
						className: 'mb-8',
						valuePropName: 'checked',
						...footerCheckboxLayout,
					}}
					dispatch={{
						path: 'techMaps.techOperations.table.modal.events.needInputData',
						type: 'event',
					}}
				/>
				<Input
					itemProps={{
						name: 'labelInputData',
						label: 'Подпись ввода данных',
						className: 'mb-8',
						...footerInputLayout,
					}}
					disabled={true}
					maxLength={100}
					placeholder={'Введите значение'}
					subscribe={[
						{
							name: 'unDisabled',
							path: 'rtd.techMaps.techOperations.table.modal.events.needInputData',
							onChange: ({value, setSubscribeProps}) => {
								value &&
									setSubscribeProps &&
									setSubscribeProps({disabled: !value.value});
							},
						},
					]}
				/>
				<Checkbox
					itemProps={{
						name: 'equipmentStop',
						label: 'Остановка оборудования',
						valuePropName: 'checked',
						className: 'mb-8',
						...footerCheckboxLayout,
					}}
				/>
				<Checkbox
					itemProps={{
						name: 'increasedDanger',
						label: 'Повышенная опасность',
						valuePropName: 'checked',
						className: 'mb-8',
						...footerCheckboxLayout,
					}}
				/>
				<Space align={'center'} style={{marginLeft: '40px'}}>
					<Text label={'Продолжительность:'} className={'ml-16'} />
					<Space>
						<InputNumber
							size={'middle'}
							min={0}
							max={12}
							placeholder='Часы'
							itemProps={{
								name: 'hours',
							}}
						/>
						<Text label={'часы'} />
						<InputNumber
							size={'middle'}
							min={0}
							max={60}
							placeholder='Минуты'
							itemProps={{
								name: 'minutes',
							}}
						/>
						<Text label={'минуты'} />
					</Space>
				</Space>
			</FormBody>
		</Modal>
	);
};

export default EditModal;
