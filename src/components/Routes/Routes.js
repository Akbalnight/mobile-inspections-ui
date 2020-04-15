import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {paths} from '../../constants/paths';

const Routes = () => {
	return (
		<Switch>
			{/** Главная */}
			<Route
				exact
				path={paths.HOME.path}
				component={paths.HOME.component}
			/>
			<Route
				exact
				path={paths.DEBUG.path}
				component={paths.DEBUG.component}
			/>
			{/** НСИ */}
			<Route
				path={paths.CATALOG.path}
				component={paths.CATALOG.component}
			/>

			{/** Конфигуратор обходов */}
			<Route
				exact
				path={paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.path}
				component={paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.component}
			/>
			<Route
				exact
				path={paths.DETOURS_CONFIGURATOR_ROUTES.path}
				component={paths.DETOURS_CONFIGURATOR_ROUTES.component}
			/>
			<Route
				exact
				path={paths.DETOURS_CONFIGURATOR_DETOURS_SCHEDULES.path}
				component={
					paths.DETOURS_CONFIGURATOR_DETOURS_SCHEDULES.component
				}
			/>
			<Route
				exact
				path={paths.DETOURS_CONFIGURATOR_ROUTE_MAPS.path}
				component={paths.DETOURS_CONFIGURATOR_ROUTE_MAPS.component}
			/>

			{/** Управление обслуживанием оборудования */}
			<Route
				exact
				path={paths.CONTROL_EQUIPMENTS_WORK_SCHEDULES.path}
				component={paths.CONTROL_EQUIPMENTS_WORK_SCHEDULES.component}
			/>
			<Route
				exact
				path={paths.CONTROL_EQUIPMENTS_TECH_MAPS.path}
				component={
					paths.CONTROL_EQUIPMENTS_TECH_MAPS.component
				}
			/>
			<Route
				exact
				path={paths.CONTROL_EQUIPMENTS_TECH_MAP_DATA.path}
				component={
					paths.CONTROL_EQUIPMENTS_TECH_MAP_DATA.component
				}
			/>

			{/** Учет и контроль дефектов */}
			<Route
				exact
				path={paths.CONTROL_DEFECTS_DEFECTS.path}
				component={paths.CONTROL_DEFECTS_DEFECTS.component}
			/>
			<Route
				exact
				path={paths.CONTROL_DEFECTS_PANEL_PROBLEMS.path}
				component={paths.CONTROL_DEFECTS_PANEL_PROBLEMS.component}
			/>
			<Route
				exact
				path={paths.CONTROL_DEFECTS_PANEL_DEVIATIONS.path}
				component={paths.CONTROL_DEFECTS_PANEL_DEVIATIONS.component}
			/>
			<Route
				exact
				path={paths.ANALYTICS.path}
				component={paths.ANALYTICS.component}
			/>

			<Redirect exact from='/' to={paths.HOME.path} />
			<Redirect
				exact
				from={paths.DETOURS_CONFIGURATOR.path}
				to={paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.path}
			/>
			<Redirect
				exact
				from={paths.CONTROL_EQUIPMENTS.path}
				to={paths.CONTROL_EQUIPMENTS_WORK_SCHEDULES.path}
			/>
			<Redirect
				exact
				from={paths.CONTROL_DEFECTS.path}
				to={paths.CONTROL_DEFECTS_DEFECTS.path}
			/>
		</Switch>
	);
};
Routes.propTypes = {};

Routes.defaultProps = {};

export default Routes;
