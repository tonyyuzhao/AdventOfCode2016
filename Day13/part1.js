const INPUT = 1352, GOAL = {x:31, y:39}
let traversed = [[],[1]]

const wall = (x,y) => {
  let binary = (x*x + 3*x + 2*x*y + y + y*y + INPUT).toString(2)
  return binary.split('').filter(bit => bit == 1).length % 2 != 0
}

const bfs = () => {
  let q = [{x:1, y:1, dist:0}]
  while((c = q.shift()) !== undefined) {
    if(c.x == GOAL.x && c.y == GOAL.y) {
      console.log("shortest path: " + c.dist + " steps")
      break
    }
    [{x:c.x-1,y:c.y}, {x:c.x+1,y:c.y}, {x:c.x,y:c.y-1}, {x:c.x,y:c.y+1}].forEach(n => {
      if(n.x > traversed.length-1) {
        traversed.push([])
      }
      if(n.x >= 0 && n.y >= 0 && !wall(n.x,n.y) && traversed[n.x].indexOf(n.y) === -1) {
        q.push({x:n.x, y:n.y, dist:c.dist+1})
        traversed[n.x].push(n.y)
      }
    })
  }
}

bfs()
