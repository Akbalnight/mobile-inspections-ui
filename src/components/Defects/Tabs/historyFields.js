import {apiGetConfigByName} from '../../../apis/catalog.api';
import {classic} from 'rt-design';
import React from 'react';
import {customColumnProps} from '../tableProps';

const {Layout, Table} = classic;
export const HistoryFields = () => {
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
