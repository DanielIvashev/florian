import { createStore } from 'vuex';
import { rootActions } from './rootActions';
import { rootGetters } from './rootGetters';
import { rootMutations } from './rootMutations';
import { auth } from './modules/auth';
import { navigation } from './modules/navigation';
import { bullbearSignal } from './modules/bullbearSignal';
import { dashboard } from "./modules/dashboard";
import { themeTogglerMiddleware } from './middlewares';

export const store = createStore({
    modules: {
        auth,
        navigation,
        bullbearSignal,
        dashboard
    },
    state() {
        return {
            isLightTheme: true,
            locale: '',
            localeLoading: false,
            localeError: null,
            coinsGecko: null,
            coinsGeckoError: null,
            coinsGeckoLoading: false,
            coinGecko: null,
            coinGeckoError: null,
            coinGeckoLoading: false,
            memberFromMemberStack: {}
        };
    },
    getters: {
        ...rootGetters,
    },
    mutations: {
        ...rootMutations,
    },
    actions: {
        ...rootActions,
    },
    plugins: [themeTogglerMiddleware],
    strict: true,
});
