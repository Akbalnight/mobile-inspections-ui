// Root
import Home from '../components/Home/Home';
import {AuthorizationCode, Login} from 'mobile-inspections-base-ui';
// НСИ
import Catalog from '../components/Catalog/Form/Catalog';
// Тех карты

import TechMapsForm from '../components/TechMapsForm/TechMaps';
import TechMapDataForm from '../components/TechMapsForm/TechMapDataEdit';

// Контрольные точки
import ControlPoints from '../components/ControlPoints/Registry/ControlPoints';
import {
	ControlPointAdd,
	ControlPointEdit,
} from '../components/ControlPoints/Form/ControlPoint';
// Маршруты и Маршрутные карты
import {RoutesAdd, RoutesEdit} from '../components/Routes/Form/RouteForm';
import {
	AddRouteMaps,
	EditRouteMaps,
} from '../components/RouteMaps/Registry/RouteMaps';
// Обходы
import {Detours} from '../components/Detours/Registry/Detours';
import Registry from '../components/Detours/Schedules/Registry';
import WorkSchedules from '../components/WorkSchedules/WorkSchedules';

// Дефекты
import Defects from '../components/Defects/Registry/Defects';
import {Routes} from '../components/Routes/Registry/Routes';
import {Signage} from '../components/Defects/Form/Signage';

// Debugs
// import DebugConfig from '../components/Debug/Anton/DebugConfig';
// import DebugJSX from '../components/Debug/Anton/DebugJSX';
// import DebugTable from '../components/Debug/Anton/DebugTable';
// import {DebugMarsel} from '../components/Debug/DebugMarsel/DebugMarsel';

const pathPrefix = process && process.env && process.env.PUBLIC_URL;

