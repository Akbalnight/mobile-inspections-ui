import {classic} from 'rt-design';
import React from 'react';
import {itemsInfo} from '../tableProps';

const {Modal, FormBody, Text} = classic;

export const ModalGroupView = ({catalogName}) => {
	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title: `Карточка группы оборудования`,
				width: 450,
				bodyStyle: {height: 250},
				form: {
					name: `${catalogName}ModalGroupInfoForm`,
					loadInitData: (callBack, row) => callBack(row),
					labelCol: {span: 12},
					wrapperCol: {span: 12},
				},
			}}
			subscribe={[
				{
					name: `${catalogName}ModalInfo`,
					path: `rtd.catalog.${catalogName}Table.table.events.onRowDoubleClick`,
					onChange: ({value, setModalData, openModal}) => {
						// console.log(value.value);
						value &&
							setModalData &&
							setModalData({
								...value.value,
							});
						value && value.value.isGroup && openModal();
					},
				},
			]}
		>
			<FormBody>
				<Text
					itemProps={{
						...itemsInfo.name,
					}}
				/>
				<Text
					itemProps={{
						...itemsInfo.techPlacePath,
					}}
				/>
				<Text
					itemProps={{
						...itemsInfo.techPlace,
						// label: 'Родитель',
					}}
				/>
			</FormBody>
		</Modal>
	);
};
