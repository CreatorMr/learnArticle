// newRole('xx').say('hello').sleep(1000).say('hello world').exec()

// xx hello 

// 1miao 

// xx hello world
function newRole(name) {
    const queryList = []
    function sayInner(msg) {
        console.log(name + ' ' + msg)
    }
    return this
    // let _this = this;
    // return {
    //     say:(msg) => {
    //         queryList.push(sayInner.bind(null,msg));
    //         return this;
    //     },
    //     sleep:(ms) => {
    //         setTimeout(() => {
    //             console.log(`过了${ms}毫秒....`)
    //             queryList.forEach(fun=>fun())
    //         },ms)
    //         return this;
    //     },
    //     exec:() => {
    //         console.log('zhixing')
    //         console.log(queryList)
    //         queryList.forEach(fun=>fun())
    //     }
    // }
}
newRole.prototype.say = (msg) => {
    queryList.push(sayInner.bind(null,msg));
    return this;
}
newRole.prototype.sleep = (msg) => {
    setTimeout(() => {
        console.log(`过了${ms}毫秒....`)
        queryList.forEach(fun=>fun())
    },ms)
    return this;
}
newRole.prototype.exec = (msg) => {
    console.log('zhixing')
    console.log(queryList)
    queryList.forEach(fun=>fun())
}
console.log(newRole('xx'))
console.log(newRole('xx').say('ss').exec())
// .say('asdfa')
// newRole('xx').say('asdfa').sleep(3000).say('hello world').exec()




function newRole(name2) {
    let name = name2
    let callbacks = [];
    let options = {}
    class InnerFunc {
        sleep(ms){
            setTimeout(() => {
                console.log(`${ms/1000}秒后。。。`)
            },ms)
            return this;
        }
        say(msg){
            console.log(`${name} ${msg}`)
        }
        exec() {

        }
    }
}