import React from 'react';
import {Layout, Table, Space} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/application.api';
import {customColumnProps, HistoryTableHeader} from '../tableProps';

export const AnalyticHistory = ({analyticId}: {analyticId: string}) => {
	return (
		<Layout style={{height: '100%'}}>
			<HistoryTableHeader />
			<Table
				rowKey={`id`}
				searchParamName={'name'}
				requestLoadRows={apiGetFlatDataByConfigName(
					'analyticReportsHistory'
				)}
				customColumnProps={customColumnProps}
				requestLoadConfig={apiGetConfigByName('analyticReportsHistory')}
				dispatch={{
					path: 'analytic.historyTable',
				}}
				subscribe={[
					/**Action search*/
					{
						name: 'searchOnTable',
						path: `rtd.analytic.historyTable.events.onSearch`,
						onChange: ({value, reloadTable}) => {
							reloadTable({
								searchValue: value,
							});
						},
					},
					/**Action reload*/
					{
						name: 'onReload',
						path: 'rtd.analytic.historyTable.events.onReload',
						onChange: ({reloadTable}) => {
							reloadTable({});
						},
					},
				]}
			/>
		</Layout>
	);
};
