import Vue from 'vue';

const initialState = () => ({
  funds: 0,
  stocks: [],
});

const state = initialState();

const getters = {
  getFunds(state) {
    return state.funds;
  },

  getStocksPortfolio(state) {
    return state.stocks;
  },
};

const actions = {
  async listStocksInPortfolio({ commit }) {
    const url = '/stocks/portfolio';
    const resposta = await Vue.prototype.$httpClient.get(url);
    commit('setPortfolio', resposta.data.dados);
  },

  async sellStock({ commit }, order) {
    const url = '/stocks/sell';
    const resposta = await Vue.prototype.$httpClient.post(url, {
      stockId: order.stockId,
      stockAmount: order.stockQuantity,
    });
  },
};

const mutations = {
  setPortfolio(state, data) {
    state.funds = data.funds;
    state.stocks = data.stocksPortfolio;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
