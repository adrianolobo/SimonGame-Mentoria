const rankingManager = {
  init(params) {
    const $rankingTooltip = document.getElementById('ranking-tooltip');
    const $saveRanking = document.getElementById('save-ranking');
    this.$userNameInput = document.getElementById('user-name-input');
    this.$rankingList = document.getElementById('ranking-list');
    this.$rankingItemTemplate = document.getElementById('ranking-item-template');

    $rankingTooltip.addEventListener('click', this._toggleRanking);
    $saveRanking.addEventListener('click', (this._saveRanking).bind(this));
    this.ranking = [];

    this.onNewRankingCallback = params.onNewRanking;
  },
  _toggleRanking() {
    this.classList.toggle('open');
  },
  _saveRanking() {
    this.ranking.push({
      name: this.$userNameInput.value,
      score: game.getScore(),
    });
    this._generateRankingList();
  },
  _generateRankingList() {
    this._clearRankingHTML();
    this.ranking.forEach((rankingItem) => {
      this.$rankingList.append(this._getRankingItemElement(rankingItem));
    });
    this.onNewRankingCallback();
  },
  _clearRankingHTML() {
    this.$rankingList.innerHTML = '';
  },
  _getRankingItemElement(rankingItem) {
    const newRankingItem = document.importNode(this.$rankingItemTemplate, true);
    newRankingItem.querySelector('.score').textContent = rankingItem.score;
    newRankingItem.querySelector('.name').textContent = rankingItem.name;
    return newRankingItem;
  },
};
