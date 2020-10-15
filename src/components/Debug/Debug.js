import React from 'react';
import BasePage from '../App/BasePage';
import {Form} from 'rt-design';

const Debug = () => {
	const config = {
		name: 'debugForm',
		labelAlign: 'right',
		initialValues: {},
		children: [
			{
				type: 'Row',
				gutter: [16, 16],
				children: [
					{
						type: 'Col',
						span: 15,
						children: [
							{
								type: 'Item',
								itemProps: {
									label: 'Input 1',
									name: 'input_1',
									rule: {
										message: 'Заполните input_1',
										required: true
									},
									inputType: 'Input',
									inputProps: {}
								}
							},
							{
								type: 'Item',
								itemProps: {
									label: 'Input 2',
									name: 'input_2',
									rule: {
										message: 'Заполните input_2',
										required: true
									},
									inputType: 'Input',
									inputProps: {}
								}
							}
						]
					},
					{
						type: 'Col',
						span: 15,
						children: [
							{
								type: 'Item',
								itemProps: {
									label: 'Input 3',
									name: 'input_3',
									rule: {
										message: 'Заполните input_3',
										required: true
									},
									inputType: 'Input',
									inputProps: {}
								}
							},
							{
								type: 'Item',
								itemProps: {
									label: 'Input 4',
									name: 'input_4',
									rule: {
										message: 'Заполните input_4',
										required: true
									},
									inputType: 'Input',
									inputProps: {}
								}
							}
						]
					}
				]
			},
			{
				type: 'Row',
				gutter: [8, 8],
				children: [
					{
						type: 'Col',
						span: 24,
						children: [
							{
								type: 'Item',
								itemProps: {
									label: 'Input 5',
									name: 'input_5',
									rule: {
										message: 'Заполните input_5',
										required: true
									},
									inputType: 'Input',
									inputProps: {}
								}
							}
						]
					}
				]
			},
			{
				type: 'Item',
				itemProps: {
					label: 'Input 6',
					name: 'input_6',
					rule: {
						message: 'Заполните input_6',
						required: true
					},
					inputType: 'Input',
					inputProps: {}
				}
			}
		]
		// items: [
		//     {
		//         label: 'Input 1',
		//         name: 'input_1',
		//         rule: {
		//             message: 'Заполните input_1',
		//             required: true
		//         },
		//         typeInput: 'Input',
		//         propsInput: {}
		//     },
		//     {
		//         label: 'Input 2',
		//         name: 'input_2',
		//         rule: {
		//             message: 'Заполните input_2',
		//             required: true
		//         },
		//         typeInput: 'Input',
		//         propsInput: {}
		//     },
		//     {
		//         label: 'Input 3',
		//         name: 'input_3',
		//         rule: {
		//             message: 'Заполните input_3',
		//             required: true
		//         },
		//         typeInput: 'Input',
		//         propsInput: {}
		//     },
		//     {
		//         label: 'Input 4',
		//         name: 'input_4',
		//         rule: {
		//             message: 'Заполните input_4',
		//             required: true
		//         },
		//         typeInput: 'Input',
		//         propsInput: {}
		//     }
		// ]
	};

	return (
		<BasePage>
			<Form {...config} />
		</BasePage>
	);
};

Debug.propTypes = {};

export default Debug;
