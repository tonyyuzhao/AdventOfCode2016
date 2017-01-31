const fs = require("fs")
const readable = fs.createReadStream("input.txt", {
  encoding: "utf-8"
})

const process = queue => {
  let _marker = undefined, _queue = undefined
  let _n = undefined, _times = undefined
  let _result = 0
  while((char = queue.shift()) !== undefined ) {
    if(_queue !== undefined) {
      _queue.push(char)
      if(_queue.length == _n) {
        _result += process(Array(_times+1).join(_queue.join('')).split(''))
        _queue = undefined
        _marker = undefined
      }
    } else if(_marker !== undefined) {
      if(char == ')') {
        [_n, _times] = _marker.join('').split('x').map(Number)
        _queue = []
      } else {
        _marker.push(char)
      }
    } else if(char == '(') {
      _marker = []
    } else {
      _result++
    }
  }
  return _result
}

console.log("(3x3)XYZ", process("(3x3)XYZ".split('')))
console.log("X(8x2)(3x3)ABCY", process("X(8x2)(3x3)ABCY".split('')))
console.log("(27x12)(20x12)(13x14)(7x10)(1x12)A", process("(27x12)(20x12)(13x14)(7x10)(1x12)A".split('')))
console.log("(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN", process("(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN".split('')))

let input = []
readable.on("readable", () => {
  while((char = readable.read(1)) !== null) {
    input.push(char)
  }
}).on('close', () => {
  console.log("decompressed length of file", process(input))
})
