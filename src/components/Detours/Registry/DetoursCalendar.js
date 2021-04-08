import React, {useEffect, useState} from 'react';
import {classic, notificationError} from 'rt-design';
import moment from 'moment';
import {Calendar, Popover, Checkbox} from 'antd';
import {apiGetFlatDataByConfigName} from '../../../apis/catalog.api';
import {calendarPrefix} from '../../../utils/baseUtils';

const {FormBody, Custom, Layout} = classic;

/**
 *
 * @returns Custom Calendar with subscribes on filtert events
 * @desc Maybe in Popover necessary need JSX-style by rt-design
 */
export default function DetoursCalendar() {
	const [calendarValues, setCalendarValues] = useState([]);

	useEffect(() => {
		apiGetFlatDataByConfigName('detours')({
			data: {},
			params: {size: 50},
		})
			.then((response) => {
				return setCalendarValues(response.data);
			})
			.catch((error) =>
				notificationError(error, 'Ошибка загрузки данных формы')
			);
	}, []);

	/**
	 *
	 * @param value - Calendar main props
	 * @returns content in Calendar
	 */
	function dateCellRender(value) {
		const listData = calendarValues;
		return (
			<>
				{listData &&
					listData.map((item) => {
						// console.log(item)
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
									/>
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
							console.log(1); // тут проблема, замедлялся рендеринг.
							return (
								<Popover
									title={value.format('DD MMMM YYYY')}
									trigger={'hover'}
									content={content}
									overlayClassName={`${calendarPrefix}-popover-hover`}
									key={item.id}
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
							return (
								<div
									className={'special-hidden'}
									key={item.id}
								/>
							);
						}
					})}
			</>
		);
	}

	return (
		<>
			<FormBody noPadding={true}>
				<Layout className={'px-8'} style={{height: '100%'}}>
					<Custom
						itemProps={{name: 'calendarDetours'}}
						render={({onChange, defaultValue, value}) => {
							return (
								<Calendar
									// headerRender={() => null}
									dateCellRender={dateCellRender}
									className={'calendar-detours'}
								/>
							);
						}}
						dispatch={{
							path: 'detours.mainForm.calendar',
						}}
						subscribe={[
							/** Action search by detour name*/
							{
								name: 'onSearch',
								path:
									'rtd.detours.mainForm.table.events.onSearch',
								onChange: ({value}) => {
									apiGetFlatDataByConfigName('detours')({
										data: {name: value.value},
										params: {size: 50},
									})
										.then((response) => {
											return setCalendarValues(
												response.data
											);
										})
										.catch((error) =>
											notificationError(
												error,
												'Ошибка загрузки данных формы'
											)
										);
								},
							},
							/** Action filter by detour routId, staffId*/
							{
								name: 'onApplyFilter',
								path:
									'rtd.detours.mainForm.table.onApplyFilter',
								extraData: 'rtd.detours.mainForm.filter.events',
								onChange: ({extraData}) => {
									apiGetFlatDataByConfigName('detours')({
										data: {
											routeId: extraData.routeId,
											staffId: extraData.staffId,
										},
										params: {size: 50},
									})
										.then((response) => {
											return setCalendarValues(
												response.data
											);
										})
										.catch((error) =>
											notificationError(
												error,
												'Ошибка загрузки данных формы'
											)
										);
								},
							},
							{
								/** Action on push button Сбросить */
								name: 'onReload',
								path:
									'rtd.detours.mainForm.filter.events.onReload',
								onChange: () => {
									apiGetFlatDataByConfigName('detours')({
										data: {},
										params: {size: 50},
									})
										.then((response) => {
											return setCalendarValues(
												response.data
											);
										})
										.catch((error) =>
											notificationError(
												error,
												'Ошибка загрузки данных формы'
											)
										);
								},
							},
							/** Action add detour*/
							{
								name: 'addDetourOnServer',
								path:
									'rtd.detours.mainForm.table.events.addOnModal',
								onChange: () => {
									apiGetFlatDataByConfigName('detours')({
										data: {},
										params: {size: 50},
									})
										.then((response) => {
											return setCalendarValues(
												response.data
											);
										})
										.catch((error) =>
											notificationError(
												error,
												'Ошибка загрузки данных формы'
											)
										);
								},
							},
						]}
					/>
				</Layout>
			</FormBody>
		</>
	);
}
