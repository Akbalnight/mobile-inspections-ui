import React from 'react';
import {Table} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../../apis/catalog.api';
import {paths} from '../../../../constants/paths';
import {useHistory} from 'react-router';

export const TemplatesTable = () => {
	const history = useHistory();

	const onRouteSelect = ({rowData}: any) =>
		history.push(`${paths.ANALYTICS_MAIN.path}/${rowData.id}`);
	return (
		<>
			<Table
				itemProps={{
					name: 'templatesTable',
				}}
				searchParamName={'name'}
				requestLoadConfig={apiGetConfigByName('analyticReports')}
				requestLoadRows={apiGetFlatDataByConfigName('analyticReports')}
				dispatch={{
					path: 'analytics.templatesTable',
				}}
				subscribe={[
					{
						name: 'actionOnSearch',
						path: 'rtd.analytics.templatesTable.events.onSearch',
						onChange: ({value, reloadTable}) => {
							reloadTable({
								searchValue: value,
							});
						},
					},
				]}
				onRowClick={onRouteSelect}
			/>
		</>
	);
};
