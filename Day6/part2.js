const getMessage = input => {
  let stats = []
  for( var data of input.trim().split( /\n/ ) ) {
    stats = stats.concat( data.split( '' )
      .map( ( char, index ) => {
        let stat = {}
        stat.index = index, stat.char = char, stat.freq = 1
        return stat
      })
    )
  }

  return stats.reduce( ( aggr, stat ) => {
      for( var i in aggr ) {
        if( aggr[i].index == stat.index && aggr[i].char == stat.char ) {
          aggr[i].freq += stat.freq
          return aggr
        }
      }
      aggr.push( stat )
      return aggr
    }, [] ).reduce(  ( mode, aggr ) => {
      if( mode[aggr.index] == undefined ) {
        mode[aggr.index] = {}
        mode[aggr.index].char = aggr.char, mode[aggr.index].freq = aggr.freq
      } else if( mode[aggr.index].freq > aggr.freq ) {
      	mode[aggr.index].char = aggr.char, mode[aggr.index].freq = aggr.freq
      }
      return mode
    }, [] ).reduce( ( message, mode ) => message.concat( mode.char ), "" )
}

const input = document.getElementById( "input" )
console.log( "error corrected message:", getMessage( input.value ) )
