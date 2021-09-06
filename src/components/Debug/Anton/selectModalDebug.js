import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/application.api';
import {PlusOutlined} from '@ant-design/icons';

export const selectModalDebug = [
	{
		componentType: 'Item',
		child: {
			componentType: 'Modal',
			buttonProps: {
				type: 'default',
				label: (
					<span>
						<PlusOutlined /> Add
					</span>
				),
				// className: 'ml-4 mr-8',
			},
			modalConfig: {
				type: 'select',
				width: 600,
				bodyStyle: {height: 400},
				title: 'Оборудование',
				form: {
					noPadding: true,
					loadInitData: (callBack, row) => callBack(row),
					body: [
						{
							componentType: 'Space',
							className: 'p-8',
							children: [
								{
									componentType: 'Item',
									// trigger: 'onSearch',
									name: 'searchInput',
									child: {
										componentType: 'Search',
										dispatch: {
											path: 'debug.form.modal.select.events.onSearch',
											type: 'event',
										},
									},
								},
							],
						},
						{
							componentType: 'Layout',
							children: [
								{
									componentType: 'Item',
									name: 'equipments',
									child: {
										componentType: 'Table', //'LocalTable', // 'ServerTable', 'InfinityTAble'
										selectable: true,
										nodeAssociated: false,
										searchParamName: 'name',
										// style: {height: '600px'},
										requestLoadRows:
											apiGetHierarchicalDataByConfigName(
												'equipmentsAutoQuery'
											),
										requestLoadConfig: apiGetConfigByName(
											'equipmentsAutoQuery'
										),
										subscribe: [
											{
												name: 'onSearch',
												path: 'rtd.debug.form.modal.select.events.onSearch',
												onChange: ({
													value,
													extraData,
													reloadTable,
												}) => {
													// if(value) {
													reloadTable({
														searchValue:
															value.value,
													});
													console.log(
														'Select Modal search',
														value
													);
													// }
												},
											},
										],
									},
								},
							],
						},
					],
				},
			},

			subscribe: [
				{
					name: 'tableCloseInfo',
					path: 'rtd.debug.form.table.events.onRowDoubleClick',
					onChange: ({value, openModal}) => {
						// console.log('buttonCloseWithNote value => ', value);
						openModal();
					},
				},
			],
		},
	},
];
