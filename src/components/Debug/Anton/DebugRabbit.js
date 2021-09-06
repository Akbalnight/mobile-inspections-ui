import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Button, notificationError} from 'rt-design';
import {FormItems} from 'rt-design';
import {genericRequest} from '../../../apis/network';
import {apiGetConfigByName} from '../../../apis/application.api';

const DebugRabbit = () => {
	const dataTask = [
		{
			typeExecutor: 'flat',
			configName: 'routes',
			body: {},
			pageable: {page: 0, size: 2},
			events: {
				start: {
					id: '845c2def-c0b4-472f-bcab-45e6476ab32c',
					dataTemplate: {
						routeId: 'id',
						// routeLink: paths.DEBUG_RABBIT.path,
						routeName: 'header.name',
						routeDur: 'duration',
					},
				},
			},
			output: 'routesData',
		},
		{
			typeExecutor: 'object',
			configName: 'routes',
			body: {},
			pageable: {page: 0, size: 2},
			output: 'header',
		},
		{
			typeExecutor: 'excelCreate',
			output: 'file-name.xlsx',
		},
		{
			typeExecutor: 'excelAddTable', // addRow // addCell
			body: {
				file: 'file-name.xlsx',
				startCell: {row: 1, col: 1},
				data: 'routesData',
			},
			output: 'route.lastRowIndex',
		},
		{
			typeExecutor: 'excelAddRow',
			body: {
				file: 'file-name.xlsx',
				startCell: {row: 'route.lastRowIndex', col: 1},
				data: 'header.name',
			},
			output: 'lastRowIndex',
		},
		{
			typeExecutor: 'excelSave',
			configName: 'routes',
			body: {
				file: 'file-name.xlsx',
				dataObject: {},
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
		// 	typeExecutor: 'output',
		// 	body: 'routesData',
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
			url: `/api/dynamicdq/rabbit/task`,
			// url: `/api/dynamicdq/rabbit/task`,
			method: 'POST',
			data: dataTask,
		})
			.then((r) => console.log('DebugRabbit', r))
			.catch((error) =>
				notificationError(error, 'Ошибка при сохранении')
			);
	};

	return (
		<BasePage>
			<Button onClick={onClickButton}>Send task</Button>
			<FormItems items={items} />
		</BasePage>
	);
};

export default DebugRabbit;
