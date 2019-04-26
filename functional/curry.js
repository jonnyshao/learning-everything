var curry = binaryFn => {
  return function (firstArg) {
    return function (secondArg) {
      return binaryFn(firstArg, secondArg)
    }
  }
}
var genericTable = (x,y) => x * y
// genericTable(2, 2)
console.log(curry(genericTable)(2)(3))