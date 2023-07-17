

function greeting(user: string): string {
    return 'hello' + user
}

let username: string = 'xxx'
console.log(greeting(username))

class Person {
    public name: string;
    protected age: number;
    private money: number;
    constructor(name, age, money) {
        this.name = name
        this.age = age
        this.money = money
    }
}

class Student extends Person {
    public num: number;
    constructor(name, age, money, num) {
        super(name, age, money)
        this.num = num
    }

    getName() {
        console.log(`名字 ${this.name}`)
    }
    getAge() {
        // protected 属性 子类可以访问
        console.log(`年龄 ${this.age}`)
    }
    getMoney() {
        // private 只能在Person 类中被访问。
        // console.log(`年龄 ${this.money}`)
    }

}

let s  = new Student('hah', 12, 23, 3)
console.log(s.name) // 可以直接访问
// console.log(s.age) // 报错。不能直接访问，子类内部可以访问
// console.log(s.money) // 都不能访问，私有的

let p = new Person('per', 33, 44)

//  ------------ 重写父类的方法，

class Animal {
    name: string;
    constructor(name) {
        this.name = name
    }
    eat(food) {}
}

class Dog extends Animal {
    eat(food: any): void {
        console.log(`狗吃 ${food}`)
    }
}

class Person2 extends Animal {
    eat(food: any): void {
        console.log(`ren吃 ${food}`)
    }
}