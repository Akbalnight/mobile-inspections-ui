import React, {useEffect, useState, useRef} from 'react';
import {
	apiGetConfigByName,
	apiGetDataByConfigName
} from '../../apis/catalog.api';
import {AdvancedTable} from 'rt-design';
import { FolderOutlined, ToolOutlined } from '@ant-design/icons';

const CatalogData = props => {
	const [mounted, setMounted] = useState(false);
	const [configData, setConfigData] = useState({});

	const [titleSaveForm, setTitleSaveForm] = useState(false);
	const [typeOperationSaveForm, setTypeOperationSaveForm] = useState(false);
	const [visibleSaveForm, setVisibleSaveForm] = useState(false);

	const [titleSaveGroup, setTitleSaveGroup] = useState(false);
	const [typeOperationSaveGroup, setTypeOperationSaveGroup] = useState(false);
	const [visibleSaveGroup, setVisibleSaveGroup] = useState(false);

	const [selectObject, setSelectObject] = useState({});

	/** Ссылка на объект таблицы */
	// let tableRef = React.createRef();
	const [reloadTable, setReloadTable] = useState(false);

	const [defaultSort, setDefaultSort] = useState({});

	const {catalogName, SaveForm, SaveGroup} = props;

	useEffect(() => {
		loadConfig();
	}, []);

	const loadConfig = () => {
		apiGetConfigByName({configName: catalogName})
			.then(response => {
				setConfigData(response.data);

				const fieldWithSort = response.data.fields.find(item => !!item.defaultSort);
				if(fieldWithSort)
					setDefaultSort({
						key: fieldWithSort.alias ? fieldWithSort.alias : fieldWithSort.name,
						order: fieldWithSort.defaultSort.toLowerCase()
					});

				if (!mounted) setMounted(true);
				// console.log('result -> ', result);
			})
			.catch(error => {
				console.log('error -> ', error);
			});
	};

	const onClickAddHandler = () => {
		// console.log('onClickAddHandler tableRef', tableRef);
		setTitleSaveForm('Создать элемент справочника');
		setTypeOperationSaveForm('create');
		setSelectObject({});
		setVisibleSaveForm(true)
	};
	const onClickAddGroupHandler = () => {
		// console.log('onClickAddHandler');
		setTitleSaveGroup('Создать группы');
		setTypeOperationSaveGroup('create');
		setSelectObject({});
		setVisibleSaveGroup(true)
	};
	const onClickEditHandler = (event, {rowData}) => {
		// console.log('onClickEditHandler', rowData);
		if(rowData.isGroup){
			setTitleSaveGroup('Изменить группу');
			setTypeOperationSaveGroup('update');
			setSelectObject({...rowData});
			setVisibleSaveGroup(true)
		} else {
			setTitleSaveForm('Изменить элемент справочника');
			setTypeOperationSaveForm('update');
			setSelectObject({...rowData});
			setVisibleSaveForm(true)
		}
	};

	const customCellRenders = [
		{
			name: 'code',
			cellRender: ({ rowData }) => String(rowData.code).padStart(8,'0')
		},
		{
			name: 'techPlacePath',
			cellRender: ({ rowData }) => rowData.isGroup ? rowData.techPlacePath : String(rowData.techPlacePath).padStart(8,'0')
		},
		{
			name: 'is_group',
			cellRender: ({ rowData }) => (<div style={{fontSize: '17px'}}> {rowData.isGroup ? <FolderOutlined /> : <ToolOutlined />} </div>)
		}
	];

	return mounted ? (
		<>
			<AdvancedTable
				// ref={tableRef}
				// ref={tableRef}
				autoDeleteRows={false}
				// hardReload={reloadTable}
				// setHardReload={setReloadTable}
				configData={configData}
				customCellRenders={customCellRenders}
				expandDefaultAll={true}
				fixWidthColumn={true}
				requestLoadRows={({data, params}) =>
					apiGetDataByConfigName({
						configName: configData.configName,
						hierarchical: configData.hierarchical,
						lazyLoad: configData.hierarchyLazyLoad,
						data,
						params
					})
				}
				sortBy={defaultSort}
				// section={'BaseTableServerData'}
				tyle={'serverSide'}
				showElements={[
					'add',
					'addGroup',
					'edit',
					'delete',
					'addAsCopy'
				]}
				// centerCustomSideElement={<Button onClick={() => setReloadTable(true)}>Hard reload</Button>}
				onClickAdd={onClickAddHandler}
				onClickAddGroup={onClickAddGroupHandler}
				onClickEdit={onClickEditHandler}
				onClickDelete={(event, selectedRowKeys) => console.log('selectedRowKeys catalog', selectedRowKeys)}
				// deleteConfirm={false}
				// deleteConfirmTitle={'Удалить что-ли?'}
			/>
			<SaveForm
				title={titleSaveForm}
				visible={visibleSaveForm}
				typeOperation={typeOperationSaveForm}
				setVisibleSaveForm={setVisibleSaveForm}
				initFormObject={selectObject}
				catalogName={catalogName}
				setReloadTable={setReloadTable}
			/>

			{SaveGroup ?
				<SaveGroup
					title={titleSaveGroup}
					visible={visibleSaveGroup}
					typeOperation={typeOperationSaveGroup}
					setVisibleSaveForm={setVisibleSaveGroup}
					initFormObject={selectObject}
				/>
				: null
			}
		</>
	) : null;
};

CatalogData.propTypes = {};

CatalogData.defaultProps = {};

export default CatalogData;
