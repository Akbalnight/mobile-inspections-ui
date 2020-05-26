import React, {useEffect, useState} from 'react';
import BasePage from '../App/BasePage';
import {AdvancedTable} from 'rt-design';
import {
	apiGetConfigByObject,
	apiGetDataByConfigName,
} from '../../apis/catalog.api';
import {useLocation, useHistory} from 'react-router';
import {paths} from '../../constants/paths';
import {FolderOutlined} from '@ant-design/icons';
import TechMapDataView from "./TechMapDataView";
import GroupViewModal from "../Base/GroupViewModal";
import {default as TechMapGroupEdit} from "../Catalog/Forms/BaseModals/BaseModalWithParentId";

const TechMaps = () => {
	const [mounted, setMounted] = useState(false);
	const [configData, setConfigData] = useState({});

	const [titleViewForm, setTitleViewForm] = useState("");
	const [visibleDataViewForm, setVisibleDataViewForm] = useState(false);
	const [visibleGroupViewForm, setVisibleGroupViewForm] = useState(false);
	const [visibleGroupSaveForm, setVisibleGroupSaveForm] = useState(false);
	const [typeOperationGroupSaveForm, setTypeOperationGroupSaveForm] = useState('');

	const [selectTechMap, setSelectTechMap] = useState({});

	/** Ссылка на объект таблицы */
	const [tableRef, setTableRef] = useState({});
	const _setTableRef = (ref) => setTableRef(ref);

	let {pathname} = useLocation();
	let history = useHistory();

	useEffect(() => {
		if (!mounted) {
			// console.log('loadConfig -> setConfigData');
			apiGetConfigByObject({configName: 'techMaps'})
				.then(response => {
					setConfigData(response.data);
					setMounted(true);
				})
				.catch(error => {
					console.log('error -> ', error);
				});
		}
	}, [mounted]);

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

	const onClickAddHandler = () => {
		history.push(
			`${paths.CONTROL_EQUIPMENTS_TECH_MAPS.path}/new`
		);
	};

	const onClickAddGroupHandler = () => {
		setTitleViewForm(`Создание группы технологических карт`);
		setTypeOperationGroupSaveForm('create');
		setSelectTechMap({});
		setVisibleGroupSaveForm(true)
	};

	const onClickEditHandler = (event, {rowData}) => {
		if(rowData.isGroup) {
			setTitleViewForm(`Изменение группы технологических карт ${rowData.code}`);
			setTypeOperationGroupSaveForm('update');
			setSelectTechMap(rowData);
			setVisibleGroupSaveForm(true)
		} else {
			history.push(
				`${paths.CONTROL_EQUIPMENTS_TECH_MAPS.path}/${rowData.id}`
			);
		}
	};

	const onRowDoubleClickHandler = ({rowData}) => {
		if(rowData.isGroup) {
			setTitleViewForm(`Группа технологических карт ${rowData.code}`);
			setVisibleGroupViewForm(true);
		} else {
			setTitleViewForm(`Технологическая карта ${rowData.code}`);
			setVisibleDataViewForm(true);
		}
		setSelectTechMap(rowData);
	};

	const pathNameSplitted = pathname.split('/');
	if (mounted) {
		return (
			<BasePage
				path={
					pathNameSplitted.length > 3
						? paths.CONTROL_EQUIPMENTS_TECH_MAP_DATA.path
						: null
				}
			>
				<AdvancedTable
					ref={_setTableRef}
					autoDeleteRows={false}
					configData={configData}
					defaultSelectedRowKeys={pathNameSplitted.length > 3 ? [pathNameSplitted[3]] : []}
					customCellRenders={customCellRenders}
					expandDefaultAll={true}
					fixWidthColumn={false}
					type={'serverSide'}
					onRowDoubleClick={onRowDoubleClickHandler}
					requestLoadRows={({data, params}) =>
						apiGetDataByConfigName({
							configName: configData.configName,
							hierarchical: configData.hierarchical,
							lazyLoad: configData.hierarchyLazyLoad,
							data,
							params
						})
					}

					commandPanelProps={{
						onClickAdd: onClickAddHandler,
						onClickAddGroup: onClickAddGroupHandler,
						onClickEdit: onClickEditHandler,
						showElements: [
							'add',
							'addGroup',
							'edit',
							// 'delete'
						]
					}}
				/>
				<TechMapDataView
					title={titleViewForm}
					visible={visibleDataViewForm}
					setVisible={setVisibleDataViewForm}
					rowData={selectTechMap}
				/>
				<GroupViewModal
					title={titleViewForm}
					visible={visibleGroupViewForm}
					setVisible={setVisibleGroupViewForm}
					rowData={selectTechMap}
				/>

				<TechMapGroupEdit
					title={titleViewForm}
					visible={visibleGroupSaveForm}
					typeOperation={typeOperationGroupSaveForm}
					setVisibleSaveForm={setVisibleGroupSaveForm}
					initFormObject={selectTechMap}
					catalogName={'techMaps'}
					setReloadTable={tableRef && tableRef.reloadData}
				/>
			</BasePage>
		);
	} else return null;
};

TechMaps.propTypes = {};

export default TechMaps;
