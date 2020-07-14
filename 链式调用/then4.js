

class Role{
    constructor(name){
        this.name = name;
        this.actions = [];
        this.execs = {}
    }
    addMethod(methond,func) {
        let actions = this.actions
        // error 箭头函数没有arguments
        Role.prototype[methond] =  (...rest) => {
            console.log(rest)
            actions.push({
                methond,
                args:rest
            })
            return this;
        }
        // 将执行时候的函数挂到execs上
        this.execs[methond] = func.bind(this)
    }
    async exec(){
        for(let i = 0; i<this.actions.length; i++){
            let action = this.actions[i]
            await this.execs[action.methond].apply(this,action.args)
        }
        return this;
    }
}

function newRole(name){
    
    let role =  new Role(name)
    role.addMethod('sleep',function(){
        return new Promise(resolve=>{
            setTimeout(()=>{console.log(`等待了${arguments[0]/1000}秒`);resolve()}, arguments[0]);
        });
    })
    role.addMethod('say',function(){
        return console.log(this.name + ' say ' + arguments[0])
    })
    return role;
}
newRole('xx').say('hello').sleep(2000).say('hello world').exec()

​