import React, {useEffect, useState} from 'react';
import {
	apiGetConfigByName,
	apiGetDataByConfigName
} from '../../apis/catalog.api';
import {AdvancedTable} from 'rt-design';
import { FolderOutlined, ToolOutlined } from '@ant-design/icons';

const CatalogData = props => {
	const [mounted, setMounted] = useState(false);
	const [configData, setConfigData] = useState({});

	const [titleSaveForm, setTitleSaveForm] = useState("");
	const [typeOperationSaveForm, setTypeOperationSaveForm] = useState("");
	const [visibleSaveForm, setVisibleSaveForm] = useState(false);

	const [titleSaveGroup, setTitleSaveGroup] = useState("");
	const [typeOperationSaveGroup, setTypeOperationSaveGroup] = useState("");
	const [visibleSaveGroup, setVisibleSaveGroup] = useState(false);

	const [selectObject, setSelectObject] = useState({});

	/** Ссылка на объект таблицы */
	// let tableRef = React.createRef();
	/** Ссылка на объект таблицы */
	const [tableRef, setTableRef] = useState({});
	// const [reloadTable, setReloadTable] = useState(false);

	const [defaultSort, setDefaultSort] = useState({});

	const {catalogName, SaveForm, SaveGroup} = props;

	const _setTableRef = (ref) => setTableRef(ref);

	useEffect(() => {
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
	}, [catalogName, mounted]);

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
				ref={_setTableRef}
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
                defaultSortBy={defaultSort}
				// section={'BaseTableServerData'}
				type={'serverSide'}

				// centerCustomSideElement={<Button onClick={() => setReloadTable(true)}>Hard reload</Button>}
                commandPanelProps={{
                    onClickAdd: onClickAddHandler,
                    onClickAddGroup: onClickAddGroupHandler,
                    onClickEdit: onClickEditHandler,
                    onClickDelete: (event, selectedRowKeys) => console.log('selectedRowKeys catalog', selectedRowKeys),
                    showElements: [
                            'add',
                            'addGroup',
                            'edit',
                            'delete',
                    ]
                }}

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
				setReloadTable={tableRef && tableRef.reloadData} // onClickUpHandler.bind(tableRef)
			/>

			{SaveGroup ?
				<SaveGroup
					title={titleSaveGroup}
					visible={visibleSaveGroup}
					typeOperation={typeOperationSaveGroup}
					setVisibleSaveForm={setVisibleSaveGroup}
					initFormObject={selectObject}
					setReloadTable={tableRef && tableRef.reloadData}
				/>
				: null
			}
		</>
	) : null;
};

CatalogData.propTypes = {};

CatalogData.defaultProps = {};

export default CatalogData;
