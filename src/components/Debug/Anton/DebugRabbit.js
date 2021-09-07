import React, {useState} from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Button, Form, Input, notificationError} from 'rt-design';
import {FormItems} from 'rt-design';
import {genericDownloadRequest, genericRequest} from '../../../apis/network';
import {apiGetConfigByName} from '../../../apis/application.api';

const DebugRabbit = () => {
	const dataTask = [
		/** ========== DATA ========== */
		{
			typeExecutor: 'flat',
			configName: 'defects',
			body: {},
			pageable: {page: 0, size: 1},
			output: 'report.data.defects',
		},
		{
			typeExecutor: 'object',
			configName: 'routes',
			body: {id: '1220f37b-0a7e-4da7-b940-bac2ee38b216'},
			pageable: {page: 0, size: 2},
			output: 'report.data.route.one',
		},
		{
			typeExecutor: 'object',
			configName: 'routes',
			body: {id: '37f77a31-28cf-4522-b48a-a23998bdd8d9'},
			pageable: {page: 0, size: 2},
			output: 'report.data.route.two',
		},
		/** ========== EXCEL ========== */
		{
			typeExecutor: 'createExcel',
			body: {
				sheets: [
					'report.data.route.one.name',
					'MySheet',
					'route.two.code',
				],
			},
			output: 'excel.workbook',
		},
		{
			typeExecutor: 'addTableExcel',
			configName: 'defects',
			body: {
				file: 'excel.workbook',
				sheet: 'route.one.name',
				startCell: {row: 0, col: 0},
				data: 'report.data.defects',
			},
			output: 'excel.lastRowIndex',
		},
		{
			typeExecutor: 'addRowExcel', // addTableExcel // addRow // addCell
			body: {
				file: 'excel.workbook',
				sheet: 'route.one.name',
				startCell: {row: 'excel.lastRowIndex.rowIndex', col: 0},
				data: 'report.data.route.one',
			},
			output: 'excel.lastRowIndex',
		},
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
				routeName: 'report.data.route.one.name',
				routeCode: 'report.data.route.two.code',
				data: 'report.data.defects',
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
			data: dataTask,
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
