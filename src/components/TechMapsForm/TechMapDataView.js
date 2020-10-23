import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName
} from '../../apis/catalog.api';
import {customColumnProps} from './TechMapColumnProps';

export const techMapDataView = () => {
	let Row;

	const loadData = (callBack, row) => {
		Row = row;
		callBack(row);
	};

	const loadTechOperationsHandler = ({data, params}) => {
		const newData = {...data, techMapId: Row.id};
		return apiGetFlatDataByConfigName('techOperations')({
			data: newData,
			params
		});
	};

	const headFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Описание',
				level: 5
			}
		},
		{
			componentType: 'Row',
			gutter: [16, 16],
			children: [
				{
					componentType: 'Col',
					span: 24,
					children: [
						{
							componentType: 'Item',
							label: 'Код',
							name: 'code',
							className: 'mb-0',
							child: {componentType: 'Text'}
						},
						{
							componentType: 'Item',
							label: 'Наименование',
							name: 'name',
							className: 'mb-0',
							child: {componentType: 'Text'}
						},
						{
							componentType: 'Item',
							label: 'Группа',
							name: 'parentName',
							className: 'mb-0',
							child: {componentType: 'Text'}
						},
						{
							componentType: 'Item',
							label: 'Статус',
							name: 'techMapsStatusName',
							className: 'mb-0',
							child: {componentType: 'Text'}
						},
						{
							componentType: 'Item',
							label: 'Действует с',
							name: 'dateStart',
							className: 'mb-0',
							child: {
								componentType: 'DateText',
								format: 'DD.MM.YYYY'
							}
						}
					]
				}
			]
		},
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Технологические операции',
				level: 5
			}
		},
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'techOperations',
					child: {
						componentType: 'LocalTable',
						style: {height: 300},
						headerHeight: 50,
						// rowHeight: 50,
						customColumnProps: customColumnProps,

						// Получение плоской таблицы с дополнительными параметрами
						requestLoadRows: loadTechOperationsHandler,

						// Получение конфигурации по имени
						requestLoadConfig: apiGetConfigByName('techOperations')
					}
				}
			]
		}
	];

	return {
		type: `viewObject`,
		width: 1000,
		title: 'Информация о технологической карте',
		form: {
			name: 'TechMapDataView',
			labelCol: {span: 8},
			wrapperCol: {span: 16},
			labelAlign: 'left',
			loadInitData: loadData,
			body: [...headFields]
		}
	};
};
