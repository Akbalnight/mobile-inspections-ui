import React, {useMemo, useRef, useState} from 'react';
import L, {LatLngBounds, Marker as LeafletMarker} from 'leaflet';
import {Marker as RLMarker, Popup} from 'react-leaflet';
import routeMapMarker from '../../../imgs/routeMapMarker.png';
import {heightToLat, latLngToYX, widthToLng} from '../../../utils/mapUtils';

export type PointProps = {
	id: string;
	position: number;
	xLocation: number;
	yLocation: number;
};

export interface DraggableMarkerProps {
	point: PointProps;

	bounds: LatLngBounds;
	onChange: any;
}

const createDivIcon = (numPoint: number) => {
	const text = document.createElement('div');
	text.textContent = `${numPoint}`;
	text.style.position = 'absolute';
	text.style.margin = 'auto';
	text.style.top = '6px';
	text.style.left = '0px';
	text.style.right = '0px';
	text.style.width = '20px';
	text.style.border = '1px solid #013141';
	text.style.borderRadius = '10px';
	text.style.backgroundColor = 'white';
	text.style.color = '#013141';

	const img = document.createElement('img');
	img.src = routeMapMarker;
	img.width = 32;
	img.height = 40;

	const div = document.createElement('div');
	div.style.textAlign = 'center';
	div.appendChild(img);
	div.appendChild(text);
	return div;
};

const crateMarkerIcon = (numPoint: number) =>
	L.divIcon({
		html: createDivIcon(numPoint),
		iconSize: [34, 42],
		iconAnchor: [17, 42],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize: [42, 42],
	});

export const Marker = ({point, bounds, onChange}: DraggableMarkerProps) => {
	const [position, setPosition] = useState({
		lat: heightToLat(point.yLocation),
		lng: widthToLng(point.xLocation),
	});
	const markerRef = useRef<LeafletMarker>(null);
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current; //as unknown as LeafletMarker
				if (marker != null) {
					let latNum = marker.getLatLng().lat;
					let lngNum = marker.getLatLng().lng;

					if (bounds.getNorth() < latNum) latNum = bounds.getNorth();
					if (bounds.getSouth() > latNum) latNum = bounds.getSouth();

					if (bounds.getWest() > lngNum) lngNum = bounds.getWest();
					if (bounds.getEast() < lngNum) lngNum = bounds.getEast();

					setPosition({lat: latNum, lng: lngNum});

					const lat = latNum.toFixed(4);
					const lng = lngNum.toFixed(4);
					const savePoint = {...point};
					savePoint.xLocation = latLngToYX(lng);
					savePoint.yLocation = latLngToYX(lat);
					onChange(savePoint);
					// console.log("y / x: [%s / %s] Lat / Lng: [%d / %d] ", lat, lng, latToHeight(lat), latToHeight(lng))
				}
			},
		}),

		// eslint-disable-next-line
		[bounds]
	);
	return (
		<RLMarker
			draggable={true}
			eventHandlers={eventHandlers}
			position={position}
			icon={crateMarkerIcon(point.position)}
			ref={markerRef}
		>
			<Popup minWidth={90}>
				<span> Move </span>
			</Popup>
		</RLMarker>
	);
};
