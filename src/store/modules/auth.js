import { signUp, login } from "@/firebase";
import { getField, updateField } from 'vuex-map-fields';

export const auth = {
    namespaced: true,
    state: () => ({
        loggedIn: false,
        loginFormLoading: false,
        signUpFormLoading: false,
        loginForm: {
            email: '',
            password: ''
        },
        signUpForm: {
            name: '',
            email: '',
            password: ''
        }
    }),
    mutations: {
        updateField,
        SET_LOGGED_IN (state, {loggedIn}) {
            state.loggedIn = loggedIn;
        },
        SET_LOGIN_LOADING (state) {
            state.loginFormLoading = true;
            state.loginFormError = null;
        },
        SET_LOGIN_SUCCESS (state, user) {
            state.loginFormLoading = false;
            state.loginFormError = null;
            state.user = user;
        },
        SET_LOGIN_ERROR (state) {
            state.loginLoading = true;
            state.loginError = null;
        },
    },
    actions: {
        login ({ commit, state }) {
            const { email, password } = state.loginForm;
            return login({ email, password })
                .then((user) => {
                    console.log(user);
                })
                .catch(e => {
                    console.log('awddawd', e)
                })
        },
        signUp ({ commit, state }) {
            const { email, password } = state.signUpForm;
            return signUp({ email, password })
                .then((user) => {
                    console.log(user);
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    getters: {
        getField,
        isLoggedIn(state) {
            return state.loggedIn;
        },
        loginForm(state) {
            return state.loginForm;
        },
    },
};
