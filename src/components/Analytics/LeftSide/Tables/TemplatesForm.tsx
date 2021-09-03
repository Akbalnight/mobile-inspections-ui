import React from 'react';
import {Layout, Space, Title, deprecated, Text, Row} from 'rt-design';
import {paths} from '../../../../constants/paths';
import {LeftOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router';

const {Form} = deprecated;

export const TemplatesForm = ({analyticId}: {analyticId: string}) => {
	// плохо
	// console.log(analyticId)
	const history = useHistory();

	const onBackPage = () => history.push(`${paths.ANALYTICS_MAIN.path}`);

	/**
	 * export const getObjectExcludedProps = (object, exclude) => {
    let returnObject = {};
    Object.keys(object).forEach((key) =>
        !exclude.includes(key) ? (returnObject[key] = object[key]) : undefined // было null
    );
    return returnObject;
};
	 *
	 * */

	const settingsConfig = {
		name: 'settingConfigForm',
		labelCol: {span: 8},
		wrapperCol: {span: 16},
		body: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					label: 'Тут будет полезная информация',
					className: 'mb-0',
					level: 3,
				},
			},
		],
	};

	return (
		<Layout>
			<div style={{display: 'flex', margin: '12px 0'}}>
				<Space
					style={{position: 'absolute', cursor: 'pointer'}}
					className={'ant-typography ant-typography-secondary ml-16'}
					onClick={onBackPage}
				>
					<LeftOutlined style={{fontSize: '16px'}} />
					<Title
						level={5}
						type='secondary'
						style={{marginBottom: '2px'}}
					>
						Назад
					</Title>
				</Space>
			</div>
			{/*<Form {...settingsConfig}/>*/}
			{/*			<Space*/}
			{/*			subscribe={[*/}
			{/*				{*/}
			{/*					name:'inputJson',*/}
			{/*					withMount: true,*/}
			{/*					path:'rtd.analytics.templatesTable.events.onRowClick',*/}
			{/*					onChange:({value, setSubscribeProps})=>{*/}
			{/*						// console.log(value.value)*/}
			{/*						try {*/}
			{/*						const section=JSON.parse(" {\"selected\": {\n" +*/}
			{/*							"              \"description\": \"Основной реестр выделенные строки\",\n" +*/}
			{/*							"              \"type\": \"<Title label={'kjdfhlasj'}/>\"\n" +*/}
			{/*							"            }}")*/}
			{/*							console.log(typeof Object(section.selected.type))*/}
			{/*							setSubscribeProps({*/}
			{/*								split: Object(section.selected.type)*/}
			{/*							})*/}

			{/*						} catch(err){*/}
			{/*							console.log(1)*/}
			{/*						}*/}
			{/*					}*/}
			{/*				}*/}
			{/*			]}>*/}
			{/*s*/}
			{/*				ds*/}
			{/*				<div>ws</div>*/}
			{/*			</Space>*/}
		</Layout>
	);
};
