import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appLanguage:
      localStorage.getItem("appLanguage") ||
      process.env.VUE_APP_I18N_LOCALE ||
      "en",
  },
  getters: {
    getAppLanguage: (state) => state.appLanguage,
  },
  mutations: {
    setAppLanguage(state, language) {
      state.appLanguage = language;
      localStorage.setItem("language", language); // Whenever we change the appLanguage we save it to the localStorage
      // console.log("waaa");
    },
  },
  actions: {},
  modules: {},
});
