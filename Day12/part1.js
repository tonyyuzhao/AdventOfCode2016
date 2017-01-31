const fs = require("fs")
const readline = require("readline")

let mar = []
readline.createInterface({
    input: fs.createReadStream("input.txt")
  })
  .on("line", line => {
    mar.push(line)
  })
  .on("close", () => {
    let reg = {a: 0, b: 0, c: 0, d: 0}
    let pc = 0
    while(pc >=0 && pc < mar.length) {
      [_, opcode, operand1, operand2] = mar[pc].match(/(.{3})\s([a-z0-9]+)\s?(.*)/)
      if(opcode == "cpy") {
        reg[operand2] = reg[operand1] !== undefined? reg[operand1] : Number.parseInt(operand1)
      } else if(opcode == "inc") {
        reg[operand1]++
      } else if(opcode == "dec") {
        reg[operand1]--
      } else if(opcode == "jnz") {
        if(reg[operand1] != 0 ) {
          pc += Number.parseInt(operand2)
          continue
        }
      }
      pc++
    }
    console.log("registers: ", reg)
    console.log("program counter", pc)
  })
