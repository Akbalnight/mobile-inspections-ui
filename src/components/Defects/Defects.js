import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {defectCardInfoModal} from './Modals/defectCardInfo';
import {useHistory} from 'react-router';
import {addDefectCard} from './Modals/defectEdit';

export default function Defects() {
	const history = useHistory();
	const confirFilterPanel = [
		// тут чуть-чуть деревянно получилось
		{
			componentType: 'DateRange',
			title: 'Период обнаружения',
			nameStart: 'dateBegin',
			nameEnd: 'dateEnd',
			dateFormat: 'DD-MM-YYYY',
			className: 'mr-16',
		},
		{
			componentType: 'DateRange',
			title: 'Период устранения',
			nameStart: 'dateBegin',
			nameEnd: 'dateEnd',
			dateFormat: 'DD-MM-YYYY',
			className: 'mr-16',
		},
		{
			componentType: 'SingleSelect',
			name: 'defectStatuses', // временно
			rowRender: 'name',
			searchParamName: 'name',
			title: 'Статус обработки',
			widthControl: 160,
			widthPopup: 250,
			requestLoadRows: apiGetFlatDataByConfigName(
				'defectStatusesProcess'
			),
			requestLoadConfig: apiGetConfigByName('defectStatusesProcess'),
		},
	];

	const tableFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'ServerTable', // 'InfinityTable' ?
						// selectable: true,
						commandPanelProps: {
							systemBtnProps: {
								edit: {actionType: ['modal', 'modal']},
								up: {},
								down: {},
								delete: {},
							}, // там есть кнопки которые я не распознал, не нашел информацию какою логику хотят поместить в первую кнопку в фигнме в команд панели
						},
						filterPanelProps: {
							configFilter: [...confirFilterPanel],
						},
						requestLoadRows: apiGetFlatDataByConfigName('techMaps'), //defects
						requestLoadConfig: apiGetConfigByName('techMaps'), //defects
						modals: [addDefectCard(), defectCardInfoModal(history)],
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
