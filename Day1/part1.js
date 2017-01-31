const UNIT_VECTORS = [ [0,1], [1,0], [0,-1], [-1,0] ]

let vector = {
  x: 0, y: 0, index: 0,
  update: function( turn, units ) {
    this.index = updateIndex( this.index, turn )
    this.x += units * UNIT_VECTORS[ this.index ][0]
    this.y += units * UNIT_VECTORS[ this.index ][1]
  }
}

const updateIndex = ( current, turn ) => {
    switch ( turn ) {
      case "R": return ( current + 1 ) % 4
      case "L": return ( current + 3 ) % 4
    }
}

const getShortestPath = input => {
    for( var instruction of input.split( /,\s*/ ) ) {
      vector.update( instruction.charAt(0), Number.parseInt( instruction.slice(1) ) )
    }
    return Math.abs( vector.x ) + Math.abs( vector.y )
}

const input = "L3, R1, L4, L1, L2, R4, L3, L3, R2, R3, L5, R1, R3, L4, L1, L2, R2, R1, L4, L4, R2, L5, R3, R2, R1, L1, L2, R2, R2, L1, L1, R2, R1, L3, L5, R4, L3, R3, R3, L5, L190, L4, R4, R51, L4, R5, R5, R2, L1, L3, R1, R4, L3, R1, R3, L5, L4, R2, R5, R2, L1, L5, L1, L1, R78, L3, R2, L3, R5, L2, R2, R4, L1, L4, R1, R185, R3, L4, L1, L1, L3, R4, L4, L1, R5, L5, L1, R5, L1, R2, L5, L2, R4, R3, L2, R3, R1, L3, L5, L4, R3, L2, L4, L5, L4, R1, L1, R5, L2, R4, R2, R3, L1, L1, L4, L3, R4, L3, L5, R2, L5, L1, L1, R2, R3, L5, L3, L2, L1, L4, R4, R4, L2, R3, R1, L2, R1, L2, L2, R3, R3, L1, R4, L5, L3, R4, R4, R1, L2, L5, L3, R1, R4, L2, R5, R4, R2, L5, L3, R4, R1, L1, R5, L3, R1, R5, L2, R1, L5, L2, R2, L2, L3, R3, R3, R1"
console.log( "final vector", vector.x, vector.y )
console.log( "shortest path length", getShortestPath( input ) )
