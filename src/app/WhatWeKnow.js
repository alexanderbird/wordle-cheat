export const WhatWeKnow = ({ updateWhatWeKnow }) => {

  function updateCorrectGuess(i, event) {
    const correct = [];
    correct[i] = event.target.value.trim().substring(0, 1);
    updateWhatWeKnow({ correct });
  }

  function updateIncorrectGuess(event) {
    const incorrect = event.target.value.trim().split('').filter(x => !!x.trim());
    updateWhatWeKnow({ incorrect });
  }

  function updateWrongSpotInfo(i, event) {
    const wrongSpot = [];
    wrongSpot[i] = event.target.value.trim().split('').filter(x => !!x);
    updateWhatWeKnow({ wrongSpot });
  }

  return (
    <article id='what-we-know'>
      <h2>What We Know</h2>
      <section>
        <h3>Correct guesses:</h3>
        <input class='what-we-know__input what-we-know__input--1x1' type='text' onKeyUp={e => updateCorrectGuess(0, e)}></input>
        <input class='what-we-know__input what-we-know__input--1x1' type='text' onKeyUp={e => updateCorrectGuess(1, e)}></input>
        <input class='what-we-know__input what-we-know__input--1x1' type='text' onKeyUp={e => updateCorrectGuess(2, e)}></input>
        <input class='what-we-know__input what-we-know__input--1x1' type='text' onKeyUp={e => updateCorrectGuess(3, e)}></input>
        <input class='what-we-know__input what-we-know__input--1x1' type='text' onKeyUp={e => updateCorrectGuess(4, e)}></input>
      </section>
      <section>
        <h3>None of these letters:</h3>
        <textarea class='what-we-know__input what-we-know__input--5x5' spellcheck="false" onKeyUp={updateIncorrectGuess} ></textarea>
      </section>
      <section>
        <h3>Correct letters but not in these spots:</h3>
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false" onKeyUp={e => updateWrongSpotInfo(0, e)}></textarea>
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false" onKeyUp={e => updateWrongSpotInfo(1, e)}></textarea>
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false" onKeyUp={e => updateWrongSpotInfo(2, e)}></textarea>
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false" onKeyUp={e => updateWrongSpotInfo(3, e)}></textarea>
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false" onKeyUp={e => updateWrongSpotInfo(4, e)}></textarea>
      </section>
    </article>
  );
}
