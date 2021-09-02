import React from 'react';
import {Table} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../../apis/catalog.api';

export const TemplatesTable = () => {
	return (
		<>
			<Table
				requestLoadConfig={apiGetConfigByName('analyticTemplates')}
				requestLoadRows={apiGetFlatDataByConfigName(
					'analyticTemplates'
				)}
			/>
		</>
	);
};
