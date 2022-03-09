import { createStore } from 'vuex';
import { rootActions } from './rootActions';
import { rootGetters } from './rootGetters';
import { rootMutations } from './rootMutations';
import { tables } from './modules/tables';
import { themeTogglerMiddleware } from './middlewares';

export const store = createStore({
  modules: {
    tables,
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
      coinGeckoLoading: false
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
