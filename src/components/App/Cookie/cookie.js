import cookie from 'cookie';

export const setCookie = (name, value, options) => {
    const rawCookie = {};
    rawCookie[name] = value;

    if (typeof value === 'object') {
        rawCookie[name] = JSON.stringify(value)
    }

    console.log("setCookie => ", name, rawCookie[name]);
    document.cookie = cookie.serialize(name, rawCookie[name], options);

    return document.cookie
};

export const getCookie = (name) => {
    const cookies = cookie.parse(document.cookie);
    const cookieVal = cookies && cookies[name];

    // if (typeof doNotParse === 'undefined') {
    //     doNotParse = !cookieVal || (cookieVal[0] !== '{' && cookieVal[0] !== '[')
    // }
    //
    // if (!doNotParse) {
    //     try {
    //         cookieVal = JSON.parse(cookieVal)
    //     } catch (err) {
    //         // Not serialized object
    //     }
    // }

    return cookieVal
}
