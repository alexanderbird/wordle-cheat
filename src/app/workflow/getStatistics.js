export function getStatistics(filteredWords) {
  const statisticsObject = {};
  filteredWords
    .map(word => Array.from(new Set(word.split(''))))
    .forEach(letters => {
      letters.forEach(letter => {
        statisticsObject[letter] = statisticsObject[letter] || { letter, count: 0 };
        statisticsObject[letter].count += 1;
      });
    });

  return Object.values(statisticsObject)
    .sort((lhs, rhs) => rhs.count - lhs.count);
}

