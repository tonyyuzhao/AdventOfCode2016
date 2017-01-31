const getNumberTriangles = input => {
  let number = 0
  for( var sides of input.trim().split( /\n/ ) ) {
    let array = sides.trim().split( /\s+/ ).map(Number)
    array.sort( (obj1, obj2) => {
      return obj1 - obj2
    })
    if( array[0] + array[1] > array[2] ) {
      number++
    }
  }
  return number
}

const input = document.getElementById( "input" )
console.log( "number of triangles:", getNumberTriangles( input.value ) )
