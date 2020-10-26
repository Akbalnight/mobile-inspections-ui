import React from 'react';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {
	addGroupOnServer,
	editGroupOnServer,
} from '../Base/Modals/GroupOnServer';
import {useHistory} from 'react-router';
import {techMapDataView} from '../TechMapsForm/TechMapDataView';
import {groupView} from '../Base/Modals/GroupView';

const TechMaps = () => {
	let history = useHistory();

	const formConfig = {
		noPadding: true,
		body: [
			{
				componentType: 'Layout',
				children: [
					{
						componentType: 'Item',
						child: {
							componentType: 'ServerTable',

							// Подключение таблицы к react-router
							// Т.к. мы используем actionType: 'page' для кнопки создани и редактирвоания тех. карты
							// Нам требуется дать таблице инструмет для перехода по ссылкам
							history,

							// Получение иерархичной таблицы по имени конфигурации
							requestLoadRows: apiGetHierarchicalDataByConfigName(
								'techMaps'
							),

							// Получение конфигурации по имени
							requestLoadConfig: apiGetConfigByName('techMaps'),

							// В примере #2 будет описан вот этот объект
							commandPanelProps: {
								systemBtnProps: {
									add: {actionType: 'page'},
									addGroup: {actionType: 'modal'},
									edit: {actionType: ['page', 'modal']},
								},
							},

							// В примере #3 будет описан вот этот массив
							modals: [
								addGroupOnServer('techMaps'),
								editGroupOnServer('techMaps'),
								techMapDataView(),
								groupView(
									'Информация о группе технологической карты'
								),
							],
						},
					},
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

TechMaps.propTypes = {};

export default TechMaps;
