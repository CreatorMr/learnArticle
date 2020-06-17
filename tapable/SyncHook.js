class SyncHook{
    constructor(args) {
        this.tasks = []
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call(){
        this.tasks.forEach(task=>task(...arguments))
    }
}

let hook = new SyncHook(['name']);

hook.tap('node', function(name){
    console.log('node', name);
})
hook.tap('vue', function(name){
    console.log('vue', name);
})

hook.call('creator');