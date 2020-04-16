import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {menu} from '../../constants/menu';
import { Popover, Tooltip} from 'antd';
import {ReactComponent as LogoBig} from '../../imgs/logo-big.svg';
import {ReactComponent as LogoSmall} from '../../imgs/logo-small.svg';
import {ReactComponent as ToggleBtnLeft} from '../../imgs/toggle-btn-left.svg';
import {ReactComponent as ToggleBtnRight} from '../../imgs/toggle-btn-right.svg';

const Div = (props) => {
	return (
		<div>
			{props.children}
		</div>
	)
};

const MenuItems = (menu, currentPath, toggleCollapsed) =>
	menu.map(item => {
		if(toggleCollapsed){
			if (item.children && item.children.length > 0){
				const PopoverContent = item.children.map((childItem) => {
					return MenuItem(childItem, NavLink, currentPath, toggleCollapsed, 'popoverMenuItem', true);
				});
				return (
					<Popover
						key={item.path}
						overlayClassName={'menuPopover'}
						placement='rightTop'
						arrowPointAtCenter
						content={PopoverContent}
						trigger='click'
					>
						{MenuItem(
							item,
							Div,
							currentPath,
							toggleCollapsed,
							'menuItem',
							false
						)}
					</Popover>
				);
			} else {
				return (
					<Tooltip key={item.path} placement="rightTop" title={item.title}>
						{ MenuItem(item, NavLink, currentPath, toggleCollapsed, 'menuItem', false) }
					</Tooltip>

				)
			}
		}
		else {
			if (item.children && item.children.length > 0){
				return (
					<div key={item.path} className={'subMenu'}>
						<div className={'subMenuItem'}>
							<span role="img" aria-label="home" className="anticon"> {item.icon ? <item.icon /> : null} </span>
							<span>{item.title}</span>
						</div>
						{
							item.children.map((childItem) => {
								return MenuItem(childItem, NavLink, currentPath, toggleCollapsed, 'menuItem', true);
							})
						}
					</div>
				);
			} else {
				return MenuItem(item, NavLink, currentPath, toggleCollapsed, 'menuItem', true);
			}
		}
	});

const MenuItem = (item, ItemComponent, currentPath, toggleCollapsed, className, withTitle) => (
	<div
		key={item.path}
		className={[
			className,
			currentPath.startsWith(item.path) ? 'active' : '',
			toggleCollapsed ? 'collapsed' : ''
		].join(' ')}
	>
		<ItemComponent to={item.path}>

			<span role="img" aria-label="home" className="anticon"> {item.icon ? <item.icon /> : null} </span>

			{ withTitle ? <span>{item.title}</span> : null }

		</ItemComponent>

	</div>
);


const Menu = props => {
	const {toggleCollapsed, onToggleCollapsed, path} = props;

	// console.log('classes', classes);

	return (
		<div
			className={`Menu ${toggleCollapsed ? 'collapsed' : ''}`}
		>
			<div
				className={[
					'toggleButton',
					toggleCollapsed ? 'collapsed' : ''
				].join(' ')}
				onClick={onToggleCollapsed}
			>
				{ toggleCollapsed && <div className={'caretRight'}><ToggleBtnRight/></div> }
				{
					toggleCollapsed
					? <div><LogoSmall className={'logoImg'}/></div>
					: <div><LogoBig className={'logoImg'}/></div>
				}
				{ !toggleCollapsed && <div><ToggleBtnLeft className={'CaretLeft'}/></div> }
			</div>
			{MenuItems(menu, path, toggleCollapsed)}
		</div>
	);
};

Menu.propTypes = {
	onToggleCollapsed: PropTypes.func.isRequired,
	toggleCollapsed: PropTypes.bool.isRequired
};

Menu.defaultProps = {};

export default Menu;
