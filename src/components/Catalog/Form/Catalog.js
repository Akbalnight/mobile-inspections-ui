import React from 'react';
import SplitPane from 'react-split-pane';
import {List, Button} from 'rt-design';
import {Link, useLocation} from 'react-router-dom';
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

const Catalog = () => {
	let {pathname} = useLocation();
	// let history = useHistory();
	// console.log('pathname - ', pathname);
	/**
	 * pathname.split('/').length > 2 ? null: CATALOG_DATA_PATH.path
	 * в этой строке происходит дейстиве которое приводит title страницы к сзначению undefined.
	 * в обычно истуации туда страивается конечная точка пути в меню. сейчас для нас конечная точка НСИ, а уже внутри НСИ мы перебираем наши справочники.
	 *
	 * чуть большая проблема у нас с Breadcrumbs, как title он не изменен. вопрос открытый.
	 *
	 * в BasePage.js, из контекста берется занчение paths, но у нас есть сопоставимый объект catalogConfigs. Надо обсудить концепцию UI(Breadcrumbs, title) в данном разделе
	 */
	return (
		<BasePage path={pathname} extraPaths={catalogConfigs(paths)}>
			<SplitPane
				className={'Catalog'}
				split='vertical'
				minSize={200}
				maxSize={500}
				defaultSize={300}
			>
				<div className={'CatalogList'}>
					<List
						dataSource={catalogConfigs(paths)}
						itemLayout={'vertical'}
						renderItem={(item) => (
							<Link to={item.path}>
								<Button
									style={{
										color: 'rgba(0, 0, 0, 0.65)',
										width: '100%',
										textAlign: 'left',
									}}
									className={'catalogBtn'}
									type={'text'}
								>
									{item.title}
								</Button>
							</Link>
						)}
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
											mainWay={'catalog'}
											catalogName={item.name}
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

/**
 * Старый лист
 *
 *  <List
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
 * */
