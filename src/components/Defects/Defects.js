import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {components} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {useHistory} from 'react-router';

import {customColumnProps, headerTable} from './tableProps';

/**
 * Общий компонет для двух разделов Журнал дефектов иПанель проблем, при необходимости отображение свойственнх только одному разделу
 * элементов настраивается при помощи  history.
 *
 * в случае, выбора конфигурации 'defects' - таблица будет расширенной с допольнительной информацией. В обратном случае, таблица будет представлять собой
 * свод  данных(сокращенный) о тех же сущностях. Свод необходим для струдников обсулживающих данные дефекты
 */

const {Form} = components;

export default function Defects() {
	const history = useHistory();

	/**
	 * historyChange не уверен в корректоности такой замены по файлу
	 */
	let historyChange =
		history.location.pathname === '/control-defects/defects';

	const tableFields = [
		{
			componentType: 'Layout',
			children: [
				...headerTable(history),
				{
					componentType: 'Item',
					child: {
						componentType: 'Table',
						selectable: true,
						searchParamName: 'name',
						fixWidthColumn: true,
						history,
						headerHeight: 35,
						infinityMode: true,
						dispatchPath: 'defects.defectTable.table',
						customColumnProps: customColumnProps,
						requestLoadRows: apiGetFlatDataByConfigName(
							historyChange ? 'defects' : 'panelProblems'
						),
						requestLoadConfig: apiGetConfigByName(
							historyChange ? 'defects' : 'panelProblems'
						),

						subscribe: [
							/** Событие поиска в таблице по знацению name */
							{
								name: 'onSearch',
								path: 'rtd.defects.defectTable.events.onSearch',
								onChange: ({value, extraData, reloadTable}) => {
									console.log(value);
									reloadTable({
										searchValue: value.value,
									});
								},
							},
						],
					},
				},
			],
		},
	];

	const formConfig = {
		noPadding: true,
		name: 'defectsLogForm',
		body: [...tableFields],
	};
	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
}
