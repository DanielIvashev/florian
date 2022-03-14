import { getField, updateField } from "vuex-map-fields";

export const navigation = {
    namespaced: true,
    state: () => ({
        drawer: {
            open: false
        }
    }),
    mutations: {
        updateField,
        CHANGE_DRAWER_OPEN(state, { value }) {
            state.drawer.open = !!value;
        }
    },
    actions: {},
    getters: {
        getField,
        getDrawerState(state) {
            return state.drawer || {};
        },
    },
};
