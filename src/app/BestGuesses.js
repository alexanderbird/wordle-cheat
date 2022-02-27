const NumberPicker = ({ setNumberOfLetters, value }) => (
  <select onChange={x => setNumberOfLetters(Number(x.target.value))}>
    <option value="5" selected={value === 5}>5</option>
    <option value="6" selected={value === 6}>6</option>
    <option value="7" selected={value === 7}>7</option>
    <option value="8" selected={value === 8}>8</option>
    <option value="9" selected={value === 9}>9</option>
  </select>
   
)
export const BestGuesses = ({ suggestGuessesForNLetters, bestGuesses, setNumberOfLetters }) => {
  return (
    <article id='best-guesses'>
      <h2>Best Guesses</h2>
      <div>
        Words containing 5 of the <NumberPicker setNumberOfLetters={setNumberOfLetters} value={suggestGuessesForNLetters} /> most common letters
        amongst the possible words
      </div>
      <ul>
        { bestGuesses.map(x => <li>{x}</li>) }
      </ul>
    </article>
  );
}
