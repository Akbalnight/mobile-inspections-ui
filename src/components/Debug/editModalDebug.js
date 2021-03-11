import React from 'react';
import {EditOutlined} from '@ant-design/icons';

export const editModalDebug = [
	{
		componentType: 'Item',
		child: {
			componentType: 'Modal',
			buttonProps: {
				type: 'default',
				label: (
					<span>
						<EditOutlined /> Edit
					</span>
				),
				// className: 'ml-4 mr-8',
				disabled: true,
			},
			modalConfig: {
				type: 'editOnLocal',
				title: `Изменить элемент`,
				// width: 600,
				// bodyStyle: {height: 320},
				form: {
					name: 'editModalDebug',
					labelCol: {span: 10},
					wrapperCol: {span: 12},
					loadInitData: (callBack, row) => {
						console.log('editModalDebug => ', row);
						callBack(row);
					},
					body: [
						{
							componentType: 'Item',
							label: 'Код',
							name: 'code',
							child: {
								componentType: 'InputNumber',
							},
						},
						{
							componentType: 'Item',
							label: 'Наименование',
							name: 'name',
							child: {
								componentType: 'Input',
							},
						},
					],
				},
			},

			dispatch: {
				path: 'debug.form.table.events.onEditModal',
				type: 'event',
			},
			subscribe: [
				{
					name: 'tableCloseInfo',
					path: 'rtd.debug.form.table.selected',
					onChange: ({value, setModalData, setButtonProps}) => {
						// console.log('buttonCloseWithNote value => ', value);
						value && setModalData && setModalData(value);

						setButtonProps && setButtonProps({disabled: !value});
					},
				},
			],
		},
	},
];
