class A {
  constructor(bridge) {
    this.position = 'A';
    this.bridge = bridge;
  }
  go () {
    console.log(`${this.from()}到达${this.bridge.to()}`)
  }
  from (){throw new Error('子类必须实现此方法')}
}

class a extends A {
  from(){return 'a'}
}

class B {
  to () {throw new Error('子类必须实现此方法')}
}

class b extends B {
  to () {return 'b'}
}

let b1 = new b()
let a1 = new a(b1)
console.log(a1.go())