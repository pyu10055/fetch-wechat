export const TEXT_FILE_EXTS = /\.(txt|json|html|txt|csv)/;
export interface GlobalWithFetch {
  fetch: Function;
}
export function parseResponse(url: string, res: wx.RequestSuccessCallbackResult) {
  let header = res.header || {};
  header = Object.keys(header).reduce((map: { [key: string]: string }, key) => {
    map[key.toLowerCase()] = header[key];
    return map;
  }, {});
  return {
    ok: ((res.statusCode / 200) | 0) === 1, // 200-299
    status: res.statusCode,
    statusText: res.statusCode,
    url,
    clone: () => parseResponse(url, res),
    text: () =>
      Promise.resolve(
        typeof res.data === 'string' ? res.data : JSON.stringify(res.data)
      ),
    json: () => {
      if (typeof res.data === 'object') return Promise.resolve(res.data);
      let json = {};
      try {
        json = JSON.parse(res.data);
      } catch (err) {
        console.error(err);
      }
      return Promise.resolve(json);
    },
    arrayBuffer: () => {
      return Promise.resolve(res.data);
    },
    headers: {
      keys: () => Object.keys(header),
      entries: () => {
        const all = [];
        for (const key in header) {
          if (header.hasOwnProperty(key)) {
            all.push([key, header[key]]);
          }
        }
        return all;
      },
      get: (n: string) => header[n.toLowerCase()],
      has: (n: string) => n.toLowerCase() in header
    }
  };
}

export function fetchFunc() {
  // tslint:disable-next-line:no-any
  return (url: string, options: any) => {
    options = options || {};
    const dataType = url.match(TEXT_FILE_EXTS) ? 'text' : 'arraybuffer';

    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method: options.method || 'GET',
        data: options.body,
        header: options.headers,
        dataType,
        responseType: dataType,
        success: (resp) => resolve(parseResponse(url, resp)),
        fail: (err) => reject(err)
      });
    });
  };
}

export function setWechatFetch(debug=false) {
  // tslint:disable-next-line:no-any
  const typedGlobal = global as any;
  if (typeof typedGlobal.fetch !== 'function') {
    if (debug) {
      console.log('setup global fetch...');
    }
    typedGlobal.fetch = fetchFunc();
  }
}
