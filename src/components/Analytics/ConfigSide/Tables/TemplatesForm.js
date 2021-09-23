import React, {useEffect, useState} from 'react';
import {
	Layout,
	Space,
	Title,
	FormItems,
	notificationError,
	setDataStore,
} from 'rt-design';
import {paths} from '../../../../constants/paths';
import {LeftOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router';
import {parseById} from './parseFunc';
import {apiGetFlatDataByConfigName} from '../../../../apis/application.api';
import {useDispatch} from 'react-redux';

export const TemplatesForm = ({analyticId}) => {
	const [config, setConfig] = useState({
		filterConfig: ['---'],
		templates: ['---'],
		name: '',
	});
	const history = useHistory();
	const dispatch = useDispatch();
	const onBackPage = () => history.push(`${paths.ANALYTICS_MAIN.path}`);

	useEffect(() => {
			if (analyticId) {
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
		}

		// eslint-disable-next-line
	}, []);

	if (config.name !== '') {
		setTimeout(() => {
			dispatch(setDataStore('analytics.form.templates', {...config}));
		}, 1000);
	}

	return (
		<Layout>
			<div style={{display: 'flex', margin: '12px 0'}}>
				<Space
					style={{position: 'absolute', cursor: 'pointer'}}
					className={'ant-typography ant-typography-secondary'}
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
			{
				<>
					<FormItems
						className={'mt-0'}
						items={parseById(config.filterConfig)}
					/>
				</>
			}
		</Layout>
	);
};
