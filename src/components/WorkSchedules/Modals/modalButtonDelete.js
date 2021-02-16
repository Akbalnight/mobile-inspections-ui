import {DeleteOutlined} from '@ant-design/icons';
import {ReactComponent as Warning} from '../../../imgs/warning-mdl-big.svg';
/**
 *
 * @param {string} info - request adress word
 */
export const deleteButton = (info) => {
	const mainFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Text',
				label: 'Вы действительно хотите удалить выбранное?',
			},
		},
	];
	return {
		componentType: 'Item',
		child: {
			componentType: 'Modal',
			buttonProps: {
				type: 'default',
				icon: <DeleteOutlined />,
			},
			modalConfig: {
				type: 'editOnServer',
				title: (
					<span style={{display: 'flex', flexDirection: 'row'}}>
						<Warning />{' '}
						<div style={{padding: '0px 10px 0px'}}>
							Удалить{' '}
							{info === 'schedules'
								? 'график'
								: info === 'shift'
								? 'смену'
								: 'шаблон'}
						</div>
					</span>
				),
				width: 420,
				// bodyStyle: {height: 200},
				okText: 'Удалить',
				form: {
					name: `deleteShiftModalForm`,
					loadInitData: (callBack, row) => callBack(row),
					body: [...mainFields],
				},
			},
			dispatch: {
				path: `workSchedules.work${
					info[0].toUpperCase() + info.substring(1)
				}Tab.modal.events.onDeleteModal`,
				type: 'event',
			},
			subscribe: {
				name: 'workShiftTabTableInfo',
				path: 'rtd.workSchedules.workShiftTab.table.selected',
				onChange: ({value, setModalData, setButtonProps}) => {
					value && setModalData && setModalData(value);
					setButtonProps && setButtonProps({disabled: !value});
				},
			},
		},
	};
};
