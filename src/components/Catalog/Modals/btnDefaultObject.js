import {classic} from 'rt-design';
import {itemsInfo} from '../tableProps';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';

export const AddDefaultButton = ({catalogName, unique}) =>
	operationOnServer('add', catalogName, unique);
export const EditDefaultButton = ({catalogName, unique}) =>
	operationOnServer('edit', catalogName, unique);

const {Modal, FormBody, Input, Select, InputNumber} = classic;
const operationOnServer = (type, catalogName, unique) => {
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};

	const catalogOption = (catalogName) => {
		switch (catalogName) {
			case 'departments':
				return (
					<Select
						itemProps={{...itemsInfo.parentId, label: 'Родитель'}}
						autoClearSearchValue={true}
						showSearch={true}
						mode={'single'}
						searchValueName={'name'}
						infinityMode={true}
						requestLoadRows={apiGetFlatDataByConfigName(
							catalogName
						)}
						optionConverter={(option) => ({
							label: option.name,
							value: option.id,
						})}
					/>
				);
			case 'panelProblemsPriorities':
				return (
					<>
						<Input itemProps={{...itemsInfo.direction}} />
						<InputNumber
							itemProps={{...itemsInfo.priority}}
							min={1}
							max={4}
							style={{
								width: '100%',
							}}
						/>
					</>
				);
			default:
				return null;
		}
	};
	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type === 'add' ? false : true,
				className: 'mr-8',
			}}
			toolTipProps={{
				title: type === 'add' ? 'Создать' : 'Редактировать',
			}}
			modalConfig={{
				type: `${type}OnServer`,
				title: `${
					type === 'add' ? 'Создание' : 'Редактирование'
				} ${unique}`,
				width: 450,
				bodyStyle: {
					height:
						catalogName === 'panelProblemsPriorities'
							? 250
							: catalogName === 'departments'
							? 200
							: 150,
				},
				requestSaveRow: apiSaveByConfigName(
					`${catalogName}CatalogSave`
				), //не забыть поставить
				form: {
					name: `${type}ModalForm`,
					loadInitData: loadData,
					onFinish: (values) => {
						console.log('values', values);
					},
					labelCol: {span: 10},
					wrapperCol: {span: 12},
				},
			}}
			dispatch={{
				path: `catalog.${catalogName}Table.modal.events.${type}OnModal`,
				type: 'event',
			}}
			subscribe={[
				{
					name: `${catalogName}TableInfo`,
					path: `rtd.catalog.${catalogName}Table.table.selected`,
					onChange: ({value, setModalData, setButtonProps}) => {
						value && setModalData && setModalData(value);
						type !== 'add' &&
							setButtonProps &&
							setButtonProps({
								disabled: !value,
							});
					},
				},
			]}
		>
			<FormBody>
				<Input itemProps={{...itemsInfo.name}} />
				{catalogOption(catalogName)}
			</FormBody>
		</Modal>
	);
};
