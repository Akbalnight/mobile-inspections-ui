import React from 'react';
import { useHistory } from 'react-router';
import {Layout, Table, Space} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/application.api';
import { paths } from '../../../constants/paths';
import {customColumnProps, HistoryTableHeader} from '../tableProps';

export const AnalyticHistory:React.FC<{analyticId: string}> = ({analyticId}) => {

  const history = useHistory()


	return (
		<Layout style={{height: '100%'}}>
			<HistoryTableHeader />
			<Table
				rowKey={`id`}
				searchParamName={'name'}
        fixWidthColumn={true}
				defaultFilter={{
					reportId: analyticId,
				}}
        onRowClick={({rowData})=> history.push(paths.ANALYTICS_MAIN.path+'/'+analyticId+'/report/'+rowData.id)}
				requestLoadRows={apiGetFlatDataByConfigName(
					'analyticReportsHistory'
				)}
				customColumnProps={customColumnProps}
				requestLoadConfig={apiGetConfigByName('analyticReportsHistory')}
				dispatch={{
					path: 'analytics.historyTable',
				}}
				subscribe={[
					/**Action search*/
					{
						name: 'searchOnTable',
						path: `rtd.analytics.historyTable.events.onSearch`,
						onChange: ({value, reloadTable}) => {
							reloadTable({
								searchValue: value,
								filter: {
									reportId: analyticId ? analyticId : null,
								},
							});
						},
					},
					/**Action reload*/
					{
						name: 'onReload',
						path: 'rtd.analytics.historyTable.events.onReload',
						onChange: ({value, reloadTable}) => {
							reloadTable({
								filter: {
									reportId: analyticId ? analyticId : null,
								},
							});
						},
					},
					/**Action apply filter*/
					{
						name: 'onApplyFilter',
						path: 'rtd.analytics.historyTable.events.onApplyFilter',
						onChange: ({value, reloadTable}) => {
							reloadTable({
								filter: {...value?.extraData, reportId: analyticId},
							});
						},
					},
					/** Action reload by add new report */
					{
						name: 'actionReload',
						path: 'rtd.analytics.form.events.onReload',
						onChange: ({reloadTable}) => {
							reloadTable({
								filter: {
									reportId: analyticId,
								},
							});
						},
					},
				]}
			/>
		</Layout>
	);
};
