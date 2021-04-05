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

const {Form, Space, AntTable, Layout, FormBody, Row, Col, Title} = classic;
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
							<Title label={'Base Flat'} level={3} />
							<AntTable
								size={'small'}
								bordered={true}
								requestLoadRows={apiGetFlatDataByConfigName(
									'routes'
								)}
								requestLoadConfig={apiGetConfigByName('routes')} // detours // routes
								// pageSize={1}
								// pagination={{ position: ['none', 'none'], pageSize: 1 }}

								// columns={columns}
								// dataSource={data}
								// scroll={{ x: true, y: 500 }}
							/>
						</Layout>
						<Layout style={colStyle}>
							<Title label={'Base Tree'} level={3} />
							<AntTable
								size={'small'}
								bordered={true}
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
							<AntTable
								size={'small'}
								bordered={true}
								requestLoadRows={apiGetFlatDataByConfigName(
									'routes'
								)}
								requestLoadConfig={apiGetConfigByName('routes')} // detours // routes
								pageSize={1}
								// fixWidthColumn={true}
								selectable={true}
								rowSelection={{
									type: 'checkbox',
								}}
							/>
						</Layout>
						<Layout style={colStyle}>
							<AntTable
								size={'small'}
								bordered={true}
								requestLoadRows={apiGetHierarchicalDataByConfigName(
									'techMaps'
								)}
								requestLoadConfig={apiGetConfigByName(
									'techMaps'
								)} // detours // routes
								// fixWidthColumn={true}
								selectable={true}
								rowSelection={{
									type: 'checkbox',
								}}
							/>
						</Layout>
					</div>
				</FormBody>
			</Form>
		</BasePage>
	);
};

export default DebugTable;
