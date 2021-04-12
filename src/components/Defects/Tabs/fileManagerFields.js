import {apiGetConfigByName} from '../../../apis/catalog.api';
import {classic} from 'rt-design';
import React from 'react';

const {Layout, Table} = classic;
/**
 * нужно будет переделать и получать данные по определенному дефекту
 * связть public.files и  public.defects
 */
export const FilesFields = () => {
	return (
		<Layout className={'p-8'}>
			<Table
				itemProps={{name: 'defectFiles'}}
				// строки формируются в loadData модалки
				requestLoadConfig={apiGetConfigByName('defectFiles')}
			/>
		</Layout>
	);
};
