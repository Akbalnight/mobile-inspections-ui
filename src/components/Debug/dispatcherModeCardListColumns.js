export default [
	{
		name: 'nameChart',
		cellRenderer: ({rowData}) => rowData.codeTypePoint === '02' ? 'Не исп.' : rowData.nameChart
	},
	{
		name: 't1ParamName',
		headerClassName: 'ModeCard_t1Header'
	},
	{
		name: 't1TechMin',
		headerClassName: 'ModeCard_t1Header',
		cellRenderer: ({cellData, rowData}) => rowData.codeTypePoint === '02' ? cellData : `${cellData}%`
	},
	{
		name: 't1TechMax',
		headerClassName: 'ModeCard_t1Header',
		cellRenderer: ({cellData, rowData}) => rowData.codeTypePoint === '02' ? cellData : `${cellData}%`
	},
	{
		name: 't1EmergencyMin',
		headerClassName: 'ModeCard_t1Header',
		cellRenderer: ({cellData, rowData}) => rowData.codeTypePoint === '02' ? cellData : `${cellData}%`
	},
	{
		name: 't1EmergencyMax',
		headerClassName: 'ModeCard_t1Header',
		cellRenderer: ({cellData, rowData}) => rowData.codeTypePoint === '02' ? cellData : `${cellData}%`
	},
	{
		name: 't2ParamName',
		headerClassName: 'ModeCard_t2Header'
	},
	{
		name: 't2TechMin',
		headerClassName: 'ModeCard_t2Header',
		cellRenderer: ({cellData, rowData}) => rowData.codeTypePoint === '02' ? cellData : `${cellData}%`
	},
	{
		name: 't2TechMax',
		headerClassName: 'ModeCard_t2Header',
		cellRenderer: ({cellData, rowData}) => rowData.codeTypePoint === '02' ? cellData : `${cellData}%`
	},
	{
		name: 't2EmergencyMin',
		headerClassName: 'ModeCard_t2Header',
		cellRenderer: ({cellData, rowData}) => rowData.codeTypePoint === '02' ? cellData : `${cellData}%`
	},
	{
		name: 't2EmergencyMax',
		headerClassName: 'ModeCard_t2Header',
		cellRenderer: ({cellData, rowData}) => rowData.codeTypePoint === '02' ? cellData : `${cellData}%`
	},
	{
		name: 'p1ParamName',
		headerClassName: 'ModeCard_p1Header'
	},
	{
		name: 'p1',
		headerClassName: 'ModeCard_p1Header'
	},
	{
		name: 'p1TechMin',
		headerClassName: 'ModeCard_p1Header',
		cellRenderer: ({cellData}) => `${cellData}%`
	},
	{
		name: 'p1TechMax',
		headerClassName: 'ModeCard_p1Header',
		cellRenderer: ({cellData}) => `${cellData}%`
	},
	{
		name: 'p1EmergencyMin',
		headerClassName: 'ModeCard_p1Header',
		cellRenderer: ({cellData}) => `${cellData}%`
	},
	{
		name: 'p1EmergencyMax',
		headerClassName: 'ModeCard_p1Header',
		cellRenderer: ({cellData}) => `${cellData}%`
	},
	{
		name: 'p2ParamName',
		headerClassName: 'ModeCard_p2Header'
	},
	{
		name: 'p2',
		headerClassName: 'ModeCard_p2Header'
	},
	{
		name: 'p2TechMin',
		headerClassName: 'ModeCard_p2Header',
		cellRenderer: ({cellData}) => `${cellData}%`
	},
	{
		name: 'p2TechMax',
		headerClassName: 'ModeCard_p2Header',
		cellRenderer: ({cellData}) => `${cellData}%`
	},
	{
		name: 'p2EmergencyMin',
		headerClassName: 'ModeCard_p2Header',
		cellRenderer: ({cellData}) => `${cellData}%`
	},
	{
		name: 'p2EmergencyMax',
		headerClassName: 'ModeCard_p2Header',
		cellRenderer: ({cellData, rowData}) => rowData.codeTypePoint !== '02' ? cellData : `${cellData}%`
	}
];
