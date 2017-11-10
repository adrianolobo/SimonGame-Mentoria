const IN_GAME = 'in-game';
const PRE_GAME = 'pre-game';
const POS_GAME = 'pos-game';



(function() {
  rankingManager.init({ onNewRanking: newRanking });
  game.init({ onEndGame: endGame });

  const playButton = document.getElementById('play-button');
  const gameCanvas = document.getElementById('game-canvas');

  function changeGameState(state) {
    gameCanvas.classList.remove(IN_GAME, PRE_GAME, POS_GAME);
    gameCanvas.classList.add(state);
  }

  function endGame() {
    changeGameState(POS_GAME);
  }

  function newRanking() {
    changeGameState(PRE_GAME);
  }

  playButton.addEventListener('click', () => {
    changeGameState(IN_GAME);
    game.newGame();
  });
})();
