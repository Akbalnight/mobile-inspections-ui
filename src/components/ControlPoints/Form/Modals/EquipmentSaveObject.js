import {PlusOutlined} from '@ant-design/icons';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../../../apis/catalog.api';
import React from 'react';
import {classic} from 'rt-design';

const {Modal, FormBody, Row, Col, Table, Search} = classic;
export const EquipmentAddModal = () => {
	return (
		<Modal
			toolTipProps={{title: 'Добавить'}}
			buttonProps={{
				type: 'default',
				icon: <PlusOutlined />,
			}}
			modalConfig={{
				type: 'select',
				width: 750,
				bodyStyle: {height: 650},
				title: `Добавить оборудование`,
				form: {
					name: 'addModalEquipment',
					labelCol: {span: 10},
					wrapperCol: {span: 12},
				},
			}}
			dispatch={{
				path:
					'controlPoints.controlPointForm.equipments.addModal.onSave',
				type: 'event',
			}}
		>
			<FormBody>
				<Row justify={'end'}>
					<Col span={12}>
						<Search
							dispatch={{
								path:
									'controlPoints.controlPointForm.equipments.addModal.onSearch',
							}}
							className={'mb-8'}
						/>
					</Col>
				</Row>
				<Table
					itemProps={{name: 'equipmentsModalTable'}}
					type={'rt'}
					fixWidthColumn={true}
					selectable={true}
					requestLoadRows={apiGetHierarchicalDataByConfigName(
						'equipments'
					)}
					requestLoadConfig={apiGetConfigByName('equipments')}
					subscribe={[
						{
							name: 'onControlPointsSearch',
							path:
								'rtd.controlPoints.controlPointForm.equipments.addModal.onSearch',
							onChange: ({value, reloadTable}) => {
								reloadTable({
									filter: {name: value},
								});
							},
						},
					]}
					dispatch={{
						path:
							'controlPoints.controlPointForm.equipments.addModal.table',
					}}
				/>
			</FormBody>
		</Modal>
	);
};
