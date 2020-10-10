
const axios = (index, timer) => {
	console.log(`start request: 第${index}个请求`)
	return new Promise((resolve, reject) => {
		setTimeout(_ => resolve(`第${index}个请求完成`), timer || 5000)
	})
}



class AsyncLimit {
	constructor(limit) {
		this.limit = limit // 限制并发请求数量
		this.curRequestCount = 0
		this.queueList = []
	}
	async awaitQueue() {
		return new Promise(resolve => this.queueList.push(resolve))
	}
	async request(fn, ...args) {
		return new Promise(async (resolve, reject) => {
			if (this.curRequestCount >= this.limit) {
				await this.awaitQueue()
			}
			this.curRequestCount++
			return this.play(fn, args, resolve, reject)
		})
	}

	async play(fn, args, resolve, reject) {
		let t = fn(...args).then(resolve, reject).finally(_ => {
			this.curRequestCount--
			if (this.queueList.length) {
				let nextReq = this.queueList.shift()
				nextReq()
			}
		})
	}
}

let reqAsync = new AsyncLimit(2)

reqAsync.request(axios, 1, 15000).then(res => console.log('request end 1'))
reqAsync.request(axios, 2, 20000).then(res => console.log('request end 2'))
reqAsync.request(axios, 3, 25000).then(res => console.log('request end 3'))
reqAsync.request(axios, 4, 30000).then(res => console.log('request end 4'))
reqAsync.request(axios, 5, 35000).then(res => console.log('request end 5'))
