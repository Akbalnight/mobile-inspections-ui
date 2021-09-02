export const analyticConfigs = (paths) => [
	{
		name: 'detours',
		path: `${paths.ANALYTICS_MAIN.path}/detours`,
		title: 'Аналитика по завершенным обходам',
	},
	{
		name: 'defects',
		path: `${paths.ANALYTICS_MAIN.path}/defects`,
		title: 'Аналитика по дефектам',
	},
	{
		name: 'constructorReports',
		path: `${paths.ANALYTICS_MAIN.path}/constructorReports`,
		title: 'Конструктор отчетов',
	},
];
