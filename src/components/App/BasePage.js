import React from 'react';
import PropTypes from 'prop-types';
import {useRouteMatch} from 'react-router';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import {Layout} from 'antd';

const {Header, Content} = Layout;

const BasePage = (props) => {

	const { path } = props;

	let match = useRouteMatch();
	// let pathname = useLocation();
	// console.log('match.path', pathname);
	return (
		<>
			<Header className='header'>
				<Breadcrumbs path={ path ? path : match.path} />
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
};

export default BasePage;
