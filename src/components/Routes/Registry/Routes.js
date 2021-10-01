import {BasePage} from 'mobile-inspections-base-ui';
import {Form, FormBody, Table} from 'rt-design';
import {customColumnProps, MainTableHeader} from '../tableProps';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/application.api';
import React from 'react';

export const Routes = ({match: {title}}) => {
	return (
		<BasePage title={title}>
			<Form>
				<FormBody noPadding={true} scrollable={false}>
					<MainTableHeader />
					<Table
						infinityMode={true}
						customColumnProps={customColumnProps}
						searchParamName={'name'}
						requestLoadRows={apiGetFlatDataByConfigName('routes')}
						requestLoadConfig={apiGetConfigByName('routes')}
						dispatch={{path: 'routes.table'}}
						subscribe={[
							{
								name: 'onSearch',
								path: 'rtd.routes.table.events.onSearch',
								onChange: ({value, reloadTable}) => {
									reloadTable({
										searchValue: value,
									});
								},
							},
							{
								name: 'onReload',
								path: 'rtd.routes.table.events.onReload',
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
