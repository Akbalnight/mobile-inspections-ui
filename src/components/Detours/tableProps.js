import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {checkBox, code, date} from '../Base/customColumnProps';
import {classic} from 'rt-design';
import React from 'react';
import {AddDetour, EditDetour} from './Registry/Modals/SaveObjectModal';
import {CalendarOutlined, TableOutlined} from '@ant-design/icons';

const {
	Space,
	Select,
	DatePicker,
	Button,
	Search,
	Divider,
	RadioGroup,
	Text,
} = classic;

/**
 * configFilterPanel, при изменении этого компонента не забыть сохранить names иначе не будет работать панель фильтрации
 *
 */
export const configFilterPanel = [
	{
		componentType: 'SingleSelect',
		name: 'routeIds',
		className: 'mr-16',
		rowRender: 'name',
		title: 'Маршрут',
		widthControl: 150,
		widthPopup: 300,
		heightPopup: 200,
		requestLoadRows: apiGetFlatDataByConfigName('routes'),
		requestLoadConfig: apiGetConfigByName('routes'),
	},
	{
		componentType: 'SingleSelect',
		name: 'staffIds',
		className: 'mr-16',
		rowRender: 'username',
		title: 'Сотрудник',
		widthControl: 150,
		widthPopup: 300,
		heightPopup: 200,
		requestLoadRows: apiGetFlatDataByConfigName('staff'),
		requestLoadConfig: apiGetConfigByName('staff'),
	},
	{
		componentType: 'DateRange',
		title: 'Период',
		nameStart: 'dateBegin',
		nameEnd: 'dateEnd',
		dateFormat: 'DD-MM-YYYY HH:mm:ss',
		className: 'mr-16',
	},
];

export const TableHeader = () => {
	return (
		<Space direction={'vertical'} className={'p-8'}>
			<Space style={{justifyContent: 'space-between', width: '100%'}}>
				<Space>
					<AddDetour />
					<EditDetour />
				</Space>
				<Space>
					<RadioGroup
						itemProps={{name: 'viewMode'}}
						optionType={'button'}
						size={'middle'}
						options={[
							{
								label: <TableOutlined />,
								value: 0,
							},
							{
								label: <CalendarOutlined />,
								value: 1,
							},
						]}
						dispatch={{
							path: 'detours.mainForm.table.events.viewMode',
						}}
					/>
					<Search
						itemProps={{name: 'searchInput'}}
						placeholder={'Введите наименование'}
						dispatch={{
							path: 'detours.mainForm.table.events.onSearch',
							type: 'event',
						}}
					/>
				</Space>
			</Space>
			<Divider className={'my-0'} />
			<Space>
				<Space direction={'vertical'}>
					<Text label={'Маршрут:'} />
					<Select
						itemProps={{name: 'routeId'}}
						placeholder={'Выберите маршрут'}
						mode={'single'}
						allowClear={true}
						showSearch={true}
						filterOption={false}
						searchParamName={'name'}
						infinityMode={true}
						requestLoadRows={apiGetFlatDataByConfigName('routes')}
						optionConverter={(option) => ({
							value: option.id,
							label: option.name,
						})}
					/>
				</Space>
				<Space direction={'vertical'}>
					<Text label={'Исполнитель:'} />
					<Select
						itemProps={{name: 'staffId'}}
						placeholder={'Выберите исполнителя'}
						mode={'single'}
						allowClear={true}
						infinityMode={true}
						showSearch={true}
						filterOption={false}
						searchParamName={'username'}
						requestLoadRows={apiGetFlatDataByConfigName('staff')}
						optionConverter={(option) => ({
							value: option.id,
							label: option.username,
						})}
					/>
				</Space>
				<Space direction={'vertical'}>
					<Text label={'Период:'} />
					<Space>
						<DatePicker />
					</Space>
				</Space>
				<Space
					direction={'vertical'}
					style={{justifyContent: 'space-between'}}
				>
					<Text
						label={'Период:'}
						itemProps={{hidden: true}}
						hidden={true}
					/>

					<Button className={'mt-4'}>Применить</Button>
				</Space>
			</Space>
		</Space>
	);
};

export const customColumnProps = [
	{...code},
	{...date('dateStartPlan')},
	{...checkBox('saveOrderControlPoints')},
];
