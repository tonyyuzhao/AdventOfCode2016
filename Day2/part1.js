const VALID_KEYS = [
  [],
  [2,4],
  [1,3,5],
  [2,6],
  [1,5,7],
  [2,4,6,8],
  [3,5,9],
  [4,8],
  [5,7,9],
  [6,8]
]

const getBathroomCode = instructions => {
  let code = ""
  let current = 5
  for( var line of instructions.trim().split( /\n/ ) ) {
    for( var i = 0; i < line.length; i++ ) {
      const move = line.charAt(i)
      let next = current
      switch (move) {
        case 'L': next -= 1; break
        case 'R': next += 1; break
        case 'U': next -= 3; break
        case 'D': next += 3; break
      }
      if ( VALID_KEYS[current].indexOf(next) != -1 ) {
        current = next
      }
    }
    code += current
  }
  return code
}

const input = document.getElementById( "input" )
console.log( "bathroom code:", getBathroomCode( input.value ) )
