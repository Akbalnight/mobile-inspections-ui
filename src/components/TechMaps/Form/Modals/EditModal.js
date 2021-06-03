import React from 'react';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {classic} from 'rt-design';

const {FormBody, Modal, InputNumber, Col, Row, Checkbox, Input} = classic;

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
				disabled: type === 'add' ? false : true,
			}}
			toolTipProps={{
				title: type === 'add' ? 'Создать' : 'Редактировать',
			}}
			modalConfig={{
				width: 600,
				bodyStyle: {height: 400},
				type: 'editOnLocal',
				title:
					type === 'add'
						? `Добавить технологическую операцию`
						: `Создать технологическую операцию`,
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
							value &&
							setButtonProps &&
							setButtonProps({disabled: !value});
					},
				},
			]}
		>
			<FormBody>
				<Input
					itemProps={{
						name: 'name',
						label: 'Наименование',
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
				/>
				<Input
					itemProps={{
						name: 'labelInputData',
						label: 'Подпись ввода данных',
						className: 'mb-8',
						...footerInputLayout,
					}}
					maxLength={100}
					placeholder={'Введите значение'}
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
				<Row>
					<Col span={12}>
						<Row>
							<InputNumber
								size={'small'}
								min={0}
								max={12}
								placeholder='Часы'
								itemProps={{
									name: 'hours',
									label: 'Продолжительность',
									labelCol: {span: 14},
									wrapperCol: {span: 8},
								}}
								style={{marginTop: '5px'}}
							/>
							<span
								style={{
									textAlign: 'center',
									lineHeight: '24px',
									marginLeft: '10px',
									marginTop: '5px',
								}}
							>
								часы
							</span>
						</Row>
					</Col>
					<Col span={12}>
						<Row>
							<InputNumber
								size={'small'}
								min={0}
								max={60}
								placeholder='Минуты'
								itemProps={{
									name: 'minutes',
								}}
								style={{marginTop: '5px'}}
							/>
							<span
								style={{
									width: '20%',
									textAlign: 'center',
									lineHeight: '24px',
									marginTop: '5px',
								}}
							>
								минуты
							</span>
						</Row>
					</Col>
				</Row>
			</FormBody>
		</Modal>
	);
};

export default EditModal;
