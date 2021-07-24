// Copy from https://gist.github.com/ocundale/13c5a632b3bdb8cadb59
export const getBrowserInfo = (ua) => {
	let sTempInfo,
		oBrowserInfo = {},
		sBrowserString =
			ua.match(
				/(vivaldi|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([0-9|\.]+)/i
			) || [];

	//trident check (IE11 and below)
	if (/trident/i.test(sBrowserString[1])) {
		sTempInfo = /\brv[ :]+(\d+)/g.exec(ua) || [];
		oBrowserInfo.sName = 'MSIE';
		oBrowserInfo.sVersion = sTempInfo[1];
		return oBrowserInfo;
	}
	if (sBrowserString[1] === 'Chrome') {
		sTempInfo = ua.match(/\b(OPR|Edge)\/(\d+)/);
		//Opera/Edge case:
		if (sTempInfo !== null) {
			if (sTempInfo.indexOf('Edge')) {
				oBrowserInfo.sName = 'MSIE'; //mark ms edge browser as MSIE
			} else {
				oBrowserInfo.sName = 'Opera';
			}
			oBrowserInfo.sVersion = sTempInfo.slice(1);
			return oBrowserInfo;
		}
	}
	sBrowserString = sBrowserString[2]
		? [sBrowserString[1], sBrowserString[2]]
		: [navigator.appName, navigator.appVersion, '-?'];
	sTempInfo = ua.match(/version\/(\d+)/i);

	if (sTempInfo !== null) {
		sBrowserString.splice(1, 1, sTempInfo[1]);
	}
	oBrowserInfo.sName = sBrowserString[0];
	oBrowserInfo.sVersion = sBrowserString[1];
	return oBrowserInfo;
};
