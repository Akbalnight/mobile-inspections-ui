import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';

export const addDetourForm = () => operationOnServer('add', {});

export const editDetourForm = () => operationOnServer('edit', {});

const operationOnServer = (type, code) => {
	/**
	 * Ограничиваем StartDate piker
	 */
	const disabledStartDate = (startValue, endValue) => {
		if (!startValue || !endValue) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	};

	/**
	 * Ограничиваем EndDate piker
	 */
	const disabledEndDate = (startValue, endValue) => {
		if (!endValue || !startValue) {
			return false;
		}
		return endValue.valueOf() <= startValue.valueOf();
	};

	const headFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Описание',
				className: 'mt-16',
				level: 5,
			},
		},
		type === 'add'
			? {}
			: {
					componentType: 'Item',
					label: 'Код',
					name: 'code',
					child: {
						componentType: 'Text',
					},
			  },
		{
			componentType: 'Item',
			label: 'Наименование обхода',
			name: 'name',
			rules: [
				{
					message: 'Заполните наименование',
					required: true,
				},
			],
			child: {
				componentType: 'Input',
				maxLength: 100,
			},
		},
		{
			componentType: 'Item',
			label: 'Дата начала',
			name: 'dateStartPlan',
			rules: [
				{
					message: 'Заполните дату начала обхода',
					required: true,
				},
			],
			child: {
				componentType: 'DatePicker',
				format: 'DD.MM.YYYY HH:mm:ss',
				showTime: true,
				dispatchPath: 'detourSchedules.form.startDate',
				subscribe: {
					name: 'endDate',
					path: 'rtd.detourSchedules.form.endDate',
					onChange: ({value, setSubscribeProps}) => {
						setSubscribeProps({
							disabledDate: (startValue) =>
								disabledStartDate(startValue, value),
						});
					},
				},
			},
		},
		{
			componentType: 'Item',
			label: 'Дата окончания',
			name: 'dateFinishPlan',
			rules: [
				{
					message: 'Заполните дату окончания обхода',
					required: true,
				},
			],
			child: {
				componentType: 'DatePicker',
				format: 'DD.MM.YYYY HH:mm:ss',
				showTime: true,
				dispatchPath: 'detourSchedules.form.endDate',
				subscribe: {
					name: 'endDate',
					path: 'rtd.detourSchedules.form.startDate',
					onChange: ({value, setSubscribeProps}) => {
						setSubscribeProps({
							disabledDate: (endValue) =>
								disabledEndDate(value, endValue),
						});
					},
				},
			},
		},

		{
			componentType: 'Item',
			label: 'Маршрут',
			name: 'routeId',
			rules: [
				{
					message: 'Заполните маршрут',
					required: true,
				},
			],
			child: {
				componentType: 'SingleSelect',
				widthControl: 0,
				widthPopup: 320,
				heightPopup: 350,
				commandPanelProps: {
					systemBtnProps: {search: {}},
				},
				searchParamName: 'name',
				rowRender: 'name',
				requestLoadRows: apiGetFlatDataByConfigName('routes'),
			},
		},
		{
			componentType: 'Item',
			label: 'Статус',
			name: 'statusId',
			rules: [
				{
					message: 'Заполните статус',
					required: true,
				},
			],
			child: {
				componentType: 'SingleSelect',
				widthControl: 0,
				rowRender: 'name',
				// expandColumnKey: 'id',
				heightPopup: 200,
				widthPopup: 320,
				requestLoadRows: apiGetFlatDataByConfigName('detoursStatuses'),
				requestLoadDefault: apiGetFlatDataByConfigName(
					'detoursStatuses'
				),
			},
		},
	];

	// Исполнитель
	const executorFields = [
		/**
		 * тут сделал небольшую подписку на селектор внутри модалки, для отображения исполнителся
		 * обхода.
		 * позже можно подписать на таблицу Исполнителей внутри модального окна
		 */
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Исполнитель',
				className: 'mt-16',
				level: 5,
				subscribe: {
					name: 'controlPointTechMap',
					path:
						'rtd.detourSchedules.executorTableChoise.executor.selected',
					onChange: ({value, setSubscribeProps}) =>
						value &&
						setSubscribeProps({
							label: `Исполнитель обхода ${value[0].positionName}`,
						}),
				},
			},
		},
		{
			componentType: 'Item',
			label: 'Доступные испольнители',
			name: 'staffId',
			child: {
				componentType: 'SingleSelect',
				widthControl: 0,
				rowRender: 'username',
				// expandColumnKey: 'id',
				heightPopup: 300,
				widthPopup: 320,
				requestLoadRows: apiGetFlatDataByConfigName('staff'),
				requestLoadDefault: apiGetFlatDataByConfigName('staff'),
			},
		},
	];

	const footerCheckboxLayout = {
		labelCol: {span: 23},
		wrapperCol: {span: 1},
	};
	const footerInputLayout = {
		labelCol: {span: 18},
		wrapperCol: {span: 6},
	};

	// Подвал
	const footer = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Допуски по обходу',
				className: 'mt-16',
				level: 5,
			},
		},

		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Row',
					className: 'ml-8',
					children: [
						{
							componentType: 'Item',
							label: 'Учитывать порядок обхода',
							name: 'saveOrderControlPoints',
							valuePropName: 'checked',
							...footerCheckboxLayout,
							child: {
								componentType: 'Checkbox',
							},
						},
					],
				},
				{
					componentType: 'Row',
					children: [
						{
							componentType: 'Col',
							children: [
								{
									componentType: 'Item',
									name: 'takeIntoAccountTimeLocation',
									label: 'Учитывать время обхода',
									valuePropName: 'checked',
									...footerCheckboxLayout,
									child: {
										componentType: 'Checkbox',
										dispatchPath:
											'detourSchedulesForm.takeIntoAccountTimeLocation',
									},
								},
								{
									componentType: 'Item',
									name: 'takeIntoAccountDateStart',
									label: 'Учитывать время начала',
									valuePropName: 'checked',
									...footerCheckboxLayout,
									child: {
										componentType: 'Checkbox',
										dispatchPath:
											'detourSchedulesForm.takeIntoAccountDateStart',
										// subscribe: {
										// 	name: 'takeIntoAccountTimeLocation',
										// 	path:
										// 		'rtd.detourSchedulesForm.takeIntoAccountTimeLocation',
										// 	onChange: ({value, setSubscribeProps}) => {
										// 		setSubscribeProps({
										// 			disabled: !value,
										// 		});
										// 	},
										// },
									},
								},
								{
									componentType: 'Item',
									name: 'takeIntoAccountDateFinish',
									label: 'Учитывать время окончания',
									valuePropName: 'checked',
									...footerCheckboxLayout,
									child: {
										componentType: 'Checkbox',
										dispatchPath:
											'detourSchedulesForm.takeIntoAccountDateFinish',
										// subscribe: {
										// 	name: 'takeIntoAccountDateStart',
										// 	path:
										// 		'rtd.detourSchedulesForm.takeIntoAccountDateStart',
										// 	onChange: ({value, setSubscribeProps}) => {
										// 		setSubscribeProps({
										// 			disabled: !value,
										// 		});
										// 	},
										// },
									},
								},
							],
						},
						{
							componentType: 'Col',
							className: 'mr-0',
							children: [
								{
									componentType: 'Item',
									name: 'possibleDeviationLocationTime',
									label: 'Допустимое откл. на точке, мин',
									...footerInputLayout,
									child: {
										componentType: 'InputNumber',
										min: 0,
										subscribe: {
											name: 'takeIntoAccountTimeLocation',
											path:
												'rtd.detourSchedulesForm.takeIntoAccountTimeLocation',
											onChange: ({
												value,
												setSubscribeProps,
											}) => {
												setSubscribeProps({
													disabled: !value,
												});
											},
										},
									},
								},
								{
									componentType: 'Item',
									name: 'possibleDeviationDateStart',
									label: 'Допустимое откл., мин',
									...footerInputLayout,
									child: {
										componentType: 'InputNumber',
										min: 0,
										subscribe: {
											name: 'takeIntoAccountDateStart',
											path:
												'rtd.detourSchedulesForm.takeIntoAccountDateStart',
											onChange: ({
												value,
												setSubscribeProps,
											}) => {
												setSubscribeProps({
													disabled: !value,
												});
											},
										},
									},
								},
								{
									componentType: 'Item',
									name: 'possibleDeviationDateFinish',
									label: 'Допустимое откл., мин',
									...footerInputLayout,
									child: {
										componentType: 'InputNumber',
										min: 0,
										subscribe: {
											name: 'takeIntoAccountDateFinish',
											path:
												'rtd.detourSchedulesForm.takeIntoAccountDateFinish',
											onChange: ({
												value,
												setSubscribeProps,
											}) => {
												setSubscribeProps({
													disabled: !value,
												});
											},
										},
									},
								},
							],
						},
					],
				},
			],
		},
	];
	return {
		type: `${type}OnServer`,
		title: type === 'add' ? 'Создание обхода' : 'Редактирование обхода',
		width: 700,
		bodyStyle: {height: type === 'add' ? 780 : 820},
		requestSaveRow: apiSaveByConfigName('saveDetourForm'),
		form: {
			name: `${type}DetourForm`,
			labelCol: {span: 10},
			wrapperCol: {span: 12},
			loadInitData: (callBack, row) => {
				callBack(type === 'add' ? null : row);
			},
			methodSaveForm: type === 'add' ? 'POST' : 'PUT',
			className: 'lastSelectModal',
			body: [...headFields, ...executorFields, ...footer],
		},
	};
};
