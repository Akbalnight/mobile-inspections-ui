import {ImageOverlay, useMap} from 'react-leaflet';
import L, {LatLngBounds} from 'leaflet';
import React from 'react';
import {heightToLat, widthToLng} from '../../../utils/mapUtils';

export interface ImageLayerProps {
	src: string;
	bounds: LatLngBounds;
	setBounds: (a: LatLngBounds) => void;
}

export const ImageLayer = (props: ImageLayerProps) => {
	const {src, bounds, setBounds} = props;
	const map = useMap();
	const loadedImg = (e: any) => {
		// console.log('loadedImg', e.currentTarget)
		const Lat = heightToLat(e.currentTarget.naturalHeight);
		const Lng = widthToLng(e.currentTarget.naturalWidth);
		const imgBounds = new L.LatLngBounds([0.0, 0.0], [Lat, Lng]);
		map.setView({lat: Lat / 2, lng: Lng / 2});
		map.fitBounds(imgBounds);
		setBounds(imgBounds);
	};
	return (
		<ImageOverlay
			url={src}
			eventHandlers={{load: loadedImg}}
			bounds={bounds}
			opacity={0.75}
			zIndex={10}
		/>
	);
};
