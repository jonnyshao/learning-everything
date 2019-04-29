class Animal {
  constructor (name) {
    this.name = name;
  }
  eat (food) {
    console.log(`${this.name} eat ${food}`);
  }
}

class Dog extends Animal{
  constructor () {
    super('dog')
  }
  speak () {
    console.log('wang wang')
  }
}
let dog = new Dog()
dog.eat('meat')
dog.speak()