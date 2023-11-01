/**
 * 定义：通过包装将一个类的接口转换成另外一个接口，使得原本由于不兼容的几个类能在一起工作
 * 分类：类结构模型和对象结构模型（java上），
 * 角色：
 * 1,适配者（adaptee），现存的接口，需要被适配的接口
 * 2，目标（target），要转换成的接口，能适配当前现存的接口
 * 3，适配器（adapter），
 */
// 类结构模型
class Adaptee {
    constructor () {}

    request () {}
}
class Target {
    constructor () {}

    targetRequest () {}
}

class Adapter extends Adaptee{
    constructor () {}
}

