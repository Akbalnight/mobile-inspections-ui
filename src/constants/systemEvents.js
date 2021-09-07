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
	CONTROL_POINTS_CREATION_SUCCESS: {
		finish: {
			id: '6b26dc03-3ead-41bf-b766-e9a74d919aac',
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
				detourExecutor: 'executorId',
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
	TECH_MAPS_CREATION_SUCCESS: {
		finish: {
			id: '495a0f5a-f9eb-40df-bb6e-dde7e0c6a459',
			dataTemplate: {
				tmName: 'name',
				tmParent: 'parentId',
			},
		},
	},
};
