const fs = require("fs")
const readline = require("readline")

Object.defineProperty(Array.prototype, "match", {
  enumerable: false,
  value: function(regex) {
    for(var entry of this) {
      if((match = entry.match(regex)) !== null) {
        return {match: match, entry: entry}
      }
    }
    return null
  }
})

class Rule {
  constructor(infer) {
    this.infer = infer
  }
}

const bot_has_low_and_high = new Rule(entry => {
  if((ante1 = entry.match(/value (\d+) goes to (bot \d+)$/)) !== null
    && (ante2 = knowledge_base.filter(e => e != entry).match(new RegExp("value (\\d+) goes to " + ante1[2] + "$"))) !== null) {
    const [low, high] = [ante1[1], ante2.match[1]].sort((chip1, chip2) => chip1 - chip2)
    knowledge_base.splice(knowledge_base.indexOf(entry), 1)
    knowledge_base.splice(knowledge_base.indexOf(ante2.entry), 1)
    knowledge_base.push(ante1[2] + " has low " + low +" and high " + high)
  }
})

const low_and_high_to_dests = new Rule(entry => {
  if((ante1 = entry.match(/(bot \d+) gives low to ([a-z]+ \d+) and high to ([a-z]+ \d+)$/)) !== null
    && (ante2 = knowledge_base.match(new RegExp(ante1[1] + " has low (\\d+) and high (\\d+)$"))) !== null) {
    knowledge_base.splice(knowledge_base.indexOf(entry), 1)
    knowledge_base.splice(knowledge_base.indexOf(ante2.entry), 1)
    knowledge_base.push("value " + ante2.match[1] + " goes to " + ante1[2])
    knowledge_base.push("value " + ante2.match[2] + " goes to " + ante1[3])
  }
})

const goal = () => {
  if((match = knowledge_base.match(/(bot \d+) has low 17 and high 61$/)) !== null) {
    return match
  }
  return null
}

let knowledge_base = []

const rule_base = [
  bot_has_low_and_high,
  low_and_high_to_dests
]

const inference_engine = {
  run: function() {
    rule_base.forEach(rule => {
      if((result = goal()) === null) {
        knowledge_base.forEach(entry => {
          rule.infer(entry)
        })
      }
    })
  }
}

let result = null
readline.createInterface({
    input: fs.createReadStream("input.txt")
  })
  .on("line", line => {
    knowledge_base.push(line)
    inference_engine.run()
  })
  .on("close", () => {
    while((result = goal()) === null) {
      inference_engine.run()
    }
    console.log("goal:", result.entry)
  })
