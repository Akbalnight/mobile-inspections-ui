import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {checkBox, code, dateTime} from '../Base/customColumnProps';
import {MehOutlined, ReloadOutlined} from '@ant-design/icons';
import {editModalDebug} from './editModalDebug';
import {selectModalDebug} from './selectModalDebug';

// Импорт новой формы
import {components} from 'rt-design';
const {Form} = components;

/** 1. Компоненты InfinityTable, ServerTable, LocalTable заменены на просто Table
 * 2. subscribe изменил тип данных на массив
 * 3. subscribe получил дополнительный параметра extraData
 * 		это объект в сторе который прокидывается в onChange, НО НЕ отслеживаются его изменения
 * 4. У таблицы dispatchPath остался прежним
 */
const TableCus = (config) => ({
	componentType: 'Layout',
	children: [
		{
			componentType: 'Item',
			child: {
				componentType: 'Table',
				requestLoadRows: apiGetFlatDataByConfigName(config),
				requestLoadConfig: apiGetConfigByName(config),
				fixWidthColumn: true,
				selectable: true,
				onRowClick: () => {
					console.log('onRowClick => ');
				},
				onRowDoubleClick: () => {
					console.log('onRowDoubleClick => ');
				},
				dispatchPath: 'debug.form.table',
				subscribe: [
					{
						/** Обработчик события изменения статуса
						 * onChange структура параметров
						 * {
						 * 		value: значение,
						 * 		extraData: значение,
						 * 		reloadTable: ({sortBy, filter, searchValue}, appendParams),
						 * 		addRows: (rows),
						 * 		addRow: (row),
						 * 		addRowAsCopy: (),
						 * 		editRow: (row),
						 * 		removeRow: (),
						 * 		moveUpRow: (),
						 * 		moveDownRow: (),
						 * }*/
						name: 'status',
						path: 'rtd.debug.form.table.filter.status',
						extraData: 'rtd.debug.form.table.filter',
						onChange: ({extraData, reloadTable}) => {
							reloadTable({filter: extraData});
							// console.log('Table onChangeStatus', value, extraData);
						},
					},

					{
						/** Обработчик события на сохранение модалки */
						name: 'onEditModal',
						path: 'rtd.debug.form.table.events.onEditModal',
						onChange: ({value, editRow}) => {
							editRow(value.value);
						},
					},
					{
						/** Обработчик события на кнопку Reload */
						name: 'onReload',
						path: 'rtd.debug.form.table.events.onReload',
						onChange: ({reloadTable}) => {
							reloadTable({filter: {}});
						},
					},
					{
						/** Обработчик события на кнопку ApplyFilter */
						name: 'onApplyFilter',
						path: 'rtd.debug.form.table.events.onApplyFilter',
						extraData: 'rtd.debug.form.table.filter',
						onChange: ({extraData, reloadTable}) => {
							// console.log('Table onApplyFilter', extraData);
							reloadTable({filter: extraData});
						},
					},
				],
				customColumnProps: [
					{...code},
					{...dateTime('dateDetectDefect')},
					{...dateTime('dateEliminationPlan')},
					{...dateTime('dateEliminationFact')},
					{...checkBox('sendedToSap')},
					{...checkBox('viewOnPanel')},
					{...checkBox('kpi')},
				],
			},
		},
	],
});

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

