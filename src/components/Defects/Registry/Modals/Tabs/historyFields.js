import {apiGetConfigByName} from '../../../../../apis/application.api';
import {Layout, Table} from 'rt-design';
import React from 'react';
import {customColumnProps} from '../../../tableProps';
import {HistoryOutlined} from '@ant-design/icons';

export const HistoryTabFields = () => {
	return (
		<Layout className={'p-8'}>
			<Table
				itemProps={{name: 'defectHistory'}}
				customColumnProps={customColumnProps}
				defaultSortBy={{
					key: 'ts',
					order: 'asc',
				}}
				// строки формируются в loadData модалки
				requestLoadConfig={apiGetConfigByName('defectHistory')}
			/>
		</Layout>
	);
};

export const HistoryTab = () => {
	return (
		<span role='img' aria-label='project' className='anticon pane'>
			<HistoryOutlined />
			<p>История изменений</p>
		</span>
	);
};
