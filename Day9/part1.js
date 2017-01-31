const fs = require("fs")
const readable = fs.createReadStream("input.txt", {
    encoding: 'utf8',
})

let stack = undefined
let index = 0, n = 0
let result = ""

readable.on("readable", () => {
  while((symbol = readable.read(1)) !== null) {
    if(stack !== undefined) {
      if(index == 0 && stack.length > 0) {
        result += Array(n+1).join(stack.join(''))
        stack = undefined
      } else if(symbol == ')' && index <= 0) {
        [index, n] = stack.join('').split('x').map(Number)
        stack = []
      } else {
        stack.push(symbol)
        index--
      }
    }
    if(stack === undefined) {
      if(symbol == '(') {
        stack = []
      } else {
        result += symbol
      }
    }
  }
}).on('close', () => {
  console.log("result", result)
  console.log("decompressed length of file", result.replace(/\s/, '').length)
})
