import { createStore, useStore as baseUseStore } from "vuex";

// 从本地存储加载初始状态
const loadState = () => {
  try {
    const sessionTokenV = uni.getStorageSync("sessionTokenV");
    // console.log("从本地加载的结果", sessionTokenV);

    return {
      sessionTokenV: sessionTokenV ? sessionTokenV : "",
    };
  } catch (error) {
    console.error("Failed to load state from storage:", error);
    return {
      sessionTokenV: "",
    };
  }
};

// 创建 Vuex store
const store = createStore({
  state: {
    searchInput: "",
    sessionTokenV: loadState().sessionTokenV,
  },

  getters: {
    getSearchInput(state) {
      return state.searchInput;
    },
  },

  mutations: {
    setSearchInput(state, newValvue) {
      state.searchInput = newValvue;
    },
    setsessionTokenV(state, newSetsessionToken) {
      // console.log("vuex保存到本地了", newSetsessionToken);
      state.sessionTokenV = newSetsessionToken;
      uni.setStorageSync("sessionTokenV", newSetsessionToken);
    },
  },

  actions: {},
});

export default store;
