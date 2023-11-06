export default {
  namespaced: true,
  state: {
    isSidebarOpen: false
  },
  mutations: {
    SET_SIDEBAR_IS_OPEN(state, data) {
      state.isSidebarOpen = data
    }
  },
  actions: {
    openSidebar({ commit }) {
      commit('SET_SIDEBAR_IS_OPEN', true)
    },
    closeSidebar({ commit }) {
      commit('SET_SIDEBAR_IS_OPEN', false)
    }
  },
  getters: {
    getSidebarIsOpen: (state) => state.isSidebarOpen
  }
}
