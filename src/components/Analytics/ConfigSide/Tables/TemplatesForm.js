import React, {useState, useEffect} from 'react';
import {Layout, Space, Title, FormItems, notificationError} from 'rt-design';
import {paths} from '../../../../constants/paths';
import {LeftOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router';
import {apiGetFlatDataByConfigName} from '../../../../apis/catalog.api';
import {parseById} from './parseFunc';

export const TemplatesForm = ({analyticId}) => {
	const history = useHistory();
	const [filterConfig, setFilterConfig] = useState({filterConfig: ['---']});
	const onBackPage = () => history.push(`${paths.ANALYTICS_MAIN.path}`);

	useEffect(() => {
		apiGetFlatDataByConfigName('analyticReports')({
			data: {id: analyticId},
			params: {},
		})
			.then((response) => {
				console.log(response.data);
				setFilterConfig(response.data[0]);
			})
			.catch((error) =>
				notificationError(error, 'Ошибка загрузки маршрута')
			);

		// eslint-disable-next-line
	}, []);

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
					<Title
						level={4}
						style={{textAlign: 'center', marginBottom: '2px'}}
					>
						{filterConfig.name}
					</Title>
				</Space>
			</div>
			{filterConfig && (
				<FormItems
					className={'mt-0'}
					items={parseById(filterConfig.filterConfig)}
				/>
			)}
		</Layout>
	);
};
