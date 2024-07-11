// 手写 new
/**
 * new 操作
 * 1.创建一个空对象
 * 2.给新创建的对象添加__proto__,并连接到构造函数的原型对象上
 * 3.将新创建的对象作为 this 上下文
 * 4.如果该函数没有返回对象就返回 this
 */
const myNew = (o,...args) => {
    let obj = Object.create(null)
    obj.__proto__ = o.prototype;
    let res = o.apply(obj,  args);
    return o instanceof Object ? res : o;
}

function Person(name, age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function () {
    console.log(this.name)
}
const person1 = new Person('Tom', 20)
console.log(person1)  // Person {name: "Tom", age: 20}
person1.sayName() // 'Tom'
myNew(Person)
const person2 = new Person('jerry', 20)
console.log(person2)  // Person {name: "Tom", age: 20}
person2.sayName() // 'Tom'

console.log(myNew([]))