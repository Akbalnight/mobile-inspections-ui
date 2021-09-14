import React, {useState} from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Button, Form, Input, notificationError} from 'rt-design';
import {FormItems} from 'rt-design';
import {genericDownloadRequest, genericRequest} from '../../../apis/network';
import {apiGetConfigByName} from '../../../apis/application.api';

const DebugRabbit = () => {
	// Таблицы log_system_event_types, log_system_events, log_http_requests, files
	// Конфиги query: mobileFiles, save: file

	const taskOperations = [
		{
			typeExecutor: 'flat',
			configName: 'detours',
			body: {startDate: '2021-08-15T21:00:00.000Z'},
			output: 'data.detours',
		},
		{
			typeExecutor: 'createExcel',
			body: {sheets: ['Обходы']},
			output: 'excel.workbook',
		},
		{
			typeExecutor: 'addTableExcel',
			// configName: 'detours',
			body: {
				file: 'excel.workbook',
				sheet: 'Обходы',
				startCell: {row: 0, col: 0},
				fields: [
					{
						header: 'Наименование',
						name: 'name',
						align: 'center',
						width: 80,
						// colSpan: 2,
						// rowSpan: 2,
						// typeData: 'date',
						// headerStyle: {
						// 	border: {top: true, right: true, bottom: true},
						// 	font: {size: 12, bold: true},
						// },
						// cellStyle: {border: {right: true}},
					},
					{
						header: 'Дата',
						name: 'dateStartPlan',
						align: 'center',
						width: 80,
						colSpan: 2,
						rowSpan: 2,
						typeData: 'date',
						// dataFormat: "yyyy-MM HH:mm"
					},
				],
				data: [], // 'data.detours.rows',
			},
			output: 'excel.lastRowCol',
		},
		{
			typeExecutor: 'saveExcel',
			configName: 'file',
			body: {file: 'excel.workbook', fileName: 'file-name.xlsx'},
			output: 'excel.file',
		},
		{
			typeExecutor: 'save',
			configName: 'reportHistoryFile',
			body: {
				id: null,
				reportId: 'b40715b9-58b7-4c0c-9c8a-6c58601a60c5',
				name: 'Отчет от 14.09',
				// name: "data.detours.rows.JS{[data.detours.length] - 1}JS.name", //'Отчет от 14.09', // JS{new Date().getTime()}JS
				// data: 'data.detours.rows',
				data: 'data.detours.rows',
				files: {excelId: 'excel.file.id'},
			},
		},
		{
			typeExecutor: 'output',
			body: {
				laRowCol: 'excel.lastRowCol',
				length: 'data.detours.length',
				routes: 'data.detours.rows',
				file: 'excel.file.id',
				excel: 'excel.file',
			},
		},
	];

	const dataTask = [
		/** ========== DATA ========== */
		{
			typeExecutor: 'flat',
			configName: 'historyValues',
			body: {
				idPoint: '4aca241c-b701-4ed3-8fcd-f67aff27da08',
				from: '2019-12-01T00:00:00.000Z',
				to: '2020-01-01T00:00:00.000Z',
				part: 'D',
			},
			pageable: {page: 0, size: 1},
			output: 'report.historyValues',
		},
		// {
		// 	typeExecutor: 'object',
		// 	configName: 'routes',
		// 	body: {id: '1220f37b-0a7e-4da7-b940-bac2ee38b216'},
		// 	pageable: {page: 0, size: 2},
		// 	output: 'report.route.one',
		// },
		// {
		// 	typeExecutor: 'object',
		// 	configName: 'routes',
		// 	body: {id: '37f77a31-28cf-4522-b48a-a23998bdd8d9'},
		// 	pageable: {page: 0, size: 2},
		// 	output: 'report.route.two',
		// },
		/** ========== EXCEL ========== */
		{
			typeExecutor: 'createExcel',
			body: {
				sheets: [
					// 'report.route.one.name',
					'Ведомость',
					// 'report.route.two.code',
				],
			},
			output: 'excel.workbook',
		},
		{
			// + Таблица из простого массива, +colSpan, +rowSpan, Ячейка со сложным текстом и стилями
			typeExecutor: 'addTableExcel',
			// configName: 'defects',
			body: {
				file: 'excel.workbook',
				sheet: 'Ведомость',
				startCell: {row: 13, col: 0},
				// hiddenHeader: true,
				// headerHeight: 0,
				// rowHeight: 30,
				fields: [
					{
						header: 'Дата/время',
						name: 'ts',
						align: 'center',
						width: 80,
						colSpan: 2,
						rowSpan: 2,
						typeData: 'date',
						headerStyle: {
							border: {top: true, right: true, bottom: true},
							font: {size: 12, bold: true},
						},
						cellStyle: {border: {right: true}},
					}, // dataFormat: "yyyy-MM-dd HH:mm:ss"
					{
						header: 'Q [Гкал]',
						name: 'q',
						align: 'right',
						width: 70,
						colSpan: 2,
						rowSpan: 2,
						typeData: 'double',
						headerStyle: {
							border: {top: true, right: true, bottom: true},
							font: {size: 15},
						},
						cellBorder: {right: true},
						// dataFormat: "#,##0.00"
					},
					{
						header: 'M1 [т]',
						name: 'm1',
						align: 'right',
						width: 70,
						// colSpan: 2,
						// rowSpan: 2,
						typeData: 'double',
						dataFormat: '#,##0.000',
						headerBorder: {top: true, right: true, bottom: true},
						cellStyle: {border: {right: true}, font: {size: 8}},
					},
					{
						header: 'M2 [т]',
						name: 'm2',
						align: 'right',
						width: 70,
						// colSpan: 2,
						// rowSpan: 2,
						typeData: 'double',
						dataFormat: '#,##0.000',
						headerBorder: {top: true, right: true, bottom: true},
						cellBorder: {right: true},
					},
				],
				data: [], // 'report.historyValues.rows',
				// data: ['report.historyValues.rows.0', 'report.historyValues.rows.JS{var row = [report.historyValues.rows.0]; row.ts;}'],
				// data: ['report.historyValues.rows.JS{ if([report.historyValues.length] > 0) 0 }', 'report.historyValues.rows.JS{[report.historyValues.length] - 1}'],
				// data: ['report.historyValues.rows.JS{ function calc() { return 28 - 1; }; calc() }JS', 'report.historyValues.rows.JS{[report.historyValues.length] - 1}JS'],
				// data: [
				// 	'report.historyValues.rows.JS{ ' +
				// 		'function calc(length) { if(length > 0) return 19; }; calc([report.historyValues.length]) }JS',
				// 	'report.historyValues.rows.JS{[report.historyValues.length] - 1}JS',
				// ],
			},
			output: 'excel.lastRowIndex',
		},
		// {
		// 	typeExecutor: 'addRowExcel', // addTableExcel // addRow // addCell
		// 	body: {
		// 		file: 'excel.workbook',
		// 		sheet: 'report.route.one.name',
		// 		startCell: {row: 'excel.lastRowIndex.rowIndex', col: 0},
		// 		data: 'report.route.one',
		// 	},
		// 	output: 'excel.lastRowIndex',
		// },
		// {
		// 	typeExecutor: 'addRowExcel', // addTableExcel // addRow // addCell
		// 	body: {
		// 		file: 'excel.report',
		// 		sheet: 'route.one.name',
		// 		startCell: {row: 5, col: 5},
		// 		data: 'route.one',
		// 	},
		// 	output: 'excel.lastRowIndex',
		// },
		// {
		// 	typeExecutor: 'addRowExcel', // addTableExcel // addRow // addCell
		// 	body: {
		// 		file: 'excel.report',
		// 		sheet: 'route.one.name',
		// 		startCell: {row: 6, col: 5},
		// 		data: 'route.two',
		// 	},
		// 	output: 'excel.lastRowIndex',
		// },
		{
			typeExecutor: 'saveExcel',
			configName: 'file',
			body: {
				file: 'excel.workbook',
				fileName: 'file-name.xlsx',
			},
			output: 'excel.file',
			// localhost:3001/api/dynamicdq/data/file/mobileFiles/1b0889fb-9aa0-48a4-9d21-2d8d7b349675
		},
		{
			typeExecutor: 'output',
			body: {
				file: 'excel.file.id',
				routeName: 'report.route.one.name',
				routeCode: 'report.route.two.code',
				data: 'report.defects',
			},
		},
		// {
		// 	typeExecutor: 'event',
		// 	body: {
		// 		id: '845c2def-c0b4-472f-bcab-45e6476ab32c',
		// 		dataTemplate: {
		// 			routeId: 'id',
		// 			// routeLink: paths.DEBUG_RABBIT.path,
		// 			routeName: 'header.name',
		// 			routeDur: 'duration',
		// 		},
		// 	},
		// },
		// {
		// 	typeExecutor: 'queue',
		// 	configName: 'notifications',
		// 	// body: 'routesCount'
		// 	body: {
		// 		id: 'some text',
		// 		routes: {
		// 			route_2: {
		// 				count: 'routesCount',
		// 			},
		// 		},
		// 	},
		// },
		// {
		// 	// equal not_equal  and or / greater_equal / less_equal / greater / less
		// 	typeExecutor: 'equal',
		// 	body: {type: 'int', leftCondition: 'routesCount', rightCondition: 0},
		// 	output: 'routes_count_is_zero',
		// },
		// {
		// 	typeExecutor: 'log',
		// 	body: {value: 'routes_count_is_zero'},
		// }, {
		// 	typeExecutor: "branch",
		// 	body: { condition: 'routes_count_is_zero' },
		// 	output: JSON.stringify({ true: "ExecTrue", false: "ExecFalse" })
		// }, {
		// 	id: 'ExecTrue',
		// 	typeExecutor: "log",
		// 	body: {value: 'True'},
		// }, {
		// 	typeExecutor: "return",
		// }, {
		// 	id: 'ExecFalse',
		// 	typeExecutor: "log",
		// 	body: { value: 'False' },
		// }, {

		// },
	];

	let items = [
		{
			componentType: 'Button',
			label: 'Demo',
		},
		{
			componentType: 'Layout',
			style: {width: '100%'},
			children: [
				{
					componentType: 'Table',
					LoadConfigName: 'routes',
				},
			],
		},
	];

	const resolveProps = (items) =>
		items.map((item) => {
			if (item.LoadConfigName) {
				item.requestLoadConfig = apiGetConfigByName(
					item.LoadConfigName
				);
			}
			if (item.children) resolveProps(item.children);

			return item;
		});
	items = resolveProps(items);

	const onClickButton = () => {
		genericRequest({
			url: `/api/dynamicdq/task/sync`,
			method: 'POST',
			data: taskOperations,
		})
			.then((r) => {
				console.log('onClickButton', r);
				setId(r.data.file);
			})
			.catch((error) =>
				notificationError(error, 'Ошибка при выполнении')
			);
	};

	const [id, setId] = useState();
	const onClickLoadFile = () => {
		genericDownloadRequest({
			url: `/api/dynamicdq/data/file/mobileFiles/${id}`,
			method: 'GET',
		})
			.then((r) => console.log('onClickLoadFile', r))
			.catch((error) => notificationError(error, 'Ошибка при получении'));
	};

	return (
		<BasePage>
			<Form>
				<Button onClick={onClickButton}>Send task</Button>
				<Input value={id} onChange={(e) => setId(e.target.value)} />
				<Button onClick={onClickLoadFile}>Load</Button>
			</Form>
			{/*<FormItems items={items} />*/}
		</BasePage>
	);
};

export default DebugRabbit;
