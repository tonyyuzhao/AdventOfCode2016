const VALID_KEYS = [
  [],
  [3],
  [3,6],
  [1,2,4,7],
  [3,8],
  [6],
  [2,5,7,10],
  [3,6,8,11],
  [4,7,9,12],
  [8],
  [6,11],
  [7,10,12,13],
  [8,11],
  [11]
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
        case 'U': current < 5 || current > 12 ? next -=2 : next -= 4; break
        case 'D': current < 2 || current > 9 ? next +=2 : next += 4; break
      }
      if ( VALID_KEYS[current].indexOf(next) != -1 ) {
        current = next
      }
    }
    code += current > 9 ? String.fromCharCode( 55 + current ) : current
  }
  return code
}

const input = document.getElementById( "input" )
console.log( "bathroom code:", getBathroomCode( input.value ) )
