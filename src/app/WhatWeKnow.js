import { useRef, useState } from 'preact/hooks';

const CONTINUE_PROCESSING = true;
const STOP_PROCESSING = false;

export const WhatWeKnow = ({ updateWhatWeKnow }) => {

  const inputs = {
    correct: [ useRef(), useRef(), useRef(), useRef(), useRef() ],
    incorrect: useRef(),
    wrongSpot: [ useRef(), useRef(), useRef(), useRef(), useRef() ]
  }

  const [column, setColumn] = useState(0);

  function nextCorrectInput() {
    return inputs.correct[column + 1];
  }

  function nextWrongSpotInput() {
    return inputs.wrongSpot[column + 1];
  }

  function nextIncorrectInput() {
    return inputs.incorrect;
  }

  function updateCorrectGuess(i, event) {
    const correct = [];
    correct[i] = event.target.value.trim().toLowerCase().replace(/[^a-z]/g, '').substring(0, 1);
    nextIncorrectInput() && nextCorrectInput().current.focus()
    updateWhatWeKnow({ correct });
  }

  function updateIncorrectGuess(event) {
    const incorrect = event.target.value.trim().toLowerCase().replace(/[^a-z]/g, '').split('').filter(x => !!x.trim());
    updateWhatWeKnow({ incorrect });
  }

  function updateWrongSpotInfo(i, event) {
    const wrongSpot = [];
    wrongSpot[i] = event.target.value.trim().toLowerCase().replace(/[^a-z]/g, '').split('').filter(x => !!x);
    nextWrongSpotInput() && nextWrongSpotInput().current.focus()
    updateWhatWeKnow({ wrongSpot });
  }

  function handleArrowsFromCorrect(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
        return STOP_PROCESSING;
      case "ArrowDown":
        nextIncorrectInput().current.focus();
        return STOP_PROCESSING;
      default:
        return CONTINUE_PROCESSING;
    }
  }

  function handleArrowsFromIncorrect(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault();
        nextCorrectInput().current.focus();
        return STOP_PROCESSING;
      case "ArrowDown":
        event.preventDefault();
        nextWrongSpotInput().current.focus();
        return STOP_PROCESSING;
      default:
        return CONTINUE_PROCESSING;
    }
  }

  function handleArrowsFromWrongSpot(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
        nextIncorrectInput().current.focus();
        return STOP_PROCESSING;
      case "ArrowDown":
        return STOP_PROCESSING;
      default:
        return CONTINUE_PROCESSING;
    }
  }

  return (
    <article id='what-we-know'>
      <h2>What We Know</h2>
      <section>
        <h3>Correct guesses:</h3>
        <input class='what-we-know__input what-we-know__input--1x1' type='text' 
          ref={inputs.correct[0]}
          onFocus={() => setColumn(0)}
          onKeyUp={e => handleArrowsFromCorrect(e) && updateCorrectGuess(0, e)} />
        <input class='what-we-know__input what-we-know__input--1x1' type='text' 
          ref={inputs.correct[1]}
          onFocus={() => setColumn(1)}
          onKeyUp={e => handleArrowsFromCorrect(e) && updateCorrectGuess(1, e)} />
        <input class='what-we-know__input what-we-know__input--1x1' type='text' 
          ref={inputs.correct[2]}
          onFocus={() => setColumn(2)}
          onKeyUp={e => handleArrowsFromCorrect(e) && updateCorrectGuess(2, e)} />
        <input class='what-we-know__input what-we-know__input--1x1' type='text' 
          ref={inputs.correct[3]}
          onFocus={() => setColumn(3)}
          onKeyUp={e => handleArrowsFromCorrect(e) && updateCorrectGuess(3, e)} />
        <input class='what-we-know__input what-we-know__input--1x1' type='text' 
          ref={inputs.correct[4]}
          onFocus={() => setColumn(4)}
          onKeyUp={e => handleArrowsFromCorrect(e) && updateCorrectGuess(4, e)} />
      </section>
      <section>
        <h3>None of these letters:</h3>
        <textarea class='what-we-know__input what-we-know__input--5x5' spellcheck="false"
          ref={inputs.incorrect}
          onKeyUp={e => handleArrowsFromIncorrect(e) && updateIncorrectGuess(e)} ></textarea>
      </section>
      <section>
        <h3>Correct letters but not in these spots:</h3>
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false" 
          ref={inputs.wrongSpot[0]}
          onFocus={() => setColumn(0)}
          onKeyUp={e => handleArrowsFromWrongSpot(e) && updateWrongSpotInfo(0, e)} />
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false" 
          ref={inputs.wrongSpot[1]}
          onFocus={() => setColumn(1)}
          onKeyUp={e => handleArrowsFromWrongSpot(e) && updateWrongSpotInfo(1, e)} />
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false" 
          ref={inputs.wrongSpot[2]}
          onFocus={() => setColumn(2)}
          onKeyUp={e => handleArrowsFromWrongSpot(e) && updateWrongSpotInfo(2, e)} />
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false" 
          ref={inputs.wrongSpot[3]}
          onFocus={() => setColumn(3)}
          onKeyUp={e => handleArrowsFromWrongSpot(e) && updateWrongSpotInfo(3, e)} />
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false" 
          ref={inputs.wrongSpot[4]}
          onFocus={() => setColumn(4)}
          onKeyUp={e => handleArrowsFromWrongSpot(e) && updateWrongSpotInfo(4, e)} />
      </section>
    </article>
  );
}
