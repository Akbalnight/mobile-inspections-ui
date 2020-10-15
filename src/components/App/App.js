import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Layout} from 'antd';
import Menu from '../Menu/Menu';
import Routes from '../Routes/Routes';
import {paths} from '../../constants/paths';
// import {checkTokenRequest} from "../../apis/auth.api";

const {Sider} = Layout;

const App = props => {
	const [toggleCollapsed, setToggleCollapsed] = useState(
		localStorage.getItem('menuCollapsed') === 'true'
	);

	const [checkingToken, setCheckingToken] = useState(false);

	const {location, history, auth} = props;
	if (auth && !auth.access_token) {
		history.push(paths.LOGIN.path);
		return null;
	} else {
		if (!checkingToken) {
			setCheckingToken(true);
			// checkTokenRequest().then().catch();
			// setInterval(function() {
			// 	checkTokenRequest().then().catch();
			// }, 5000);
		}
		return (
			<Layout className='rootLayout'>
				<Sider
					collapsed={toggleCollapsed}
					collapsedWidth={60}
					width={320}
				>
					<Menu
						onToggleCollapsed={() => {
							setToggleCollapsed(!toggleCollapsed);
							localStorage.setItem(
								'menuCollapsed',
								(!toggleCollapsed).toString()
							);
						}}
						toggleCollapsed={toggleCollapsed}
						path={location.pathname}
					/>
				</Sider>
				<Layout>
					<Routes />
				</Layout>
			</Layout>
		);
	}
};

export default withRouter(App);
