import {BasePage} from 'mobile-inspections-base-ui';
import {Form, FormBody, Table} from 'rt-design';
import {customColumnProps, MainTableHeader} from '../tableProps';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import React from 'react';

export const Routes = () => {
	return (
		<BasePage>
			<Form>
				<FormBody noPadding={true} scrollable={true}>
					<MainTableHeader />
					<Table
						infinityMode={true}
						customColumnProps={customColumnProps}
						searchParamName={'name'}
						requestLoadRows={apiGetFlatDataByConfigName('routes')}
						requestLoadConfig={apiGetConfigByName('routes')}
						dispatch={{path: 'routes.mainForm.table'}}
						subscribe={[
							{
								name: 'onSearch',
								path:
									'rtd.routes.mainForm.table.events.onSearch',
								onChange: ({value, reloadTable}) => {
									reloadTable({
										searchValue: value,
									});
								},
							},
							{
								name: 'onReload',
								path:
									'rtd.routes.mainForm.table.events.onReload',
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},
						]}
					/>
				</FormBody>
			</Form>
		</BasePage>
	);
};
