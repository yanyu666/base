function _extends(Child, Parent) {
	Child.prototype = Parent.prototype;
	Child.prototype.constructor = Child;
}
function Shape() {}
Shape.prototype.draw = function () {};

function CircleShape(parent) {
	this.parent = parent;
}
_extends(CircleShape, Shape);
CircleShape.prototype.draw = function () {
	console.log("画一个圆");
};
let circleShape = new CircleShape();
circleShape.draw();
function CircleEdgeShape(parent) {
	this.parent = parent;
}
// _extends(CircleEdgeShape, CircleShape);
CircleEdgeShape.prototype.fillColor = function () {
	this.parent.draw();
	console.log("填充颜色");
};
let edgeShape = new CircleEdgeShape(circleShape);
edgeShape.fillColor();

class Coffee {
	make(water) {
		return `${water}+咖啡`;
	}
	cost() {
		return 10;
	}
}
class Milk {
	constructor(parent) {
		this.parent = parent;
	}
	make(water) {
		return `${this.parent.make(water)}+牛奶`;
	}
	cost() {
		return this.parent.cost() + 1;
	}
}
class Suger {
	constructor(parent) {
		this.parent = parent;
	}
	make(water) {
		return `${this.parent.make(water)}+糖`;
	}
	cost() {
		return this.parent.cost() + 2;
	}
}
let coffee = new Coffee();
let milkCoffee = new Milk(coffee);
let milksugerCoffee = new Suger(milkCoffee);
// 水+咖啡+牛奶+糖=13
console.log(milksugerCoffee.make("水")
+ "=" 
+ milksugerCoffee.cost());
