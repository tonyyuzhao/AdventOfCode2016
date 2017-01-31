const transpose = matrix =>
  matrix[0].map( (_, col) =>
    matrix.map( row => row[col] ) )

const getNumberTriangles = input => {
  let number = 0
  for( var group of input.trim().split( /((?:.+\n){3})/ ) ) {
    let matrix = []
    for( var line of group.trim().split( /\n/ ) ) {
      matrix.push( line.trim().split( /\s+/ ).map(Number) )
    }
    matrix = transpose(matrix)
    for( var array of matrix ) {
      array.sort( (obj1, obj2) => {
        return obj1 - obj2
      })
      if( array[0] + array[1] > array[2] ) {
        number++
      }
    }
  }
  return number
}

const input = document.getElementById( "input" )
console.log( "number of triangles:", getNumberTriangles( input.value ) )
