class Role {
    constructor(name) {
        this.name = name;
        this.actions = [];
    }

    sleep() {
        this.actions.push({
            method: 'sleep',
            args: arguments
        })
        return this;
    }

    say() {
        this.actions.push({
            method: 'say',
            args: arguments
        })
        return this;
    }

    async exec() {
        for (let i = 0; i < this.actions.length; i++) {
            let action = this.actions[i]
            await this._runFunction(action)
        }
    }

    async _runFunction(action) {
        switch (action.method) {
            case 'sleep':
                return new Promise(resolve => {
                    setTimeout(() => { console.log(`等待了${action.args[0]/1000}秒`);
                        resolve() }, action.args[0]);
                });
            case 'say':
                return console.log(this.name + ' say ' + action.args[0])
            default:
                return Promise.resolve()
        }
    }

}


newRole('xx').say('hello').sleep(2000).say('hello world').exec()

function newRole(name) {
    return new Role(name)
}