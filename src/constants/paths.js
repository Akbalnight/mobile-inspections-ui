import Home from '../components/Home/Home';
import Catalog from '../components/Catalog/Catalog';
import TechMaps from '../components/TechMaps/TechMaps';
import TechMapsForm from '../components/TechMapsForm/TechMaps';
import TechMapDataForm from '../components/TechMapsForm/TechMapDataEdit';
import Debug from '../components/Debug/Debug';
import TechMapData from '../components/TechMaps/TechMapData';
import ControlPointsD from '../components/ControlPoints/ControlPointsD';
import ControlPointDataD from '../components/ControlPoints/ControlPointDataD';
import {AuthorizationCode, Login} from 'mobile-inspections-base-ui';
import Routes from '../components/Routes/Routes';
import RoutesForm from '../components/Routes/RoutesForm';
import DetourSchedules from '../components/Detours/DetourSchedules';
import DetourSchedulesForm from '../components/Detours/DetourSchedulesForm';
import RouteMaps from '../components/RouteMaps/RouteMaps';
import Defects from '../components/Defects/Defects';
import DefectsForm from '../components/Defects/DefectsForm';
import DebugMarsel from '../components/Debug/DebugMarsel/DebugMarsel';

const pathPrefix = process && process.env && process.env.PUBLIC_URL;

export const paths = {
	PATH_PREFIX: {
		title: 'Portal ',
		path: ``,
		isGroup: true,
		redirect: `${pathPrefix}/home`,
	},
	404: {
		title: '404',
		path: `/404`,
		isGroup: true,
	},
	LOGIN: {
		title: 'Login',
		path: `${pathPrefix}/login`,
		component: Login,
	},
	AUTHORIZATION_CODE: {
		title: 'Authorization code',
		path: `${pathPrefix}/authorization_code`,
		component: AuthorizationCode,
	},
	HOME: {
		title: 'Главная',
		path: '/home',
		component: Home,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	DEBUG: {
		title: 'Debug',
		path: '/debug',
		component: Debug,
	},
	DEBUG_MARSEL: {
		title: 'DebugMarsel',
		path: '/debugMarsel',
		component: DebugMarsel,
	},
	CATALOG: {
		exact: false,
		title: 'НСИ',
		path: '/catalog',
		component: Catalog,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},

	DETOURS_CONFIGURATOR: {
		title: 'Конфигуратор обходов',
		path: '/detours-configurator',
		component: Home,
		isGroup: true,
		redirect: '/detours-configurator/control-points',
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	DETOURS_CONFIGURATOR_CONTROL_POINTS: {
		title: 'Контрольные точки',
		path: '/detours-configurator/control-points',
		component: ControlPointsD,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	DETOURS_CONFIGURATOR_CONTROL_POINTS_DATA: {
		title: 'Контрольная точка',
		path: '/detours-configurator/control-points/:id',
		component: ControlPointDataD,
	},
	DETOURS_CONFIGURATOR_ROUTES: {
		title: 'Маршруты',
		path: '/detours-configurator/routes',
		component: Routes,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	DETOURS_CONFIGURATOR_ROUTES_DATA: {
		title: 'редакитрование маршрута',
		path: '/detours-configurator/routes/:id',
		component: RoutesForm,
	},
	DETOURS_CONFIGURATOR_DETOURS_SCHEDULES: {
		title: 'Расписание обходов',
		path: '/detours-configurator/detours-schedules',
		component: DetourSchedules,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	DETOURS_CONFIGURATOR_DETOURS_SCHEDULES_DATA: {
		title: 'Редактирование обхода',
		path: '/detours-configurator/detours-schedules/:id',
		component: DetourSchedulesForm,
	},
	DETOURS_CONFIGURATOR_ROUTE_MAPS: {
		title: 'Маршрутные карты',
		path: '/detours-configurator/route-maps',
		component: RouteMaps,
		roles: ['ROLE_ADMIN'],
	},
	CONTROL_EQUIPMENTS: {
		title: 'Управление обслуживанием оборудования',
		path: '/controlEquipments',
		component: Home,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	CONTROL_EQUIPMENTS_WORK_SCHEDULES: {
		title: 'Рабочие графики',
		path: '/controlEquipments/work-schedules',
		component: Home,
		roles: ['ROLE_ADMIN'],
	},
	CONTROL_EQUIPMENTS_TECH_MAPS: {
		title: 'Технологические карты и операции',
		path: '/controlEquipments/techMaps',
		component: TechMaps,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	CONTROL_EQUIPMENTS_TECH_MAP_DATA: {
		title: 'Технологическая карта',
		path: '/controlEquipments/techMaps/:id',
		component: TechMapData,
	},

	/** Тех. карты на формах */
	CONTROL_EQUIPMENTS_TECH_MAPS_FORM: {
		title: 'Технологические карты и операции',
		path: '/controlEquipments/formTechMaps',
		component: TechMapsForm,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	CONTROL_EQUIPMENTS_TECH_MAP_DATA_FORM: {
		title: 'Технологическая карта',
		path: '/controlEquipments/formTechMaps/:id',
		component: TechMapDataForm,
	},

	CONTROL_DEFECTS: {
		title: 'Учет и контроль дефектов',
		path: '/control-defects',
		component: Home,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	CONTROL_DEFECTS_DEFECTS: {
		title: 'Журнал учета дефектов',
		path: '/control-defects/defects',
		component: Defects,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	CONTROL_DEFECTS_DEFECTS_DATA_FORM: {
		title: 'Создание/редактирование дефекта',
		path: '/control-defects/defects/:id',
		component: DefectsForm,
	},
	CONTROL_DEFECTS_PANEL_PROBLEMS: {
		title: 'Панель проблем',
		path: '/control-defects/panel-problems',
		component: Defects,
		roles: ['ROLE_ADMIN'],
	},
	CONTROL_DEFECTS_PANEL_DEVIATIONS: {
		title: 'Панель отклонений',
		path: '/control-defects/panel-deviations',
		component: Home,
		roles: ['ROLE_ADMIN'],
	},
	ANALYTICS: {
		title: 'Аналитика и отчетность',
		path: '/analytics',
		component: Home,
		roles: ['ROLE_ADMIN'],
	},
};
