class SyncLoopHook{
    constructor(args) {
        this.tasks = []
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call(...args){
       this.tasks.forEach(task=>{
           let ret;
           do {
               ret = task(...args)
           } while (ret != undefined);
       })
    }

}

let hook = new SyncLoopHook(['name']);
let total = 0
hook.tap('SyncLoopHook-webpack', function(name) {
    console.log('SyncLoopHook-webpack',name)
    return ++total == 3 ? undefined:'再来一遍'
})
hook.tap('SyncLoopHook-vue', function(name) {
    console.log('SyncLoopHook-vue',name)
})
hook.tap('SyncLoopHook-react', function(name) {
    console.log('SyncLoopHook-react',name)
})

hook.call('creator');