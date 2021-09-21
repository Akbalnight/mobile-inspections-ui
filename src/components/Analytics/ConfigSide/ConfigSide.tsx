import React, {useState, useEffect} from 'react';
import {
	Button,
	Form,
	FormBody,
	FormFooter,
	Layout,
	notificationError,
	Space,
	SubscribeOnChangeOptions,
	Title,
} from 'rt-design';
import {apiGetFlatDataByConfigName} from '../../../apis/application.api';
import {genericRequest} from '../../../apis/network';
import {TemplatesTableHeader} from '../tableProps';
import {parseById} from './Tables/parseFunc';
import {TemplatesForm} from './Tables/TemplatesForm';
import {TemplatesTable} from './Tables/TemplatesTable';

const taskOperations = [
	{
		typeExecutor: 'flat',
		configName: 'reportDetours',
		body: 'configData.filter',
		output: 'data.detours',
	},

	{
		typeExecutor: 'createExcel',
		body: {sheets: ['Обходы']},
		output: 'excel.workbook',
	},
	{
		typeExecutor: 'addTableExcel',
		configName: 'reportDetours',
		body: {
			file: 'excel.workbook',
			sheet: 'Обходы',
			startCell: {row: 0, col: 0},
			fields: [
				{
					header: 'Дата обнаружения',
					name: 'dateStartPlan',
					visible: true,
					align: 'center',
					typeData: 'date',
					width: 120,
					rowSpan: 2,
					headerStyle: 'configData.base.headerStyle',
					cellStyle: 'configData.base.cellStyle',
				},
				{
					header: 'Маршрут',
					name: 'routeName',
					visible: true,
					align: 'center',
					width: 120,
					rowSpan: 2,
					headerStyle: 'configData.base.headerStyle',
					cellStyle: 'configData.base.cellStyle',
				},
				{
					header: 'Пользователь',
					name: 'staffName',
					visible: true,
					align: 'center',
					width: 120,
					rowSpan: 2,
					headerStyle: 'configData.base.headerStyle',
					cellStyle: 'configData.base.cellStyle',
				},
				{
					header: 'Время начала обхода',
					name: 'dateStartPlan',
					visible: true,
					align: 'center',
					typeData: 'date',
					dataFormat: 'HH:mm:ss',
					width: 120,
					rowSpan: 2,
					headerStyle: 'configData.base.headerStyle',
					cellStyle: 'configData.base.cellStyle',
				},
				{
					header: 'Время окончания обхода',
					name: 'dateFinishPlan',
					visible: true,
					align: 'center',
					typeData: 'date',
					dataFormat: 'HH:mm:ss',
					width: 120,
					rowSpan: 2,
					headerStyle: 'configData.base.headerStyle',
					cellStyle: 'configData.base.cellStyle',
				},

				{
					header: 'Фактическая длительность обхода',
					name: 'durationPlan',
					visible: true,
					align: 'center',
					width: 120,
					rowSpan: 2,
					headerStyle: 'configData.base.headerStyle',
					cellStyle: 'configData.base.cellStyle',
				},
				{
					header: 'Фактическая длительность обхода',
					name: 'durationFact',
					visible: true,
					align: 'center',
					width: 120,
					rowSpan: 2,
					headerStyle: 'configData.base.headerStyle',
					cellStyle: 'configData.base.cellStyle',
				},
				{
					header: 'Пользователь',
					name: 'staffName',
					visible: true,
					align: 'center',
					width: 120,
					rowSpan: 2,
					headerStyle: 'configData.base.headerStyle',
					cellStyle: 'configData.base.cellStyle',
				},
				{
					header: 'Количество выявленных дефектов',
					name: 'countDetected',
					visible: true,
					align: 'center',
					width: 120,
					rowSpan: 2,
					headerStyle: 'configData.base.headerStyle',
					cellStyle: 'configData.base.cellStyle',
				},
				{
					header: 'Количество подтвержденных дефектов',
					name: 'countConfirmed',
					visible: true,
					align: 'center',
					width: 120,
					rowSpan: 2,
					headerStyle: 'configData.base.headerStyle',
					cellStyle: 'configData.base.cellStyle',
				},
				{
					header: 'Количество устраненных дефектов ',
					name: 'countEliminated',
					visible: true,
					align: 'center',
					width: 120,
					rowSpan: 2,
					headerStyle: 'configData.base.headerStyle',
					cellStyle: 'configData.base.cellStyle',
				},
			],
			data: 'data.detours.rows',
		},
		output: 'excel.lastRowCol',
	},
	{
		typeExecutor: 'saveExcel',
		configName: 'file',
		body: {file: 'excel.workbook', fileName: 'configData.base.fileName'},
		output: 'excel.file',
	},
	{
		typeExecutor: 'save',
		configName: 'reportHistoryFile',
		body: {
			id: null,
			reportId: 'configData.base.reportId',
			name: 'configData.base.fileName',
			data: 'data.detours.rows',
			files: {excelId: 'excel.file.id'},
		},
	},
	{
		typeExecutor: 'output',
		body: {
			lastRowCol: 'excel.lastRowCol',
			detours: 'data.detours.rows',
			file: 'excel.file.id',
			excel: 'excel.file',
      saveVar: 'configData'
		},
	},
];

