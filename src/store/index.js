import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    subAppActive: false, // 子系统是否命中
  },
  mutations: {
    TOGGLE_SUBAPPACTIVE(state, bol) {
      state.subAppActive = bol;
    },
  },
  modules: {
    user,
  },
});
