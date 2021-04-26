import React from 'react';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
import {Form} from 'antd/lib/form';
import {itemsInfo} from '../../../constants/dictionary';

const {
	Select,
	RadioGroup,
	FormBody,
	Modal,
	InputNumber,
	Space,
	Col,
	DatePicker,
	Row,
	Text,
	Checkbox,
	Input,
	TimePicker,
	Table,
	Search,
} = classic;

/** checkValue задается при первом вызове функции
 * value и setSubscribeProps прилетают при срабатывании subscribe
 */
const onChangeRepeaterType = (checkValue) => ({value, setSubscribeProps}) => {
	const disabled = value.value !== checkValue;
	setSubscribeProps({disabled: disabled});
};

const prefixCls = 'detours-schedules-registry-modal';

export const AddDetourButton = () => EditModal('add');
export const EditDetourButton = () => EditModal('edit');

const EditModal = (type) => {
	const footerCheckboxLayout = {
		labelCol: {span: 10},
		wrapperCol: {span: 1},
	};
	const footerInputLayout = {
		labelCol: {span: 18},
		wrapperCol: {span: 6},
	};
	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type === 'add' ? false : true,
			}}
			toolTipProps={{
				title: type === 'add' ? 'Создать' : 'Редактировать',
			}}
			modalConfig={{
				width: 600,
				bodyStyle: {height: 400},
				type: 'select',
				title:
					type === 'add'
						? `Добавить технологическую операцию`
						: `Создать технологическую операцию`,
				form: {
					name: 'techMaps.techOperations.editModal',
					labelCol: {span: 10},
					wrapperCol: {span: 12},
				},
			}}
			dispatch={{
				path: 'rtd.techMaps.techOperations.addModal.onSave',
				type: 'event',
			}}
			subscribe={[
				{
					name: `LocalTableChange`,
					path: `rtd.techMaps.techOperations.table.selected`,
					onChange: ({value, setModalData, setButtonProps}) => {
						value &&
							setModalData &&
							setModalData({
								...value,
							});
						type !== 'add' &&
							value &&
							setButtonProps &&
							setButtonProps({disabled: !value});
					},
				},
			]}
		>
			<FormBody>
				<Input itemProps={{...itemsInfo.name}} maxLength={100} />
				{/*<Col span={10}>*/}
				<Checkbox
					itemProps={{
						...itemsInfo.needInputData,
						...footerCheckboxLayout,
					}}
				/>
				<Input
					itemProps={{...itemsInfo.labelInputData}}
					maxLength={100}
					placeholder={'Введите значение'}
				/>
				<Checkbox
					itemProps={{
						...itemsInfo.equipmentStop,
						...footerCheckboxLayout,
					}}
				/>
				<Checkbox
					itemProps={{
						...itemsInfo.increasedDanger,
						...footerCheckboxLayout,
					}}
				/>
				{/*</Col>*/}
			</FormBody>
		</Modal>
	);
};

export default EditModal;
