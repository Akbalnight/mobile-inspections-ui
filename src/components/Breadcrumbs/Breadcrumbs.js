import React from 'react';
import PropTypes from 'prop-types';
import {Breadcrumb} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import {paths} from '../../constants/paths';

/**
 * Форминование заголовка для хлебных крошек
 */

const FindTitleBreadcrumb = path => {
	for (const pathItem in paths) {
		if (paths[pathItem].path === path) return paths[pathItem].title;
	}
};

const Breadcrumbs = props => {
	const {path, breadcrumb} = props;

	const pathSnippets = path.split('/').filter(i => i);

	const breadcrumbItems = pathSnippets.map((_, index) => {
		const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
		// console.log('Breadcrumbs - url: ', url);
		const title = FindTitleBreadcrumb(url);
		if(breadcrumb && index === pathSnippets.length - 1){
			return (
				<Breadcrumb.Item key={url}>
					<span>{breadcrumb}</span>
				</Breadcrumb.Item>
			);
		} else {
			return (
				<Breadcrumb.Item key={url}>
					<NavLink to={url}>{title}</NavLink>
				</Breadcrumb.Item>
			);
		}
	});
	return (
		<Breadcrumb>
			<Breadcrumb.Item>
				<NavLink to={'/home'}>
					<HomeOutlined />
				</NavLink>
			</Breadcrumb.Item>
			{breadcrumbItems}
		</Breadcrumb>
	);
};

Breadcrumbs.propTypes = {
	path: PropTypes.string.isRequired
};

Breadcrumbs.defaultProps = {};

export default Breadcrumbs;
