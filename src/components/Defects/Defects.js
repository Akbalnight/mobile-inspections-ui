import React, {useState} from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {components} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {defectCardInfoModal} from './Modals/defectCardInfo';
import {useHistory} from 'react-router';
import {editDefectCard} from './Modals/defectEdit';
import {paths} from '../../constants/paths';
import {
	buttonCloseWithNote,
	buttonSendToPanel,
	buttonSendToSap,
} from './Modals/modalButtonDefects';
import {configFilterPanel, customColumnProps} from './tableProps';

/**
 * Общий компонет для двух разделов Жернал дефектов иПанель проблем, при необходимости отображение свойственнх только одному разделу
 * элементов настраивается при помощи  history.
 *
 * в случае, выбора конфигурации 'defects' - таблица будет расширенной с допольнительной информацией. В обратном случае, таблица будет представлять собой
 * свод  данных(сокращенный) о тех же сущностях. Свод необходим для струдников обсулживающих данные дефекты
 */

const {Form} = components;
export default function Defects() {
	const history = useHistory();
	const [tableRef, setTableRef] = useState({});
	const _setTableRef = (ref) => setTableRef(ref);
	/**
	 * historyChange не уверен в корректоности такой замены по файлу
	 */
	let historyChange =
		history.location.pathname === '/control-defects/defects';

	const tableFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Space',
					style: {
						justifyContent: 'space-between',
					},
					className: 'p-8',
					children: [
						{
							componentType: 'Space',
							children: [
								buttonCloseWithNote(tableRef),
								...(historyChange
									? buttonSendToPanel
									: buttonSendToSap),
							],
						},
						{
							componentType: 'Space',
							children: [
								historyChange
									? {
											componentType: 'Item',
											child: {
												componentType: 'Button',
												label:
													'Перейти в панель проблем',
												type: 'primary',
												onClick: () => {
													history.push(
														`${paths.CONTROL_DEFECTS_PANEL_PROBLEMS.path}`
													);
												},
											},
									  }
									: {
											componentType: 'Item',
											child: {
												componentType: 'Button',
												label:
													'Перейти в журнал дефектов',
												type: 'primary',
												onClick: () => {
													history.push(
														`${paths.CONTROL_DEFECTS_DEFECTS.path}`
													);
												},
											},
									  },
							],
						},
					],
				},

				{
					componentType: 'Item',
					child: {
						componentType: 'Table',
						selectable: true,

						ref: _setTableRef,
						fixWidthColumn: true,
						history,
						headerHeight: 35,
						dispatchPath: 'defects.defectTable.table',

						filterPanelProps: {
							configFilter: [...configFilterPanel(history)],
							defaultFilter: {statusProcessId: null},
						},
						customColumnProps: customColumnProps,

						requestLoadRows: apiGetFlatDataByConfigName(
							historyChange ? 'defects' : 'panelProblems'
						),
						requestLoadConfig: apiGetConfigByName(
							historyChange ? 'defects' : 'panelProblems'
						),
						modals: [
							editDefectCard(
								historyChange ? 'defects' : 'panelProblems'
							),
							defectCardInfoModal(history),
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
