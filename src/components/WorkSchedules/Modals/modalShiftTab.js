import {TimePicker} from 'antd';

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
					path: 'rtd.workSchedules.workShiftModal.checkbox',
					onChange: ({value, setSubscribeProps}) => {
						setSubscribeProps({disabled: value ? true : false});
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
				dispatchPath: 'workSchedules.workShiftModal.checkbox',
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
							// value={defaultValue}
							onChange={(dates, dateString) => {
								onChange(dates);
							}}
							placeholder={['с', 'до']}
							disabled={true}
						/>
					);
				},
				// subscribe: {
				//     name: 'noSubscribe',
				//     path: 'rtd.workSchedules.workShiftModal.checkbox',
				//     onChange: ({value, setSubscribeProps}) => {
				//         console.log(value);
				//         setSubscribeProps({disabled: value ? true : false});
				//     },
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
					return <div>1</div>;
				},
			},
		},
	];

	return {
		type: `${type}OnServer`,
		title: `${type === 'add' ? 'Создание' : 'Редактироание'} смены`,
		width: 445,
		bodyStyle: {height: 445},
		form: {
			name: `${type}ModalForm`,
			loadInitData: loadData,
			labelCol: {span: 10},
			wrapperCol: {span: 12},
			body: [...mainFields],
		},
	};
};
