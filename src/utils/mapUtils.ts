export const heightToLat = (height: number) =>
	parseFloat(`-0.${String(height).padStart(4, '0')}`);
export const widthToLng = (width: number) =>
	parseFloat(`0.${String(width).padStart(4, '0')}`);
export const latLngToYX = (value: string) => parseInt(`${value}`.split('.')[1]);
