import {classic} from 'rt-design';
import React from 'react';
import {apiGetConfigByName} from '../../../../apis/catalog.api';
import {selectRowsById} from '../../../Base/Functions/TableSelectById';

const {Modal, FormBody, Text, Title, Layout, Table} = classic;
export const ViewControlPointModal = () => {
	let sRow;
	const loadData = async (callBack, row) => {
		sRow = {...row};
		console.log(sRow);
		const equipmentsByIdResponse = await selectRowsById(
			'controlPointsEquipments',
			'controlPointId',
			sRow.controlPointId
		)({});
		if (equipmentsByIdResponse.status === 200)
			sRow = {
				...sRow,
				equipments: equipmentsByIdResponse.data,
			};
		const texhOperationsByIdResponse = await selectRowsById(
			'techOperationsSmall',
			'techMapId',
			sRow.techMapId
		)({});
		if (texhOperationsByIdResponse.status === 200)
			sRow = {
				...sRow,
				techOperations: texhOperationsByIdResponse.data,
			};

		callBack(sRow);
	};
	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title: 'Контрольная точка',
				width: 800,
				bodyStyle: {height: 700},
				form: {
					name: 'controlPointsDataView',
					loadInitData: loadData,
				},
			}}
			subscribe={[
				{
					name: 'openViewModal',
					path:
						'rtd.routes.routeForm.controlPointsTable.table.events.onRowDoubleClick',
					onChange: ({value, setModalData, openModal}) => {
						value &&
							setModalData &&
							setModalData({
								...value.value,
							});
						value && openModal();
					},
				},
			]}
		>
			<FormBody>
				<Text
					itemProps={{
						name: 'controlPointName',
						label: 'Наименование',
						className: 'mb-0',
					}}
				/>
				<Title level={5} label={'Оборудование'} className={'my-16'} />
				<Layout>
					<Table
						itemProps={{name: 'equipments'}}
						requestLoadConfig={apiGetConfigByName(
							'controlPointsEquipments'
						)}
					/>
				</Layout>
				<Text
					itemProps={{
						name: 'techMapName',
						label: 'Технологическая карта',
						className: 'mb-0 mt-16',
					}}
				/>
				<Title
					level={5}
					label={'Технологические операции'}
					className={'my-16'}
				/>
				<Layout>
					<Table
						itemProps={{name: 'techOperations'}}
						requestLoadConfig={apiGetConfigByName(
							'techOperationsSmall'
						)}
					/>
				</Layout>
			</FormBody>
		</Modal>
	);
};
