class SyncWaterfallHook{
    constructor(args) {
        this.tasks = []
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call(){
        let [first,...other] = this.tasks
        let ret = first(...arguments);
        other.reduce((a,b)=>{
            return b(a)
        }, ret)
    }

}

let hook = new SyncWaterfallHook(['name']);

hook.tap('node', function(name){
    console.log('node', name);
    return 'node --第一条数据'
})
hook.tap('vue', function(data){
    console.log('vue', data);
    return '第二条数据'
})
hook.tap('vue', function(data){
    console.log('vue', data);
    return '第三条数据'
})

hook.call('creator');