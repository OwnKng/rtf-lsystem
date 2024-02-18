type Rule = {
  F: string
}

export const createLSystem = (axiom: string, rules: Rule) => {
  let sentence = axiom
  const ruleset = rules

  const generate = () => {
    let nextGen = ""

    for (let i = 0; i < sentence.length; i++) {
      const c = sentence.charAt(i)

      // @ts-expect-error ignore
      if (ruleset[c]) {
        // @ts-expect-error ignore
        nextGen += ruleset[c]
      } else {
        nextGen += c
      }
    }

    sentence = nextGen
  }

  return {
    getSentence: () => sentence,
    generate,
  }
}
