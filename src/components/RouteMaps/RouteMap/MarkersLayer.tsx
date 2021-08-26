import {withStore} from 'rt-design';
import React from 'react';
import {LatLngBounds} from 'leaflet';
import {Marker, PointProps} from './Marker';

export interface MarkersLayerProps {
	points: PointProps[];
	bounds: LatLngBounds;
	onChange: any;
}

export const MarkersLayer = withStore(
	({points = [], bounds, onChange}: MarkersLayerProps) => {
		return (
			<React.Fragment>
				{points.map((point, index) => (
					<Marker
						key={point.id}
						point={point}
						bounds={bounds}
						onChange={onChange}
					/>
				))}
			</React.Fragment>
		);
	}
);
