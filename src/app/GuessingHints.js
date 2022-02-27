export const GuessingHints = ({ filteredWords, filterPattern, mustInclude }) => {
  return (
    <article id='guessing-hints'>
      <h2>Word List</h2>
      <div><span class='guessing-hints__wordcount'>{ filteredWords.length.toLocaleString() }</span> words match <code>/{filterPattern}/</code>
      { !!mustInclude.length && (
        <span> and include: <code>{mustInclude}</code></span>
      )}
      </div>
      <ul>
        { filteredWords.map(x => <li>{x}</li>) }
      </ul>
    </article>
  );
}
