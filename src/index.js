import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {App} from 'mobile-inspections-base-ui';
import {store} from './store';
import * as serviceWorker from './serviceWorker';
import {ConfigProvider} from 'antd';
import ru_RU from 'antd/lib/locale-provider/ru_RU';
import {menu} from './constants/menu';
import {paths} from './constants/paths';
import AppRoutes from './AppRoutes';
import {ReactComponent as LogoBig} from './imgs/logo-big.svg';
import {ReactComponent as LogoSmall} from './imgs/logo-small.svg';
import {ReactComponent as ToggleBtnLeft} from './imgs/toggle-btn-left.svg';
import {ReactComponent as ToggleBtnRight} from './imgs/toggle-btn-right.svg';
import './index.less';
import './init';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				{/** Авторизация */}
				<Route
					exact
					path={paths.LOGIN.path}
					component={paths.LOGIN.component}
				/>
				<Route exact path={paths.AUTHORIZATION_CODE.path}>
					<paths.AUTHORIZATION_CODE.component
						redirectUrl={paths.HOME.path}
					/>
				</Route>

				{/** Приложение */}
				<Route path={paths.PATH_PREFIX.path}>
					<ConfigProvider locale={ru_RU}>
						<App
							// For App
							Routes={AppRoutes}
							paths={paths}
							menuProps={{
								menu: menu,
								ToggleBtnRight: ToggleBtnRight,
								LogoSmall: LogoSmall,
								LogoBig: LogoBig,
								ToggleBtnLeft: ToggleBtnLeft,
							}}
						/>
					</ConfigProvider>
				</Route>
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
