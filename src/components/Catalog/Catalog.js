import React from 'react';
import SplitPane from 'react-split-pane';
import {List} from 'rt-design';
import {Link, useLocation} from 'react-router-dom';
import {paths} from '../../constants/paths';
import {Route, Switch} from 'react-router';
import {BasePage} from 'mobile-inspections-base-ui';
import {Result} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {catalogConfigs} from './catalogConfigs';
import {CatalogDecForm} from './CatalogDecForm';
// import {CatalogForm} from './CatalogForm';
// import CatalogData from './CatalogData';

const CATALOG_DATA_PATH = {
	title: 'Справочник',
	path: '/catalog/:name',
	// component: CatalogForm,
	component: CatalogDecForm,
};

const Catalog = () => {
	let {pathname} = useLocation();
	// let history = useHistory();
	// console.log('pathname - ', pathname.split('/'));

	return (
		<BasePage
			path={
				pathname.split('/').length > 2 ? CATALOG_DATA_PATH.path : null
			}
		>
			<SplitPane
				className={'Catalog'}
				split='vertical'
				minSize={200}
				maxSize={500}
				defaultSize={300}
			>
				<div className={'CatalogList'}>
					<List
						autoLoadRows={false}
						rows={catalogConfigs(paths)}
						selectedRowKeys={[pathname]}
						type={'localSide'}
						showElements={['search']}
						// rowRender={"title"}
						rowRender={({rowData}) => (
							<Link
								style={{
									flex: '1 1 auto',
									color: 'rgba(0, 0, 0, 0.65)',
								}}
								to={rowData.path}
							>
								{rowData.title}
							</Link>
						)}
						rowKey={'path'}
					/>
				</div>
				<div className={'CatalogData'}>
					<Switch>
						{catalogConfigs(paths).map((item, index) => {
							const Component = CATALOG_DATA_PATH.component;
							return (
								<Route
									exact
									key={index}
									path={item.path}
									name={item.name}
									render={() => (
										<Component
											catalogName={item.name}
											// SaveForm={item.SaveForm}
											// SaveGroup={item.SaveGroup}
											hierarchical={item.hierarchical}
											unique={item.unique}
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

Catalog.propTypes = {};

Catalog.defaultProps = {};

export default Catalog;
