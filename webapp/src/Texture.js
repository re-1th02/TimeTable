const Texture = {
    light1 : '#6EA6FF',
    light2 : '#5A89FF',
    dark1  : '#283A63',
    dark2  : '#1A2647',
    lightgrad : 'linear-gradient(#6EA6FF, #5A89FF)',
    darkgrad  : 'linear-gradient(#283A63, #1A2647)',
    darkgradrev  : 'linear-gradient(#1A2647, #283A63)',
    lightgrad_ : (e) => {return `linear-gradient(to ${e}, ${this.light1}, ${this.light2})`},
    darkgrad_ : `linear-gradient(to top left, #283A63, #1A2647)`,
};
export default Texture;