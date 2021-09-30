// @ts-ignore
import {BasePage} from 'mobile-inspections-base-ui';
import {LeftOutlined} from '@ant-design/icons';
import {useHistory, useParams} from 'react-router';
import {
	Form,
	FormBody,
	Space,
	Table,
	TablesSubscribeOnChangeOptions,
	Title,
} from 'rt-design';
import {apiGetConfigByName, apiGetFlatDataByConfigName} from '../../../apis/application.api';
import {paths} from '../../../constants/paths';

export const ReportView: React.FC = () => {
	const history = useHistory();
	const {analyticId, id} = useParams<{analyticId: string; id: string}>();
  
	const onBackPage = () =>
  history.push(`${paths.ANALYTICS_MAIN.path}/${analyticId}`);
  
	if (analyticId) {
    /**
     * Тут нужно будет сделать запрос 1 по analyticId, templates->addTableExcel->body->fields->[]
     * Нужно в БД положить названия кофигов чтобы доставть отттуда
     * в запросе 2, заменить данные и вернуть Promise.resolve()
     * 
     * план для ближайших дней
     */
    // apiGetFlatDataByConfigName('analyticReports')({data:{id:analyticId}, params:{}}).then(console.log)//1
    // apiGetConfigByName('reportDefects')().then(console.log);//2
	}

	const loadConfig = ({data, params}: {data: any; params: any}) => {
		const newData = {...data};

		return Promise.resolve();
	};
	return (
		<BasePage>
			<Form>
				<FormBody noPadding={true}>
					<Space
						style={{
							position: 'relative',
							cursor: 'pointer',
							margin: '20px 20px 10px 20px',
						}}
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
							style={{marginBottom: '2px', marginLeft: '50px'}}
						>
							Тут может быть название
						</Title>
					</Space>
					<Table
						type={'rt'}
						// requestLoadConfig={loadConfig}
						requestLoadConfig={apiGetConfigByName('reportDefects')}
						subscribe={[
							{
								name: 'defaultData',
								withMount: true,
								path: 'rtd.analytics.historyTable.rows',
								onChange: ({
									value,
									setSubscribeProps,
								}: TablesSubscribeOnChangeOptions) => {
									console.log({value});

									const reportById = value?.find(
										(el: any) => el.id === id
									);

									value &&
										reportById &&
										setSubscribeProps &&
										setSubscribeProps({
											rows: reportById.data,
											// requestLoadConfig: apiGetConfigByName(
											//   'reportDefects'
											// )
										});
								},
							},
						]}
					/>
				</FormBody>
			</Form>
		</BasePage>
	);
};
