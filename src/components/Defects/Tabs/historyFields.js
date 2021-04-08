import {
	apiGetConfigByName,
	// apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {classic} from 'rt-design';
import React from 'react';

const {Layout, Table} = classic;
export const HistoryFields = () => {
	return (
		<Layout className={'p-8'}>
			<Table
				style={{height: '300px'}}
				itemProps={{name: 'defectHistory'}}
				// requestLoadRows={apiGetFlatDataByConfigName(
				//     'defectHistory'
				// )}
				requestLoadConfig={apiGetConfigByName('defectHistory')}
			/>
		</Layout>
	);
};
// export const historyFields = () => {
//     return {
//         componentType: 'Layout',
//         className: 'p-8',
//         children: [
//             {
//                 componentType: 'Item',
//                 child: {
//                     componentType: 'Title',
//                     className: 'ml-8',
//                     label: 'История изменений',
//                     level: 4,
//                 },
//             },
//             {
//                 componentType: 'Item',
//                 child: {
//                     componentType: 'Table',
//                     // dispatchPath:
//                     // 	'defects.defectTable.modal.infoEquipment.table',
//                     requestLoadRows: apiGetFlatDataByConfigName(
//                         'defectHistory'
//                     ),
//                     requestLoadConfig: apiGetConfigByName('defectHistory'),
//                 },
//             },
//         ],
//     };
// };
