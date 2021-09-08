export const systemEvents = {
	ROUTE_CREATION_SUCCESS: {
		finish: {
			id: '845c2def-c0b4-472f-bcab-45e6476ab32c',
			dataTemplate: {
				routeName: 'name',
				routeDuration: 'duration',
			},
		},
	},
	ROUTE_EDITION_SUCCESS: {
		finish: {
			id: 'bf30c4fe-f736-4d4a-90a7-b422fae5e237',
			dataTemplate: {
				routeName: 'name',
				routeDuration: 'duration',
			},
		},
	},
	CONTROL_POINTS_CREATION_SUCCESS: {
		finish: {
			id: '6b26dc03-3ead-41bf-b766-e9a74d919aac',
			dataTemplate: {
				cpName: 'name',
				cpParent: 'parentId',
			},
		},
	},
	CONTROL_POINTS_EDITION_SUCCESS: {
		finish: {
			id: 'c1228be4-5b84-4719-b176-c71684e50e6b',
			dataTemplate: {
				cpName: 'name',
				cpParent: 'parentId',
			},
		},
	},
	DETOUR_CREATION_SUCCESS: {
		finish: {
			id: 'da2e3c16-2e38-4c86-83df-799d53476dac',
			dataTemplate: {
				detourName: 'name',
				detourRoute: 'routeId',
				detourExecutor: 'staffId',
			},
		},
	},
	DETOUR_EDITION_SUCCESS: {
		finish: {
			id: 'c6081691-acdd-4896-aedb-a28194fe81f6',
			dataTemplate: {
				detourName: 'name',
				detourRoute: 'routeId',
				detourExecutor: 'staffId',
			},
		},
	},
	SCHEDULE_CREATION_SUCCESS: {
		finish: {
			id: 'c57d265e-3e85-4599-bec8-e9de3ff3ef90',
			dataTemplate: {
				scheduleName: 'name',
				scheduleRoute: 'routeId',
			},
		},
	},
	SCHEDULE_EDITION_SUCCESS: {
		finish: {
			id: '9b4f3046-0cef-4fd7-806d-c491190ef891',
			dataTemplate: {
				scheduleName: 'name',
				scheduleRoute: 'routeId',
			},
		},
	},
	TECH_MAPS_CREATION_SUCCESS: {
		finish: {
			id: '495a0f5a-f9eb-40df-bb6e-dde7e0c6a459',
			dataTemplate: {
				tmName: 'name',
				tmParent: 'parentId',
			},
		},
	},
	TECH_MAPS_EDITION_SUCCESS: {
		finish: {
			id: '05ae5b25-2bf4-49c2-be6e-8aded22e65a9',
			dataTemplate: {
				tmName: 'name',
				tmParent: 'parentId',
			},
		},
	},
	DEPARTMENTS_CREATION_SUCCESS: {
		finish: {
			id: 'b9cd2c50-61dc-48c2-adc3-52f973272de6',
			dataTemplate: {
				name: 'name',
				parent: 'parentId',
			},
		},
	},
	DEPARTMENTS_EDITION_SUCCESS: {
		finish: {
			id: '646991cb-70b6-4578-8732-08626a173e20',
			dataTemplate: {
				name: 'name',
				parent: 'parentId',
			},
		},
	},
	TECH_MAPS_STATUSES_CREATION_SUCCESS: {
		finish: {
			id: 'ade8e797-c360-4eba-a962-9f688c275efb',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	TECH_MAPS_STATUSES_EDITION_SUCCESS: {
		finish: {
			id: '2304b3b3-d52e-4215-97c0-7f04f9232bc3',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	STAFF_POSITIONS_CREATION_SUCCESS: {
		finish: {
			id: '9096b11f-9f68-45c3-ba62-dbb0516f30e3',
			dataTemplate: {
				name: 'name',
				parent: 'parentId',
			},
		},
	},
	STAFF_POSITIONS_EDITION_SUCCESS: {
		finish: {
			id: '042a1bcb-3aa9-4752-86e3-01404a4e75d7',
			dataTemplate: {
				name: 'name',
				parent: 'parentId',
			},
		},
	},
	EQUIPMENTS_CREATION_SUCCESS: {
		finish: {
			id: '8ec09b4b-c016-46e7-852d-1d023015dc5b',
			dataTemplate: {
				name: 'name',
				parent: 'parentId',
			},
		},
	},
	EQUIPMENTS_EDITION_SUCCESS: {
		finish: {
			id: '49945728-4772-4b31-bda7-d81139b59c44',
			dataTemplate: {
				name: 'name',
				parent: 'parentId',
			},
		},
	},
	EQUIPMENTS_GROUP_CREATION_SUCCESS: {
		finish: {
			id: '5a9133d0-2d4c-48e7-851a-81e723451f88',
			dataTemplate: {
				name: 'name',
				parent: 'parentId',
			},
		},
	},
	EQUIPMENTS_GROUP_EDITION_SUCCESS: {
		finish: {
			id: 'fa48f6c4-0fbb-4457-bcb3-2717ac0bff09',
			dataTemplate: {
				name: 'name',
				parent: 'parentId',
			},
		},
	},
	STAFF_QUALIFICATIONS_CREATION_SUCCESS: {
		finish: {
			id: 'c2a92b55-6100-423a-ad40-88cf5130bab1',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	STAFF_QUALIFICATIONS_EDITION_SUCCESS: {
		finish: {
			id: '34dd6522-64d9-47bb-8563-66b6f5c961fb',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	DEFECT_STATUSES_PROCESS_CREATION_SUCCESS: {
		finish: {
			id: 'e477c612-7ab3-4e64-b711-03cef8bbe8cb',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	DEFECT_STATUSES_PROCESS_EDITION_SUCCESS: {
		finish: {
			id: 'f9794a1f-93bc-47e1-a658-aeefd5331420',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	PANEL_PROBLEMS_PRIORITIES_CREATION_SUCCESS: {
		finish: {
			id: '54cedf9c-d497-426a-98e0-ba4201d01f3c',
			dataTemplate: {
				name: 'name',
				priority: 'priority',
			},
		},
	},
	PANEL_PROBLEMS_PRIORITIES_EDITION_SUCCESS: {
		finish: {
			id: '3be0e22d-e1ec-4df8-8563-d3a4dbdb5308',
			dataTemplate: {
				name: 'name',
				priority: 'priority',
			},
		},
	},
	PANEL_PROBLEMS_STATUSES_CREATION_SUCCESS: {
		finish: {
			id: 'fc5f7747-bc98-4716-a8d1-562475fa28c3',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	PANEL_PROBLEMS_STATUSES_EDITION_SUCCESS: {
		finish: {
			id: '11ede2d8-71e1-40f6-8843-f35f6787d3c0',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	SAP_STATUSES_CREATION_SUCCESS: {
		finish: {
			id: '6fd3d9ba-626e-4f5d-8fb6-351aeb128c8f',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	SAP_STATUSES_EDITION_SUCCESS: {
		finish: {
			id: 'e09796fd-bbe3-47ba-ab08-c6c3cc05ff64',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	ROUTE_STATUSES_CREATION_SUCCESS: {
		finish: {
			id: '1ab3f0af-6b48-47e6-8c60-b5e0f3ded173',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	ROUTE_STATUSES_EDITION_SUCCESS: {
		finish: {
			id: 'bf8793d6-2ed2-4f1a-8f5d-7dc60f16b856',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	SCHEDULES_STATUSES_CREATION_SUCCESS: {
		finish: {
			id: '251c2b79-c26b-47aa-b86b-c5c31499d3e6',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	SCHEDULES_STATUSES_EDITION_SUCCESS: {
		finish: {
			id: '35ecc714-3178-41ef-b5ce-110d78d1c998',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	STAFF_WORK_SCHEDULES_CREATION_SUCCESS: {
		finish: {
			id: 'cc595a67-f2c0-4da7-8136-062719063a09',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	STAFF_WORK_SCHEDULES_EDITION_SUCCESS: {
		finish: {
			id: 'c1969451-97dc-4526-85f0-7005b01c1de0',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	DETOURS_STATUSES_CREATION_SUCCESS: {
		finish: {
			id: '9e493eb4-6b15-4eff-91a6-f18b226568b0',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	DETOURS_STATUSES_EDITION_SUCCESS: {
		finish: {
			id: '705315a9-d7d1-4dc2-b6c5-8930819f59cc',
			dataTemplate: {
				name: 'name',
			},
		},
	},
	DEFECT_TYPICAL_CREATION_SUCCESS: {
		finish: {
			id: '0953cda0-8d00-4b43-85cc-6aaefc8db0e5',
			dataTemplate: {
				name: 'name',
				parent: 'parentId',
			},
		},
	},
	DEFECT_TYPICAL_EDITION_SUCCESS: {
		finish: {
			id: 'de02f318-661b-49ff-806c-ce054d6b7821',
			dataTemplate: {
				name: 'name',
				parent: 'parentId',
			},
		},
	},
	DEFECT_TYPICAL_GROUP_CREATION_SUCCESS: {
		finish: {
			id: '99c55918-e4c8-4bd4-92d2-ba590d9cd31a',
			dataTemplate: {
				name: 'name',
				parent: 'parentId',
			},
		},
	},
	DEFECT_TYPICAL_GROUP_EDITION_SUCCESS: {
		finish: {
			id: '9841633d-cbfc-435d-97f8-34a76f65e871',
			dataTemplate: {
				name: 'name',
				parent: 'parentId',
			},
		},
	},
	STAFF_CREATION_SUCCESS: {
		finish: {
			id: '3f3e3fe4-a141-4c54-a464-a9b78f0f09f4',
			dataTemplate: {
				userId: 'userId',
				departmentId: 'departmentId',
			},
		},
	},
	STAFF_EDITION_SUCCESS: {
		finish: {
			id: '67e60cae-2dc3-4027-93ad-9bea9da842d0',
			dataTemplate: {
				userId: 'userId',
				departmentId: 'departmentId',
			},
		},
	},
};
