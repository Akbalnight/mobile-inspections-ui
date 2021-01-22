import React from 'react';
import moment from 'moment';
import Timeline, {
	SidebarHeader,
	DateHeader,
	TimelineHeaders,
} from 'react-calendar-timeline';

export default function TimelineScheduler() {
	const groups = [
		{id: 1, title: 'Иванов'},
		{id: 2, title: 'Федоров'},
		{id: 3, title: 'Сидоров'},
		{id: 4, title: 'Сидоров'},
		{id: 5, title: 'Сидоров'},
		{id: 6, title: 'Сидоров'},
		{id: 7, title: 'Сидоров'},
		{id: 8, title: 'Сидоров'},
		{id: 9, title: 'Сидоров'},
		{id: 10, title: 'Сидоров'},
		{id: 11, title: 'Сидоров'},
		{id: 12, title: 'Сидоров'},
		{id: 13, title: 'Сидоров'},
		{id: 14, title: 'Сидоров'},
		{id: 15, title: 'Сидоров'},
		{id: 16, title: 'Сидоров'},
		{id: 17, title: 'Сидоров'},
		{id: 18, title: 'Сидоров'},
		{id: 19, title: 'Сидоров'},
		{id: 20, title: 'Сидоров'},
		{id: 21, title: 'Сидоров'},
		{id: 22, title: 'Сидоров'},
	];

	const items = [
		{
			id: 1,
			group: 13,
			title: 'Смена 1',
			start_time: moment().add(-6, 'hour'),
			end_time: moment().add(1, 'hour'),
			bgColor: 'RGBA(255,101,80,0.4)',
			selectedBgColor: 'RGBA(255,101,80,0.4)',
			color: 'RGBA(255,101,80,1)',
		},
		{
			id: 2,
			group: 2,
			title: 'Смена 2',
			start_time: moment().add(-0.5, 'hour'),
			end_time: moment().add(0.5, 'hour'),
			bgColor: 'RGBA(127,191,80,0.4)',
			selectedBgColor: 'RGBA(127,191,800.4)',
			color: 'RGBA(127,191,80,1)',
		},
		{
			id: 3,
			group: 13,
			title: 'Смена 3',
			start_time: moment().add(2, 'hour'),
			end_time: moment().add(3, 'hour'),
			bgColor: 'RGBA(148,164,204,0.4)',
			selectedBgColor: 'RGBA(148,164,204,0.4)',
			color: 'RGBA(148,164,204,1)',
		},
		{
			id: 4,
			group: 3,
			title: 'Смена 4',
			start_time: moment().add(0, 'hour'),
			end_time: moment().add(5, 'hour'),
			bgColor: 'RGBA(255,101,80,0.4)',
			selectedBgColor: 'RGBA(255,101,80,0.4)',
			color: 'RGBA(255,101,80,1)',
		},
		{
			id: 5,
			group: 2,
			title: 'Смена 5',
			start_time: moment().add(6, 'hour'),
			end_time: moment().add(13, 'hour'),
			bgColor: 'RGBA(148,164,204,0.4)',
			selectedBgColor: 'RGBA(148,164,204,0.4)',
			color: 'RGBA(148,164,204,1)',
		},
		{
			id: 6,
			group: 3,
			title: 'Смена 6',
			start_time: moment().add(2, 'hour'),
			end_time: moment().add(7, 'hour'),
			bgColor: 'RGBA(127,191,80,0.4)',
			selectedBgColor: 'RGBA(127,191,80,0.4)',
			color: 'RGBA(127,191,80,1)',
		},
	];

	const itemRenderer = ({
		item,
		timelineContext,
		itemContext,
		getItemProps,
		getResizeProps,
	}) => {
		const {
			left: leftResizeProps,
			right: rightResizeProps,
		} = getResizeProps();
		const backgroundColor = itemContext.selected
			? itemContext.dragging
				? 'red'
				: item.selectedBgColor
			: item.bgColor;
		const borderColor = itemContext.resizing ? 'red' : item.color;
		return (
			<div
				{...getItemProps({
					style: {
						backgroundColor,
						color: item.color,
						borderColor,
						borderStyle: 'solid',
						borderWidth: 1,
						borderRadius: 4,
						borderLeftWidth: itemContext.selected ? 3 : 1,
						borderRightWidth: itemContext.selected ? 3 : 1,
						textAlign: 'center',
					},
					onMouseDown: () => {
						console.log('on Смена click', item);
					},
				})}
			>
				{itemContext.useResizeHandle ? (
					<div {...leftResizeProps} />
				) : null}

				<div
					style={{
						height: itemContext.dimensions.height,
						overflow: 'hidden',
						paddingLeft: 3,
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}
				>
					{itemContext.title}
				</div>

				{itemContext.useResizeHandle ? (
					<div {...rightResizeProps} />
				) : null}
			</div>
		);
	};
	/**
	 * <DateHeader /> удобно выставляется юнит export type Unit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
	 */
	return (
		<Timeline
			groups={groups}
			items={items}
			defaultTimeStart={moment().add(-12, 'hour')}
			defaultTimeEnd={moment().add(12, 'hour')}
			style={{border: '1px solid #bbb'}}
			itemRenderer={itemRenderer}
		>
			<TimelineHeaders className='sticky' style={{textAlign: 'center'}}>
				<SidebarHeader>
					{({getRootProps}) => {
						return <div {...getRootProps()}>Сотрудник</div>;
					}}
				</SidebarHeader>
				<DateHeader unit='primaryHeader' />
				<DateHeader />
			</TimelineHeaders>
		</Timeline>
	);
}
