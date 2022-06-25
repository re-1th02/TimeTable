class Escape{
    constructor(){
        this.curr = [];
    }
    app(num){
        this.curr.push(num);
    }
    remove(num){
        this.curr = this.curr.filter((v, i, arr) => {return v!==num})
    }
    check(num){
        return this.curr[this.curr.length-1]===num
    }
}

var escObj = new Escape();
export default escObj;