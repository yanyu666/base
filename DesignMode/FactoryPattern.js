// simple Factory Pattern
function _extends (Child, Parent){
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

function Material (name, kg, type){
    this.name = name;
    this.kg = kg;
    this.type = type;
}
Material.prototype.taste = function(taste){
    console.log(taste)
}
function Chicken (){
    Material.apply(this, arguments);
}
function Flour (){
    Material.apply(this, arguments);
    // this.taste = '饱腹';
}
_extends(Flour, Material)
_extends(Chicken, Material)
let noodle = new Flour('面粉', '100g', '和面');
let chicken = new Chicken('整鸡', '1000g', '炖');
console.log(noodle)
console.log(chicken)
noodle.taste('饱腹');
chicken.taste('鲜美');
function PotFactory(){
}
PotFactory.prototype.cook = function (matrial) {
    switch (matrial) {
        case '面粉':
            return new Flour('面粉', '100g', '和面');
        case '整鸡':
            return new Flour('整鸡', '1000g', '炖');
    }
}
let pot = new PotFactory();
let food = pot.cook('面粉');
console.log(food)

// Factory Method

function Material2(name, kg, type){
    this.name = name;
    this.kg = kg;
    this.type = type;
}
function Chicken2 (){
    Material2.apply(this, arguments);
}
function Flour2 (){
    Material2.apply(this, arguments);
}
function Factory(){}
Factory.prototype.cook = function(){
    console.log('调用错误')
}
function NoodleFactory(){}
function ChickenFactory(){}
_extends(Flour2, Material2);
_extends(Chicken2, Material2);
_extends(NoodleFactory, Factory);
_extends(ChickenFactory, Factory);
NoodleFactory.prototype.cook = function(){
    console.log('生产成功')
    return new Flour2('面粉', '100g', '和面');
}
let noodleFac = new NoodleFactory();
console.log(noodleFac)
let noodle2 = noodleFac.cook();
console.log(noodle2)

// Abstract Factory




class Plant{
    constructor(name) {
        this.name=name;
    }
    grow() {
        console.log('growing~~~~~~');    
    }
}
class Apple extends Plant{
    constructor(name) {
        super(name);
        this.taste='甜';
    }
}
class Orange extends Plant{
    constructor(name) {
        super(name);
        this.taste='酸';
    }
}
class Factory{
    static create(name) {
        switch (name) {
            case 'apple':
                return new Apple('苹果');
            case 'orange':
                return new Orange('橘子');
        }
    }
}
let apple=Factory.create('apple');
// Apple { name: '苹果', taste: '甜' }
console.log(apple);
let orange=Factory.create('orange');
// Orange { name: '橘子', taste: '酸' }
console.log(orange);


class Plant{
    constructor(name) {
        this.name=name;
    }
    grow() {
        console.log('growing~~~~~~');    
    }
}
class Apple extends Plant{
    constructor(name) {
        super(name);
        this.taste='甜';
    }
}
class Orange extends Plant{
    constructor(name) {
        super(name);
        this.taste='酸';
    }
}
class AppleFactory{
    create() {
        return new Apple('apple');
    }
}
class OrangeFactory{
    create() {
        return new Orange('orange');
    }
}
const settings={
    'apple': AppleFactory,
    'orange':OrangeFactory
}
let apple=new settings['apple']().create();
// Apple { name: 'apple', taste: '甜' }
console.log(apple);
let orange=new settings['orange']().create();
// Orange { name: 'orange', taste: '酸' }
console.log(orange);


class Button{
    render() {

    }
}
class AppleButton{
    render() {
       console.log('苹果按钮');
    }
}
class WindowButton{
    render() {
       console.log('Windows按钮');
    }
}

class Icon{
    render() {

    }
}
class AppleIcon{
    render() {
       console.log('苹果图标');
    }
}
class WindowIcon{
    render() {
       console.log('Windows图标');
    }
}
class Factory{
    createButton() {}
    createIcon() {}
}
class AppleFactory{
    createButton() {
        return new AppleButton();
    }
    createIcon() {
        return new AppleIcon();
    }
}
class WindowsFactory{
    createButton() {
        return new WindowButton();
    }
    createIcon() {
        return new WindowIcon();
    }
}
const settings={
    'apple': AppleFactory,
    'windows':WindowsFactory
}
let appleFactory=new settings['apple']();
// 苹果按钮
appleFactory.createButton().render();
appleFactory.createIcon().render();

let windowsFactory=new settings['windows']();
// 
windowsFactory.createButton().render();
windowsFactory.createIcon().render();