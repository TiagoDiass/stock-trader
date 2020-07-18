import Vue from 'vue';

export default {
  loadData({ commit }) {
    Vue.prototype.$httpClient.get('/stocks').then(resp => {
      const data = resp.data;
      if (data) {
        commit('setStocks', data.stocks);

        commit('setPortfolio', {
          funds: data.funds,
          stocksPortfolio: data.stocksPortfolio,
        });
      }
    });
  },

  async restartApp({ commit }) {
    const url = '/stocks/restart';
    const resposta = await Vue.prototype.$httpClient.get(url);

    commit('setStocks', resposta.data.dados.stocks);
    commit('setPortfolio', {
      funds: resposta.data.dados.funds,
      portfolio: resposta.data.dados.stocksPortfolio,
    });
  },
};
