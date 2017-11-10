const buttonTimeLight = 1000;
const buttonTimeDelayLight = 500;
const delayBetweenLevels = 500;

const game = {
  init(params) {
    this.buttons = [];
    this.buttons.push(document.getElementById('button-red'));
    this.buttons.push(document.getElementById('button-blue'));
    this.buttons.push(document.getElementById('button-green'));
    this.buttons.push(document.getElementById('button-yellow'));
    this.scoreEl = document.getElementById('score');

    this.endGameCallback = params.onEndGame;
    this.score = 0;
    this.gameSequence = [];
    this.isShowingSequence = true;
    this._manageButtonPress();
  },
  newGame() {
    this._updateScore(0);
    this._startLevel();
  },
  getScore() {
    return this.score;
  },
  _startLevel() {
    this._setSequence();
    this._animateSequence();
  },
  _setSequence() {
    this.gameSequence = [];
    for (var i = 0; i < this.score+1; i++) {
      this.gameSequence.push(getRandomSequenceItem());
    }
  },
  _animateSequence() {
    this._toggleShowingSequence(true);
    setTimeout(() => {
      this.gameSequence.forEach((current, key) => {
        setTimeout(() => {
          toggleButtonActive(this.buttons[current]);
          setTimeout(() => {
            this._deActiveAllButtons();
            if (key === this.score) {
              this._toggleShowingSequence(false);
            }
          }, buttonTimeDelayLight);
        }, key * (buttonTimeDelayLight + buttonTimeLight));
      });
    }, buttonTimeDelayLight);
  },
  _manageButtonPress() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        if (!this._canPressButton()) {
          return;
        }
        if (this._getButtonIndex(button) === this.gameSequence[0]) {
          this.gameSequence.shift();
          if (this.gameSequence.length === 0) {
            this._nextLevel(this.score + 1);
          }
        } else {
          this._endGame();
        }
      });
    });
  },
  _nextLevel(newLevel) {
    this._updateScore(newLevel);
    setTimeout(() => {
      this._startLevel();
    }, delayBetweenLevels);
  },
  _endGame() {
    this.endGameCallback();
  },
  _toggleShowingSequence(isShowing) {
    this.isShowingSequence = isShowing;
    this.buttons.forEach((button) => {
      button.disabled = isShowing;
    })
  },
  _updateScore(newScore) {
    this.score = newScore;
    this.scoreEl.innerHTML = String(newScore);
  },
  _getButtonIndex(button) {
    for (var i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i] === button) {
        return i;
      }
    }
  },
  _deActiveAllButtons() {
    this.buttons.forEach((button) => {
      deactiveButton(button);
    });
  },
  _canPressButton() {
    return !this.isShowingSequence;
  },
}

const buttonsAmount = 4;

function deactiveButton(button) {
  button.classList.remove('active');
}

function toggleButtonActive(button) {
  button.classList.toggle('active');
}

function getRandomSequenceItem() {
  return Math.floor(Math.random() * buttonsAmount);
}
