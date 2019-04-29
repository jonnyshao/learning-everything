class Sum {
    sum (a, b) {
        return a + b;
    }
}

class Minus {
    minus (a, b) {
        return a - b;
    }
}

class Multiply {
    multiply (a, b) { 
        return a * b
    }
}

class Divide {
    minus (a, b) {
        return a / b;
    }
}

class Calculator {
    constructor () {
        this.sumInstance = new Sum();
        this.minusInstance = new Minus()
        this.multiplyInstance = new Multiply();
        this.divideInstance = new Divide()
    }
    sum (a, b) {
        return this.sumInstance.sum(a, b)
    }
    minus (a, b) {
        return this.minusInstance.minus(a, b)
    }
    multiply (a, b) {
        return this.multiplyInstance.multiply(a, b)
    }
    divide (a, b) {
        return this.divideInstance.divide(a, b)
    }
}

let calculator = new Calculator()

console.log(calculator.sum(1,2))