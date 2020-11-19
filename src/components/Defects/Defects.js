import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
import {defectCardInfoModal} from './Modals/defectCardInfo';
import {useHistory} from 'react-router';
import {addDefectCard} from './Modals/defectEdit';
import {paths} from '../../constants/paths';
// import { defectSendPanel } from './Modals/defectSendPanel';
// import { defectCloseModal } from './Modals/defectCloseModal';

export default function Defects() {
	const history = useHistory();

	const confirFilterPanel = [
		// тут чуть-чуть деревянно получилось
		{
			componentType: 'DateRange',
			title: 'Период обнаружения',
			nameStart: 'dateBeginDetection',
			nameEnd: 'dateEndDetection',
			dateFormat: 'DD-MM-YYYY',
			className: 'mr-16',
		},
		{
			componentType: 'DateRange',
			title: 'Период устранения',
			nameStart: 'dateBeginCorrect',
			nameEnd: 'dateEndCorrect',
			dateFormat: 'DD-MM-YYYY',
			className: 'mr-16',
		},
		{
			componentType: 'SingleSelect',
			name: 'defectStatuses', // временно
			rowRender: 'name',
			title: 'Статус обработки',
			widthControl: 0,
			widthPopup: 250,
			//эксперимент
			requestLoadRows: apiGetFlatDataByConfigName(
				history.location.pathname === '/control-defects/defects'
					? 'defectStatusesProcess'
					: 'panelProblemsStatuses'
			),
			requestLoadConfig: apiGetConfigByName(
				history.location.pathname === '/control-defects/defects'
					? 'defectStatusesProcess'
					: 'panelProblemsStatuses'
			),
		},
		// тут нужно спроектировать блок ПРИОРИТЕТ приятнее всего будет реализовать в комбинации RadioButtonю По нажаитю таблица должна будет фильтровать приоритет.
		// {
		// 	componentType: 'Custom',
		// 	name: 'custom',
		// 	title: 'Custom',
		// },
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
							}, // там есть кнопки которые я не распознал, не нашел информацию какою логику хотят поместить в первую кнопку в фигме в команд панели
							centerCustomSideElement: [
								//эксперимент
								{
									componentType: 'Item',
									label: 'Приоритет',
									name: 'priorityField',
									className: 'mb-0',
									child: {
										componentType: 'RadioGroup',
										optionType: 'button',
										size: 'small',
										options: [
											{
												label: '1',
												value: '1',
												style: {
													color: 'white',
													backgroundColor: '#FF4040',
												},
											},
											{
												label: '2',
												value: '2',
												style: {
													color: 'white',
													backgroundColor: '#F2C94C',
												},
											},
											{
												label: '3',
												value: '3',
												style: {
													color: 'white',
													backgroundColor: '#9DCE5B',
												},
											},
											{
												label: '4',
												value: '4',
												style: {
													color: 'white',
													backgroundColor: '#98B8E3',
												},
											},
										],
									},
								},
							],
							rightCustomSideElement: [
								history.location.pathname ===
								'/control-defects/defects'
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
												}, //заглушка
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
												}, //заглушка
											},
									  },
							],
						},
						filterPanelProps: {
							configFilter: [...confirFilterPanel],
						},
						requestLoadRows: apiGetHierarchicalDataByConfigName(
							'controlPoints'
						), //defects
						requestLoadConfig: apiGetConfigByName('controlPoints'), //defects
						modals: [
							addDefectCard(),
							defectCardInfoModal(history), // прокинул тут для кнопки Редактирвать, история тут ни к чему.
							// defectSendPanel(),
							// defectCloseModal()
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
