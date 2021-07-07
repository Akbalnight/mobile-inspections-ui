import {Form, FormBody, Table} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import React from 'react';
import {DrawerChoose, TableHeaderAnalytics} from '../tableProps';
import {Access} from 'mobile-inspections-base-ui';

export const Analytics = (props) => {
	const {analyticName} = props;
	return (
		<Form>
			<FormBody noPadding={true} name={'analyticRegistrySide'}>
				<TableHeaderAnalytics analyticName={analyticName} />
				<Table
					requestLoadRows={apiGetFlatDataByConfigName(
						`${analyticName}`
					)}
					requestLoadConfig={apiGetConfigByName(`${analyticName}`)}
				/>
				<Access
					roles={[
						'ROLE_ADMIN',
						'ROLE_MI_ADMIN',
						'ROLE_MI_SHIFT_SUPERVISOR',
					]}
				>
					{analyticName === 'constructorReports' ? (
						<DrawerChoose analyticName={analyticName} />
					) : null}
				</Access>
			</FormBody>
		</Form>
	);
};