export const paths = {
	PATH_PREFIX: {
		title: 'Portal ',
		path: ``,
		isGroup: true,
		redirect: `${pathPrefix}/control-defects/defects`,
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
		// component: Home,
		// roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
		isGroup: true,
		redirect: `${pathPrefix}/control-defects/defects`,
	},
	// DEBUG_CONFIG: {
	// 	title: 'Debug config',
	// 	path: '/config-debug',
	// 	component: DebugConfig,
	// 	roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	// },
	// DEBUG_JSX: {
	// 	title: 'Debug jsx',
	// 	path: '/jsx-debug',
	// 	component: DebugJSX,
	// 	roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	// },
	// DEBUG_TABLE: {
	// 	title: 'Debug table',
	// 	path: '/table-debug',
	// 	component: DebugTable,
	// 	roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	// },
	// DEBUG_MARSEL: {
	// 	title: 'DebugMarsel',
	// 	path: '/debugMarsel',
	// 	component: DebugMarsel,
	// 	roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	// },
	CATALOG: {
		exact: false,
		title: 'НСИ',
		path: '/catalog',
		component: Catalog,
		roles: [
			'ROLE_ADMIN',
			'ROLE_MI_ADMIN',
			'ROLE_MI_SHIFT_SUPERVISOR',
			'ROLE_MI_DETOURS_RESP',
			'ROLE_MI_DETOURS_APPROVER',
			'ROLE_MI_DETOUR_SCHEDULES_APPROVER',
			'ROLE_MI_DETOUR_SCHEDULES_RESP',
			'ROLE_MI_DETOUR_SCHEDULES_APPROVER',
			'ROLE_MI_DETOURS_CREATOR',
		],
	},

	DETOURS_CONFIGURATOR: {
		title: 'Конфигуратор обходов',
		path: '/detours-configurator',
		// component: Home,
		isGroup: true,
		redirect: '/detours-configurator/formTechMaps',
		roles: [
			'ROLE_ADMIN',
			'ROLE_MOBILE_APP',
			'ROLE_MI_ADMIN',
			'ROLE_MI_SHIFT_SUPERVISOR',
			'ROLE_MI_DETOURS_CREATOR',
		],
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
	DETOURS_CONFIGURATOR_CONTROL_POINTS: {
		title: 'Контрольные точки',
		path: '/detours-configurator/control-points',
		component: ControlPoints,
		roles: [
			'ROLE_ADMIN',
			'ROLE_MOBILE_APP',
			'ROLE_MI_ADMIN',
			'ROLE_MI_SHIFT_SUPERVISOR',
			'ROLE_MI_DETOURS_CREATOR',
		],
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
		roles: [
			'ROLE_ADMIN',
			'ROLE_MOBILE_APP',
			'ROLE_MI_ADMIN',
			'ROLE_MI_SHIFT_SUPERVISOR',
			'ROLE_MI_DETOUR_SCHEDULES_CREATOR',
			'ROLE_MI_DETOURS_CREATOR',
		],
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
		component: Detours,
		roles: [
			'ROLE_ADMIN',
			'ROLE_MI_ADMIN',
			'ROLE_MI_SHIFT_SUPERVISOR',
			'ROLE_MI_DETOUR_SCHEDULES_APPROVER',
			'ROLE_MI_DETOUR_SCHEDULES_RESP',
			'ROLE_MI_DETOUR_SCHEDULES_CREATOR',
			'ROLE_MI_DETOURS_APPROVER',
			'ROLE_MI_DETOURS_RESP',
			'ROLE_MI_DETOURS_CREATOR',
		],
	},
	DETOURS_CONFIGURATOR_DETOURS_SCHEDULES_TABLE: {
		title: 'Расписание обходов',
		path: '/detours-configurator/schedules',
		component: Registry,
		roles: [
			'ROLE_ADMIN',
			'ROLE_MOBILE_APP',
			'ROLE_MI_ADMIN',
			'ROLE_MI_SHIFT_SUPERVISOR',
			'ROLE_MI_DETOUR_SCHEDULES_APPROVER',
			'ROLE_MI_DETOUR_SCHEDULES_RESP',
			'ROLE_MI_DETOUR_SCHEDULES_CREATOR',
		],
	},
	DETOURS_CONFIGURATOR_ROUTE_MAPS: {
		title: 'Маршрутные карты',
		path: '/detours-configurator/route-maps',
		component: AddRouteMaps,
		roles: [
			'ROLE_ADMIN',
			'ROLE_MI_ADMIN',
			'ROLE_MI_SHIFT_SUPERVISOR',
			'ROLE_MI_DETOURS_CREATOR',
		],
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
		// isGroup: true,
		// redirect: '/detours-configurator/formTechMaps',
		roles: ['ROLE_ADMIN', 'ROLE_MOBILE_APP'],
	},
	CONTROL_EQUIPMENTS_WORK_SCHEDULES: {
		title: 'Рабочие графики',
		path: '/controlEquipments/work-schedules',
		component: WorkSchedules,
		roles: ['ROLE_ADMIN'],
	},
	CONTROL_DEFECTS: {
		title: 'Учет и контроль дефектов',
		path: '/control-defects',
		isGroup: true,
		redirect: '/control-defects/defects',
		roles: [
			'ROLE_ADMIN',
			'ROLE_MI_ADMIN',
			'ROLE_MI_SHIFT_SUPERVISOR',
			'ROLE_MI_DETOURS_RESP',
			'ROLE_MI_DETOURS_APPROVER',
			'ROLE_MI_DETOUR_SCHEDULES_APPROVER',
			'ROLE_MI_DETOUR_SCHEDULES_RESP',
		],
	},
	CONTROL_DEFECTS_DEFECTS: {
		title: 'Журнал учета дефектов',
		path: '/control-defects/defects',
		component: Defects,
		roles: [
			'ROLE_ADMIN',
			'ROLE_MI_ADMIN',
			'ROLE_MI_SHIFT_SUPERVISOR',
			'ROLE_MI_DETOURS_RESP',
			'ROLE_MI_DETOURS_APPROVER',
			'ROLE_MI_DETOUR_SCHEDULES_APPROVER',
			'ROLE_MI_DETOUR_SCHEDULES_RESP',
		],
	},
	CONTROL_DEFECTS_PANEL_PROBLEMS: {
		title: 'Панель проблем',
		path: '/control-defects/panel-problems',
		component: Defects,
		roles: [
			'ROLE_ADMIN',
			'ROLE_MI_ADMIN',
			'ROLE_MI_SHIFT_SUPERVISOR',
			'ROLE_MI_DETOURS_RESP',
			'ROLE_MI_DETOURS_APPROVER',
			'ROLE_MI_DETOUR_SCHEDULES_APPROVER',
			'ROLE_MI_DETOUR_SCHEDULES_RESP',
		],
	},
	CONTROL_DEFECTS_SIGNAGE: {
		title: 'Панель проблем',
		path: '/control-defects/signage',
		// path: `${pathPrefix}/signage`,
		component: Signage,
		// roles: ['ROLE_ADMIN'],// not require
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
		roles: [
			'ROLE_ADMIN',
			'ROLE_MI_ADMIN',
			'ROLE_MI_SHIFT_SUPERVISOR',
			'ROLE_MI_DETOURS_RESP',
			'ROLE_MI_DETOURS_APPROVER',
			'ROLE_MI_DETOUR_SCHEDULES_APPROVER',
			'ROLE_MI_DETOUR_SCHEDULES_RESP',
			'ROLE_MI_DETOURS_CREATOR',
		],
	},
};
