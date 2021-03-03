import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {checkBox, code, date} from '../Base/customColumnProps';

/**
 * configFilterPanel, при изменении этого компонента не забыть сохранить names иначе не будет работать панель фильтрации
 *
 */
export const configFilterPanel = [
	{
		componentType: 'SingleSelect',
		name: 'routeIds',
		className: 'mr-16',
		rowRender: 'name',
		title: 'Маршрут',
		widthControl: 150,
		widthPopup: 300,
		heightPopup: 200,
		requestLoadRows: apiGetFlatDataByConfigName('routes'),
		requestLoadConfig: apiGetConfigByName('routes'),
	},
	{
		componentType: 'SingleSelect',
		name: 'staffIds',
		className: 'mr-16',
		rowRender: 'username',
		title: 'Сотрудник',
		widthControl: 150,
		widthPopup: 300,
		heightPopup: 200,
		requestLoadRows: apiGetFlatDataByConfigName('staff'),
		requestLoadConfig: apiGetConfigByName('staff'),
	},
	{
		componentType: 'DateRange',
		title: 'Период',
		nameStart: 'dateBegin',
		nameEnd: 'dateEnd',
		dateFormat: 'DD-MM-YYYY HH:mm:ss',
		className: 'mr-16',
	},
];

export const customColumnProps = [
	{...code},
	{...date('dateStartPlan')},
	{...checkBox('saveOrderControlPoints')},
];
