// import {apiGetConfigByName} from '../../../apis/catalog.api';
import {classic} from 'rt-design';
import React from 'react';
import {AttachmentsPreview} from '../../Base/Functions/MediaUtils';

const {Layout, Custom} = classic;
/**
 * нужно будет переделать и получать данные по определенному дефекту
 * связть public.files и  public.defects
 */

export const FilesFields = () => {
	return (
		<Layout className={'p-8'}>
			<Custom
				itemProps={{name: 'defectFiles'}}
				render={(props) => {
					// console.log('At props', props)
					return <AttachmentsPreview items={props.value} />;
				}}
			/>
			{/*<Table*/}
			{/*    itemProps={{name: 'defectFiles'}}*/}
			{/*    // строки формируются в loadData модалки*/}
			{/*    requestLoadConfig={apiGetConfigByName('defectFiles')}*/}
			{/*/>*/}
		</Layout>
	);
};
