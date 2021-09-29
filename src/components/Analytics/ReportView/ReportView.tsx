// @ts-ignore
import {BasePage} from 'mobile-inspections-base-ui';
import {useParams} from 'react-router';
import {Form, FormBody, SubscribeOnChangeOptions, Table} from 'rt-design';
import {apiGetConfigByName} from '../../../apis/application.api';
// import { FormBody } from 'rt-design/dist/components/Form/Form';

export const ReportView: React.FC = () => {
	const {analyticId, id} = useParams<{analyticId: string; id: string}>();
	// console.log({analyticId, id});

	return (
		<BasePage>
			<div>1</div>
			<Form>
				<FormBody noPadding={true} scrollable={true}>
					<Table
						rows={[]}
						setRows={(rows) => console.log(rows)}
						requestLoadConfig={apiGetConfigByName(
							'reportEquipments'
						)}
						subscribe={[
							{
								name: 'defaultData',
								withMount: true,
								path: 'rtd.analytics.historyTable.rows',
								onChange: ({
									value,
									setSubscribeProps,
								}: SubscribeOnChangeOptions) => {
									console.log(value);
									const filtred = value?.find(
										(el: any) => el.id === id
									);
									console.log(filtred);

									value &&
										setSubscribeProps &&
										setSubscribeProps({
											setRows: (rows: any[]) =>
												(rows = filtred.data),
											// rows:filtred.data
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
