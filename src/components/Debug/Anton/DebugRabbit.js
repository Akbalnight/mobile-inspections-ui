import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Button} from 'rt-design';
import {genericRequest} from '../../../apis/network';

const DebugRabbit = () => {
	const dataTask = [
		{
			executorType: 'flat',
			configName: 'routes',
			body: {},
			pageable: {page: 0, size: 2},
			output: 'routes.data',
		},
		{
			executorType: 'count',
			configName: 'routes',
			body: {},
			pageable: {page: 0, size: 2},
			output: 'routes.count',
		},
		{
			// equal not_equal  and or / greater_equal / less_equal / greater / less
			executorType: 'equal',
			body: {type: 'bool', leftCondition: 'true', rightCondition: true},
			output: 'routes_count_is_zero',
		},
		{
			executorType: 'log',
			body: {value: 'routes_count_is_zero'},
			// }, {
			//     executorType: "branch",
			//     body: { condition: 'routes_count_is_zero' },
			//     output: JSON.stringify({ true: "ExecTrue", false: "ExecFalse" })
			// }, {
			//     id: 'ExecTrue',
			//     executorType: "log",
			//     body: { value: 'True' },
			// }, {
			//     id: 'ExecFalse',
			//     executorType: "log",
			//     body: { value: 'False' },
			// }, {
			//     executorType: "save",
			//     configName: "notifications",
			//     body: {
			//         id: "some text",
			//         routes: {
			//             data: 'routes.data',
			//             count: 'routes.count'
			//         }
			//     },
		},
	];

	const onClickButton = () => {
		genericRequest({
			url: `/api/dynamicdq/rabbit/task`,
			method: 'POST',
			data: dataTask,
		}).then((r) => console.log('DebugRabbit', r));
	};

	return (
		<BasePage>
			<Button onClick={onClickButton}>Send task</Button>
		</BasePage>
	);
};

export default DebugRabbit;
