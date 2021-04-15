import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {customColumnProps} from '../tableProps';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import React from 'react';
import {RouteViewModal} from './Modals/ViewModal';

const {Form, FormBody, Table, Button, Space} = classic;
export const Routes = () => {
	return (
		<BasePage>
			<Form>
				<FormBody noPadding={true} scrollable={true}>
					<Space className={'p-8'}>
						<Button>1</Button>
						<RouteViewModal />
					</Space>
					<Table
						customColumnProps={customColumnProps}
						requestLoadRows={apiGetFlatDataByConfigName('routes')}
						requestLoadConfig={apiGetConfigByName('routes')}
						dispatchPath={'routes.mainForm.table'}
					/>
				</FormBody>
			</Form>
		</BasePage>
	);
};
