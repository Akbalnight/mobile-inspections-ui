import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Layout} from 'antd';
import Menu from '../Menu/Menu';
import Routes from '../Routes/Routes';

const {Sider} = Layout;

const App = props => {
	const [toggleCollapsed, setToggleCollapsed] = useState(localStorage.getItem('menuCollapsed') === 'true');

	const {location} = props;

	return (
		<Layout className='rootLayout'>
			<Sider collapsed={toggleCollapsed} collapsedWidth={60} width={320}>
				<Menu
					onToggleCollapsed={() => {
						setToggleCollapsed(!toggleCollapsed);
						localStorage.setItem('menuCollapsed', (!toggleCollapsed).toString());
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
};

export default withRouter(App);
