import { signUp, login } from "@/firebase";
import { getField, updateField } from "vuex-map-fields";

export const auth = {
    namespaced: true,
    state: () => ({
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
        updateField
    },
    actions: {},
    getters: {
        getField
    },
};
