const goal = () => {
  if((ante1 = knowledge_base.match(/value (\d+) goes to output 0$/)) !== null
    && (ante2 = knowledge_base.match(/value (\d+) goes to output 1$/)) !== null
    && (ante3 = knowledge_base.match(/value (\d+) goes to output 2$/)) !== null) {
    return {match: [ante1, ante2, ante3], entry: ante1.match[1]*ante2.match[1]*ante3.match[1]}
  }
  return null
}
