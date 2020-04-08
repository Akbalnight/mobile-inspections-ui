import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {menu} from '../../constants/menu';
// import logo from '../../imgs/LOGO.png';
import {ReactComponent as Logo} from '../../imgs/LOGO.svg';
import './Menu.less';

const MenuItems = (menu, currentPath) =>
	menu.map(item => {
		if (item.children && item.children.length > 0) {
			return (
				<div key={item.path} className={'subMenu'}>
					<div
						className={[
							'subMenuItem'
							// currentPath.startsWith(item.path) ? 'active' : ''
						].join(' ')}
					>
						{item.icon ? <item.icon /> : null}
						<span>{item.title}</span>
					</div>
					{MenuItems(item.children, currentPath)}
				</div>
			);
		}
		// console.log('item.path === currentPath', item.path, currentPath);
		return (
			<div
				key={item.path}
				className={[
					'menuItem',
					currentPath.startsWith(item.path) ? 'active' : ''
				].join(' ')}
			>
				<NavLink to={item.path}>
					{item.icon ? <item.icon /> : null}
					<span>{item.title}</span>
				</NavLink>
			</div>
		);
	});

const Menu = props => {
	const {toggleCollapsed, path} = props;

	// console.log('classes', classes);
	return (
		<div
			className={'Menu'}
			// theme="dark"
			// mode="inline"
			// selectedKeys={[path]}
			// forceSubMenuRender={true}
		>
			<div
				className={[
					'toggleButton',
					toggleCollapsed ? 'collapsed' : ''
				].join(' ')}
			>
				{' '}
				{/* onClick={onToggleCollapsed} */}
				{/*{toggleCollapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}*/}
				<NavLink to={'/'} className={'logoLink'}>
					<Logo className={'logoImg'}/>
					{/*<img className={'logoImg'} src={logo} alt={'Logo tipo'} />*/}
				</NavLink>
			</div>
			{MenuItems(menu, path)}
		</div>
	);
};

Menu.propTypes = {
	onToggleCollapsed: PropTypes.func.isRequired,
	toggleCollapsed: PropTypes.bool.isRequired
};

Menu.defaultProps = {};

export default Menu;
