function Animal (type) {
    this.type = type
    this.name = 'dog'
};
Animal.prototype.say = function () {
    console.log('say')
}
function mockNew () {
    let constructor = [].shift.call(arguments);
    let o = {};
    o.__proto__ = constructor.prototype;
    constructor.apply(o, arguments)
    return o
}
let animal = mockNew(Animal, '哺乳类')
console.log(animal)