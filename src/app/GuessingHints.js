export const GuessingHints = ({ filteredWords, filterPattern, mustInclude }) => {
  return (
    <article id='guessing-hints'>
      <h2>{ filteredWords.length } Words</h2>
      <div>Match: <code>/{filterPattern}/</code></div>
      { !!mustInclude.length && (
        <div>and include: <code>{mustInclude}</code></div>
      )}
      <ul>
        { filteredWords.map(x => <li>{x}</li>) }
      </ul>
    </article>
  );
}
