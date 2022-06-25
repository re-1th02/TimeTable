import escObj from "./Escape";

class listen{
    constructor(num){
        this.num = num;
        this.listening = false;
        this.callBack = (e) => {if(e.key==="Escape" && escObj.check(this.num)){this.main();}}
    }
    start(f){
        escObj.app(this.num);
        document.addEventListener('keydown', this.callBack, false);
        this.listening = true;
        this.main = f;
    }
    end(){
        escObj.remove(this.num);
        document.removeEventListener('keydown', this.callBack, false);
        this.listening = false;
    }
}

var listenObj = {
    left : new listen(0),
    right : new listen(1),
    leftFS : new listen(2),
    rightFS : new listen(3),
    sugg : new listen(4)
}

export default listenObj;