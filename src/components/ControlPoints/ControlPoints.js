import React, {useState, useEffect} from 'react';
import {
	apiGetConfigByObject,
	apiGetDataByConfigName
} from '../../apis/catalog.api';
import {useHistory, useLocation} from 'react-router';
import BasePage from '../App/BasePage';
import {paths} from '../../constants/paths';
import {AdvancedTable} from 'rt-design';
// import TechMapDataView from "../../TechMaps/TechMapDataView";
import GroupViewModal from '../Base/GroupViewModal';
import {default as ControlPointsGroupEdit} from '../Catalog/Forms/BaseModals/BaseModalWithParentId';
import {Button} from 'antd';

const ControlPoints = props => {
	/** Базовый стэйт формы */
	const [mounted, setMounted] = useState(false);
	const [configData, setConfigData] = useState({});

	/** Ссылка на объект таблицы */
	const [tableRef, setTableRef] = useState({});
	const _setTableRef = ref => setTableRef(ref);

	/** Общие состояния для модалок */
	const [titleModal, setTitleModal] = useState('');
	const [typeOperationModal, setTypeOperationModal] = useState('');

	const [visibleGroupSaveForm, setVisibleGroupSaveForm] = useState(false);
	const [visibleGroupViewForm, setVisibleGroupViewForm] = useState(false);

	const [selectedItem, setSelectedItem] = useState({});

	let {pathname} = useLocation();
	let history = useHistory();

	useEffect(() => {
		if (!mounted) {
			// console.log('loadConfig -> setConfigData');
			apiGetConfigByObject({configName: 'controlPoints'})
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
			cellRender: ({rowData}) => String(rowData.code).padStart(8, '0')
		}
	];

	const onClickAddHandler = () => {
		history.push(`${paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.path}/new`);
	};

	const onClickAddGroupHandler = () => {
		setTitleModal(`Создание группы контрольных точек`);
		setTypeOperationModal('create');
		setSelectedItem({});
		setVisibleGroupSaveForm(true);
	};

	const onClickEditHandler = (event, {rowData}) => {
		if (rowData.isGroup) {
			setTitleModal(`Изменение группы контрольных точек ${rowData.code}`);
			setTypeOperationModal('update');
			setSelectedItem(rowData);
			setVisibleGroupSaveForm(true);
		} else {
			history.push(
				`${paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.path}/${rowData.id}`
			);
		}
	};

	const onRowDoubleClickHandler = ({rowData}) => {
		if (rowData.isGroup) {
			setTitleModal(`Группа технологических карт ${rowData.code}`);
			setVisibleGroupViewForm(true);
		} else {
			// setTitleViewForm(`Технологическая карта ${rowData.code}`);
			// setVisibleDataViewForm(true);
		}
		setSelectedItem(rowData);
	};

	const onClickAddModeCardHandler = () => {
		console.log('tableRef => ', tableRef);
		tableRef.reloadData({
			filter: {
				typePointCodes: ['02']
			}
		});
	};

	const pathNameSplitted = pathname.split('/');
	if (mounted) {
		return (
			<BasePage
				path={
					pathNameSplitted.length > 3
						? paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.path
						: null
				}
			>
				<AdvancedTable
					ref={_setTableRef}
					autoDeleteRows={false}
					configData={configData}
					defaultSelectedRowKeys={
						pathNameSplitted.length > 3 ? [pathNameSplitted[3]] : []
					}
					customCellRenders={customCellRenders}
					expandDefaultAll={true}
					fixWidthColumn={false}
					type={'infinity'}
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
						rightCustomSideElement: (
							<Button
								type='primary'
								onClick={onClickAddModeCardHandler}
							>
								Yf;vb
							</Button>
						),
						showElements: ['add', 'addGroup', 'edit']
					}}
				/>
				<ControlPointsGroupEdit
					title={titleModal}
					visible={visibleGroupSaveForm}
					typeOperation={typeOperationModal}
					setVisibleSaveForm={setVisibleGroupSaveForm}
					initFormObject={selectedItem}
					catalogName={'controlPoints'}
					setReloadTable={tableRef && tableRef.reloadData}
				/>
				<GroupViewModal
					title={titleModal}
					visible={visibleGroupViewForm}
					setVisible={setVisibleGroupViewForm}
					rowData={selectedItem}
				/>
			</BasePage>
		);
	} else return null;
};

ControlPoints.propTypes = {};

export default ControlPoints;
