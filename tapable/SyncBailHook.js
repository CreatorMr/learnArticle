class SyncBailHook{
    constructor(args) {
        this.tasks = []
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call(){
        let ret;
        let index = 0;
        do {
            if(index<this.tasks.length) {
                ret = this.tasks[index++](...arguments)
            }
        } while (ret === undefined && index < this.tasks.length);
    }
}

let hook = new SyncBailHook(['name']);

hook.tap('node', function(name){
    console.log('node', name);
    return 'node --停止'
})
hook.tap('vue', function(name){
    console.log('vue', name);
})

hook.call('creator');