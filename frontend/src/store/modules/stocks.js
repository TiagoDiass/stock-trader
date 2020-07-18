import Vue from 'vue';

const initialState = () => ({
  stocks: [],
});

const state = initialState();

const getters = {
  getStocks(state) {
    return state.stocks;
  },
};

const actions = {
  async listStocks({ commit }) {
    const url = '/stocks/stocks';
    const resposta = await Vue.prototype.$httpClient.get(url);

    commit('setStocks', resposta.data);
  },

  async buyStock({ commit }, order) {
    const url = '/stocks/buy';
    const resposta = await Vue.prototype.$httpClient.post(url, {
      stockId: order.stockId,
      stockAmount: order.stockQuantity,
    });
  },

  async randomizeStocks({ commit }) {
    const url = '/stocks/endday';
    const resposta = await Vue.prototype.$httpClient.get(url);

    commit('setStocks', resposta.data.dados);
  },
};

const mutations = {
  setStocks(state, data) {
    state.stocks = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
