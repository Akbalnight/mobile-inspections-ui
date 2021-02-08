import React, {useEffect, useState} from 'react';
import {Form, notificationError} from 'rt-design';
import moment from 'moment';
import {Calendar} from 'antd';
import Popover from 'antd/es/popover';
import Checkbox from 'antd/es/checkbox/Checkbox';
import {apiGetFlatDataByConfigName} from '../../apis/catalog.api';
import {calendarPrefix} from '../../utils/baseUtils';
import {buttonCreateDetour} from './Modals/modalButtonDetours';

/**
 * В последнем варианте, передаю календарь в custom.Item отображение не изменилось.
 * Появился порядок в файлах
 *
 * При необходимости можно измениеть концепцию Popover сущности, все зависит от
 * требований заказчика
 */
export default function DetoursCalendar() {
	const [calendarValues, setCalendarValues] = useState([]);

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
							<div key={item.id} className='calendar'>
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
							// console.log(1);// тут проблема, замедлялся рендеринг.
							return (
								<Popover
									title={value.format('DD MMMM YYYY')}
									trigger={'hover'}
									content={content}
									overlayClassName={`${calendarPrefix}-popover-hover`}
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
			className: 'calendar-title',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'Title',
						label: 'Календарь обходов',
						level: 5,
					},
				},
				...buttonCreateDetour,
				// при необходимости в модальное окно можно передать history
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
							className={'calendar-detours'}
						/>
					);
				},
			},
		},
	];

	const formConfig = {
		noPadding: true,
		name: 'exampleWithModalForm',
		body: [...calendarFields],
	};

	return <Form {...formConfig} />;
}
