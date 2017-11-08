const game = {
  init() {
    this.buttons = [];
    this.buttons.push(document.getElementById('button-red'));
    this.buttons.push(document.getElementById('button-blue'));
    this.buttons.push(document.getElementById('button-green'));
    this.buttons.push(document.getElementById('button-yellow'));

    this.score = 2;
    this.gameSequence = [];
    this.isShowingSequence = false;
    this._start();
  },
  _start() {
    this._setSequence();
    this._animateSequence();
  },
  _setSequence() {
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
          }, 500);
        }, key * 1500);
      });
    }, 500);
  },
  _toggleShowingSequence(isShowing) {
    this.isShowingSequence = isShowing;
  },
  _deActiveAllButtons() {
    this.buttons.forEach((button) => {
      deactiveButton(button);
    });
  }
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
