const fs = require("fs")
const readline = require("readline")
const aba_regex = /([a-z])(?!\1)([a-z])\1/g
const hypernet_regex = /(\[[a-z]+\])/

let num = 0
readline.createInterface({
    input: fs.createReadStream("input.txt")
  })
  .on("line", seq => {
    let hypernet = seq.split(hypernet_regex)
      .filter(seq => hypernet_regex.test(seq))
      .join()
    num += supernet = seq.split(hypernet_regex)
      .filter(seq => !hypernet_regex.test(seq))
      .reduce((abas,seq) => {
        while((aba = aba_regex.exec(seq)) !== null) {
          abas.push(aba[0])
          aba_regex.lastIndex = aba.index+1
        }
        return abas
      }, [])
      .some( aba => hypernet.includes(aba[1]+aba[0]+aba[1]))
  })
  .on("close", () => {
    console.log("number of IPs supporting SSL:", num)
  })
