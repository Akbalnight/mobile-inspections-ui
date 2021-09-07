// import {ReactComponent as HOME} from '../imgs/menu/home.svg';
import {ReactComponent as CATALOG} from '../imgs/menu/catalog.svg';
import {ReactComponent as DETOURS_CONFIGURATOR} from '../imgs/menu/detours_configurator.svg';
// import {ReactComponent as CONTROL_EQUIPMENTS} from '../imgs/menu/control_equipments.svg';
import {ReactComponent as CONTROL_DEFECTS} from '../imgs/menu/control_defects.svg';
import {ReactComponent as ANALYTICS} from '../imgs/menu/analytics.svg';
// import {BugOutlined} from '@ant-design/icons';
import {paths} from './paths';

export const menu = [
	// {
	// 	...paths.HOME,
	// 	icon: HOME,
	// },

	// {
	// 	icon: BugOutlined,
	// 	...paths.DEBUG_CONFIG,
	// },
	// {
	// 	icon: BugOutlined,
	// 	...paths.DEBUG_JSX,
	// },
	// {
	// 	icon: BugOutlined,
	// 	...paths.DEBUG_TABLE,
	// paths.DEBUG_CP_ANTON,
	// },
	// {
	// 	icon: BugOutlined,
	// 	...paths.DEBUG_RABBIT,
	// },
	// {
	// 	icon: BugOutlined,
	// 	...paths.DEBUG_MARSEL,
	// },
	{
		// control_defects
		...paths.CONTROL_DEFECTS,
		icon: CONTROL_DEFECTS,
		children: [
			paths.CONTROL_DEFECTS_DEFECTS,
			paths.CONTROL_DEFECTS_PANEL_PROBLEMS,
		],
	},
	{
		// detours_configurator
		...paths.DETOURS_CONFIGURATOR,
		icon: DETOURS_CONFIGURATOR,
		children: [
			paths.DETOURS_CONFIGURATOR_TECH_MAPS,
			paths.DETOURS_CONFIGURATOR_CONTROL_POINTS,
			paths.DETOURS_CONFIGURATOR_ROUTES,
			paths.DETOURS_CONFIGURATOR_DETOURS,
			paths.DETOURS_CONFIGURATOR_DETOURS_SCHEDULES_TABLE,
			paths.DETOURS_CONFIGURATOR_ROUTE_MAPS,
		],
	},
	{
		...paths.CATALOG,
		icon: CATALOG,
	},
	{
		// analytics
		...paths.ANALYTICS,
		icon: ANALYTICS,
	},
];
