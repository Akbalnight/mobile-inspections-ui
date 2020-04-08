import Home from '../components/Home/Home';
import Catalog from '../components/Catalog/Catalog';
import CatalogData from '../components/Catalog/CatalogData';

export const paths = {
	HOME: {
		title: 'Главная',
		path: '/home',
		component: Home
	},
	CATALOG: {
		title: 'НСИ',
		path: '/catalog',
		component: Catalog
	},
	CATALOG_DATA: {
		title: 'Справочник',
		path: '/catalog/:name',
		component: CatalogData
	},
	DETOURS_CONFIGURATOR: {
		title: 'Конфигуратор обходов',
		path: '/detours-configurator',
		redirect: '/detours-configurator/control-points'
	},
	DETOURS_CONFIGURATOR_CONTROL_POINTS: {
		title: 'Контрольные точки',
		path: '/detours-configurator/control-points'
	},
	DETOURS_CONFIGURATOR_ROUTES: {
		title: 'Маршруты',
		path: '/detours-configurator/routes'
	},
	DETOURS_CONFIGURATOR_DETOURS_SCHEDULES: {
		title: 'Расписание обходов',
		path: '/detours-configurator/detours-schedules'
	},
	DETOURS_CONFIGURATOR_ROUTE_MAPS: {
		title: 'Маршрутные карты',
		path: '/detours-configurator/route-maps'
	},
	CONTROL_EQUIPMENTS: {
		title: 'Управление обслуживанием оборудования',
		path: '/control-equipments',
		redirect: '/control-equipments/work-schedules'
	},
	CONTROL_EQUIPMENTS_WORK_SCHEDULES: {
		title: 'Рабочие графики',
		path: '/control-equipments/work-schedules'
	},
	CONTROL_EQUIPMENTS_TECH_MAPS_AND_OPERATIONS: {
		title: 'Технологические карты и операции',
		path: '/control-equipments/tech-maps-and-operations'
	},
	CONTROL_DEFECTS: {
		title: 'Учет и контроль дефектов',
		path: '/control-defects',
		redirect: '/control-defects/defects'
	},
	CONTROL_DEFECTS_DEFECTS: {
		title: 'Журнал учета дефектов',
		path: '/control-defects/defects'
	},
	CONTROL_DEFECTS_PANEL_PROBLEMS: {
		title: 'Панель проблем',
		path: '/control-defects/panel-problems'
	},
	CONTROL_DEFECTS_PANEL_DEVIATIONS: {
		title: 'Панель отклонений',
		path: '/control-defects/panel-deviations'
	},
	ANALYTICS: {
		title: 'Аналитика и отчетность',
		path: '/analytics'
	}
};
