// 11.观察者模式

// 被观察者
class Subject {
    constructor(){
        this.observers = [];
    }
    addObserver(ob){

    }
    removeObserver(ob){}
    notify(){}
    setState(state){}
}



// 观察者

class Observer {
    constructor(subject){
        this.subject = subject;
    }
    update(){}
}
const sub = new Subject();
const ob = new Observer();