import {btnFilterSettings} from '../../Base/Block/btnFilterSettings';
import {deleteButton} from '../Modals/modalButtonDelete';
import {addShiftModal, editShiftModal} from '../Modals/modalShiftTab';
import {
	buttonCopySchedule,
	buttonMoveSchedule,
} from '../Modals/modalButtonWorkSchedule';
import {addTemplateModal, editTemplateModal} from '../Modals/modalTemplateTab';

export const tableTabHeader = (info) => {
	const toCapitalize = info[0].toUpperCase() + info.substring(1);
	return [
		{
			componentType: 'Space',
			className: 'px-8',
			style: {
				width: info === 'schedule' ? '100%' : 'auto',
				justifyContent: 'space-between',
			},
			children: [
				{
					componentType: 'Space',
					children: [
						info === 'schedule'
							? buttonMoveSchedule()
							: info === 'shift'
							? addShiftModal()
							: addTemplateModal(),
						info === 'schedule'
							? buttonCopySchedule()
							: info === 'shift'
							? editShiftModal()
							: editTemplateModal(),
						deleteButton(info),
					],
				},
				{
					componentType: 'Space',
					children: [
						{
							componentType: 'Item',
							name: 'searchInput',
							child: {
								componentType: 'Search',
								placeholder: 'Введите наименование',
								dispatch: {
									path: `workSchedules.work${toCapitalize}Tab.modal.events.onSearch`,
									type: 'event',
								},
							},
						},
						...btnFilterSettings,
					],
				},
			],
		},
		info === 'schedule'
			? {
					componentType: 'Item',
					child: {
						className: 'mt-0 mb-0',
						componentType: 'Divider',
					},
			  }
			: {
					componentType: 'Item',
					child: {
						className: 'mt-8 mb-8',
						componentType: 'Divider',
					},
			  },
	];
};
