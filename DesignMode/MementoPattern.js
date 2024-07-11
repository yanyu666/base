// 备忘录模式

// 1，发起人角色；记录当前时刻的内部状态，负责创建和恢复备忘录数据，允许访问返回到先前状态所需的所有数据
// 2，备忘录角色； 存储发起人的内部状态，在需要的时候提供发起人需要的内部状态
// 3，备忘录管理员角色；对备忘录进行管理，保存和提供备忘录，只能将备忘录传递给其他角色
// 4，client客户端

// // 发起人
// function Originator(state){
//     this.state = state;
// }
// Originator.prototype.createMemo = function(state){
//     let memo = new Memo(state);
//     memo.id = memo.id++;
//     return memo;
// }

// Originator.prototype.setMemo = function(memo){
//     this.state = memo.getState();
// }

// 备忘录
function Memo(state) {
	this.id = 0;
	this.state = state;
}
Memo.prototype.setState = function (state) {
	this.state = state;
};
Memo.prototype.getState = function () {
	return this.state;
};

// 备忘录管理员
function CareTaker() {
	this.List = [];
}
CareTaker.prototype.setMemo = function () {};
let careTaker = new CareTaker();
console.log(careTaker);

// 备忘类
class Memento {
	constructor(content) {
		this.content = content;
	}
	getContent() {
		return this.content;
	}
}

// 备忘列表
class CarTaker {
	constructor() {
		this.list = [];
	}
	add(memento) {
		this.list.push(memento);
	}
	get(index) {
		return this.list[index];
	}
	getList() {
		return this.list;
	}
}

// 编辑器
class Editor {
	constructor() {
		this.content = null;
	}
	setContent(content) {
		this.content = content;
	}
	getContent() {
		return this.content;
	}
	saveContentToMemento() {
		return new Memento(this.content);
	}
	getConentFromMemento(memento) {
		this.content = memento.getContent();
	}
}

// 测试代码
let editor = new Editor();
let careTaker = new CarTaker();
editor.setContent('111');
editor.setContent('222');

careTaker.add(editor.saveContentToMemento())  // 将当前222内容备份
editor.setContent('333')
careTaker.add(editor.saveContentToMemento())  // 将当前333内容备份
editor.setContent('444')

console.log(editor.getContent())
editor.getConentFromMemento(careTaker.get(1)) // 撤销
console.log(editor.getContent())
editor.getConentFromMemento(careTaker.get(0)) // 撤销
console.log(editor.getContent())
