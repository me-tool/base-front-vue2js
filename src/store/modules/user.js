export default {
  namespaced: true,
  state: {
    userInfo: {},
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
};
