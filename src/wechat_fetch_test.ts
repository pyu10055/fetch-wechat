import {fetchFunc, setWechatFetch, parseResponse} from './wechat_fetch';

describe('fetchFunc', () => {
  it('should return function', () => {
    expect(fetchFunc() instanceof Function).toBeTruthy();
  });

});

describe('setWechatFetch', () => {
  it('should set fetch field on global', () => {
    setWechatFetch();
    expect(global.fetch).toBeDefined();
    delete global['fetch']; 
  });

});

describe('parseResponse', () => {
  it('should return object with correct signature', async () => {
    const resp = parseResponse('url', {
       data: '["body"]', statusCode: 200, header: {'content-type': 'txt/html'}
    });
    expect(resp.ok).toBeTruthy();
    expect(resp.status).toBe(200);
    expect(resp.url).toEqual('url');
    expect(await resp.json()).toEqual(['body']);
    expect(await resp.text()).toEqual('["body"]');
    expect(await resp.arrayBuffer()).toEqual('["body"]');
    expect(resp.headers.keys()).toEqual(['content-type']);
    expect(resp.headers.get('content-type')).toEqual('txt/html');
  });
});