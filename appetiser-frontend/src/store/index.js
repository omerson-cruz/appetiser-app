import Vue from "vue";
import Vuex from "vuex";
import {
  registerApi,
  checkEmailApi,
  loginApi,
  verifyApi,
  reverifyApi,
  refreshToken,
} from "../plugins/axios";

import cookies from "vue-cookies";
import router from "../router/index";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      path: [],
    }),
  ],

  state: {
    user: null,
    loading: false,
    error: null,
    authError: null,
    token: null,
    tokenType: null,
    expiresIn: null,
    isPendingVerification: false,
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    },
    clearUser: (state) => (state.user = null),

    setError(state, payload) {
      state.error = payload;
    },

    clearError(state) {
      state.error = null;
    },

    setToken(state, payload) {
      state.token = payload;
    },
    clearToken(state) {
      state.token = null;
    },

    setAuthError: (state, payload) => {
      state.authError = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setPendingVerification: (state, payload) => {
      state.isPendingVerification = payload;
    },
  },
  actions: {
    // handles signin from Signin Component
    async signInUser({ dispatch, commit }, payload) {
      commit("clearError");

      // Also needs to set the loading state when user press that sign in button
      commit("setLoading", true);

      console.log("payload: ", payload);

      try {
        // SIGNIN API
        const res = await loginApi.post("", {
          username: payload.email,
          password: payload.password,
        });
        console.log("response data", res);

        const {
          data: {
            data: { access_token, token_type, expires_in, user },
          },
        } = res;

        localStorage.setItem("token", access_token);
        commit("setToken", access_token);
        commit("setUser", user);

        // storing token in "local Storage"
        console.log("expires in: ", new Date(expires_in));
        console.log("access token ", access_token);
        console.log("token_type", token_type);
        console.log("user", user);

        // stop loading state
        commit("setLoading", false);

        router.push("/");
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error);
        console.error("Error Signing Up: ", error);
      }
    },

    // handles Sign Up  from Sign up Component
    async signUpUser({ dispatch, commit }, payload) {
      commit("clearError");
      // Also needs to set the loading state when user press that sign in button
      commit("setLoading", true);

      try {
        // REGISTER API
        const res = await registerApi.post("", {
          email: payload.email,
          full_name: payload.name,
          password: payload.password,
          password_confirmation: payload.confirmPassword,
        });
        console.log("response data", res);

        const {
          data: {
            data: { access_token, token_type, expires_in, user },
          },
        } = res;

        localStorage.setItem("token", access_token);
        commit("setToken", access_token);
        commit("setUser", user);

        // storing token in "local Storage"
        console.log("expires in: ", new Date(expires_in));
        console.log("access token ", access_token);
        console.log("token_type", token_type);
        console.log("user", user);

        // stop loading state
        commit("setLoading", false);

        dispatch("sendVerification", user);
        router.push("/verify");
      } catch (error) {
        commit("setLoading", false);
        if (error.response !== undefined) {
          commit("setError", error.response.data.message);
        }
        console.error("Error Signing Up: ", error);
      }
    },

    async sendVerification({ commit, dispatch }, payload) {
      const { email } = payload;

      const localBackend = "http://localhost:3000";

      console.log("sendVerification email: ", email);

      try {
        const res = await axios.post(localBackend + "/emailVerify", {
          email,
          via: "email",
        });
        return;
      } catch (error) {
        console.log("error: ", error);
      }
    },

    async verify({ commit }, payload) {
      console.log("verify payload: ", payload);

      try {
        // REGISTER API
        const {
          data: { data: user, http_status },
        } = await verifyApi.post(
          "",
          {
            token: payload,
            via: "email",
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        console.log("user: ", user);
        console.log("http_status: ", user, http_status);

        if (http_status === 200) {
          commit("setUser", user);
        }

        router.push("/");
      } catch (error) {
        commit("setLoading", false);
        if (error.response !== undefined) {
          commit("setError", error.response.data.message);
        }
        console.error("Error Signing Up: ", error);
        console.log("Error details : ", error.response);
      }
    },

    async resendVerification({ commit, dispatch, state: { user } }) {
      try {
        dispatch("sendVerification", user);
      } catch (error) {
        commit("setLoading", false);
        if (error.response !== undefined) {
          commit("setError", error.response.data.message);
        }
        console.error("Error Signing Up: ", error);
      }
    },

    async refreshToken({ commit }) {
      try {
        // REFRESH TOKEN API
        const res = await refreshToken.post("", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        console.log("response data", res);
      } catch (error) {
        commit("setLoading", false);
        if (error.response !== undefined) {
          commit("setError", error.response.data.message);
        }
        console.error("Error Signing Up: ", error.response);
      }
    },

    async signOut({ commit }) {
      // Clear user state
      commit("clearUser");
      commit("clearToken");

      sessionStorage.clear();

      localStorage.clear();

      router.go("/"); // will refresh the page and avoid redundant route to homepage
    },
  },
  getters: {
    loading: (state) => state.loading,
    user: (state) => state.user,
    error: (state) => state.error,
    authError: (state) => state.authError,
    isPendingVerification: (state) => state.isPendingVerification,
  },
  modules: {},
});
