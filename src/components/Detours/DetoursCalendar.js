import React, {useEffect, useState} from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form, notificationError} from 'rt-design';
import moment from 'moment';
import {Calendar} from 'antd';
import Popover from 'antd/es/popover';
import Checkbox from 'antd/es/checkbox/Checkbox';
import {apiGetFlatDataByConfigName} from '../../apis/catalog.api';
import {useHistory} from 'react-router';
import {paths} from '../../constants/paths';

export default function DetoursCalendar() {
	const [calendarValues, setCalendarValues] = useState([]);
	const history = useHistory();

	useEffect(() => {
		apiGetFlatDataByConfigName('detours')({
			data: {},
			params: {},
		})
			.then((response) => {
				return setCalendarValues(response.data);
			})
			.catch((error) =>
				notificationError(error, 'Ошибка загрузки данных формы')
			);
	}, []);

	function dateCellRender(value) {
		const listData = calendarValues;
		return (
			<>
				{listData &&
					listData.map((item) => {
						const content = (
							<div key={item.id} className='detours'>
								<div>Название: {item.name}</div>
								<div>Маршрут: {item.routeName}</div>
								<div>Иcпольнитель: {item.staffName}</div>
								<div>
									Учитывать порядок:
									<Checkbox
										checked={item.saveOrderControlPoints}
										disabled
									></Checkbox>
								</div>
								<div>
									Начало:
									{moment(item.dateStartPlan).format(
										'DD MMM YY HH:mm:ss'
									)}
								</div>
								<div>
									Окончание:
									{moment(item.dateFinishPlan).format(
										'DD MMM YY HH:mm:ss'
									)}
								</div>
							</div>
						);
						if (
							String(value._d).slice(0, 15) ===
							String(moment(item.dateStartPlan)._d).slice(0, 15)
						) {
							// console.log(1);// тут проблема
							return (
								<Popover
									title={value.format('DD MMMM YY')}
									trigger={'hover'}
									content={content}
								>
									<div
										key={item.id}
										className='detours-short'
									>
										{item.name}
									</div>
								</Popover>
							);
						} else {
							return <div className={'special-hidden'}></div>;
						}
					})}
			</>
		);
	}

	const calendarFields = [
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'Title',
						label: 'Календарь обходов',
						level: 5,
					},
				},
				{
					componentType: 'Item',
					child: {
						componentType: 'Button',
						label: 'Обратно в таблицу',
						className: 'ml-8',
						size: 'small',
						type: 'link',
						onClick: () =>
							history.push(
								paths.DETOURS_CONFIGURATOR_DETOURS_SCHEDULES
									.path
							),
					},
				},
			],
		},

		{
			componentType: 'Item',
			name: 'calendarDetours',
			child: {
				componentType: 'Custom',
				render: ({onChange, defaultValue, value}) => {
					return (
						<Calendar
							headerRender={() => null}
							dateCellRender={dateCellRender}
						/>
					);
				},
			},
		},
	];

	const formConfig = {
		noPadding: false,
		name: 'exampleWithModalForm',
		body: [...calendarFields],
	};

	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
}
