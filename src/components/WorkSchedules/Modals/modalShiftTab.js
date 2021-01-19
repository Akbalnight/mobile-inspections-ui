import {TimePicker} from 'antd';
import {GithubPicker} from 'react-color';

const {RangePicker} = TimePicker;
export const addShiftModal = () => operationOnServer('add', {});

export const editShiftModal = () => operationOnServer('edit', {});

const operationOnServer = (type, code) => {
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
				subscribe: {
					name: 'subscribe',
					path: 'rtd.workSchedules.workShiftModal',
					onChange: ({value, setSubscribeProps}) => {
						console.log(value);
						value && setSubscribeProps({disabled: value});
					},
				},
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
				dispatchPath: 'workSchedules.workShiftModal',
			},
		},
		{
			componentType: 'Item',
			name: 'rangeShift',
			label: 'Время перерыва',
			child: {
				componentType: 'Custom',
				render: ({onChange, defaultValue, value}) => {
					return (
						<RangePicker
							format={'HH:mm'}
							onChange={(dates, dateString) => {
								onChange(dates);
							}}
							placeholder={['с', 'до']}
						/>
					);
				},
				subscribe: {
					name: 'rangeShift',
					path: 'rtd.workSchedules.workShiftModal',
					onChange: ({value, setSubscribeProps}) => {
						console.log(value);
						value && setSubscribeProps({disabled: value});
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
							triangle={'hide'}
							width={'112px'}
							onChange={(value) => onChange(value.hex)}
						/>
					);
				},
			},
		},
	];

	return {
		type: `${type}OnServer`,
		title: `${type === 'add' ? 'Создание' : 'Редактирование'} смены`,
		width: 445,
		bodyStyle: {height: 445},
		form: {
			name: `${type}ShiftModalForm`,
			loadInitData: loadData,
			labelCol: {span: 10},
			wrapperCol: {span: 12},
			body: [...mainFields],
		},
	};
};
