const fs = require("fs")
const readline = require("readline")
const MAX_ROW = 6, MAX_COL = 50

const INPUT = "sparse_matrix.txt", OUTPUT = "screen_display.txt"
const rows = fs.readFileSync(INPUT, "utf-8").split('\n')
  .filter(s => s.length>0)

fs.writeFile(OUTPUT, '', err => {
  if(err) {
    console.log(err)
  }
})

for(var r=0; r<rows.length; r++) {
  let cols = rows[r].split(',').map(Number)
  for(var c=0; c<MAX_COL; c++) {
    fs.appendFileSync(OUTPUT, cols.indexOf(c) === -1 ?  ' ' : '0', err => {
      if(err) {
        console.log(err)
      }
    })
  }
  fs.appendFileSync(OUTPUT, '\n', err => {
    if(err) {
      console.log(err)
    }
  })
}
