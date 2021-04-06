import React, {useState} from 'react';
import {Table as AntTablea, Tag as AntTag} from 'antd';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import HeaderCell from './HeaderCell';
import ColumnResizer from 'react-base-table/lib/ColumnResizer';
import {
	CaretDownOutlined,
	CaretRightOutlined,
	CaretUpOutlined,
} from '@ant-design/icons';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
import {code} from '../../Base/customColumnProps';
import {logoutUrl} from 'mobile-inspections-base-ui/lib/constants/auth.constants';

const {Form, Space, Table, Layout, FormBody, Row, Col, Title, Button} = classic;
const DebugTable = (props) => {
	const colStyle = {
		height: '500px',
		width: '50%',
		padding: '16px',
	};

	/**
	 * Base Flat
	 * Base Tree
	 * Flat select
	 * Tree select
	 * Events
	 * Modal edit
	 * Row Edit
	 */

	return (
		<BasePage>
			<Form>
				<FormBody scrollable={true} noPadding={true}>
					<div style={{display: 'flex', flexWrap: 'wrap'}}>
						{/*<Col span={12} style={colStyle}>*/}
						<Layout style={colStyle}>
							<Space>
								<Title label={'Base Flat'} level={3} />
								<Button
									label={'Add row'}
									dispatch={{
										path: 'debugTable.table.1.events.onAdd',
									}}
								/>
							</Space>
							<Table
								type={'rt'}
								size={'small'}
								bordered={true}
								fixWidthColumn={true}
								defaultFilter={{techMapId: null}}
								defaultSortBy={{key: 'name', order: 'asc'}}
								requestLoadRows={apiGetFlatDataByConfigName(
									'routes'
								)}
								requestLoadConfig={apiGetConfigByName('routes')} // detours // routes
								dispatchPath={'debugTable.table.1'}
								subscribe={[
									{
										name: 'onAdd',
										path:
											'rtd.debugTable.table.1.events.onAdd',
										onChange: ({addRow}) => {
											// addRows, addRowAsCopy, editRow, removeRow, moveUpRow, moveDownRow
											const row = {
												id:
													'54efdf8e-998c-4c3d-88e2-07f9cbd69861',
												code: 999,
												name: 'Маршрут Add',
												duration: 999,
											};
											addRow(row);
										},
									},
								]}
								// pageSize={1}
								// pagination={{ position: ['none', 'none'], pageSize: 1 }}

								// columns={columns}
								// dataSource={data}
								// scroll={{ x: true, y: 500 }}
							/>
						</Layout>
						<Layout style={colStyle}>
							<Title label={'Base Tree'} level={3} />
							<Table
								size={'small'}
								// bordered={true}
								requestLoadRows={apiGetHierarchicalDataByConfigName(
									'techMaps'
								)}
								requestLoadConfig={apiGetConfigByName(
									'techMaps'
								)} // detours // routes
								// fixWidthColumn={true}
							/>
						</Layout>
						<Layout style={colStyle}>
							<Title label={'Flat select'} level={3} />
							<Table
								size={'small'}
								bordered={true}
								requestLoadRows={apiGetFlatDataByConfigName(
									'routes'
								)}
								requestLoadConfig={apiGetConfigByName('routes')} // detours // routes
								// pageSize={1}
								// fixWidthColumn={true}
								selectable={true}
								dispatchPath={'debugTable.table.3'}
								footerProps={{
									// leftCustomSideElement: () => (<span>lCustom</span>),
									// centerCustomSideElement: () => (<span>cCustom</span>),
									// rightCustomSideElement: () => (<span>rCustom</span>),
									showElements: ['selected', 'loaded'],
								}}
							/>
						</Layout>
						<Layout style={colStyle}>
							<Title label={'Tree select'} level={3} />

							<Table
								size={'small'}
								// bordered={true}
								fixWidthColumn={true}
								// expandDefaultAll={false}
								customColumnProps={[{...code}]}
								requestLoadRows={apiGetHierarchicalDataByConfigName(
									'techMaps'
								)}
								requestLoadConfig={apiGetConfigByName(
									'techMaps'
								)} // detours // routes
								// fixWidthColumn={true}
								selectable={true}
								dispatchPath={'debugTable.table.4'}
							/>
						</Layout>
					</div>
				</FormBody>
			</Form>
		</BasePage>
	);
};

export default DebugTable;
