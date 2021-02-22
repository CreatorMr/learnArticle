请实现一个cacheRequest方法，保证当使用ajax(请求相同资源时，此题中相同资源的判断是以url为判断依据)，
真实网络层中，实际只发出一次请求（假设已存在request方法用于封装ajax请求，调用格式为：

``request(url, successCallback, failCallback)``）

比如调用方代码（并行请求）如下

```javascript
cacheRequest('/user', data => {
    console.log('请求的user，数据为' + data);
})

cacheRequest('/user', data => {
    console.log('请求的user，数据为' + data);
})
```