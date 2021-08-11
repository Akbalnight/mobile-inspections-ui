import React from 'react';
import {MapContainer, TileLayer, Popup, Marker} from 'react-leaflet';

export const DebugMarsel = ({src}) => {
	return (
		<MapContainer
			center={[51.505, -0.09]}
			zoom={13}
			scrollWheelZoom={false}
			style={{height: '300px', width: '300px'}}
		>
			<TileLayer
				// attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url={src}
				style={{height: '300px', width: '300px'}}
			/>
			<Marker position={[51.505, -0.09]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
		// <MapContainer center={[51, 73]}  >
		//     <TileLayer
		//         url={src}
		//         bounds={[[50, 72], [52, 74]]}
		//     />
		// </MapContainer>
	);
};
