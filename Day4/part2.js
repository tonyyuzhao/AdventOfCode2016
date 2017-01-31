const rotate = ( code, n ) => {
  if ( code >= 97 && code <= 122 ) {
    return String.fromCharCode( ( ( code - 97 + n )  % 26)  + 97 )
  }
  return ' '
}

const getSectorIdWithPattern = ( input, pattern ) => {
  for( var room of input.trim().split( /\n/ ) ) {
    const room_info = room.trim()
      .split( /([a-z\-]+)+(\d+)\[([a-z]+)\]/ )
      .filter( str => str != undefined && str.length > 0 )
    const name = room_info[0]
    const id = Number.parseInt( room_info[1] )
    const checksum = room_info[2]

    let calc_checksum = name.replace( /[\-]/g, '' )
      .split( '' )
      .reduce( ( words, char ) => {
          for( var i in words ) {
            if( words[i].charAt(0) == char ) {
              words[i] += char
              return words
            }
          }
          words.push(char)
          return words
        }, [] )
      .sort( ( a, b ) => {
          if( a.length == b.length ) {
            return a < b ? -1 : 0
          }
          return b.length - a.length
        } )
      .splice( 0,5 )
      .reduce( ( checksum, obj ) => checksum.concat( obj.charAt(0) ), "" )

    if( checksum == calc_checksum ) {
      let decrypted = name.split( '' )
        .map( char => rotate( char.charCodeAt(0), id ) )
        .join( '' )
      if( decrypted.includes( pattern ) ) {
        return id
      }
    }
  }
  return null
}

const input = document.getElementById( "input" )
console.log( "sector id with pattern:", getSectorIdWithPattern( input.value, "northpole object" ) )
