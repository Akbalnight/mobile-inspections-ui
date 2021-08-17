import React, {useEffect} from 'react';
import {Custom, Layout, notificationError} from 'rt-design';
import moment from 'moment';
import {Calendar as AntCalendar, Popover, Checkbox} from 'antd';
import {apiGetFlatDataByConfigName} from '../../../apis/catalog.api';
import {calendarPrefix} from '../../../utils/baseUtils';

/**
 *
 * @returns Custom Calendar with subscribes on filtert events
 * @desc Maybe in Popover necessary need JSX-style by rt-design
 */

const Calendar = ({onChange, detours, value}) => {
	useEffect(() => {
		onChange && onChange(moment());
		// console.log('useEffect onChange')
		// eslint-disable-next-line
	}, []);

	const onChangeHandler = (value) => {
		onChange(value);
	};

	/**
	 *
	 * @param value - Calendar main props
	 * @returns content in Calendar
	 */
	const dateCellRender = (value) => {
		const listData = detours;
		return (
			<>
				{listData &&
					listData.map((item) => {
						const content = (
							<div key={item.id} className='calendar'>
								<div>{`Название: ${item.name}`}</div>
								<div>{`Маршрут: ${item.routeName}`}</div>
								<div>{`Иcполнитель: ${item.staffName}`}</div>
								<div>
									{`Начало: ${moment(
										item.dateStartPlan
									).format('DD.MM.YYYY HH:mm')}`}
								</div>
								<div>
									{`Окончание: ${moment(
										item.dateFinishPlan
									).format('DD.MM.YYYY HH:mm')}`}
								</div>
								<div>
									<pre>
										Учитывать порядок:{' '}
										<Checkbox
											checked={
												item.saveOrderControlPoints
											}
											disabled
										/>
									</pre>
								</div>
							</div>
						);
						if (
							String(value._d).slice(0, 15) ===
							String(moment(item.dateStartPlan)._d).slice(0, 15)
						) {
							// console.log(1); // тут проблема, замедлялся рендеринг.
							return (
								<Popover
									title={value.format('DD.MM.YYYY')}
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
	};

	return (
		<AntCalendar
			headerRender={() => null}
			dateCellRender={dateCellRender}
			value={value}
			onChange={onChangeHandler}
			// dateFullCellRender={_dateFullCellRender(_value)}
			className={'calendar-detours'}
		/>
	);
};

/**
 *
 * @returns {JSX.object}
 * @desc In calendar you see Detours which current month(change select).
 */
export default function DetoursCalendar() {
	return (
		<>
			<Layout className={'px-8'}>
				<Custom
					itemProps={{name: 'calendarDetours'}}
					render={Calendar}
					dispatch={{
						path: 'detours.mainForm.calendar',
					}}
					subscribe={[
						/** Action trigger by calendar*/
						{
							name: 'onChangeMonth',
							path: 'rtd.detours.mainForm.filter.events.month',
							onChange: ({value, setSubscribeProps}) => {
								setSubscribeProps({value: value});
							},
						},
						/** Action search by detour name*/
						{
							name: 'onSearch',
							path: 'rtd.detours.mainForm.table.events.onSearch',
							onChange: ({value, setSubscribeProps}) => {
								apiGetFlatDataByConfigName('detours')({
									data: {name: value.value},
									params: {size: 50},
								})
									.then((response) => {
										setSubscribeProps({
											detours: response.data,
										});
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
							path: 'rtd.detours.mainForm.table.onApplyFilter',
							extraData: 'rtd.detours.mainForm.filter.events',
							onChange: ({extraData, setSubscribeProps}) => {
								apiGetFlatDataByConfigName('detours')({
									data: {
										routeId: extraData.routeId,
										staffId: extraData.staffId,
										startDate: extraData.month
											? extraData.month
													.clone()
													.startOf('month')
											: undefined,
										finishDate: extraData.month
											? extraData.month
													.clone()
													.endOf('month')
											: undefined,
									},
									params: {size: 50},
								})
									.then((response) => {
										setSubscribeProps({
											detours: response.data,
										});
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
							path: 'rtd.detours.mainForm.filter.events.onReload',
							onChange: ({setSubscribeProps}) => {
								apiGetFlatDataByConfigName('detours')({
									data: {},
									params: {size: 50},
								})
									.then((response) => {
										setSubscribeProps({
											detours: response.data,
										});
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
							path: 'rtd.detours.mainForm.table.events.addOnModal',
							onChange: ({setSubscribeProps}) => {
								apiGetFlatDataByConfigName('detours')({
									data: {},
									params: {size: 50},
								})
									.then((response) => {
										setSubscribeProps({
											detours: response.data,
										});
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
		</>
	);
}
