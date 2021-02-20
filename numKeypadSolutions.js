const numKeypadSolutions = (wordlist, keypads) => {
  const aCode = "A".codePointAt();
  let keypadChars = Array(keypads.length);

  let keyLetters = keypads.map((word, i) => {
    let fillBit = 1 << (word[0].codePointAt() - aCode);
    keypadChars[i] = word
      .split("")
      .reduce(
        (bit, char) => (bit |= 1 << (char.codePointAt() - aCode)),
        fillBit
      );
    return fillBit;
  });

  let numWords = Array(keypads.length).fill(0);
  let wordChars;

  for (let i = 0; i < wordlist.length; i++) {
    wordChars = 0;
    for (let j = 0; j < wordlist[i].length; j++) {
      wordChars |= 1 << (wordlist[i][j].codePointAt() - aCode);
    }

    for (let k = 0; k < keypads.length; k++) {
      if (
        (keypadChars[k] & wordChars) === wordChars &&
        (keyLetters[k] & wordChars) === keyLetters[k]
      ) {
        numWords[k]++;
      }
    }
  }

  return numWords;
};

console.log(
  numKeypadSolutions(
    ["APPLE", "PLEAS", "PLEASE"],
    ["AELWXYZ", "AELPXYZ", "AELPSXY", "SAELPRT", "XAEBKSY"]
  )
);
