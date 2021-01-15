import {Button, Popover, TimePicker} from 'antd';

const {RangePicker} = TimePicker;
export const addShiftModal = () => operationOnServer('add', {});

export const editShiftModal = () => operationOnServer('edit', {});

const operationOnServer = (type, code) => {
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};

	const popoverContent = (
		<button style={{backgroundColor: '#BAE187', border: 'none'}}>1</button>
	);
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
						console.log(value);
						value &&
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
							// disabled={true}
						/>
					);
				},
				subscribe: {
					name: 'noSubscribe',
					path: 'rtd.workSchedules.workShiftModal.checkbox',
					onChange: ({value, setSubscribeProps}) => {
						console.log(value);
						setSubscribeProps({disabled: value ? true : false});
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
						<Popover
							className={'no-bg'}
							content={popoverContent}
							trigger={'click'}
							placement='right'
							// visible={visiblePopover}
						>
							<Button>1</Button>
						</Popover>
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
