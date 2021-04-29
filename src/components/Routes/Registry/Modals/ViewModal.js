import {classic} from 'rt-design';
import React from 'react';
import {itemsInfo} from '../../../../constants/dictionary';
import {duration} from '../../../Base/customColumnProps';
import {apiGetConfigByName} from '../../../../apis/catalog.api';
import {selectRowsById} from '../../../Base/Functions/TableSelectById';
import {AttachmentsPreview} from '../../../Base/Functions/MediaUtils';

const {Modal, FormBody, Text, Table, Layout, Space, Title, Custom} = classic;
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
			'routeMaps',
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
					<Text itemProps={{...itemsInfo.code, rules: []}} />
					<Text
						itemProps={{
							...itemsInfo.duration,
							rules: [],
						}}
					/>
				</Space>
				<Title label={'Контрольные точки'} level={5} />
				<Layout style={{height: '150px'}}>
					<Table
						itemProps={{name: 'cpById'}}
						customColumnProps={[{...duration}]}
						requestLoadConfig={apiGetConfigByName(
							'routeControlPoints'
						)}
					/>
				</Layout>
				<Title
					label={'Маршрутные карты'}
					level={5}
					className={'mt-8'}
				/>
				<Layout style={{height: '200px'}}>
					<Custom
						itemProps={{name: 'rmById'}}
						render={({value}) => {
							return value ? (
								<AttachmentsPreview
									enableTitles={false}
									items={value}
								/>
							) : null;
						}}
					/>
				</Layout>
			</FormBody>
		</Modal>
	);
};
