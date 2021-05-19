import {classic} from 'rt-design';

const {Modal, FormBody, Text, Title, Checkbox} = classic;
export const DetourSchedulesView = () => {
	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title: `Карточка группы оборудования`,
				width: 450,
				bodyStyle: {height: 200},
			}}
			subscribe={[
				{
					name: `detoursSchedulesModalInfo`,
					path: `rtd.detours.schedulesTable.table.events.onRowDoubleClick`,
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
				<Text />
				<Title />
				<Checkbox />
			</FormBody>
		</Modal>
	);
};
