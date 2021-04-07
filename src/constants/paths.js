import Home from '../components/Home/Home';
import Catalog from '../components/Catalog/Catalog';
import TechMaps from '../components/TechMaps/TechMaps';
import TechMapsForm from '../components/TechMapsForm/TechMaps';
import TechMapDataForm from '../components/TechMapsForm/TechMapDataEdit';
import Debug from '../components/Debug/Debug';
import TechMapData from '../components/TechMaps/TechMapData';
// import ControlPointsD from '../components/ControlPoints/ControlPointsD';
import ControlPointsBase from '../components/ControlPoints/ControlPoinsBase';
import {
	ControlPointAdd,
	ControlPointEdit,
} from '../components/ControlPoints/ControlPointDataD';
import {AuthorizationCode, Login} from 'mobile-inspections-base-ui';
import Routes from '../components/Routes/Registry/Routes';
import {RoutesAdd, RoutesEdit} from '../components/Routes/Form/RoutesForm';
import Detours from '../components/Detours/Detours';
import {DetoursAdd, DetoursEdit} from '../components/Detours/DetoursForm';
import {
	AddRouteMaps,
	EditRouteMaps,
} from '../components/RouteMaps/Registry/RouteMaps';
import Defects from '../components/Defects/Defects';
import DefectsForm from '../components/Defects/DefectsForm';
import DetoursSchedules from '../components/Detours/DetoursSchedules';
import WorkSchedules from '../components/WorkSchedules/WorkSchedules';
import DeclarativeDebug from '../components/Debug/DeclarativeDebug';
import {DetoursMain} from '../components/Detours/Registry/DetoursMain';

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
		// component: Debug,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	DEBUG_2: {
		title: 'Debug 2',
		path: '/2debug',
		component: DeclarativeDebug,
		// component: Debug,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	// DEBUG_MARSEL: {
	// 	title: 'DebugMarsel',
	// 	path: '/debugMarsel',
	// 	component: Home,
	// },
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
	/** Тех. карты на формах */
	DETOURS_CONFIGURATOR_TECH_MAPS_FORM: {
		title: 'Технологические карты и операции',
		path: '/detours-configurator/formTechMaps',
		component: TechMapsForm,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	DETOURS_CONFIGURATOR_TECH_MAP_DATA_FORM: {
		title: 'Редактирование технологической карты',
		path: '/detours-configurator/formTechMaps/:id',
		component: TechMapDataForm,
	},
	// DETOURS_CONFIGURATOR_CONTROL_POINTS: {
	// 	title: 'Контрольные точки',
	// 	path: '/detours-configurator/control-points',
	// 	component: ControlPointsD,
	// 	roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	// },
	DETOURS_CONFIGURATOR_CONTROL_POINTS: {
		title: 'Контрольные точки',
		path: '/detours-configurator/control-points',
		component: ControlPointsBase,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	DETOURS_CONFIGURATOR_CONTROL_POINTS_NEW: {
		title: 'Создание контрольной точки',
		path: '/detours-configurator/control-points/new',
		component: ControlPointAdd,
	},
	DETOURS_CONFIGURATOR_CONTROL_POINTS_EDIT: {
		title: 'Редактирование контрольной точки',
		path: '/detours-configurator/control-points/:id',
		component: ControlPointEdit,
	},
	DETOURS_CONFIGURATOR_ROUTES: {
		title: 'Маршруты',
		path: '/detours-configurator/routes',
		component: Routes,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	DETOURS_CONFIGURATOR_ROUTES_DATA_NEW: {
		title: 'Создание маршрута',
		path: '/detours-configurator/routes/new',
		component: RoutesAdd,
	},
	DETOURS_CONFIGURATOR_ROUTES_DATA_EDIT: {
		title: 'Редактирование маршрута',
		path: '/detours-configurator/routes/:id',
		component: RoutesEdit,
	},
	DETOURS_CONFIGURATOR_DETOURS: {
		title: 'Обходы',
		path: '/detours-configurator/detours',
		component: DetoursMain,
		roles: ['ROLE_ADMIN'],
	},
	DETOURS_CONFIGURATOR_DETOURS_PREVIOUS: {
		title: 'Обходы previous',
		path: '/detours-configurator/detoursPrevious',
		component: Detours,
		roles: ['ROLE_ADMIN'],
	},
	DETOURS_CONFIGURATOR_DETOURS_DATA_ADD: {
		title: 'Создание обхода',
		path: '/detours-configurator/detours/new',
		component: DetoursAdd,
	},
	DETOURS_CONFIGURATOR_DETOURS_DATA_EDIT: {
		title: 'Редактирование обхода',
		path: '/detours-configurator/detours/:id',
		component: DetoursEdit,
	},
	DETOURS_CONFIGURATOR_DETOURS_SCHEDULES: {
		title: 'Расписание обходов',
		path: '/detours-configurator/detours-schedules',
		component: DetoursSchedules,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	DETOURS_CONFIGURATOR_ROUTE_MAPS: {
		title: 'Маршрутные карты',
		path: '/detours-configurator/route-maps',
		component: AddRouteMaps,
		roles: ['ROLE_ADMIN'],
	},
	DETOURS_CONFIGURATOR_ROUTE_MAPS_EDIT: {
		title: 'Редактирование маршрутной карты',
		path: '/detours-configurator/route-maps/:id',
		component: EditRouteMaps,
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
		component: WorkSchedules,
		roles: ['ROLE_ADMIN'],
	},
	CONTROL_EQUIPMENTS_TECH_MAPS: {
		title: 'Технологические карты и операции',
		path: '/controlEquipments/techMaps',
		component: TechMaps,
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	CONTROL_EQUIPMENTS_TECH_MAP_DATA: {
		title: 'Редактирование технологической карты',
		path: '/controlEquipments/techMaps/:id',
		component: TechMapData,
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
