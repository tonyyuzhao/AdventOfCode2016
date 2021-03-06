const ms = f => f.match(/[a-z]/g) || []
const gs = f => f.match(/[A-Z]/g) || []
const last = steps => steps[steps.length - 1]
const valid_moves = [
"+ot","+op","+or","+oc","+oe","+od",
"+tp","+tr","+tc","+te","+td",
"+pr","+pc","+pe","+pd",
"+rc","+re","+rd",
"+ce","+cd",
"+ed",
"+OT","+OP","+OR","+OC","+OE","+OD",
"+TP","+TR","+TC","+TE","+TD",
"+PR","+PC","+PE","+PD",
"+RC","+RE","+RD",
"+CE","+CD",
"+ED",
"+Oo","+Tt","+Pp","+Rr","+Cc","+Ee","+Dd",
"+O","+T","+P","+R","+C","+E","+D","+o","+t","+p","+r","+c","+e","+d",
"-O","-T","-P","-R","-C","-E","-D","-o","-t","-p","-r","-c","-e","-d"]

const root = p => [p]
const reject = steps => {
  if(steps.length >= min_steps) {
    return true
  }
  for(var i = 0; i < steps.length - 1; i++) {
    if(steps[i].floors.every((f,index) =>
      ms(f).length == ms(last(steps).floors[index]).length && gs(f).length == gs(last(steps).floors[index]).length)) {
      return true
    }
  }
  if(prune.length > 1 && prune.some(step => step.floors.every((f,index) =>
    f.toString() == last(steps).floors[index].toString()))) {
    return true
  }
  return last(steps).floors.some(f => gs(f).length > 0 && ms(f).length > gs(f).length)
}
const accept = steps => last(steps).floors[3].length == 14
const output = steps => {
  //console.log("---------- Solution ----------")
  console.log("solution with steps " + (steps.length - 1))
  //steps.forEach((step,index) => {
  //  console.log("step " + index, step)
  //})
}
const next = (steps,moves) => {
  while((move = moves.shift()) !== undefined) {
    let curr_step = last(steps)
    let next_step = {floors: curr_step.floors.slice(), e: curr_step.e}
    next_step.floors[next_step.e] = curr_step.floors[curr_step.e].replace(new RegExp('\[' + move.substring(1) + '\]', "g"), '')
    next_step.e = move.charAt(0) == '-' ? curr_step.e - 1 : curr_step.e + 1
    next_step.floors[next_step.e] += move.substring(1)
    steps.push(next_step)
    return steps
  }
  return null
}
const lookahead = steps => {
  let curr_step = last(steps)
  return valid_moves.reduce((result,move) => {
    if((move.charAt(0) == '-' && curr_step.e == 0) || (move.charAt(0) == '+' && curr_step.e == 3)) {
      return result
    }
    if((move.length > 2 && curr_step.floors[curr_step.e].length < 2)) {
      return result
    }
    if(!move.substring(1).split('').every(char => curr_step.floors[curr_step.e].includes(char))) {
      return result
    }
    result.push(move)
    return result
  },[])
}
let min_steps = Number.POSITIVE_INFINITY
let prune = []
const backtrack = steps => {
  if(reject(steps)) {
    //console.log("---------- Rejected ----------")
    //console.log(last(steps))
    return
  }
  if(accept(steps)) {
    min_steps = steps.length
    output(steps)
    return
  }
  let moves = lookahead(steps)
  let candidate = next(steps,moves)
  while(candidate !== null) {
    backtrack(candidate)
    steps.pop()
    candidate = next(candidate,moves)
  }
  prune.push({floors: last(steps).floors.slice(), e: last(steps).e})
}

//backtrack(root({floors: ["RTrtCcEeDdOP","op","",""], e: 0}))
backtrack(root({floors: ["RTrtCcOPEeDd","op","",""], e: 0}))
