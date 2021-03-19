import {classic} from 'rt-design';
import {itemsInfo} from '../tableProps';

const {Modal, FormBody, Text} = classic;
export const ModalDefaultObjectView = ({catalogName}) => {
	const loadData = (callBack, row) => {
		callBack(row);
	};

	const catalogOption = (catalogName) => {
		switch (catalogName) {
			case 'departments':
				return (
					<Text
						itemProps={{...itemsInfo.parentId, label: 'Родитель'}}
					/>
				);
			case 'panelProblemsPriorities':
				return (
					<>
						<Text itemProps={{...itemsInfo.direction}} />
						<Text itemProps={{...itemsInfo.priority}} />
					</>
				);
			default:
				return null;
		}
	};
	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title: `Подробная информация`,
				width: 400,
				bodyStyle: {
					height:
						catalogName === 'panelProblemsPriorities'
							? 280
							: catalogName === 'departments'
							? 230
							: 190,
				},
				form: {
					name: `${catalogName}ModalInfoForm`,
					loadInitData: loadData,
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
						openModal();
					},
				},
			]}
		>
			<FormBody>
				<Text itemProps={{...itemsInfo.code}} />
				<Text itemProps={{...itemsInfo.name}} />
				{catalogOption(catalogName)}
			</FormBody>
		</Modal>
	);
};
