import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const API_URL = 'http://127.0.0.1:8080/';

export default new Vuex.Store({
  state: {
    goods: [],
    filteredGoods: [],
    basketList: [],
  },
  getters: {
    goods: (state) => state.filteredGoods,
    basketList: (state) => state.basketList,
  },
  mutations: {
    loadGoods: (state, payload) => {
      state.basketList = payload;
      state.filteredGoods = payload;
    },
    loadCart: (state, payload) => {
      state.basketList = payload;
    },
    add: (state, payload) => {
      state.basketList.push(payload);
    },
    remove: (state, payload) => {
      const index = state.basketList.findIndex((item) => item.id_product === payload.id_product);
      state.basketList.splice(index, 1);
    },
    filter: (state, payload) => {
      state.filteredGoods = payload;
    },
  },
  actions: {
    loadGoods({ commit }) {
      fetch(`${API_URL}catalogData`)
        .then((request) => request.json())
        .then((data) => {
          commit('loadGoods', data);
        });
    },
    loadBasket({ commit }) {
      fetch(`${API_URL}getBasket`)
        .then((request) => request.json())
        .then((data) => {
          commit('loadCart', data);
        });
    },
    addToCart({ commit }, good) {
      fetch(`${API_URL}addToBasker`)
        .then(() => {
          commit('add', good);
        });
    },
    removeFromCart({ commit }, good) {
      fetch(`${API_URL}deleteFromBasket`)
        .then(() => {
          commit('remove', good);
        });
    },
    onSearch({ commit, state }, searchString) {
      const regex = new RegExp(searchString, 'i');
      commit('filter', state.goods.filter((good) => regex.test(good.product_name)));
    },
  },
});
