import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, notification, Button} from 'antd';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName
} from '../../apis/catalog.api';
import {AdvancedTable} from 'rt-design';

const EquipmentSelectModal = props => {
	/** Ссылка на объект таблицы */
	const [tableRef, setTableRef] = useState({});
	const _setTableRef = ref => setTableRef(ref);

	const [tableConfig, setTableConfig] = useState({});

	const [equipmentsSelected, setEquipmentsSelected] = useState(null);

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
			apiGetConfigByName('equipmentsAutoQuery')()
				.then(response => {
					setTableConfig(response.data);
					setEquipmentsSelected(null);

					// var newError = Object.assign({}, errorSelect);
					// newError.style.display = 'none';
					setErrorSelect({
						...errorSelect,
						style: {...errorSelect.style, display: 'none'}
					});

					tableRef && tableRef.reloadData && tableRef.reloadData();
				})
				.catch(error => {
					console.log('error -> ', error);
					notification.error({
						message: 'Произошла ошибка получения конфигурации'
					});
				});
		}
	}, [errorSelect, tableRef, visible]);

	const onSelectEquipment = () => {
		if (equipmentsSelected) {
			if (equipmentsSelected.isGroup) {
				// console.log("Selected group", equipmentsSelected);
				setErrorSelect({
					...errorSelect,
					text:
						'Вы не можете добавить группу. Выберете оборудование.',
					style: {...errorSelect.style, display: 'inline-block'}
				});
			} else {
				// console.log("Selected equipment", equipmentsSelected);
				onSelect(equipmentsSelected);
				setVisible(false);
			}
		} else {
			// console.log("Error selected equipment", equipmentsSelected);
			setErrorSelect({
				...errorSelect,
				text: 'Вы ничего не выбрали. Выберете оборудование.',
				style: {...errorSelect.style, display: 'inline-block'}
			});
		}
	};

	const onCancel = () => setVisible(false);

	return (
		<Modal
			title='Выбор оборудования'
			centered
			width={700}
			visible={visible}
			onOk={onSelectEquipment}
			onCancel={onCancel}
			footer={[
				<span key='error' style={errorSelect.style}>
					{errorSelect.text}
				</span>,
				<Button key='cancel' onClick={onCancel}>
					Отмена
				</Button>,
				<Button key='add' type='primary' onClick={onSelectEquipment}>
					Добавить
				</Button>
			]}
		>
			<div style={{height: '600px'}}>
				<AdvancedTable
					ref={_setTableRef}
					configData={tableConfig}
					expandDefaultAll={true}
					fixWidthColumn={false}
					type={'serverSide'}
					searchParamName={'name'}
					requestLoadRows={apiGetHierarchicalDataByConfigName(
						'equipmentsAutoQuery'
					)}
					requestLoadConfig={apiGetConfigByName(
						'equipmentsAutoQuery'
					)}
					onRowClick={({rowData}) => setEquipmentsSelected(rowData)}
					commandPanelProps={{
						// onClickAdd: onClickAddHandler,
						showElements: ['search']
					}}
				/>
			</div>
		</Modal>
	);
};

EquipmentSelectModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired
};

export default EquipmentSelectModal;
