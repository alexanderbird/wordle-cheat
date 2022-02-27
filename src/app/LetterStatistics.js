export const LetterStatistics = ({ statistics, suggestGuessesForNLetters }) => {
  return (
    <article id='letter-statistics'>
      <h2>Letter Frequency</h2>
      <div>What is the most common letter?</div>
      <ul>
        { statistics.map(({ letter, count }, i) => (
          <li><div class='letter-statistics__item'>
            <span class={'letter-statistics__letter ' + (i < suggestGuessesForNLetters ? 'letter-statistics__letter--bold' : '')}>{letter}</span>
            <span class='letter-statistics__count'>{count}</span>
          </div></li> 
        ))}
      </ul>
    </article>
  );
}
