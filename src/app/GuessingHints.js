import { Loadable } from './Loadable';

export const GuessingHints = ({ filteredWords, filterPattern, mustInclude, isComputing }) => {

  return (
    <article id='guessing-hints'>
      <h2>Possible Words</h2>
      <p>Some of these won't be accepted by Wordle. This list is adapted from <a href="https://github.com/dwyl/english-words/">dwyl/english-words</a> (instead of reverse-engineering Wordle)</p>
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
