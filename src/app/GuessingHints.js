import { Loadable } from './Loadable';

export const GuessingHints = ({ filteredWords, filterPattern, mustInclude, isComputing }) => {

  return (
    <article id='guessing-hints'>
      <h2>Word List</h2>
      <Loadable isComputing={isComputing}>
        <div>
          <span class='guessing-hints__wordcount'>{ filteredWords.length.toLocaleString() }</span>
          <span> words match <code>/{filterPattern}/</code></span>
          { !!mustInclude.length && (
            <span> and include: <code>{mustInclude}</code></span>
          )}
        </div>
        <ul>
          { filteredWords.map(x => <li>{x}</li>) }
        </ul>
      </Loadable>
    </article>
  );
}
