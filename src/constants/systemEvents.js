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
};
