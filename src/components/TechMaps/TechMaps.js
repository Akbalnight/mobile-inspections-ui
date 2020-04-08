import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SplitPane, {Pane} from 'react-split-pane';
import BasePage from '../App/BasePage';
import {AdvancedTable} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetDataByConfigName
} from '../../apis/catalog.api';
import {Route, Switch, useLocation, useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {paths} from '../../constants/paths';
import {Checkbox, Result} from 'antd';
import {ArrowLeftOutlined, FolderOutlined} from '@ant-design/icons';
import TechMapData from './TechMapData';
import TechMapGroupData from "./TechMapGroupData";

import './TechMaps.less';

const TechMaps = props => {
	const [mounted, setMounted] = useState(false);
	const [configData, setConfigData] = useState({});

	const [selectTechMap, setSelectTechMap] = useState({});

	let {pathname} = useLocation();
	let history = useHistory();

	useEffect(() => {
		loadConfig();
	}, []);

	const loadConfig = () => {
		console.log('loadConfig -> setConfigData');
		apiGetConfigByName({configName: 'techMaps'})
			.then(response => {
				setConfigData(response.data);
				if (!mounted) setMounted(true);
				// console.log('result -> ', result);
			})
			.catch(error => {
				console.log('error -> ', error);
			});
	};

	const rowRenderer = ({rowData, rowIndex, cells, columns}) => {
		console.log('rowRenderer -> cells', cells);
		return cells.map(item => {
			return React.createElement(
				Link,
				{
					to: `${paths.CONTROL_EQUIPMENTS_TECH_MAPS.path}/${rowData.id}`
				},
				item
			);
		});
		// return cells
	};

	const customCellRenders = [
		{
			name: 'code',
			cellRender: ({ rowData }) => String(rowData.code).padStart(8,'0')
		},
		{ //equipmentStop increasedDanger
			name: 'techMapsStatusName',
			cellRender: ({ rowData }) => rowData.isGroup ? <FolderOutlined style={{fontSize: '17px'}}  /> : <div>{rowData.techMapsStatusName}</div>
		}
	];

	const pathNameSplitted = pathname.split('/');
	// console.log("pathNameSplitted", pathNameSplitted);
	if (mounted) {
		return (
			<BasePage
				path={
					pathNameSplitted.length > 3
						? paths.CONTROL_EQUIPMENTS_TECH_MAP_DATA.path
						: null
				}
			>
				<SplitPane
					className={'TechMaps'}
					split='vertical'
					// minSize={200}
					// maxSize={500}
					defaultSize={'30%'}
				>
					<div className={'TechMapsList'}>
						<AdvancedTable
							autoDeleteRows={false}
							configData={configData}
							defaultSelectedRowKeys={pathNameSplitted.length > 3 ? [pathNameSplitted[3]] : null}
							customCellRenders={customCellRenders}
							expandDefaultAll={true}
							fixWidthColumn={false}
							section={'TechMapsList'}
							showElements={[
								'add',
								'addAsCopy',
								'addGroup',
								'delete'
							]}
							// rowRenderer={rowRenderer}
							onRowClick={({selected, rowKey, rowData}) => {
                                setSelectTechMap(rowData);
								if (selected)
									history.push(
										`${paths.CONTROL_EQUIPMENTS_TECH_MAPS.path}/${rowKey}`
									);
							}}
							requestLoadRows={({data, params}) =>
								apiGetDataByConfigName({
									configName: configData.configName,
									hierarchical: configData.hierarchical,
									lazyLoad: configData.hierarchyLazyLoad,
									data,
									params
								})
							}
						/>
					</div>
					<div className={'TechMapData'}>
						<Switch>
							<Route
								exact
								path={
									paths.CONTROL_EQUIPMENTS_TECH_MAP_DATA.path
								}
								// component={TechMapData}
								render={() => selectTechMap.isGroup ? <TechMapGroupData/> : <TechMapData/>}
							/>
							<Route>
								<Result
									title='Выберите технологическую карту'
									extra={<ArrowLeftOutlined />}
								/>
							</Route>
						</Switch>
					</div>
				</SplitPane>
			</BasePage>
		);
	} else return null;
};

TechMaps.propTypes = {};

export default TechMaps;
