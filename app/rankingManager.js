const rankingManager = {
  init() {
    const $rankingTooltip = document.getElementById('ranking-tooltip');

    $rankingTooltip.addEventListener('click', this.toggleRanking);
  },
  toggleRanking() {
    this.classList.toggle('open');
  }
};
