import { easy, hard } from './wordlist';
const { createSlice } = require('@reduxjs/toolkit');
function getRandomIndex(max) {
  return Math.round(Math.random() * max);
}
const gameInitialState = (gameMode) => {
  const difficulty = { easy, hard };
  return {
    gameMode,
    gameModes: Object.keys(difficulty),
    dictionnary: difficulty[gameMode],
    maxWord: 10,
    currentWord: '',
    wordCount: -1,
    status: 'idle',
    error: false,
    errorCount: 0,
    correct: false,
    goodWord: 0,
    wrongWords: [],
  };
};
const gameSlice = createSlice({
  name: 'game',
  initialState: {
    game: gameInitialState('easy'),
  },
  reducers: {
    nextWord: (state, action) => {
      if (state.game.wordCount < state.game.maxWord) {
        const dictionnary = state.game.dictionnary;
        const index = getRandomIndex(
          dictionnary.length - state.game.wordCount - 2,
        );
        if (!state.game.correct && state.game.wordCount > 0) {
          state.game.wrongWords.push(state.game.currentWord);
        }
        state.game.currentWord = dictionnary[index];
        const temp = dictionnary[index];
        dictionnary[index] =
          dictionnary[dictionnary.length - state.game.wordCount - 2];
        dictionnary[dictionnary.length - state.game.wordCount - 2] = temp;
        state.game.goodWord += state.game.correct;
        state.game.errorCount += !state.game.correct;
        state.game.wordCount += 1;
        state.game.correct = false;
        state.game.error = false;
      } else {
        if (!state.game.correct && state.game.wordCount > 0) {
          state.game.wrongWords.push(state.game.currentWord);
        }
        state.game.status = 'done';
      }
    },
    stopGame: (state, action) => {
      state.game.status = 'idle';
    },
    startNewGame: (state, action) => {
      state.game = { ...state.game, ...gameInitialState(action.payload) };
      state.game.status = 'running';
    },
    tryWord: (state, action) => {
      state.game.error = action.payload !== state.game.currentWord;
      state.game.errorCount += state.game.error;
      state.game.correct = !state.game.error;
    },
  },
});
export const selectors = {
  selectmaxWord: (state) => state.game.game.maxWord,
  selectgameMode: (state) => state.game.game.gameMode,
  selectgameModes: (state) => state.game.game.gameModes,
  selectwordCount: (state) => state.game.game.wordCount,
  selectcurrentWord: (state) => state.game.game.currentWord,
  selecterror: (state) => state.game.game.error,
  selecterrorCount: (state) => state.game.game.errorCount - 1,
  selectgameStatus: (state) => state.game.game.status,
  selectCorrect: (state) => state.game.game.correct,
  selectGoodword: (state) => state.game.game.goodWord,
  selectWrongWords: (state) => state.game.game.wrongWords,
};
export const { actions } = gameSlice;
export default gameSlice.reducer;