const Debug = () => {
	const formConfig = {
		noPadding: true,
		/** scrollable - НЕЖЕН ЧТОБЫ УБРАТЬ ДЕРГАНЬЕ
		 * Для реестров scrollable - false ( это занчение по умолчанию)
		 * Для форм ввода scrollable - true
		 * Разрешит скролл внтри формы */
		scrollable: false,
		initialValues: {mode: 0, status: '01'},
		body: [
			{
				/** Новый компонент Space [https://ant.design/components/space/]
				 * Рекомендуется использовать для верстки в одну линию комопнентов (например фильтры)
				 * Для организации красивых отступов
				 */
				componentType: 'Space',
				className: 'p-8',
				children: [
					...selectModalDebug,
					...editModalDebug,
					{
						componentType: 'Item',
						child: {
							componentType: 'Button',
							label: (
								<span>
									<ReloadOutlined /> Reload
								</span>
							),
							/**
							 * Новая конструкция dispatch
							 * dispatch: {path: ...} - положет в стор занчение элемента
							 * dispatch: {path: ..., type: 'event'} - положет в стор объект
							 * Есть еще доп параметр extraData - это объект в сторе который прокидывается в onChange, НО НЕ отслеживаются его изменения
							 * 	{
							 * 		timestamp: moment(),
							 * 		value: value,
							 * 		extraData: extraData
							 * 	}
							 */
							dispatch: {
								path: 'debug.form.table.events.onReload',
								type: 'event',
							},
						},
					},
					{
						componentType: 'Item',
						label: 'Mode',
						name: 'mode',
						className: 'mb-0',
						child: {
							componentType: 'RadioGroup',
							optionType: 'button',
							buttonStyle: 'solid',
							dispatch: {
								path: 'debug.form.mode.onChange',
							},
							options: [
								{
									label: 'Table #1',
									value: 0,
								},
								{
									label: 'Table #2',
									value: 1,
								},
							],
						},
					},
				],
			},
			{
				componentType: 'Space',
				wrap: true,
				className: 'p-8',
				children: [
					{
						componentType: 'Item',
						name: 'name',
						child: {
							componentType: 'Input',
							// Если type не указан, то сохраняется только значение
							dispatch: {path: 'debug.form.table.filter.name'},
						},
					},
					{
						componentType: 'Item',
						child: {
							componentType: 'Text',
							label: 'c',
						},
					},
					{
						componentType: 'Item',
						name: 'startDate',
						child: {
							componentType: 'DatePicker',
							// Если type не указан, то сохраняется только значение
							dispatch: {
								path: 'debug.form.table.filter.startDate',
							},

							// Для ограничения выбора даты не позднее endDate
							// Надо подписаться на endDate и присвоить ограничение текущему Picker
							subscribe: [
								{
									name: 'endDate',
									path: 'rtd.debug.form.table.filter.endDate',
									onChange: ({value, setSubscribeProps}) => {
										setSubscribeProps({
											disabledDate: (startValue) =>
												disabledStartDate(
													startValue,
													value
												),
										});
									},
								},
							],
						},
					},
					{
						componentType: 'Item',
						child: {
							componentType: 'Text',
							label: 'по',
						},
					},
					{
						componentType: 'Item',
						name: 'endDate',
						child: {
							componentType: 'DatePicker',
							// Если type не указан, то сохраняется только значение
							dispatch: {path: 'debug.form.table.filter.endDate'},

							// Для ограничения выбора даты не позднее startDate
							// Надо подписаться на startDate и присвоить ограничение текущему Picker
							subscribe: [
								{
									name: 'startDate',
									path:
										'rtd.debug.form.table.filter.startDate',
									onChange: ({value, setSubscribeProps}) => {
										setSubscribeProps({
											disabledDate: (endValue) =>
												disabledEndDate(
													value,
													endValue
												),
										});
									},
								},
							],
						},
					},
					{
						componentType: 'Item',
						label: 'Status',
						name: 'status',
						className: 'mb-0',
						child: {
							componentType: 'RadioGroup',
							optionType: 'button',
							buttonStyle: 'solid',
							dispatch: {path: 'debug.form.table.filter.status'},
							options: [
								{
									label: 'Status 0',
									value: '01',
								},
								{
									label: 'Status #1',
									value: '02',
								},
							],
						},
					},
					{
						componentType: 'Item',
						child: {
							componentType: 'Button',
							label: (
								<span>
									<ReloadOutlined /> Apply filter
								</span>
							),

							// Через path срабатывает событие в таблицу
							// Через extraData в subscribe таблицы отправлется весь выбранный фильтр
							dispatch: {
								path: 'debug.form.table.events.onApplyFilter',
								extraData: 'rtd.debug.form.table.filter',
								type: 'event',
							},
						},
					},
				],
			},
			{
				componentType: 'Space',
				wrap: true,
				className: 'px-8 pb-8',
				children: [
					{
						componentType: 'Item',
						name: 'selectRoute',
						child: {
							/**
							 * Устарели SingleSelect и MultiSelect
							 * Теперь это селекты с почти всему проспаси из Antd [https://ant.design/components/select/]
							 * Имеются параметры расширяющие функцинал Ant Select
							 * Параметры описаны в документации
							 *
							 * НЕ РЕЛИЗОВАН TreeSelect
							 * ТОЛЬКО Select с единственным и множественным выбором
							 */
							componentType: 'Select',

							autoClearSearchValue: true,
							showSearch: true,
							searchParamName: 'name',
							showArrow: true,
							filterOption: false,

							widthControl: '250px',
							dropdownMatchSelectWidth: 400,
							mode: 'multiple',
							allowClear: true,
							infinityMode: true,
							requestLoadRows: apiGetFlatDataByConfigName(
								'routes'
							),
							optionConverter: (option) => ({
								label: (
									<span>
										<MehOutlined /> [{option.name}]
									</span>
								),
								value: option.id,
								className: '',
								disabled: undefined,
							}),
							dispatch: {
								path: 'debug.form.table.events.onSelectRoute',
								type: 'event',
							},
						},
					},
					{
						componentType: 'Item',
						name: 'selectRouteControlPoints',
						child: {
							componentType: 'Select',

							autoClearSearchValue: true,
							showSearch: true,
							searchParamName: 'name',
							showArrow: true,
							filterOption: false,

							widthControl: '250px',
							dropdownMatchSelectWidth: 400,
							mode: 'multiple',
							allowClear: true,
							infinityMode: true,
							requestLoadRows: apiGetFlatDataByConfigName(
								'routeControlPoints'
							),
							optionConverter: (option) => ({
								label: (
									<span>
										<MehOutlined /> [
										{option.controlPointName}]
									</span>
								),
								value: option.id,
								className: '',
								disabled: undefined,
							}),
							subscribe: [
								{
									name: 'onSelectRoute',
									path:
										'rtd.debug.form.table.events.onSelectRoute',
									onChange: ({
										value,
										extraData,
										setSubscribeProps,
									}) => {
										// if(value) {
										value &&
											value.value &&
											setSubscribeProps({
												filter: {routeId: value.value},
											});
										console.log('onSelectRoute', value);
										// }
									},
								},
							],
						},
					},
				],
			},
			{
				// Компонент который переключает отображение детек в зависимости от
				// пропса value или через setSubscribeProps в subscribe
				componentType: 'Switcher',
				subscribe: [
					{
						name: 'table',
						path: 'rtd.debug.form.mode.onChange',
						onChange: ({value, setSubscribeProps}) => {
							// console.log('Switcher value', value);
							setSubscribeProps({value: value});
						},
					},
				],
				children: [
					{...TableCus('staffQualifications')},
					{...TableCus('routes')},
				],
			},
		],
	};

	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
};

Debug.propTypes = {};

export default Debug;
