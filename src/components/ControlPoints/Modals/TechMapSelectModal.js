import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName
} from '../../../apis/catalog.api';
import {Button, Modal} from 'antd';
import {AdvancedTable} from 'rt-design';

const TechMapSelectModal = props => {
	/** Ссылка на объект таблицы */
	const [tableRef, setTableRef] = useState({});
	const _setTableRef = ref => setTableRef(ref);

	// const [tableConfig, setTableConfig] = useState({});
	// const [secondTableConfig, setSecondTableConfig] = useState({});

	const [secondTableRows, setSecondTableRows] = useState([]);

	const [techMapSelected, setTechMapSelected] = useState(null);

	const [errorSelect, setErrorSelect] = useState({
		text: '',
		style: {
			display: 'none',
			float: 'left',
			lineHeight: '32px',
			color: 'red',
			fontSize: '13px'
		}
	});

	const {visible, setVisible, onSelect} = props;

	useEffect(() => {
		if (visible) {
			apiGetConfigByName('techMaps')().then(() => {
				// setTableConfig(response.data);
			});
			apiGetConfigByName('techOperationsSmall')().then(() => {
				// let result = response.data;
				// setSecondTableConfig(result);
			});

			setErrorSelect({
				...errorSelect,
				style: {...errorSelect.style, display: 'none'}
			});
			setTechMapSelected(null);
			setSecondTableRows([]);
			tableRef && tableRef.reloadData && tableRef.reloadData({});
			// console.log("Done load configs");
		}
	}, [errorSelect, tableRef, visible]);

	const onSelectTechMap = () => {
		if (techMapSelected) {
			if (techMapSelected.isGroup) {
				// console.log("Selected group", equipmentsSelected);
				setErrorSelect({
					...errorSelect,
					text:
						'Вы не можете добавить группу. Выберете технологическую карту.',
					style: {...errorSelect.style, display: 'inline-block'}
				});
			} else {
				// console.log("Selected equipment", equipmentsSelected);
				onSelect(techMapSelected);
				setVisible(false);
			}
		} else {
			// console.log("Error selected equipment", equipmentsSelected);
			setErrorSelect({
				...errorSelect,
				text: 'Вы ничего не выбрали. Выберете технологическую карту.',
				style: {...errorSelect.style, display: 'inline-block'}
			});
		}
	};

	const onCancel = () => setVisible(false);

	const customCellRenders = [
		{
			name: 'code',
			cellRender: ({rowData}) => String(rowData.code).padStart(8, '0')
		}
	];

	return (
		<Modal
			title='Выбор технологической карты'
			centered
			width={700}
			visible={visible}
			onOk={onSelectTechMap}
			onCancel={onCancel}
			footer={[
				<span key='error' style={errorSelect.style}>
					{errorSelect.text}
				</span>,
				<Button key='cancel' onClick={onCancel}>
					Отмена
				</Button>,
				<Button key='add' type='primary' onClick={onSelectTechMap}>
					Добавить
				</Button>
			]}
		>
			<div style={{height: '400px'}}>
				<AdvancedTable
					ref={_setTableRef}
					// configData={tableConfig}
					expandDefaultAll={true}
					fixWidthColumn={false}
					type={'serverSide'}
					searchParamName={'name'}
					requestLoadRows={apiGetHierarchicalDataByConfigName(
						'techMaps'
					)}
					requestLoadConfig={apiGetConfigByName('techMaps')}
					onRowClick={({rowData}) => {
						setTechMapSelected(rowData);
						apiGetFlatDataByConfigName('techOperationsSmall')({
							data: {techMapId: rowData.id}
						}).then(response => {
							setSecondTableRows(response.data);
						});
					}}
					commandPanelProps={{
						showElements: ['search']
					}}
				/>
			</div>
			<div style={{height: '200px', marginTop: '24px'}}>
				<AdvancedTable
					// configData={secondTableConfig}
					customCellRenders={customCellRenders}
					rows={secondTableRows}
					type={'localSide'}
					requestLoadConfig={apiGetConfigByName(
						'techOperationsSmall'
					)}
				/>
			</div>
		</Modal>
	);
};

TechMapSelectModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired
};

export default TechMapSelectModal;
