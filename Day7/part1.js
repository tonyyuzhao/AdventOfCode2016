const fs = require("fs")
const readline = require("readline")
const abba_regex = /([a-z])(?!\1)([a-z])\2\1/
const hypernet_abba_regex = /\[[a-z]*([a-z])(?!\1)([a-z])\2\1[a-z]*\]/

let num = 0
readline.createInterface({
    input: fs.createReadStream("input.txt")
  })
  .on("line", line => {
    if(abba_regex.test(line) && !hypernet_abba_regex.test(line)) {
      num++
    }
  })
  .on("close", () => {
    console.log("number of IPs supporting TLS:", num)
  })
