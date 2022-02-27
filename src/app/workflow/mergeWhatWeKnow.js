export const whatWeKnowTemplate = {
  correct: [],
  incorrect: [],
  wrongSpot: [[],[],[],[],[]]
}

export function mergeWhatWeKnow(whatWeKnow, newInfo) {
  return {
    correct: mergeArrays(whatWeKnow.correct, newInfo.correct),
    incorrect: newInfo.incorrect || whatWeKnow.incorrect,
    wrongSpot: mergeArrays(whatWeKnow.wrongSpot, newInfo.wrongSpot)
  };
}

function mergeArrays(one, two) {
  if (!two) return one;
  const result = [];
  for (let i = 0; i < Math.max(one.length, two.length); i++) {
    result[i] = two[i] === undefined ? one[i] : two[i];
  }
  return result;
}
