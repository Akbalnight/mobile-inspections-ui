import React, {useEffect, useState} from 'react';
import BasePage from '../App/BasePage';
import {Form as AntForm, Button, notification, Radio} from 'antd';
import {
	PlusCircleOutlined,
	SearchOutlined,
	UndoOutlined
} from '@ant-design/icons';
import {Form} from 'rt-design';
import moment from 'moment';
import {
	apiGetConfigByName,
	apiGetDataCountByConfigName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName
} from '../../apis/catalog.api';
import {useParams, useHistory} from 'react-router';
import {paths} from '../../constants/paths';

const ControlPointDataDebug = () => {
	const config = {
		name: 'debugForm',
		// labelAlign: 'left',
		initialValues: {
			name_des: 'demo',
			date_start: moment(),
			date_finish: moment(),
			route_id: ['9a9773ee-ee35-40d0-8d91-1277ed522257']
		},
		labelCol: {span: 8},
		wrapperCol: {span: 16},
		children: [
			{
				type: 'Row',
				gutter: [16, 16],
				children: [
					{
						type: 'Col',
						span: 24,
						children: [
							{
								type: 'Item',
								child: {
									type: 'Title',
									label: 'Описание',
									level: 4
								}
							}
						]
					}
				]
			},
			{
				type: 'Row',
				gutter: [16, 16],
				children: [
					{
						type: 'Col',
						span: 12,
						children: [
							{
								type: 'Item',
								label: 'Наименование обхода',
								name: 'name_des',
								rules: [
									{
										message:
											'Заполните наименование обхода',
										required: true
									}
								],
								child: {
									type: 'Input'
								}
							},
							{
								type: 'Item',
								label: 'Маршрут',
								name: 'route_id',
								rules: [
									{
										message: 'Выберите маршрут',
										required: true
									}
								],
								child: {
									type: 'SingleSelect',
									widthControl: 0,
									heightPopup: 300,
									expandColumnKey: 'id',
									rowRender: 'name',
									nodeAssociated: false,
									expandDefaultAll: true,
									requestLoadRows: ({data, params}) =>
										apiGetHierarchicalDataByConfigName(
											'techMaps'
										)({
											data: {...data, isGroup: true},
											params
										}),
									requestLoadDefault: apiGetFlatDataByConfigName(
										'techMaps'
									)
								}
							}
						]
					},
					{
						type: 'Col',
						span: 12,
						children: [
							{
								type: 'Item',
								label: 'Дата начала',
								name: 'date_start',
								rules: [
									{
										message: 'Выберите дату начала',
										required: true
									}
								],
								child: {
									type: 'DatePicker',
									format: 'DD.MM.YYYY'
								}
							},
							{
								type: 'Item',
								label: 'Дата окончания',
								name: 'date_finish',
								rules: [
									{
										message: 'Выберите дату окончания',
										required: true
									}
								],
								child: {
									type: 'DatePicker'
								}
							}
						]
					}
				]
			},
			{
				type: 'Row',
				gutter: [16, 16],
				children: [
					{
						type: 'Col',
						span: 24,
						children: [
							{
								type: 'Item',
								child: {
									type: 'Title',
									label: 'Технологические операции',
									level: 4
								}
							}
						]
					}
				]
			},
			{
				type: 'Row',
				gutter: [16, 16],
				children: [
					{
						type: 'Col',
						span: 24,
						children: [
							{
								type: 'Item',
								name: 'techOperations',
								child: {
									type: 'LocalTable', //'LocalTable', // 'ServerTable', 'InfinityTAble'
									requestLoadRows: ({data, params}) =>
										apiGetFlatDataByConfigName(
											'techOperations'
										)({
											data: {
												...data,
												techMapId:
													'34a4e4fd-6e1b-4cc3-8b7e-704865ef7924'
											},
											params
										}),
									requestLoadConfig: () =>
										apiGetConfigByName('techOperations')(),
									customFields: [
										{
											name: 'duration',
											value: row =>
												parseInt(row.hours * 60) +
												parseInt(row.minutes)
										},
										{
											name: 'code',
											value: (row, rows) =>
												parseInt(
													rows.reduce(
														(max, current) =>
															current.code > max
																? current.code
																: max,
														0
													)
												) + 1
										},
										{
											name: 'position',
											value: (row, rows) =>
												rows.length + 1
										}
									],
									events: [
										'add',
										'addAsCopy',
										'edit',
										'delete',
										'up',
										'down'
									],
									modals: [
										{
											type: 'add',
											title:
												'Создание техологической операции',
											// okText: 'customOkText',
											// cancelText: 'customCancelText',
											form: {
												name: 'CreateModalForm',
												labelAlign: 'left',
												labelCol: {span: 10},
												wrapperCol: {span: 14},
												children: [
													{
														type: 'Row',
														gutter: [16, 16],
														children: [
															{
																type: 'Col',
																span: 24,
																children: [
																	{
																		type:
																			'Item',
																		label:
																			'Наименование',
																		name:
																			'name',
																		rules: [
																			{
																				message:
																					'Заполните наименование',
																				required: true
																			}
																		],
																		child: {
																			type:
																				'TextArea',
																			autoSize: true,
																			size:
																				'small'
																		}
																	},
																	{
																		type:
																			'Item',
																		label:
																			'Ввод данных',
																		name:
																			'needInputData',
																		valuePropName:
																			'checked',
																		child: {
																			type:
																				'Checkbox'
																		}
																	},
																	{
																		type:
																			'Row',
																		gutter: [
																			0,
																			0
																		],
																		children: [
																			{
																				type:
																					'Col',
																				span: 10,
																				children: [
																					{
																						type:
																							'Item',
																						child: {
																							type:
																								'Text',
																							label:
																								'Продолжительность:',
																							style: {
																								color:
																									'rgba(0, 0, 0, 0.85)',
																								fontSize:
																									'12px'
																							}
																						}
																					}
																				]
																			},
																			{
																				type:
																					'Col',
																				span: 4,
																				children: [
																					{
																						type:
																							'Item',
																						noStyle: true,
																						name:
																							'hours',
																						child: {
																							type:
																								'InputNumber',
																							placeholder:
																								'Часы',
																							size:
																								'small',
																							min: 0,
																							max: 12
																						}
																					}
																				]
																			},
																			{
																				type:
																					'Col',
																				span: 3,
																				children: [
																					{
																						type:
																							'Item',
																						style: {
																							textAlign:
																								'center'
																						},
																						child: {
																							type:
																								'Text',
																							label:
																								'часы',
																							level: 6,
																							style: {
																								lineHeight:
																									'24px'
																							}
																						}
																					}
																				]
																			},
																			{
																				type:
																					'Col',
																				span: 4,
																				children: [
																					{
																						type:
																							'Item',
																						noStyle: true,
																						name:
																							'minutes',
																						child: {
																							type:
																								'InputNumber',
																							placeholder:
																								'Минуты',
																							size:
																								'small',
																							min: 0,
																							max: 12
																						}
																					}
																				]
																			},
																			{
																				type:
																					'Col',
																				span: 3,
																				children: [
																					{
																						type:
																							'Item',
																						style: {
																							textAlign:
																								'center'
																						},
																						child: {
																							type:
																								'Text',
																							label:
																								'минуты',
																							level: 6,
																							style: {
																								lineHeight:
																									'24px'
																							}
																						}
																					}
																				]
																			}
																		]
																	}
																]
															}
														]
													}
												]
											}
										},
										{
											type: 'edit',
											title:
												'Изменение техологической операции',
											initialValues: row => ({
												code: row && row.code,
												name: row && row.name,
												needInputData:
													row && row.needInputData,
												hours:
													row &&
													parseInt(row.duration / 60),
												minutes:
													row && row.duration % 60
											}),
											form: {
												name: 'UpdateModalForm',
												labelAlign: 'left',
												labelCol: {span: 10},
												wrapperCol: {span: 14},
												children: [
													{
														type: 'Row',
														gutter: [16, 16],
														children: [
															{
																type: 'Col',
																span: 24,
																children: [
																	{
																		type:
																			'Item',
																		label:
																			'Код',
																		name:
																			'code',
																		rules: [
																			{
																				message:
																					'Введите значение',
																				required: true
																			}
																		],
																		child: {
																			type:
																				'InputNumber',
																			placeholder:
																				'Введите значение',
																			size:
																				'small',
																			min: 0,
																			max: 12
																		}
																	},
																	{
																		type:
																			'Item',
																		label:
																			'Наименование',
																		name:
																			'name',
																		rules: [
																			{
																				message:
																					'Заполните наименование',
																				required: true
																			}
																		],
																		child: {
																			type:
																				'TextArea',
																			autoSize: true,
																			size:
																				'small'
																		}
																	},
																	{
																		type:
																			'Item',
																		label:
																			'Ввод данных',
																		name:
																			'needInputData',
																		valuePropName:
																			'checked',
																		child: {
																			type:
																				'Checkbox'
																		}
																	},
																	{
																		type:
																			'Row',
																		gutter: [
																			0,
																			0
																		],
																		children: [
																			{
																				type:
																					'Col',
																				span: 10,
																				children: [
																					{
																						type:
																							'Item',
																						child: {
																							type:
																								'Text',
																							label:
																								'Продолжительность:',
																							style: {
																								color:
																									'rgba(0, 0, 0, 0.85)',
																								fontSize:
																									'12px'
																							}
																						}
																					}
																				]
																			},
																			{
																				type:
																					'Col',
																				span: 4,
																				children: [
																					{
																						type:
																							'Item',
																						noStyle: true,
																						name:
																							'hours',
																						child: {
																							type:
																								'InputNumber',
																							placeholder:
																								'Часы',
																							size:
																								'small',
																							min: 0,
																							max: 12
																						}
																					}
																				]
																			},
																			{
																				type:
																					'Col',
																				span: 3,
																				children: [
																					{
																						type:
																							'Item',
																						style: {
																							textAlign:
																								'center'
																						},
																						child: {
																							type:
																								'Text',
																							label:
																								'часы',
																							level: 6,
																							style: {
																								lineHeight:
																									'24px'
																							}
																						}
																					}
																				]
																			},
																			{
																				type:
																					'Col',
																				span: 4,
																				children: [
																					{
																						type:
																							'Item',
																						noStyle: true,
																						name:
																							'minutes',
																						child: {
																							type:
																								'InputNumber',
																							placeholder:
																								'Минуты',
																							size:
																								'small',
																							min: 0,
																							max: 60
																						}
																					}
																				]
																			},
																			{
																				type:
																					'Col',
																				span: 3,
																				children: [
																					{
																						type:
																							'Item',
																						style: {
																							textAlign:
																								'center'
																						},
																						child: {
																							type:
																								'Text',
																							label:
																								'минуты',
																							level: 6,
																							style: {
																								lineHeight:
																									'24px'
																							}
																						}
																					}
																				]
																			}
																		]
																	}
																]
															}
														]
													}
												]
											}
										}
									]
								}
							}
						]
					}
				]
			},
			{
				type: 'Row',
				gutter: [8, 8],
				children: [
					{
						type: 'Col',
						span: 24,
						children: [
							{
								type: 'Item',
								child: {
									type: 'SubmitButton'
								}
							}
						]
					}
				]
			}
		]
	};

	const pageParams = useParams();
	const history = useHistory();
	const [form] = AntForm.useForm();

	const loadData = callBack => {
		if (pageParams.id === 'new') {
			callBack({
				code: null,
				name: null,
				parentId: null,
				equipments: [],
				techMaps: [],
				isGroup: false
			});
		} else {
			apiGetFlatDataByConfigName('controlPoints')({
				data: {id: pageParams.id}
			})
				.then(response => {
					// console.log("loadData => response ", response.data);
					callBack(response.data[0]);
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
						notification.error({
							message:
								'Произошла ошибка при загрузки данных формы'
						});
					}
				});
		}
	};

	const headerConfig = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Описание',
				level: 5
			}
		},
		{
			componentType: 'Row',
			gutter: [16, 16],
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							label: 'Код',
							name: 'code',
							rules: [
								{
									message: 'Заполните код',
									required: true
								}
							],
							child: {
								componentType: 'InputNumber'
							}
						},
						{
							componentType: 'Item',
							label: 'Наименование',
							name: 'name',
							rules: [
								{
									message: 'Заполните наименование',
									required: true
								}
							],
							child: {
								componentType: 'Input'
							}
						},
						{
							componentType: 'Item',
							label: 'Группа',
							name: 'parentId',
							child: {
								componentType: 'SingleSelect',
								widthControl: 0,
								heightPopup: 300,
								expandColumnKey: 'id',
								rowRender: 'name',
								nodeAssociated: false,
								expandDefaultAll: true,
								requestLoadRows: ({data, params}) =>
									apiGetHierarchicalDataByConfigName(
										'controlPoints'
									)({
										data: {...data, isGroup: true},
										params
									}),
								requestLoadDefault: apiGetFlatDataByConfigName(
									'controlPoints'
								)
							}
						}
					]
				}
			]
		}
	];

	const selectEquipmentModal = {
		type: 'select',
		// title: 'Выбор оборудования',
		width: 700,
		// okText: 'customOkText',
		// cancelText: 'customCancelText',
		form: {
			name: 'selectEquipmentModal',
			children: [
				{
					type: 'Layout',
					children: [
						{
							type: 'Item',
							name: 'techMaps',
							child: {
								type: 'LocalTable', //'LocalTable', // 'ServerTable', 'InfinityTAble'
								events: [],
								modals: [],
								style: {height: '600px'},
								requestLoadRows: apiGetHierarchicalDataByConfigName(
									'equipmentsAutoQuery'
								),
								requestLoadConfig: apiGetConfigByName(
									'equipmentsAutoQuery'
								)
							}
						}
					]
				}
			]
		}
	};

	const mAddAndEdit = [
		{
			componentType: 'Item',
			label: 'Id',
			name: 'id',
			child: {
				componentType: 'Input'
			}
		},
		{
			componentType: 'Item',
			label: 'Control Point Id',
			name: 'controlPointId',
			child: {
				componentType: 'Input'
			}
		},
		{
			componentType: 'Item',
			label: 'Наименование',
			name: 'name',
			rules: [
				{
					message: 'Заполните наименование',
					required: true
				}
			],
			child: {
				componentType: 'Input'
			}
		}
	];

	const mView = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Описание',
				level: 5
			}
		},
		{
			componentType: 'Row',
			gutter: [16, 16],
			children: [
				{
					componentType: 'Col',
					span: 16,
					children: [
						{
							componentType: 'Item',
							label: 'Id',
							name: 'id',
							child: {
								componentType: 'Text'
							}
						},
						{
							componentType: 'Item',
							label: 'Control Point Id',
							name: 'controlPointId',
							child: {
								componentType: 'Text'
							}
						}
					]
				},
				{
					componentType: 'Col',
					span: 8,
					children: [
						{
							componentType: 'Item',
							label: 'Наименование',
							name: 'name',
							child: {
								componentType: 'Text'
							}
						}
					]
				}
			]
		}
	];

	const tModals = [
		// {
		//     type: 'addOnServer',
		//     width: 500,
		//     form:{children: []}
		// },
		{
			type: 'addOnLocal',
			width: 500,
			form: {
				labelCol: {span: 8},
				wrapperCol: {span: 16},
				body: [...mAddAndEdit]
			}
		},
		// {
		//     type: 'editOnServer',
		//     width: 500,
		//     form:{children: []}
		// },
		{
			type: 'editOnLocal',
			width: 500,
			initialValues: row => row,
			form: {
				labelCol: {span: 8},
				wrapperCol: {span: 16},
				body: [...mAddAndEdit]
			}
		},
		{
			type: 'select',
			width: 800,
			form: {
				body: [
					{
						componentType: 'Layout',
						children: [
							{
								componentType: 'Item',
								name: 'equipments',
								child: {
									componentType: 'SelectTable', //'LocalTable', // 'ServerTable', 'InfinityTAble'
									events: [],
									modals: [],
									// selectable: true,
									nodeAssociated: false,
									style: {height: '600px'},
									requestLoadRows: apiGetHierarchicalDataByConfigName(
										'equipmentsAutoQuery'
									),
									requestLoadConfig: apiGetConfigByName(
										'equipmentsAutoQuery'
									)
								}
							}
						]
					}
				]
			}
		},
		{
			type: 'view',
			width: 800,
			initialValues: row => row,
			form: {
				// labelCol: {span: 8},
				// wrapperCol: {span: 16},
				body: [...mView]
			}
		}
	];

	const equipmentTableConfig = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Оборудование',
				// type: 'secondary',
				level: 5
			}
		},
		{
			componentType: 'Layout',
			className: 'mb-16',
			children: [
				{
					componentType: 'Item',
					name: 'equipments',
					rules: [
						{
							type: 'array'
						}
					],
					child: {
						componentType: 'LocalTable', //'LocalTable', // 'ServerTable', 'InfinityTAble'
						events: [
							'add',
							'addAsCopy',
							'edit',
							'delete',
							'up',
							'down',
							'settings',
							'filter'
						],
						modals: [...tModals],
						customFields: [
							{
								name: 'controlPointId',
								value: () => pageParams.id
							}
						],
						commandPanelProps: {
							systemBtnProps: {
								// all: {
								//     size: 'small',
								//     shape: 'round'
								// },
								edit: {
									tooltip: 'Добавить Но не пить',
									icon: <PlusCircleOutlined />
									// render: ({disabled, onClick}) => (<Button type="primary" shape="circle" disabled={disabled} onClick={onClick} icon={<SearchOutlined />} />)
								}
							}
						},
						// selectable: true,
						// showSelection: true,
						requestLoadRows: ({data, params}) =>
							apiGetFlatDataByConfigName(
								'controlPointsEquipments'
							)({
								data: {...data, controlPointsId: pageParams.id},
								params
							}),
						requestLoadConfig: () =>
							apiGetConfigByName('controlPointsEquipments')()
					}
				}
			]
		}
	];

	const techMaps = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Технологические карты',
				level: 5
			}
		},
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'techMaps',
					child: {
						componentType: 'LocalTable', //'LocalTable', // 'ServerTable', 'InfinityTAble'
						events: [
							'add',
							'addAsCopy',
							'edit',
							'delete',
							'up',
							'down'
						],
						// style: {height: '100%'},
						requestLoadRows: ({data, params}) =>
							apiGetFlatDataByConfigName(
								'controlPointsTechMaps'
							)({
								data: {...data, controlPointsId: pageParams.id},
								params
							}),
						requestLoadConfig: () =>
							apiGetConfigByName('controlPointsTechMaps')()
					}
				}
			]
		}
	];

	const filterConfig = [
		{
			componentType: 'DateRange',
			nameStart: 'dateBegin',
			nameEnd: 'dateEnd',
			dateFormat: 'DD.MM.YYYY',
			title: 'Период'
		},
		{
			componentType: 'MultiSelect',
			typeView: 'List',
			name: 'priorities',
			requestLoadRows: apiGetFlatDataByConfigName(
				'panelProblemsPriorities'
			),
			requestLoadDefault: apiGetFlatDataByConfigName(
				'panelProblemsPriorities'
			),
			rowRender: 'name',
			rowKey: 'code',
			title: 'Приоритет',
			heightPopup: 350,
			widthPopup: 420
			// size: 'small'
		},
		{
			componentType: 'SingleSelect',
			typeView: 'List',
			name: 'statuses',
			requestLoadRows: apiGetFlatDataByConfigName(
				'panelProblemsStatuses'
			),
			requestLoadDefault: apiGetFlatDataByConfigName(
				'panelProblemsStatuses'
			),
			rowRender: 'name',
			rowKey: 'code',
			title: 'Статус',
			widthControl: 250,
			heightPopup: 200,
			widthPopup: 300
			// size: 'small'
		},
		{
			componentType: 'MultiSelect',
			typeView: 'List',
			rows: [
				{
					id: 'e07a6417-840e-4743-a4f0-45da6570743f',
					code: 1,
					name: 'Статус панели проблем №11'
				},
				{
					id: 'ce4e57eb-ae8f-4648-98ec-410808da380e',
					code: 2,
					name: 'Статус панели проблем №12'
				},
				{
					id: '04d98b77-f4c7-46ed-be25-b01b035027fd',
					code: 3,
					name: 'Статус панели проблем №13'
				}
			],
			name: 'statuses',
			rowKey: 'code',
			rowRender: 'name',
			title: 'Статус2',
			widthControl: 250,
			heightPopup: 200,
			widthPopup: 300
		}
		// {
		//     componentType: 'Custom',
		//     name: 'prt',
		//     render: ({onChange, defaultValue, value}) => {
		//         return (
		//             <Radio.Group defaultValue={defaultValue} value={value} buttonStyle="solid" onChange={(e) => onChange('prt', e.target.value)}>
		//                 <Radio.Button value={1}>1p</Radio.Button>
		//                 <Radio.Button value={2}>2p</Radio.Button>
		//                 <Radio.Button value={3}>3p</Radio.Button>
		//                 <Radio.Button value={4}>4p</Radio.Button>
		//             </Radio.Group>
		//         );
		//     }
		// }
	];

	const demoTableConfig = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'equipments',
					rules: [
						{
							type: 'array'
						}
					],
					child: {
						componentType: 'ServerTable', //'LocalTable', // 'ServerTable', 'InfinityTable'
						// events: ['add', 'addAsCopy', 'edit', 'delete', 'up', 'down', 'settings', 'filter'],
						// modals: [ ...tModals ],
						filterPanelProps: {
							// applyFilterRender: 'Фильтр',
							// resetFilterRender: <UndoOutlined />,
							configFilter: filterConfig
						},
						footerShow: true,
						defaultFilter: {
							dateBegin: moment(),
							dateEnd: moment().add(30, 'days'),
							// priorities: [3, 4],
							// statuses: [3],
							// statuses2: [1],
							prt: 3
						},
						requestLoadRows: apiGetFlatDataByConfigName(
							'dateRangeDemo'
						),
						requestLoadCount: apiGetDataCountByConfigName(
							'dateRangeDemo'
						),
						requestLoadConfig: apiGetConfigByName('dateRangeDemo')
					}
				}
			]
		}
	];

	const formConfig = {
		// name: 'PageFormData',
		labelCol: {span: 8},
		wrapperCol: {span: 16},
		loadInitData: loadData,
		noPadding: true,
		// header: [
		//     {
		//         componentType: 'Item',
		//         child: {
		//             componentType: 'Title',
		//             label: 'Информация о контрольной точке',
		//             className: 'mb-0',
		//             level: 3
		//         }
		//     },
		// ],
		body: [
			// ...headerConfig,
			...demoTableConfig
			// ...techMaps,
		]
		// footer: [
		//     {
		//         componentType: 'Item',
		//         child: {
		//             componentType: 'Button',
		//             label: 'Закрыть',
		//             className: 'mr-8',
		//             onClick: () => history.push(paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.path)
		//         }
		//     },
		//     {
		//         componentType: 'Item',
		//         child: {
		//             componentType: 'Button',
		//             label: 'Сохранить',
		//             type: 'primary',
		//             htmlType: 'submit'
		//         }
		//     }
		// ]
	};

	const onFinish = values => {
		console.log('Success:', values);
	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	return (
		<BasePage>
			<Form
				form={form}
				{...formConfig}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			/>
		</BasePage>
	);
};

export default ControlPointDataDebug;
