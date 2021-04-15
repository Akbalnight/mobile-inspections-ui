import {classic} from 'rt-design';
import React from 'react';
import {itemsInfo} from '../../../../constants/dictionary';
import {duration} from '../../../Base/customColumnProps';
import {apiGetConfigByName} from '../../../../apis/catalog.api';
import {selectRowsById} from '../../../Base/Functions/TableSelectById';

const {Modal, FormBody, Text, Table, Layout, Space, Title} = classic;
export const RouteViewModal = () => {
	let sRow;

	const loadData = async (callBack, row) => {
		sRow = row;
		const controlPointsByIdResponse = await selectRowsById(
			'routeControlPoints',
			'routeId',
			sRow.id
		)({});
		if (controlPointsByIdResponse.status === 200)
			sRow = {...sRow, cpById: controlPointsByIdResponse.data};
		const routeMapsByIdResponse = await selectRowsById(
			'routeControlPoints',
			'routeId',
			sRow.id
		)({});
		if (routeMapsByIdResponse.status === 200)
			sRow = {...sRow, rmById: routeMapsByIdResponse.data};

		callBack(sRow);
	};

	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title: 'Информация о маршруте',
				width: 900,
				bodyStyle: {height: 700},
				form: {
					name: 'routeDataView',
					loadInitData: loadData,
				},
			}}
			subscribe={[
				{
					name: 'openRoutesModal',
					path: 'rtd.routes.mainForm.table.events.onRowDoubleClick',
					onChange: ({value, setModalData, openModal}) => {
						value && setModalData && setModalData({...value.value});
						value && openModal();
					},
				},
			]}
		>
			<FormBody>
				<Title label={'Описание'} level={5} />
				<Space style={{justifyContent: 'space-around'}}>
					<Text itemProps={{...itemsInfo.name, rules: []}} />
					<Text itemProps={{...itemsInfo.code}} />
					<Text
						itemProps={{
							name: 'duration',
							label: 'Продолжительность',
							className: 'mb-8',
						}}
					/>
				</Space>
				<Title label={'Контрольные точки'} level={5} />
				<Layout>
					<Table
						itemProps={{name: 'cpById'}}
						customColumnProps={[{...duration}]}
						// requestLoadRows={loadControlPointsHandler}
						requestLoadConfig={apiGetConfigByName(
							'routeControlPoints'
						)}
					/>
				</Layout>
			</FormBody>
		</Modal>
	);
};
