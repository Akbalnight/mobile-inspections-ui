import React from 'react';
import {Space, Search} from 'rt-design';

export const TemplatesTableHeader = () => {
	return (
		<Space className={'pb-8'} style={{width: '100%'}}>
			<Search
				itemProps={{
					name: 'onSearch',
				}}
				style={{width: '100%'}}
				placeholder={'Введите наименование'}
				dispatch={{
					path: 'analytics.templatesTable.events.onSearch',
				}}
				subscribe={
					[
						/** Reload Search value field, clear STORE*/
						// reloadFilterFields('schedules.table.events.onReload'),
					]
				}
			/>
		</Space>
	);
};
