import {classic} from 'rt-design';
import React from 'react';
import {itemsInfo} from '../../../constants/dictionary';

const {Modal, FormBody, Text} = classic;

/**
 *
 * @param catalogName name of server configuration<string>
 * @returns {JSX.object}
 * @desc Modal view table info about row(onRowDoubleClick) , only object
 */
export const CustomGroupView = ({catalogName}) => {
	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title: `Карточка группы оборудования`,
				width: 450,
				bodyStyle: {height: catalogName === 'equipments' ? 250 : 200},
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
				{catalogName === 'equipments' ? (
					<>
						<Text
							itemProps={{
								...itemsInfo.techPlacePath,
							}}
						/>
					</>
				) : null}
				<Text
					itemProps={{...itemsInfo.parentName, label: 'Родитель'}}
				/>
			</FormBody>
		</Modal>
	);
};
