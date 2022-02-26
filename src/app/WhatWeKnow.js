export const WhatWeKnow = () => {
  return (
    <div id='what-we-know'>
      <h2>What We Know About The Word</h2>
      <section>
        <h3>We know the letters for these spots:</h3>
        <input class='what-we-know__input what-we-know__input--1x1' type='text'></input>
        <input class='what-we-know__input what-we-know__input--1x1' type='text'></input>
        <input class='what-we-know__input what-we-know__input--1x1' type='text'></input>
        <input class='what-we-know__input what-we-know__input--1x1' type='text'></input>
        <input class='what-we-know__input what-we-know__input--1x1' type='text'></input>
      </section>
      <section>
        <h3>We know these letters aren't in the word at all:</h3>
        <textarea class='what-we-know__input what-we-know__input--5x5' spellcheck="false"></textarea>
      </section>
      <section>
        <h3>We know these letters are in the word but not in these spots:</h3>
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false"></textarea>
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false"></textarea>
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false"></textarea>
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false"></textarea>
        <textarea class='what-we-know__input what-we-know__input--1x5' spellcheck="false"></textarea>
      </section>
    </div>
  );
}
