import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {customColumnProps, TableHeader} from '../tableProps';
import React from 'react';

const {Form, FormBody, Table} = classic;
export const DetoursMain = () => {
	return (
		<BasePage>
			<Form>
				<FormBody noPadding={true}>
					<TableHeader />
					<Table
						selectable={true}
						fixWidthColumn={true}
						dispatchPath={'detours.mainForm.table'}
						customColumnProps={customColumnProps}
						requestLoadRows={apiGetFlatDataByConfigName('detours')}
						requestLoadConfig={apiGetConfigByName('detours')}
					/>
				</FormBody>
			</Form>
		</BasePage>
	);
};
