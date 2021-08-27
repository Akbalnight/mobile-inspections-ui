import {Modal, FormBody, Text, Title, Layout, Table} from 'rt-design';
import React from 'react';
import {apiGetConfigByName} from '../../../../apis/catalog.api';
import {selectRowsById} from '../../../Base/Functions/TableSelectById';

/**
 * Control Point Table view object modal
 * */
export const ViewModal = () => {
	let sRow;
	const loadData = async (callBack, row) => {
		sRow = {...row};
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
				type: 'view',
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
					path: 'rtd.routes.form.controlPointsTable.events.onRowDoubleClick',
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
