import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {AdvancedTable} from 'rt-design';
import {Checkbox, Button, Modal} from 'antd';
import {toDDMMYYYYdot} from "../../utils/datesUtils";
import {
    apiGetConfigByName,
    apiGetDataByConfigName,
} from '../../apis/catalog.api';

const TechMapDataView = props => {

	const [loadingConfig, setLoadingConfig] = useState(false);
	const [techOperationsConfig, setTechOperationsConfig] = useState({});

	const {
		title,
		visible,
		setVisible,
		rowData,
	} = props;

	useEffect(() => {
		if(visible) {
			setLoadingConfig(true);
			loadForm();
		}
	}, [visible]);

	async function loadForm() {
		try {
			const toConfig = await apiGetConfigByName({configName: 'techOperations'});
			setTechOperationsConfig(toConfig.data);
			setLoadingConfig(false);
		} catch (error) {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			}
		}
	}

	const customCellRenders = [
		{
			name: 'code',
			cellRender: ({ rowData }) => String(rowData.code).padStart(8,'0')
		},
		{ //equipmentStop increasedDanger
			name: 'needInputData',
			cellRender: ({ rowData }) => <Checkbox defaultChecked={rowData.needInputData} disabled />
		},
		{
			name: 'equipmentStop',
			cellRender: ({ rowData }) => <Checkbox defaultChecked={rowData.equipmentStop} disabled />
		},
		{
			name: 'increasedDanger',
			cellRender: ({ rowData }) => <Checkbox defaultChecked={rowData.increasedDanger} disabled />
		},
		{
			name: 'duration',
			cellRender: ({cellData}) => `${cellData} мин.`
		}
	];


	return (
		<Modal
			title={title}
			centered
			visible={visible}
			okText='Ок'
			onCancel={() => setVisible(false)}
			onOk={() => setVisible(false)}
			width={'1000px'}
			className={'TechMap-InfoModal'}
			footer={[
				<Button key={'ok'} type="primary" onClick={() => setVisible(false)}>
					Oк
				</Button>,
			]}
		>
			{/*<div className={'tmTitle'}>Информация о технологической карте</div>*/}
			<div>
				<div className={'InfoTitle'}>Описание</div>
				<div className={'InfoItem'}>
					<div>Наименование</div>
					<div>{rowData.name}</div>
				</div>
				<div className={'InfoItem'}>
					<div>Код</div>
					<div>{rowData.code}</div>
				</div>
				<div className={'InfoItem'}>
					<div>Действует с</div>
					<div>{toDDMMYYYYdot(rowData.dateStart)}</div>
				</div>
				<div className={'InfoItem'}>
					<div>Статус</div>
					<div>{rowData.techMapsStatusName}</div>
				</div>
				<div className={'InfoItem'}>
					<div>Группа</div>
					<div>{rowData.parentName}</div>
				</div>
			</div>

			<div className={'InfoTitle'} style={{ marginTop: '30px'}}>Технологические операции</div>
			<div style={{height: '300px'}}>
				{!loadingConfig ? (
					<AdvancedTable
						configData={techOperationsConfig}
						customCellRenders={customCellRenders}
						type={'serverSide'}
						headerHeight={50}
						requestLoadRows={({data, params}) =>
							apiGetDataByConfigName({
								configName: 'techOperations',
								hierarchical: false,
								lazyLoad: false,
								data: {...data, techMapId: rowData.id},
								params
							})
						}
					/>
				) : null}
			</div>
		</Modal>
	);
};

TechMapDataView.propTypes = {
	title: PropTypes.string,
	visible: PropTypes.bool,
	setVisible: PropTypes.func,
	rowData: PropTypes.object,
};


export default TechMapDataView;
