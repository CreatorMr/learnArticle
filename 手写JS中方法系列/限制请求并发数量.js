function axios(...args) {
  return new Promise((resolve, reject) => {
    console.log('start request: ', args)
    setTimeout(() => {
      resolve('request done.', args)
    }, 5000);
  })
}

class LimitRequest {
  constructor(limit) {
    this._limit = limit
    this._reqCount = 0
    this._line = [] // 请求队列
  }

  async _waitRequest() {
    return new Promise(resolve => this._line.push(resolve))
  }

  doRequest(fn, args, resolve, reject) {
    const req = fn(...args).then(resolve, reject).finally(_ => {
      this._reqCount--
      if (this._line.length) {
        const next = this._line.shift()
        next() // next resolve()
      }
    })
  }

  async request(fn, ...args) {
    return new Promise(async (resolve, reject) => {
      if (this._reqCount >= this._limit) {
        await this._waitRequest()
      }
      this._reqCount++
      this.doRequest(fn, args, resolve, reject)
    })
  }
}

req = new LimitRequest(3)
req.request(axios, '1').then(res => console.log('request end 1'));
req.request(axios, '2').then(res => console.log('request end 2'));
req.request(axios, '3').then(res => console.log('request end 3'));
req.request(axios, '4').then(res => console.log('request end 4'));
req.request(axios, '5').then(res => console.log('request end 5'));
req.request(axios, '6').then(res => console.log('request end 6'));
req.request(axios, '7').then(res => console.log('request end 7'));