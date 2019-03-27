# fetch-wechat
Fetch polyfill for WeChat mini program platform to work with
[TensorFlow.js](https://github.com/tensorflow/tfjs).

TensorFlow.js allow you to load models served by HTTPs server. There are two model loading APIs 
-  tf.loadGraphModel
-  tf.loadLayerModel

Both of which requires a [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API exposed on the global scope or provided as part of the loadOption field.

The library is essentially a wrapper of wx.request API that simulates the fetch API. This is inspired by [wxapp-fetch](https://github.com/axetroy/wxapp-fetch), with simpler code base and support of arraybuffer function.

Code example:

```
import { fetchFunc } from 'wechat_fetch';

const model = await tf.loadGraphModel(
      'https://model.url.com/model.json', {fetchFunc: fetchFunc()});
```


