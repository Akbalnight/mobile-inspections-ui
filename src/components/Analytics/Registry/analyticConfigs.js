export const analyticConfigs = (paths) => [
	{
		name: 'detours',
		path: `${paths.ANALYTICS.path}/detours`,
		title: 'Аналитика по завершенным отчетам',
	},
	{
		name: 'defects',
		path: `${paths.ANALYTICS.path}/defects`,
		title: 'Аналитика по дефектам',
	},
	{
		name: 'constructorReports',
		path: `${paths.ANALYTICS.path}/constructorReports`,
		title: 'Конструктор отчетов',
	},
];
