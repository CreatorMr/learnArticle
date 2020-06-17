let { SyncHook,SyncBailHook,SyncWaterfallHook,SyncLoopHook } =  require ('tapable')

class Car {
    constructor() {//
        this.index = 0;
		this.hooks = {
            arch: new SyncHook(['name']),
            brch: new SyncBailHook(['name']),
            crch: new SyncWaterfallHook(['name']),
            drch: new SyncLoopHook(['name'])
		};
    }
    tap() {
        this.hooks.arch.tap('synchook-node', function(name){
            console.log('synchook-node ',name)
        })
        this.hooks.arch.tap('synchook-react', function(name){
            console.log('synchook-react ',name)
        })

        // SyncBailHook
        this.hooks.brch.tap('SyncBailHook-node', function(name){
            console.log('SyncBailHook-node', name)
            return '停止'
        })
        this.hooks.brch.tap('SyncBailHook-vue', function(name){
            console.log('SyncBailHook-vue', name)
        })

        // SyncWaterfallHook
        this.hooks.crch.tap('SyncWaterfallHook-commonder.js', function(name){
            console.log('SyncWaterfallHook-commonder.js', name)
            return 'commonder.js pre'
        })
        this.hooks.crch.tap('SyncWaterfallHook-react', function(data){
            console.log('SyncWaterfallHook-react', data)
            return 'react ing'
        })
        this.hooks.crch.tap('SyncWaterfallHook-webpack', function(data){
            console.log('SyncWaterfallHook-webpack', data)
        })
        // SyncLoopHook
        this.hooks.drch.tap('SyncLoopHook-webpack', function(name) {
            console.log('SyncLoopHook-webpack',name)
            return ++this.index === 3 ? undefined:'再来一遍'
        })
        this.hooks.drch.tap('SyncLoopHook-vue', function(name) {
            console.log('SyncLoopHook-vue',name)
        })
        this.hooks.drch.tap('SyncLoopHook-react', function(name) {
            console.log('SyncLoopHook-react',name)
        })
    }
    start(args) { 
        this.hooks.arch.call(args)
        this.hooks.brch.call(args)
        this.hooks.crch.call(args)
        this.hooks.drch.call(args)
    }
}

let myCar = new Car()
myCar.tap()
myCar.start('creator');

/**
 * 实现原理 SyncHook.js SyncBailHook.js SyncWaterfallHook.js  SyncLoopHook.js
 */ 

