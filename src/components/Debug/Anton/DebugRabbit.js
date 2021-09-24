import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';

import {Button, DatePicker, Form, Input, notificationError} from 'rt-design';
import {FormItems} from 'rt-design';
import {genericDownloadRequest, genericRequest} from '../../../apis/network';
import {apiGetConfigByName} from '../../../apis/application.api'


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
			typeExecutor: 'count',
			configName: 'routes',
			body: {},
			pageable: {page: 0, size: 2},
			output: 'routesCount',
		},
		{
			typeExecutor: 'event',
			body: {
				id: '845c2def-c0b4-472f-bcab-45e6476ab32c',
				dataTemplate: {
					routeId: 'id',
					// routeLink: paths.DEBUG_RABBIT.path,
					routeName: 'header.name',
					routeDur: 'duration',
				},
			},
		},
		{
			typeExecutor: 'queue',
			configName: 'notifications',
			// body: 'routesCount'
			body: {
				id: 'some text',
				routes: {
					route_2: {
						count: 'routesCount',
					},
				},
			},
		},
		{
			typeExecutor: 'output',
			body: 'routesData',
		},
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
		</BasePage>
	);
};

export default DebugRabbit;
