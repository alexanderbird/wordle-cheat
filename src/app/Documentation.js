
export const Documentation = () => (
  <div>
    <p>An interactive tool to help you cheat at Wordle on hard mode</p>
    <p>
      Tenets:
      <ul>
        <li><b>No reverse engineering:</b> this cheating tool does not use any information taken directly or indirectly from inspecting the Wordle source code</li>
        <li><b>Assist but don't automate:</b> this tool should help you cheat but not solve the Wordle automatically</li>
      </ul>
    </p>
    <p>
      Algorithm:
      <ol>
        <li><b>Bisect the answer space:</b> first, guess a word that would confirm or eliminate the largest possible set of words (see "Bisecting Guesses")</li>
        <li><b>Update the word list:</b> based on what you learned from the first guess, reduce the total word list</li>
        <li><b>Repeat</b> until you've won</li>
      </ol>
    </p>
  </div>
);