export const ConfigSide = ({analyticId}: {analyticId: string}) => {
	const [config, setConfig] = useState({
		filterConfig: ['---'],
		templates: ['---'],
    name:''
	});

	useEffect(() => {
		apiGetFlatDataByConfigName('analyticReports')({
			data: {id: analyticId},
			params: {},
		})
			.then((response) => {
				setConfig(response.data[0]);
			})
			.catch((error) =>
				notificationError(error, 'Ошибка загрузки маршрута')
			);
		// eslint-disable-next-line
	}, []);

	const loadData = (callBack: (params: any) => void) => {
		return callBack(analyticId ? {id: analyticId} : null); //??
	};

	const pushOnButton = ({value}: SubscribeOnChangeOptions) => {
			let tmpObj: any = {
			typeExecutor: 'saveVar',
			body: {
				base: {
					fileName: `${config.name} JS{new Date().toLocaleString()}JS.xlsx`,
					reportId: analyticId,
					headerStyle: {
						border: {
							top: true,
							right: true,
							bottom: true,
							left: true,
						},
						font: {size: 12, bold: true},
					},
					cellStyle: {
						border: {right: true, bottom: true, left: true},
					},
				},
				filter: {},
			},
			output: 'configData',
		};
		for (let key in value.extraData) {
			if (typeof value.extraData[key] === 'object') {
				tmpObj.body.filter[key] = value.extraData[key].format();
			} else {
				tmpObj.body.filter[key] = value.extraData[key];
			}
		}

		console.log(tmpObj);
		genericRequest({
			url: `/api/dynamicdq/task/sync`,
			method: 'POST',
			data: [tmpObj, ...config.templates],
		})
			.then((r) => {
				console.log('onClickButton', r);
			})
			.catch((error) =>
				notificationError(error, 'Ошибка при выполнении')
			);
	};

	const content = analyticId ? (
		<TemplatesForm analyticId={analyticId} fields={config.filterConfig} />
	) : (
		<>
			<Title level={4} style={{padding: '24px 24px 10px 24px'}}>
				Отчет
			</Title>
			<Layout>
				<TemplatesTableHeader />
				<TemplatesTable />
			</Layout>
		</>
	);

	const footer = analyticId ? (
		<Space
			style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}
		>
			<Button
				dispatch={{
					path: 'analytics.form.events.onReload',
				}}
			>
				Сбросить
			</Button>
			<Button
				type={'primary'}
				htmlType={'submit'}
				dispatch={{
					path: 'analytics.form.events.onSubmit',
					extraData: 'rtd.analytics.filter.data',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'itselfSubscribe',
						path: 'rtd.analytics.form.events.onSubmit',
						onChange: pushOnButton,
					},
				]}
			>
				Сформировать
			</Button>
		</Space>
	) : null;

	return (
		<Form
			name={'configForm'}
			loadInitData={loadData}
			// onFinish={console.log}
		>
			<FormBody
				scrollable={false}
				noPadding={true}
				style={{padding: '0 24px 24px 24px'}}
			>
				{content}
			</FormBody>
			<FormFooter>{footer}</FormFooter>
		</Form>
	);
};
