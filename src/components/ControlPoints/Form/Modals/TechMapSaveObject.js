import {PlusOutlined} from '@ant-design/icons';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../../apis/catalog.api';
import React from 'react';
import {Modal, FormBody, Row, Col, Search, Table} from 'rt-design';

export const TechMapAddModal = () => {
	return (
		<Modal
			toolTipProps={{title: 'Добавить'}}
			buttonProps={{
				type: 'default',
				icon: <PlusOutlined />,
			}}
			modalConfig={{
				width: 700,
				bodyStyle: {height: 650},
				type: 'select',
				title: `Добавить технологическую карту`,
				form: {
					name: 'addModalTechMaps',
					labelCol: {span: 10},
					wrapperCol: {span: 12},
				},
			}}
			dispatch={{
				path: 'controlPoints.form.techMapsTable.select.onSave',
				type: 'event',
			}}
		>
			<FormBody>
				<Row justify={'end'}>
					<Col span={12}>
						<Search
							dispatch={{
								path: 'controlPoints.form.techMapsTable.select.onSearch',
							}}
							className={'mb-8'}
						/>
					</Col>
				</Row>

				<Table
					itemProps={{name: 'techMapsModalTable'}}
					requestLoadRows={({params, data}) =>
						apiGetFlatDataByConfigName('techMaps')({
							params,
							data: {
								...data,
								techMapsStatusId:
									'551d1144-2031-4a10-be2e-60b1a6d48a7e',
							},
						})
					} // только действующие
					requestLoadConfig={apiGetConfigByName('techMaps')}
					subscribe={[
						{
							/** не работает поиск в конфигурации techMaps, нужно изменить настройку. Предлагаю для данной таблицы сделать дополнительный конфиг */
							name: 'onTechMapsSearch',
							path: 'rtd.controlPoints.form.techMapsTable.select.onSearch',
							onChange: ({value, reloadTable}) => {
								reloadTable({
									filter: {name: value},
								});
							},
						},
					]}
					dispatch={{
						path: 'controlPoints.form.techMapsTable.select.table',
					}}
				/>
				<Table
					itemProps={{name: 'techOperations'}}
					requestLoadRows={apiGetFlatDataByConfigName(
						'techOperationsSmall'
					)}
					requestLoadConfig={apiGetConfigByName(
						'techOperationsSmall'
					)}
					defaultFilter={{techMapId: null}}
					subscribe={[
						{
							name: 'onTechMapSelect',
							path: 'rtd.controlPoints.form.techMapsTable.select.table.selected',
							onChange: ({value, reloadTable}) => {
								value &&
									!value.isGroup &&
									reloadTable({
										filter: {
											techMapId: value.id,
										},
									});
							},
						},
					]}
				/>
			</FormBody>
		</Modal>
	);
};
