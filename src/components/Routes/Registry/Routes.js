import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {customColumnProps} from '../tableProps';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import React from 'react';

const {Form, FormBody, Table, Button, Space} = classic;
export const Routes = () => {
	return (
		<BasePage>
			<Form>
				<FormBody noPadding={true} scrollable={true}>
					<Space>
						<Button>1</Button>
					</Space>
					<Table
						customColumnProps={customColumnProps}
						requestLoadRows={apiGetFlatDataByConfigName('routes')}
						requestLoadConfig={apiGetConfigByName('routes')}
					/>
				</FormBody>
			</Form>
		</BasePage>
	);
};
