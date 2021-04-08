import {
	apiGetConfigByName,
	// apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
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
				// style={{height: '300px'}}
				itemProps={{name: 'defectFiles'}}
				// requestLoadRows={apiGetFlatDataByConfigName(
				//     'defectHistory'
				// )}
				requestLoadConfig={apiGetConfigByName('defectFiles')}
			/>
		</Layout>
	);
};
// export const fileManagerFields = (defectSearchId) => {
// 	// console.log('defectSearchId')
// 	return {
// 		componentType: 'Layout',
// 		className: 'ml-16',
// 		children: [
// 			{
// 				componentType: 'Item',
// 				name: 'name',
// 				child: {
// 					componentType: 'Title',
// 					level: 5,
// 				},
// 			},
//
// 			{
// 				componentType: 'Item',
// 				className: 'p-8',
// 				child: {
// 					componentType: 'Table',
// 					requestLoadConfig: apiGetConfigByName('defectFiles'),
// 					// requestLoadRows: apiGetFlatDataByConfigName(
// 					//     'defectFiles' // для макета, нужно поменять
// 					// ),
// 					requestLoadRows: selectRowsById(
// 						'defectFiles',
// 						'defectId',
// 						defectSearchId
// 					),
// 					subscribe: [
// 						{
// 							name: 'defectFilesModalTable',
// 							// path: 'rtd.defects.defectTable.table.events.onRowDoubleClick',
// 							path:
// 								'rtd.defects.defectsTable.modalViewObject.event',
// 							extraData:
// 								'rtd.defects.defectTable.table.events.onRowDoubleClick',
// 							onChange: ({extraData, reloadTable}) => {
// 								if (extraData && extraData.id)
// 									reloadTable({
// 										filter: {defectId: extraData.id},
// 									});
// 								else console.log('not subscribed');
// 							},
// 						},
// 					],
//
// 					// filter: {defectId: defectSearchId}
// 					// defectId
// 				},
// 			},
// 		],
// 	};
// };
