import React, {useState} from 'react';
import {TimePicker} from 'antd';
import {GithubPicker} from 'react-color';

const {RangePicker} = TimePicker;
export const addShiftModal = () => OperationOnServer('add', {});

export const editShiftModal = () => OperationOnServer('edit', {});

const OperationOnServer = (type, code) => {
	const [colorPicker, setColorPicker] = useState({
		open: false,
		color: {
			r: '0',
			g: '0',
			b: '0',
			a: '0',
		},
	});
	const handleClick = () => {
		setColorPicker((state) => ({...state, open: !state.open}));
	};

	const handleClose = () => {
		setColorPicker((state) => ({...state, open: false}));
	};
	const handleChange = (color) => {
		console.log(color);
		setColorPicker((state) => ({open: !state.open, color: color.rgb}));
	};
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};

	const mainFields = [
		{
			componentType: 'Item',
			label: 'Наименование',
			name: 'name',
			rules: [
				{
					required: true,
					message: 'Введите поле наименование',
				},
			],
			child: {
				componentType: 'Input',
			},
		},
		{
			componentType: 'Item',
			label: 'Аббревиатура',
			name: 'code',
			child: {
				componentType: 'Input',
				// subscribe: {
				// 	name: 'code',
				// 	path: 'rtd.workSchedules.workShiftModal.checkbox',
				// 	onChange: ({value, setSubscribeProps}) => {
				// 		// console.log(value);
				// 		if (value === true) {
				// 			setSubscribeProps({disabled: false});
				// 		} else {
				// 			setSubscribeProps({disabled: true});
				// 		}
				// 	},
				// },
			},
		},
		{
			componentType: 'Item',
			name: 'rangeShift',
			label: 'Время смены',
			child: {
				componentType: 'Custom',
				render: ({onChange, defaultValue, value}) => {
					return (
						<RangePicker
							format={'HH:mm'}
							// value={defaultValue}
							onChange={(dates, dateString) => {
								onChange(dates);
							}}
							placeholder={['с', 'до']}
						/>
					);
				},
			},
		},
		{
			componentType: 'Item',
			label: 'Обеденный перерыв',
			name: 'breakTime',
			valuePropName: 'checked',
			rules: [
				{
					required: true,
					message: 'Отметьте поле обеденный перерыв',
				},
			],
			child: {
				componentType: 'Checkbox',
				dispatchPath: 'workSchedules.workShiftModal.checkbox',
			},
		},
		{
			componentType: 'Item',
			name: 'rangeShift',
			label: 'Время перерыва',
			child: {
				componentType: 'Custom',
				render: (props) => {
					// Ant From Item props для верной работы элемента
					const {onChange} = props; // defaultValue, value

					// Subscribe Props
					const {disabled} = props;

					return (
						<RangePicker
							disabled={disabled}
							format={'HH:mm'}
							onChange={(dates) => {
								onChange(dates);
							}}
							placeholder={['с', 'до']}
							// name={'rangeShift'}
						/>
					);
				},
				subscribe: {
					name: 'rangeShift',
					path: 'rtd.workSchedules.workShiftModal.checkbox',
					onChange: ({value, setSubscribeProps}) => {
						console.log(value);
						if (value !== true) {
							setSubscribeProps({disabled: true});
						} else {
							setSubscribeProps({disabled: false});
						}
					},
				},
			},
		},
		{
			componentType: 'Item',
			name: 'color',
			label: 'Цвет',
			child: {
				componentType: 'Custom',
				render: ({onChange, defaultValue, value}) => {
					return (
						<>
							<div
								style={{
									padding: '2px',
									background: '#fff',
									borderRadius: '2px',
									boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
									display: 'inline-block',
									cursor: 'pointer',
								}}
								onClick={handleClick}
							>
								<div
									style={{
										width: '50px',
										height: '20px',
										borderRadius: '2px',
										background: `rgba(${colorPicker.color.r}, ${colorPicker.color.g}, ${colorPicker.color.b}, ${colorPicker.color.a})`,
									}}
								/>
							</div>
							{colorPicker.open ? (
								<div
									style={{position: 'absolute', zIndex: '2'}}
								>
									<div
										style={{
											position: 'fixed',
											top: '0px',
											right: '0px',
											bottom: '0px',
											left: '0px',
										}}
										onClick={handleClose}
									/>

									<GithubPicker
										colors={[
											'#BAE187',
											'#CBE4F7',
											'#FFCC80',
											'#C5A4F3',
											'#FFA399',
											'#FFFF83',
											'#FFC0FB',
											'#A5F2F2',
										]}
										// triangle={'hide'}
										width={'112px'}
										onChange={(value) => {
											onChange(value.hex); //временное решение. Нужно изменить когда выберем входные данные с сервера
											handleChange(value);
										}}
									/>
								</div>
							) : null}
						</>
					);
				},
			},
		},
	];

	return {
		type: `${type}OnServer`,
		title: `${type === 'add' ? 'Создание' : 'Редактирование'} смены`,
		width: 445,
		bodyStyle: {height: 480},
		form: {
			name: `${type}ShiftModalForm`,
			loadInitData: loadData,
			labelCol: {span: 10},
			wrapperCol: {span: 12},
			body: [...mainFields],
		},
	};
};
