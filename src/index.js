import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './components/App/App';
import { store } from './store';
import * as serviceWorker from './serviceWorker';
import {ConfigProvider} from 'antd';
import ru_RU from 'antd/lib/locale-provider/ru_RU';
import './index.less';
import './init';
import {paths} from "./constants/paths";

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
				<Route
					exact
					path={paths.AUTHORIZATION_CODE.path}
					component={paths.AUTHORIZATION_CODE.component}
				/>

				{/** Приложение */}
				<Route path={paths.PATH_PREFIX.path}>
					<ConfigProvider locale={ru_RU}>
						<App />
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
