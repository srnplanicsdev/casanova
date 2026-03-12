import api from "@/utils/api";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("accessToken") || null,
    user: JSON.parse(localStorage.getItem("login")) || null,
    loading: false,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authUser: (state) => state.user,
    authLoading: (state) => state.loading,
  },
  mutations: {
    SET_LOADING(state, value) {
      state.loading = value;
    },
    SET_AUTH(state, payload) {
      state.token = payload.token;
      state.user = payload.user || null;

      localStorage.setItem("accessToken", payload.token);
      localStorage.setItem("login", JSON.stringify(payload));
    },

    CLEAR_AUTH(state) {
      state.token = null;
      state.user = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("login");
    },
  },
  actions: {
    async login({ commit }, credentials) {
      commit("SET_LOADING", true);
      try {
        const res = await api.post("/login", credentials);

        commit("SET_AUTH", {
          token: res.data.token,
          user: res.data.user ?? res.data,
        });

        return res;
      } catch (error) {
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async register(_, payload) {
      return await api.post("/register", payload);
    },
    async forgotPassword(_, email) {
      return await api.post("/forgot-password", { email });
    },
    async resetPassword(_, payload) {
      return await api.post("/reset-password", payload);
    },
    async logout({ commit }) {
      try {
        await api.post("/logout");
      } catch (error) {
        console.error(error);
      } finally {
        commit("CLEAR_AUTH");
      }
    },
  },
};
