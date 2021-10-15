import React from 'react';
import SplitPane from 'react-split-pane';
import {List} from 'rt-design';
import {Link} from 'react-router-dom';
import {paths} from '../../../constants/paths';
import {Route, Switch} from 'react-router';
import {BasePage} from 'mobile-inspections-base-ui';
import {Result} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {catalogConfigs} from '../Registry/catalogConfigs';
import {Catalogs} from '../Registry/Catalogs';

const CATALOG_DATA_PATH = {
	title: 'Справочник',
	path: '/catalog/:name',
	component: Catalogs,
};

const Catalog = ({location: {pathname}}) => {
	// let {pathname} = useLocation();

	// let history = useHistory();
	// console.log('Catalog props - ', props);
	/**
	 * pathname.split('/').length > 2 ? null: CATALOG_DATA_PATH.path
	 * в этой строке происходит дейстиве которое приводит title страницы к сзначению undefined.
	 * в обычно истуации туда страивается конечная точка пути в меню. сейчас для нас конечная точка НСИ, а уже внутри НСИ мы перебираем наши справочники.
	 *
	 * чуть большая проблема у нас с Breadcrumbs, как title он не изменен. вопрос открытый.
	 *
	 * в BasePage.js, из контекста берется занчение paths, но у нас есть сопоставимый объект catalogConfigs. Надо обсудить концепцию UI(Breadcrumbs, title) в данном разделе
	 */
	const catalogPaths = catalogConfigs(paths);
	const found = catalogPaths.find((item) => item.path === pathname);
	const title = found ? found.title : 'НСИ';
	return (
		<BasePage title={title} path={pathname} extraPaths={catalogPaths}>
			<SplitPane
				className={'Catalog'}
				split='vertical'
				minSize={300}
				maxSize={350}
				defaultSize={300}
			>
				<div className={'catalogList'}>
					<List
						dataSource={catalogPaths}
						itemLayout={'vertical'}
						renderItem={(item) => (
							<li
								className={
									pathname === item.path ? 'activeItem' : ''
								}
							>
								<Link to={item.path} className={'catalogLink'}>
									{item.title}
								</Link>
							</li>
						)}
					/>
				</div>
				<div className={'CatalogData'}>
					<Switch>
						{catalogPaths.map((item, index) => {
							const Component = CATALOG_DATA_PATH.component;
							return (
								<Route
									exact
									key={index}
									path={item.path}
									name={item.name}
									render={() => (
										<Component
											mainWay={'catalog'}
											catalogName={item.name}
											hierarchical={item.hierarchical}
										/>
									)}
								/>
							);
						})}

						<Route>
							<Result
								title='Выберите справочник'
								extra={<ArrowLeftOutlined />}
							/>
						</Route>
					</Switch>
				</div>
			</SplitPane>
		</BasePage>
	);
};

export default Catalog;
