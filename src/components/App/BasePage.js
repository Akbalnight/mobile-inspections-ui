import React from 'react';
import PropTypes from 'prop-types';
import {useRouteMatch} from 'react-router';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import {Layout, Popover, message} from 'antd';

import {ReactComponent as UserIcon} from '../../imgs/header/user.svg';
import {ReactComponent as HelpIcon} from '../../imgs/header/help.svg';
import {ReactComponent as SettingsIcon} from '../../imgs/header/settings.svg';

import Help from './Header/Help';

const {Header, Content} = Layout;

const info = (text) => {

};

const BasePage = props => {
	const {path, breadcrumb} = props;

	let match = useRouteMatch();
	// let pathname = useLocation();
	// console.log('match.path', pathname);
	return (
		<>
			<Header className='header'>
				<Breadcrumbs
					path={path ? path : match.path}
					breadcrumb={breadcrumb}
				/>
				<div className={'profileControl'}>
					<span className='headerIcon' onClick={() => message.info('Раздел информации о пользователе находится в материализации')}>
						<UserIcon />
					</span>
					<Popover
						arrowPointAtCenter
						placement='bottomRight'
						overlayClassName={'helpPopover'}
						title={'Информация о приложении'}
						content={<Help />}
						trigger='click'
					>
						<span className='headerIcon'>
							<HelpIcon />
						</span>
					</Popover>
					<span className='headerIcon' onClick={() => message.info('Раздел настроек находится в материализации')}>
						<SettingsIcon />
					</span>
				</div>
			</Header>
			<Content
				className={'rootLayoutContent ' + props.className}
				style={{background: '#fff'}}
			>
				{props.children}
			</Content>
		</>
	);
};

BasePage.propTypes = {
	className: PropTypes.string,
	path: PropTypes.string,
	breadcrumb: PropTypes.string
};

export default BasePage;
