import React, {ForwardedRef, RefObject} from 'react';
import {Col, Layout} from 'rt-design';

interface WidgetProps {
	style?: object;
	className?: string;
	x?: number;
	y?: number;
	colSpan?: number;
	rowSpan?: number;
}

const Widget = React.forwardRef(
	(
		{style, className, ...props}: WidgetProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		return (
			<div
				ref={ref}
				style={{...style}}
				className={className + ' dashboard-widget'}
				data-grid={{
					minW: 1,
					minH: 1,
					x: props.x,
					y: props.y,
					w: props.colSpan,
					h: props.rowSpan,
				}}
			>
				<Layout>
					<div className={'dashboard-widget-header'}>Title</div>
					<div className={'dashboard-widget-content'}>Widget</div>
				</Layout>
			</div>
		);
	}
);

export default Widget;
