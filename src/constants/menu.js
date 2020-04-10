import {
	HomeOutlined,
	ReadOutlined,
	CalendarOutlined,
	SettingOutlined,
	DesktopOutlined,
	BarChartOutlined
} from '@ant-design/icons';

import {paths} from "./paths";

export const menu = [
	{
		...paths.HOME,
		icon: HomeOutlined,
	},
	{
		...paths.DEBUG
	},
	{
		...paths.CATALOG,
		icon: ReadOutlined
	},
	{
		...paths.DETOURS_CONFIGURATOR,
		icon: CalendarOutlined,
		children: [
			paths.DETOURS_CONFIGURATOR_CONTROL_POINTS,
			paths.DETOURS_CONFIGURATOR_ROUTES,
			paths.DETOURS_CONFIGURATOR_DETOURS_SCHEDULES,
			paths.DETOURS_CONFIGURATOR_ROUTE_MAPS,
		]
	},
	{
		...paths.CONTROL_EQUIPMENTS,
		icon: SettingOutlined,
		children: [
			paths.CONTROL_EQUIPMENTS_WORK_SCHEDULES,
			paths.CONTROL_EQUIPMENTS_TECH_MAPS,
		]
	},
	{
		...paths.CONTROL_DEFECTS,
		icon: DesktopOutlined,
		children: [
			paths.CONTROL_DEFECTS_DEFECTS,
			paths.CONTROL_DEFECTS_PANEL_PROBLEMS,
			paths.CONTROL_DEFECTS_PANEL_DEVIATIONS,
		]
	},
	{
		...paths.ANALYTICS,
		icon: BarChartOutlined
	}
];
